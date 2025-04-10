/* import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore/useAuthStore';

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown, tokenRefreshed: boolean) => {
  failedQueue.forEach((prom) =>
    tokenRefreshed ? prom.resolve() : prom.reject(error),
  );
  failedQueue = [];
};

const refreshAccessToken = async () => {
  const axiosTemp = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });
  const response = await axiosTemp.post('/auth/refresh-token');
  return response.data;
};

export const setupAxiosInterceptors = (axiosClient: AxiosInstance) => {
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
        error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const { setIsAuthenticated } = useAuthStore.getState();

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => axiosClient(originalRequest));
        }

        isRefreshing = true;

        try {
          await refreshAccessToken();
          processQueue(null, true);
          return axiosClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, false);
          setIsAuthenticated(false);
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error.response?.data ?? error);
    },
  );
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

setupAxiosInterceptors(axiosClient);

export default axiosClient;
 */

import { useAuthStore } from '@/store/authStore/useAuthStore';
import axios, { AxiosInstance } from 'axios';

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { setIsAuthenticated } = useAuthStore.getState();

      setIsAuthenticated(false);

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      console.warn(error);
    }
    return Promise.reject(error.response?.data);
  },
);

export default axiosClient;
//TODO WILL CHANGE BACK
