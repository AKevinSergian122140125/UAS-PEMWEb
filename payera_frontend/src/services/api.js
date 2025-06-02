import axios from 'axios';

// Configure base URL - adjust this to match your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6543/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Transaction API endpoints
export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  getById: (id) => api.get(`/transactions/${id}`),
  create: (transaction) => api.post('/transactions', transaction),
  update: (id, transaction) => api.put(`/transactions/${id}`, transaction),
  delete: (id) => api.delete(`/transactions/${id}`),
  getSummary: () => api.get('/transactions/summary'),
};

// Generic API helper functions
export const apiHelpers = {
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      return error.response.data?.message || 'Server error occurred';
    } else if (error.request) {
      // Request made but no response received
      return 'Network error - please check your connection';
    } else {
      // Something happened in setting up the request
      return 'An unexpected error occurred';
    }
  },
  
  // Fallback to localStorage if API is not available
  isApiAvailable: async () => {
    try {
      await api.get('/health');
      return true;
    } catch (error) {
      console.warn('API not available, falling back to localStorage');
      return false;
    }
  }
};

export default api;
