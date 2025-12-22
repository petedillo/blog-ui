import axios, { type AxiosError } from 'axios';
import { authService } from './authService';

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add auth token to headers if available
api.interceptors.request.use((config) => {
  const accessToken = authService.getStoredAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: Handle 401 errors with token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosError['config'] & { _retry?: boolean };

    // Check if this is a 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await authService.refreshToken();

        // Add the new access token to the request
        const newAccessToken = authService.getStoredAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Retry the original request
        return api(originalRequest);
      } catch {
        // Token refresh failed - redirect to login
        authService.clearTokens();
        window.location.href = '/admin/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;