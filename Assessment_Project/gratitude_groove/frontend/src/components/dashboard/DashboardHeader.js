import React from 'react';
import { motion } from 'framer-motion';

const DashboardHeader = ({ user, stats }) => {
  // If data is not yet loaded
  if (!user || !stats) {
    return (
      <div className="bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md mb-6">
        <div className="animate-pulse flex flex-col">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md mb-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            {getGreeting()}
          </p>
        </div>
        
        <div className="flex mt-4 md:mt-0 space-x-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.total_entries}</div>
            <div className="text-xs text-gray-500">Total Entries</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.current_streak}</div>
            <div className="text-xs text-gray-500">Day Streak</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.total_mood_logs}</div>
            <div className="text-xs text-gray-500">Moods Logged</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to get a greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return "Good morning! How are you feeling today?";
  } else if (hour < 18) {
    return "Good afternoon! What are you grateful for today?";
  } else {
    return "Good evening! Time to reflect on your day.";
  }
};

export default DashboardHeader;
