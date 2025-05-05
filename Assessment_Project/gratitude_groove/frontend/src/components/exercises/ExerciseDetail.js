import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getExerciseById } from '../../services/dashboardService';
import '../../styles/video.css';

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        console.log('Fetching exercise with ID:', id);

        // Fetch the exercise data from the API
        const data = await getExerciseById(id);
        console.log('Exercise data:', data);

        if (data) {
          setExercise(data);
          setError(null);
        } else {
          setError('Exercise not found.');
        }
      } catch (err) {
        console.error('Error fetching exercise:', err);
        setError('Failed to load exercise. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url; // Return original if it's already an embed URL or not a YouTube URL
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : error ? (
          // Error state
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
        ) : exercise ? (
          // Exercise content
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{exercise.title}</h1>
            </div>

            {/* Video */}
            <div className="mb-8">
              <div className="video-container">
                <iframe
                  src={getYouTubeEmbedUrl(exercise.audio_url)}
                  title={exercise.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About this Exercise</h2>
              <p className="text-gray-700 whitespace-pre-line">{exercise.description}</p>
            </div>

            {/* Tips section */}
            <div className="bg-blue-50 rounded-lg shadow-sm p-6 mb-8 border border-blue-100">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Tips for Practice</h2>
              <ul className="list-disc list-inside text-blue-700 space-y-2">
                <li>Find a quiet, comfortable place where you won't be disturbed</li>
                <li>Wear comfortable clothing and sit or lie in a relaxed position</li>
                <li>Try to practice at the same time each day to build a habit</li>
                <li>Be patient with yourself - mindfulness is a skill that develops over time</li>
                <li>Return to this exercise whenever you need a moment of calm</li>
              </ul>
            </div>
          </motion.div>
        ) : (
          // Not found state
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Exercise not found</h3>
          </div>
        )}

        {/* Back button */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
