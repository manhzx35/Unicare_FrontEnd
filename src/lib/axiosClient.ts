import axios from 'axios';
import toast from 'react-hot-toast';

// 1. Set baseURL to Spring Boot backend
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Attach JWT token if valid
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token && config.headers) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Handle 401 Unauthorized globally
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      // Network error or backend down
      toast.error('MSG06: Connection lost. Please check your internet or try again later.');
    } else if (error.response.status === 401) {
      // Unauthorized -> Token expired or invalid
      toast.error('Session expired. Please log in again.');
      
      // Clear storage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      
      // We dispatch a custom event so the React AuthContext can handle it smoothly
      window.dispatchEvent(new Event('auth:unauthorized'));
    } else if (error.response.status === 403) {
      toast.error('Access denied. You do not have permission for this action.');
    } else if (error.response.status >= 500) {
      toast.error('A server error occurred. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
