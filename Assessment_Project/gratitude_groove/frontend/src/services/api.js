import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const SANCTUM_ENDPOINT = 'http://localhost:8000/sanctum/csrf-cookie';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Required for cookies to be sent
});

// Function to get CSRF token
export const getCsrfToken = async () => {
    try {
        await axios.get(SANCTUM_ENDPOINT, { withCredentials: true });
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
};

// Request interceptor to handle authentication token
api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getAdminDashboardData = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
        throw new Error('Admin token not found. Please log in.');
    }
    
    try {
        await getCsrfToken(); // Get CSRF token before making the request
        const response = await api.get('/admin/dashboard');
        return response.data;
    } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        await getCsrfToken();
        const response = await api.get('/admin/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

export const getAllExercises = async () => {
    try {
        await getCsrfToken();
        const response = await api.get('/admin/exercises');
        return response.data;
    } catch (error) {
        console.error('Error fetching all exercises:', error);
        throw error;
    }
};

export const getAllPrompts = async () => {
    try {
        await getCsrfToken();
        const response = await api.get('/admin/prompts');
        return response.data;
    } catch (error) {
        console.error('Error fetching all prompts:', error);
        throw error;
    }
};

export default api;
