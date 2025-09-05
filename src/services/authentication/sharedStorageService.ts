import { SharedAuthData } from '../../types/auth';

class SharedStorageService {
  /**
   * Check if localStorage contains test data
   */
  private isTestData(localAuth: SharedAuthData): boolean {
    return localAuth.token === 'test-token-123' || 
           localAuth.user?.id === 'test-user' ||
           localAuth.source === 'test-portal';
  }

  /**
   * Clear test data from localStorage
   */
  clearTestData(): void {
    localStorage.removeItem('sharedAuthToken');
    localStorage.removeItem('sharedUser');
    localStorage.removeItem('sharedAuthTimestamp');
    localStorage.removeItem('sharedAuthSource');
    localStorage.removeItem('sharedAuthExpiresAt');
    console.log('Cleared test data from localStorage');
  }

  /**
   * Retrieve authentication data from shared storage (cookies and localStorage)
   * Prioritize cookies over localStorage for real authentication
   */
  getAuthData(): SharedAuthData | null {
    // Try cookies first (shared domain) - this is the real authentication from main portal
    const cookieAuth = this.getAuthFromCookies();
    if (cookieAuth) {
      console.log('Found authentication in cookies:', cookieAuth.source);
      return cookieAuth;
    }

    // Try localStorage second (same origin) - this might be test data
    const localAuth = this.getAuthFromLocalStorage();
    if (localAuth) {
      // If it's test data, clear it and return null
      if (this.isTestData(localAuth)) {
        console.log('Found test data in localStorage, clearing it');
        this.clearTestData();
        return null;
      }
      console.log('Found authentication in localStorage:', localAuth.source);
      return localAuth;
    }

    return null;
  }

  /**
   * Get authentication data from localStorage
   */
  private getAuthFromLocalStorage(): SharedAuthData | null {
    try {
      const token = localStorage.getItem('sharedAuthToken');
      const userStr = localStorage.getItem('sharedUser');
      const timestampStr = localStorage.getItem('sharedAuthTimestamp');
      const source = localStorage.getItem('sharedAuthSource');
      const expiresAtStr = localStorage.getItem('sharedAuthExpiresAt');

      if (!token || !userStr || !timestampStr || !source) {
        return null;
      }

      const user = JSON.parse(userStr);
      const timestamp = parseInt(timestampStr);
      const expiresAt = expiresAtStr ? parseInt(expiresAtStr) : undefined;

      return {
        token,
        user,
        timestamp,
        expiresAt,
        source
      };
    } catch (error) {
      console.error('Failed to parse localStorage auth data:', error);
      return null;
    }
  }

  /**
   * Get authentication data from cookies
   */
  private getAuthFromCookies(): SharedAuthData | null {
    try {
      // Debug: Log all available cookies
      console.log('Available cookies:', document.cookie);
      
      // Use the actual cookie names that the main portal sets (without 'shared' prefix)
      const token = this.getCookie('authToken');
      const userStr = this.getCookie('user');
      const timestampStr = this.getCookie('authTimestamp');
      const source = this.getCookie('authSource');
      const expiresAtStr = this.getCookie('authExpiresAt');

      // Debug: Log what we found
      console.log('Cookie values found:', {
        token: token ? 'EXISTS' : 'MISSING',
        user: userStr ? 'EXISTS' : 'MISSING',
        timestamp: timestampStr ? 'EXISTS' : 'MISSING',
        source: source ? 'EXISTS' : 'MISSING',
        expiresAt: expiresAtStr ? 'EXISTS' : 'MISSING'
      });

      if (!token || !userStr || !timestampStr || !source) {
        console.log('Missing required cookie data:', { token: !!token, user: !!userStr, timestamp: !!timestampStr, source: !!source });
        return null;
      }

      const user = JSON.parse(decodeURIComponent(userStr));
      const timestamp = parseInt(timestampStr);
      const expiresAt = expiresAtStr ? parseInt(expiresAtStr) : undefined;

      return {
        token,
        user,
        timestamp,
        expiresAt,
        source
      };
    } catch (error) {
      console.error('Failed to parse cookie auth data:', error);
      return null;
    }
  }

  /**
   * Debug method to list all available cookies and localStorage items
   */
  debugStorage(): void {
    console.log('=== STORAGE DEBUG ===');
    
    // List all cookies
    console.log('All Cookies:', document.cookie);
    
    // List all localStorage items
    console.log('All localStorage items:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        console.log(`  ${key}:`, localStorage.getItem(key));
      }
    }
    
    // Check specific auth-related items
    console.log('Auth-related localStorage:');
    console.log('  sharedAuthToken:', localStorage.getItem('sharedAuthToken'));
    console.log('  sharedUser:', localStorage.getItem('sharedUser'));
    console.log('  sharedAuthTimestamp:', localStorage.getItem('sharedAuthTimestamp'));
    console.log('  sharedAuthSource:', localStorage.getItem('sharedAuthSource'));
    console.log('  sharedAuthExpiresAt:', localStorage.getItem('sharedAuthExpiresAt'));
    
    console.log('Auth-related cookies (actual names from main portal):');
    console.log('  authToken:', this.getCookie('authToken'));
    console.log('  user:', this.getCookie('user'));
    console.log('  authTimestamp:', this.getCookie('authTimestamp'));
    console.log('  authSource:', this.getCookie('authSource'));
    console.log('  authExpiresAt:', this.getCookie('authExpiresAt'));
    
    console.log('=== END DEBUG ===');
  }

  /**
   * Validate shared authentication data
   */
  validateAuthData(authData: SharedAuthData): boolean {
    if (!authData.token || !authData.user || !authData.timestamp || !authData.source) {
      return false;
    }

    // Check if token is expired
    if (authData.expiresAt && Date.now() > authData.expiresAt) {
      return false;
    }

    // Check if data is too old (5 minutes)
    const fiveMinutes = 5 * 60 * 1000;
    if (Date.now() - authData.timestamp > fiveMinutes) {
      return false;
    }

    // Validate source (optional - you can customize this)
    const validSources = ['main-portal', 'crm-system', 'inventory-system', 'analytics-dashboard'];
    if (!validSources.includes(authData.source)) {
      return false;
    }

    return true;
  }

  /**
   * Check if shared authentication is available
   */
  hasSharedAuth(): boolean {
    const authData = this.getAuthData();
    return authData ? this.validateAuthData(authData) : false;
  }

  /**
   * Get a cookie value by name
   */
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  /**
   * Listen for authentication changes from other applications
   */
  listenForAuthChanges(callback: (authData: SharedAuthData | null) => void): () => void {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key.startsWith('sharedAuth')) {
        const authData = this.getAuthData();
        callback(authData);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const authData = this.getAuthData();
        callback(authData);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }
}

export const sharedStorageService = new SharedStorageService();