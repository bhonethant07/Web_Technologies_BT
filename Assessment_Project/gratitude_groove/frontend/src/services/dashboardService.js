import api from './api';

/**
 * Fetch dashboard data for the authenticated user
 * @returns {Promise} Promise that resolves to dashboard data
 */
export const getDashboardData = async () => {
  try {
    // Check if user token exists
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // The interceptor will handle adding the token to the request
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);

    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear token if unauthorized
      localStorage.removeItem('authToken');
    }

    throw error;
  }
};

/**
 * Fetch journal entries for the authenticated user
 * @returns {Promise} Promise that resolves to journal entries
 */
export const getJournalEntries = async () => {
  try {
    // Check if user token exists
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await api.get('/journal');
    return response.data;
  } catch (error) {
    console.error('Error fetching journal entries:', error);

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
    }

    throw error;
  }
};

/**
 * Fetch a single journal entry by ID
 * @param {string|number} id - The journal entry ID
 * @returns {Promise} Promise that resolves to the journal entry
 */
export const getJournalEntryById = async (id) => {
  try {
    // Check if user token exists
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await api.get(`/journal/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching journal entry with ID ${id}:`, error);

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
    }

    throw error;
  }
};

/**
 * Update a journal entry
 * @param {string|number} id - The journal entry ID
 * @param {Object} entryData - The updated journal entry data
 * @param {File} image - Optional image file to upload
 * @returns {Promise} Promise that resolves to the updated entry
 */
export const updateJournalEntry = async (id, entryData, image = null) => {
  try {
    // Check if user token exists
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    let response;

    // If we have an image file, use FormData
    if (image instanceof File) {
      const formData = new FormData();

      // Add all entry data to the form
      Object.keys(entryData).forEach(key => {
        // Skip image_url if we're uploading an image file
        if (key !== 'image_url' || !image) {
          formData.append(key, entryData[key]);
        }
      });

      // Add the image file
      formData.append('image', image);

      // Make the request with FormData
      response = await api.post(`/journal/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        // Override the method to PUT since we're using FormData
        params: { _method: 'PUT' }
      });
    } else {
      // Regular JSON request if no image is being uploaded
      response = await api.put(`/journal/${id}`, entryData);
    }

    return response.data;
  } catch (error) {
    console.error(`Error updating journal entry with ID ${id}:`, error);

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
    }

    throw error;
  }
};

/**
 * Delete a journal entry
 * @param {string|number} id - The journal entry ID
 * @returns {Promise} Promise that resolves when the entry is deleted
 */
export const deleteJournalEntry = async (id) => {
  try {
    // Check if user token exists
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await api.delete(`/journal/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting journal entry with ID ${id}:`, error);

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
    }

    throw error;
  }
};

/**
 * Create a new journal entry
 * @param {Object} entryData - The journal entry data
 * @param {File} image - Optional image file to upload
 * @returns {Promise} Promise that resolves to the created entry
 */
export const createJournalEntry = async (entryData, image = null) => {
  try {
    // Check if user token exists
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    let response;

    // If we have an image file, use FormData
    if (image instanceof File) {
      const formData = new FormData();

      // Add all entry data to the form
      Object.keys(entryData).forEach(key => {
        // Skip image_url if we're uploading an image file
        if (key !== 'image_url' || !image) {
          formData.append(key, entryData[key]);
        }
      });

      // Add the image file
      formData.append('image', image);

      // Make the request with FormData
      response = await api.post('/journal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      // Regular JSON request if no image is being uploaded
      response = await api.post('/journal', entryData);
    }

    return response.data;
  } catch (error) {
    console.error('Error creating journal entry:', error);

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
    }

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
    // Check if user token exists
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // The interceptor will handle adding the token to the request
    const response = await api.post('/mood', moodData);
    return response.data;
  } catch (error) {
    console.error('Error logging mood:', error);

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
    }

    throw error;
  }
};

/**
 * Fetch exercises
 * @returns {Promise} Promise that resolves to exercises
 */
export const getExercises = async () => {
  try {
    // Check if user token exists
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // The interceptor will handle adding the token to the request
    const response = await api.get('/exercises');
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
    }

    throw error;
  }
};

/**
 * Fetch a single exercise by ID
 * @param {string|number} id - The exercise ID
 * @returns {Promise} Promise that resolves to the exercise
 */
export const getExerciseById = async (id) => {
  try {
    console.log(`getExerciseById called with ID: ${id}`);

    // Check if user token exists
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // The interceptor will handle adding the token to the request
    const response = await api.get(`/exercises/${id}`);
    console.log(`API response for exercise ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exercise with ID ${id}:`, error);

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
    }

    throw error;
  }
};
