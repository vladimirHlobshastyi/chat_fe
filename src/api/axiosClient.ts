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
      localStorage.removeItem('isAuthenticated');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      console.warn(error);
    }
    return Promise.reject(error.response?.data);
  },
);

export default axiosClient;
