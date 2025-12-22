export interface AuthUser {
  userId: number;
  username: string;
  email: string;
  displayName: string;
  profilePictureUrl?: string;
  authProvider: string;
}

export interface LoginResponse {
  userId: number;
  username: string;
  email: string;
  displayName: string;
  authProvider?: string;
  accessToken: string;
  refreshToken?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
