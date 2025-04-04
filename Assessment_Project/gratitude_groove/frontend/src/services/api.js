import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const SANCTUM_ENDPOINT = 'http://127.0.0.1:8000/sanctum/csrf-cookie';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Function to get CSRF token
export const getCsrfToken = async () => {
    try {
        const response = await axios.get(SANCTUM_ENDPOINT, { 
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            }
        });
        
        // Get the XSRF-TOKEN cookie
        const xsrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        if (xsrfToken) {
            // Set the X-XSRF-TOKEN header for subsequent requests
            api.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
        }
        
        return response;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
};

// Request interceptor to handle CSRF token
api.interceptors.request.use(async (config) => {
    // Add auth token if it exists
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Ensure we have a CSRF token for non-GET requests
    if (config.method !== 'get') {
        await getCsrfToken();
    }
    
    return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 419) {
            try {
                // Get new CSRF token
                await getCsrfToken();
                // Retry the original request
                return api(error.config);
            } catch (refreshError) {
                console.error('Error refreshing CSRF token:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// Function to get admin dashboard data
export const getAdminDashboardData = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('Admin token not found. Please log in.');
    }
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await api.get('/admin/dashboard');
      return response.data; 
    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
      throw error;
    }
  };

// Function to get exercises data on admin dashboard
export const getAdminExercises = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('Admin token not found. Please log in.');
    }
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await api.get('/admin/exercises');
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }
  };

export default api;
