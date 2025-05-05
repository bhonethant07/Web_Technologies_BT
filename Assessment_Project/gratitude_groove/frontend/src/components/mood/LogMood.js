import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logMood } from '../../services/dashboardService';

const MOOD_OPTIONS = [
  { value: 'Happy', emoji: '😊', label: 'Happy', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
  { value: 'Grateful', emoji: '🙏', label: 'Grateful', color: 'bg-green-100 border-green-300 text-green-800' },
  { value: 'Calm', emoji: '😌', label: 'Calm', color: 'bg-blue-100 border-blue-300 text-blue-800' },
  { value: 'Excited', emoji: '😃', label: 'Excited', color: 'bg-pink-100 border-pink-300 text-pink-800' },
  { value: 'Reflective', emoji: '🤔', label: 'Reflective', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  { value: 'Anxious', emoji: '😰', label: 'Anxious', color: 'bg-orange-100 border-orange-300 text-orange-800' },
  { value: 'Sad', emoji: '😢', label: 'Sad', color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
  { value: 'Stressed', emoji: '😫', label: 'Stressed', color: 'bg-red-100 border-red-300 text-red-800' },
  { value: 'Tired', emoji: '😴', label: 'Tired', color: 'bg-gray-100 border-gray-300 text-gray-800' },
];

const LogMood = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [alreadyLoggedToday, setAlreadyLoggedToday] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMood) {
      setError('Please select a mood.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await logMood({
        mood: selectedMood,
        note: note.trim() || null
      });

      setSuccess(true);

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Error logging mood:', err);

      // Check if this is the "already logged today" error
      if (err.response?.status === 400 && err.response?.data?.mood_log) {
        // Show a more specific message with a different style
        setError(err.response.data.message);
        setAlreadyLoggedToday(true);

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        // Handle other errors
        setError(err.response?.data?.message || 'Failed to log your mood. Please try again.');
        setAlreadyLoggedToday(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            How Are You Feeling?
          </motion.h1>
          <p className="mt-2 text-lg text-gray-600">
            Track your mood to reflect on your emotional journey
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
                Mood logged successfully! Redirecting to dashboard...
              </p>
            </div>
          </motion.div>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mb-6 p-4 rounded-lg ${
              alreadyLoggedToday
                ? 'bg-blue-100 border border-blue-200 text-blue-700'
                : 'bg-red-100 border border-red-200 text-red-700'
            }`}
          >
            <div className="flex items-center">
              {alreadyLoggedToday ? (
                <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
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
            <div className="text-sm text-gray-500 mb-6">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            {/* Mood selection */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-4">
                Select your mood:
              </label>
              <div className="grid grid-cols-3 gap-4">
                {MOOD_OPTIONS.map((mood) => (
                  <motion.button
                    key={mood.value}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMoodSelect(mood.value)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${
                      selectedMood === mood.value
                        ? mood.color + ' border-opacity-100'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-3xl mb-2">{mood.emoji}</span>
                    <span className="text-sm font-medium">{mood.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Optional note */}
            <div className="mb-6">
              <label htmlFor="note" className="block text-gray-700 text-sm font-medium mb-2">
                Add a note (optional):
              </label>
              <textarea
                id="note"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What's contributing to your mood today?"
                value={note}
                onChange={handleNoteChange}
              ></textarea>
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
                disabled={isSubmitting || !selectedMood}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  (isSubmitting || !selectedMood) ? 'opacity-75 cursor-not-allowed' : ''
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
                  'Log Mood'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LogMood;
