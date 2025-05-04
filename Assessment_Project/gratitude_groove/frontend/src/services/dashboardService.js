import api from './api';

/**
 * Fetch dashboard data for the authenticated user
 * @returns {Promise} Promise that resolves to dashboard data
 */
export const getDashboardData = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

/**
 * Fetch journal entries for the authenticated user
 * @returns {Promise} Promise that resolves to journal entries
 */
export const getJournalEntries = async () => {
  try {
    const response = await api.get('/journal');
    return response.data;
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw error;
  }
};

/**
 * Create a new journal entry
 * @param {Object} entryData - The journal entry data
 * @returns {Promise} Promise that resolves to the created entry
 */
export const createJournalEntry = async (entryData) => {
  try {
    const response = await api.post('/journal', entryData);
    return response.data;
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw error;
  }
};

/**
 * Log a mood for the authenticated user
 * @param {Object} moodData - The mood data
 * @returns {Promise} Promise that resolves to the created mood log
 */
export const logMood = async (moodData) => {
  try {
    const response = await api.post('/mood', moodData);
    return response.data;
  } catch (error) {
    console.error('Error logging mood:', error);
    throw error;
  }
};

/**
 * Fetch exercises
 * @returns {Promise} Promise that resolves to exercises
 */
export const getExercises = async () => {
  try {
    const response = await api.get('/exercises');
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};
