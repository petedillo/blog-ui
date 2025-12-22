import api from './api';
import type { AuthUser, LoginResponse, RefreshTokenRequest } from '../types/auth';

const TOKEN_STORAGE_KEY = 'auth_tokens';

interface StoredTokens {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(username: string, password: string): Promise<AuthUser> {
    const response = await api.post<LoginResponse>('/auth/login', { username, password });
    const { userId, username: uname, email, displayName, authProvider, accessToken, refreshToken } = response.data;
    
    // Store tokens in localStorage
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify({ accessToken, refreshToken }));
    
    // Build AuthUser from flat response
    const user: AuthUser = {
      userId,
      username: uname,
      email,
      displayName,
      authProvider: authProvider || 'LOCAL'
    };

    return user;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      // Clear tokens regardless of logout success
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  },

  async refreshToken(): Promise<void> {
    const storedTokens = this.getStoredTokens();
    if (!storedTokens) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<LoginResponse>('/auth/refresh', {
      refreshToken: storedTokens.refreshToken
    } as RefreshTokenRequest);

    const { accessToken, refreshToken } = response.data;
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify({
      accessToken,
      refreshToken: refreshToken || storedTokens.refreshToken  // Preserve existing refresh token if new one not provided
    }));
  },

  async getCurrentUser(): Promise<AuthUser> {
    const response = await api.get<AuthUser>('/auth/me');
    return response.data;
  },

  getStoredTokens(): StoredTokens | null {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  getStoredAccessToken(): string | null {
    const tokens = this.getStoredTokens();
    return tokens?.accessToken || null;
  },

  getStoredRefreshToken(): string | null {
    const tokens = this.getStoredTokens();
    return tokens?.refreshToken || null;
  },

  clearTokens(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};
