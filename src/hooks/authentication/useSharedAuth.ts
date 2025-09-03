import { useState, useEffect, useCallback } from 'react';
import { sharedStorageService } from '../../services/authentication/sharedStorageService';
import { SharedAuthData, User } from '../../types/auth';

export const useSharedAuth = () => {
  const [authData, setAuthData] = useState<SharedAuthData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = () => {
      setLoading(true);
      setError(null);

      // Debug: Check what's available in storage
      sharedStorageService.debugStorage();

      try {
        const data = sharedStorageService.getAuthData();
        if (data && sharedStorageService.validateAuthData(data)) {
          setAuthData(data);
          setIsAuthenticated(true);
          console.log('Shared authentication found:', data.source);
        } else {
          setAuthData(null);
          setIsAuthenticated(false);
          console.log('No valid shared authentication found');
        }
      } catch (err) {
        setError('Failed to initialize shared authentication');
        console.error('Shared auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for authentication changes from other applications
    const cleanup = sharedStorageService.listenForAuthChanges((data) => {
      if (data && sharedStorageService.validateAuthData(data)) {
        setAuthData(data);
        setIsAuthenticated(true);
        setError(null);
        console.log('Authentication updated from shared storage:', data.source);
      } else {
        setAuthData(null);
        setIsAuthenticated(false);
        console.log('Authentication cleared from shared storage');
      }
    });

    return cleanup;
  }, []);

  /**
   * Validate current authentication
   */
  const validateAuth = useCallback(() => {
    if (!authData) return false;
    return sharedStorageService.validateAuthData(authData);
  }, [authData]);

  /**
   * Check if authentication is expired
   */
  const isExpired = useCallback(() => {
    if (!authData || !authData.expiresAt) return false;
    return Date.now() > authData.expiresAt;
  }, [authData]);

  /**
   * Get time until expiration
   */
  const getTimeUntilExpiry = useCallback(() => {
    if (!authData || !authData.expiresAt) return null;
    const timeLeft = authData.expiresAt - Date.now();
    return timeLeft > 0 ? timeLeft : 0;
  }, [authData]);

  /**
   * Clear authentication (logout)
   */
  const logout = useCallback(() => {
    setAuthData(null);
    setIsAuthenticated(false);
    setError(null);
    
    // Clear local storage
    localStorage.removeItem('sharedAuthToken');
    localStorage.removeItem('sharedUser');
    localStorage.removeItem('sharedAuthTimestamp');
    localStorage.removeItem('sharedAuthSource');
    localStorage.removeItem('sharedAuthExpiresAt');
    
    console.log('Logged out from HRMSZ');
  }, []);

  return {
    // State
    authData,
    isAuthenticated,
    loading,
    error,
    user: authData?.user || null,
    token: authData?.token || null,
    source: authData?.source || null,
    
    // Methods
    validateAuth,
    isExpired,
    getTimeUntilExpiry,
    logout,
    
    // Utility
    hasAuth: isAuthenticated && !loading && !error
  };
};