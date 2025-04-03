import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust if your backend runs on a different port or URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // You might include your authentication token here later
  },
});

export const getAdminDashboardData = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const getAllExercises = async () => {
  try {
    const response = await api.get('/admin/exercises');
    return response.data;
  } catch (error) {
    console.error('Error fetching all exercises:', error);
    throw error;
  }
};

export const getAllPrompts = async () => {
  try {
    const response = await api.get('/admin/prompts');
    return response.data;
  } catch (error) {
    console.error('Error fetching all prompts:', error);
    throw error;
  }
};
