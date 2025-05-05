import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { AuthContext } from '../../contexts/AuthContext';
import { createJournalEntry } from '../../services/dashboardService';

const MOOD_OPTIONS = [
  { value: 'Happy', emoji: '😊', label: 'Happy' },
  { value: 'Grateful', emoji: '🙏', label: 'Grateful' },
  { value: 'Calm', emoji: '😌', label: 'Calm' },
  { value: 'Excited', emoji: '😃', label: 'Excited' },
  { value: 'Reflective', emoji: '🤔', label: 'Reflective' },
  { value: 'Anxious', emoji: '😰', label: 'Anxious' },
  { value: 'Sad', emoji: '😢', label: 'Sad' },
  { value: 'Stressed', emoji: '😫', label: 'Stressed' },
  { value: 'Tired', emoji: '😴', label: 'Tired' },
];

const CreateJournalEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get prompt from location state if available
  const promptFromNav = location.state?.prompt;

  const [formData, setFormData] = useState({
    entry_text: promptFromNav ? `Prompt: "${promptFromNav.prompt_text}"\n\nMy thoughts: ` : '',
    mood: 'Grateful',
    image_url: '',
  });

  const [selectedMood, setSelectedMood] = useState('Grateful');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setFormData(prev => ({
      ...prev,
      mood: mood
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.entry_text.trim()) {
      setError('Please write something in your journal entry.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // If we have a selected image, pass it to the createJournalEntry function
      if (selectedImage) {
        await createJournalEntry(formData, selectedImage);
      } else {
        await createJournalEntry(formData);
      }

      setSuccess(true);

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Error creating journal entry:', err);
      setError(err.response?.data?.message || 'Failed to save your journal entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Today's Journal Entry
          </motion.h1>
          <p className="mt-2 text-lg text-gray-600">
            Reflect on your day and practice gratitude
          </p>
        </div>

        {/* Success message */}
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg text-green-700"
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p>
                Journal entry saved successfully! Redirecting to dashboard...
              </p>
            </div>
          </motion.div>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg text-red-700"
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-6">
            {/* Date display */}
            <div className="text-sm text-gray-500 mb-4">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            {/* Mood selection */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                How are you feeling today?
              </label>
              <div className="flex flex-wrap gap-2">
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => handleMoodSelect(mood.value)}
                    className={`flex items-center px-3 py-2 rounded-full text-sm ${
                      selectedMood === mood.value
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1 text-xl">{mood.emoji}</span>
                    <span>{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Journal entry text */}
            <div className="mb-6">
              <label htmlFor="entry_text" className="block text-gray-700 text-sm font-medium mb-2">
                Write your thoughts
              </label>
              <textarea
                id="entry_text"
                name="entry_text"
                rows="12"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What are you grateful for today? What made you smile? What are you looking forward to?"
                value={formData.entry_text}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Image Upload (optional) */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Add an Image (optional)
              </label>

              {/* Image preview */}
              {imagePreview && (
                <div className="mb-3 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 rounded-md mx-auto"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />

              {/* Upload button */}
              {!imagePreview && (
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload Image
                    </span>
                  </button>
                </div>
              )}

              <p className="mt-1 text-xs text-gray-500">
                Add an image to include a visual with your journal entry
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save Journal Entry'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateJournalEntry;
