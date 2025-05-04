import React from 'react';
import { motion } from 'framer-motion';

const MoodChart = ({ moods }) => {
  // If data is not yet loaded
  if (!moods) {
    return (
      <div className="bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md mb-6">
        <div className="animate-pulse flex flex-col">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-40 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  // Process mood data for display
  const moodData = processMoodData(moods);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md mb-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Mood Trends</h2>
      
      {moods.length === 0 ? (
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-500">No mood data yet. Start logging your moods!</p>
        </div>
      ) : (
        <div className="h-48">
          <div className="flex h-full items-end space-x-2">
            {moodData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-1">{day.moodEmoji}</div>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${day.height}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`w-full rounded-t-md ${getMoodColor(day.mood)}`}
                ></motion.div>
                <div className="text-xs text-gray-500 mt-1">{day.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Helper function to process mood data for display
const processMoodData = (moods) => {
  // Get the last 7 days
  const days = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    days.push({
      date: date,
      label: date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 1),
      mood: null,
      moodEmoji: '',
      height: 0
    });
  }
  
  // Map moods to days
  moods.forEach(mood => {
    const moodDate = new Date(mood.created_at);
    const dayIndex = days.findIndex(day => 
      day.date.getDate() === moodDate.getDate() &&
      day.date.getMonth() === moodDate.getMonth() &&
      day.date.getFullYear() === moodDate.getFullYear()
    );
    
    if (dayIndex !== -1) {
      days[dayIndex].mood = mood.mood;
      days[dayIndex].moodEmoji = getMoodEmoji(mood.mood);
      days[dayIndex].height = getMoodHeight(mood.mood);
    }
  });
  
  return days;
};

// Helper function to get mood emoji
const getMoodEmoji = (mood) => {
  const moods = {
    'Happy': '😊',
    'Grateful': '🙏',
    'Calm': '😌',
    'Excited': '😃',
    'Reflective': '🤔',
    'Anxious': '😰',
    'Sad': '😢',
    'Stressed': '😫',
    'Tired': '😴',
  };
  
  return moods[mood] || '';
};

// Helper function to get mood height percentage for chart
const getMoodHeight = (mood) => {
  const moodHeights = {
    'Happy': 80,
    'Grateful': 90,
    'Calm': 70,
    'Excited': 100,
    'Reflective': 60,
    'Anxious': 40,
    'Sad': 20,
    'Stressed': 30,
    'Tired': 50,
  };
  
  return moodHeights[mood] || 0;
};

// Helper function to get mood color
const getMoodColor = (mood) => {
  const moodColors = {
    'Happy': 'bg-yellow-400',
    'Grateful': 'bg-green-400',
    'Calm': 'bg-blue-300',
    'Excited': 'bg-pink-400',
    'Reflective': 'bg-purple-300',
    'Anxious': 'bg-orange-300',
    'Sad': 'bg-blue-400',
    'Stressed': 'bg-red-400',
    'Tired': 'bg-gray-400',
  };
  
  return moodColors[mood] || 'bg-gray-200';
};

export default MoodChart;
