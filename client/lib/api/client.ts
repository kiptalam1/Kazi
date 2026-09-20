import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeoutErrorMessage: 'TimeOut was exceeded.Please try again later.',
});

let isRefreshing = false;
type PendingRequests = {
  resolve: () => void;
  reject: (error: unknown) => void;
};
let pendingRequests: PendingRequests[] = [];

function processQueue(error?: unknown) {
  pendingRequests.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  pendingRequests = [];
}

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const isRefreshRequest = originalRequest?.url?.includes(
      '/auth/refresh-tokens',
    );
    const isAuthRequest = originalRequest?.url?.includes('/auth/');
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
      await new Promise<void>((resolve, reject) => {
        pendingRequests.push({ resolve, reject });
      });
      return api(originalRequest);
    }
    isRefreshing = true;
    try {
      await api.post('/auth/refresh-tokens');

      processQueue();
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
