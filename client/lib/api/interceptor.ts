import { api } from './client';

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
    if (!isUnauthorized || originalRequest?._retry || isRefreshRequest) {
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
    } catch (refreshError) {
      pendingRequests = [];

      window.location.href = '/login';

      return new Promise(() => { });
    } finally {
      isRefreshing = false;
    }
  },
);
