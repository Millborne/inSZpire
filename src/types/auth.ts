export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions?: string[];
  // Add any other user properties your HRMSZ app needs
}

export interface AuthData {
  token: string;
  user: User;
  timestamp: number;
  expiresAt?: number;
}

export interface SharedAuthData extends AuthData {
  source: string;
} 