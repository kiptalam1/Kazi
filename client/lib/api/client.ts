import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeoutErrorMessage: 'TimeOut was exceeded.Please try again later.',
});

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

api.interceptors.response.use(
  function(response) {
    return response;
  },
  async function(error) {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const isRefreshRequest = originalRequest?.url?.includes(
      '/auth/refresh-tokens',
    );
    const isAuthRequest =
      originalRequest?.url?.includes('/auth/')
    // originalRequest?.url?.includes('/users/me');
    if (
      !isUnauthorized ||
      originalRequest?._retry ||
      isRefreshRequest ||
      isAuthRequest
    ) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    if (isRefreshing) {
      await new Promise<void>((resolve) => {
        pendingRequests.push(resolve);
      });
      return api(originalRequest);
    }
    isRefreshing = true;
    try {
      await api.post('/auth/refresh-tokens');
      pendingRequests.forEach((resolve) => resolve());
      pendingRequests = [];
      return api(originalRequest);
    } catch {
      pendingRequests = [];
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
