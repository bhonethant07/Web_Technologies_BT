import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [stats, setStats] = useState({
    users: 1024,
    exercises: 50,
    prompts: 200,
    entries: 5892,
    moodDistribution: [
      { emoji: '😊', label: 'Happy', percentage: 62, color: '#4ade80' },
      { emoji: '😐', label: 'Neutral', percentage: 18, color: '#a1a1aa' },
      { emoji: '😢', label: 'Sad', percentage: 12, color: '#60a5fa' },
      { emoji: '🎉', label: 'Excited', percentage: 8, color: '#c084fc' }
    ]
  });

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Card hover animation variants
  const cardVariants = {
    hover: {
      y: -5,
      borderColor: '#3b82f6',
      boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden p-4">
      {/* Top Navigation Bar */}
      <div className="w-full flex justify-between items-center pb-4 border-b border-gray-700">
        <h1 className="text-2xl font-light tracking-wider">GRATITUDE GROVE ADMIN</h1>
        <div className="text-blue-400 font-mono">{currentTime}</div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {/* Users Card */}
        <motion.div 
          className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="text-4xl mb-3">👥</div>
          <div className="text-lg font-medium mb-1">USERS</div>
          <div className="text-3xl font-mono font-light">{stats.users.toLocaleString()}</div>
        </motion.div>

        {/* Exercises Card */}
        <motion.div 
          className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="text-4xl mb-3">🧘</div>
          <div className="text-lg font-medium mb-1">EXERCISES</div>
          <div className="text-3xl font-mono font-light">{stats.exercises.toLocaleString()}</div>
        </motion.div>

        {/* Prompts Card */}
        <motion.div 
          className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="text-4xl mb-3">✨</div>
          <div className="text-lg font-medium mb-1">PROMPTS</div>
          <div className="text-3xl font-mono font-light">{stats.prompts.toLocaleString()}</div>
        </motion.div>

        {/* Entries Card */}
        <motion.div 
          className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="text-4xl mb-3">📝</div>
          <div className="text-lg font-medium mb-1">ENTRIES</div>
          <div className="text-3xl font-mono font-light">{stats.entries.toLocaleString()}</div>
        </motion.div>
      </div>

      {/* Mood Distribution List */}
      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-medium mb-4">MOOD DISTRIBUTION</h2>
        <div className="space-y-3">
          {stats.moodDistribution.map((mood, index) => (
            <div key={index} className="flex items-center">
              <span className="text-2xl w-10">{mood.emoji}</span>
              <span className="w-24 font-medium">{mood.label}</span>
              <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{
                    width: `${mood.percentage}%`,
                    backgroundColor: mood.color
                  }}
                />
              </div>
              <span className="ml-3 w-12 text-right font-mono">{mood.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <motion.button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          USER MANAGEMENT
        </motion.button>
        <motion.button
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          CONTENT DASHBOARD
        </motion.button>
      </div>
    </div>
  );
};

export default AdminDashboard;