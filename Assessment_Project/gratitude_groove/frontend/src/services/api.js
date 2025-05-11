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

// Request interceptor to handle CSRF and Auth tokens
api.interceptors.request.use(async (config) => {
    // Add auth token to every request
    const userToken = localStorage.getItem('authToken');
    const adminToken = localStorage.getItem('admin_token');

    // Use the appropriate token based on the URL
    if (config.url.startsWith('/admin') && adminToken) {
        // Use admin token for admin routes
        config.headers.Authorization = `Bearer ${adminToken}`;
        console.log('Using admin token for request:', config.url);
    } else if (userToken) {
        // Use user token for non-admin routes
        config.headers.Authorization = `Bearer ${userToken}`;
        console.log('Using user token for request:', config.url);
    }

    // Get CSRF token for non-GET requests if we don't already have one
    if (config.method !== 'get' && !document.cookie.includes('XSRF-TOKEN')) {
        try {
            await getCsrfToken();
        } catch (error) {
            console.error('Error getting CSRF token:', error);
            // Continue with the request even if CSRF token fetch fails
        }
    }

    return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle CSRF token expiration
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

        // Handle authentication errors
        if (error.response?.status === 401) {
            // Clear tokens if unauthorized
            if (error.config.url !== '/login' && error.config.url !== '/logout') {
                console.log('Authentication error. Clearing tokens.');
                localStorage.removeItem('authToken');
                localStorage.removeItem('admin_token');

                // Redirect to login page if not already there
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
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
    // No need to set the token here, the interceptor will handle it
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
    // No need to set the token here, the interceptor will handle it
    try {
      const response = await api.get('/admin/exercises');
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }
  };

// Function to get user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (profileData, profileImage = null) => {
  try {
    // If we have a file, we need to use FormData
    if (profileImage instanceof File) {
      const formData = new FormData();

      // Append all profile data to the form
      Object.keys(profileData).forEach(key => {
        formData.append(key, profileData[key]);
      });

      // Append the image file
      formData.append('profile_image', profileImage);

      // Make the request with FormData
      const response = await api.post('/profile/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } else {
      // Regular JSON request if no file is being uploaded
      const response = await api.put('/profile', profileData);
      return response.data;
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export default api;