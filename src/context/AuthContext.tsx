import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../services/authService';
import type { AuthUser, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshTimerRef = { current: null as ReturnType<typeof setTimeout> | null };

  const checkAuth = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      startRefreshTimer();
    } catch {
      setUser(null);
      authService.clearTokens();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const userData = await authService.login(username, password);
    setUser(userData);
    startRefreshTimer();
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    }
  };

  const startRefreshTimer = () => {
    // Clear any existing timer
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }

    // Set refresh timer for 14 minutes (before 15-minute token expiry)
    refreshTimerRef.current = setTimeout(async () => {
      try {
        await authService.refreshToken();
        startRefreshTimer(); // Restart timer after successful refresh
      } catch {
        // Silent fail - user will be redirected on next API call
        setUser(null);
        authService.clearTokens();
      }
    }, 14 * 60 * 1000);
  };

  useEffect(() => {
    checkAuth();

    // Cleanup timer on unmount
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
