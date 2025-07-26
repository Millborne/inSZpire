import { SharedAuthData } from '../../types/auth';

class SharedStorageService {
  /**
   * Retrieve authentication data from shared storage (cookies and localStorage)
   */
  getAuthData(): SharedAuthData | null {
    // Try localStorage first (same origin)
    const localAuth = this.getAuthFromLocalStorage();
    if (localAuth) {
      return localAuth;
    }

    // Try cookies (shared domain)
    const cookieAuth = this.getAuthFromCookies();
    if (cookieAuth) {
      return cookieAuth;
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
      const token = this.getCookie('authToken');
      const userStr = this.getCookie('user');
      const timestampStr = this.getCookie('authTimestamp');
      const source = this.getCookie('authSource');
      const expiresAtStr = this.getCookie('authExpiresAt');

      if (!token || !userStr || !timestampStr || !source) {
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