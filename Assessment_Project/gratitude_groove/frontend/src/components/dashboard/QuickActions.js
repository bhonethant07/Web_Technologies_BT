import React from 'react';
import { motion } from 'framer-motion';

const QuickActions = ({ today, onNewEntry, onLogMood, onTryExercise }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md mb-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`flex flex-col items-center justify-center p-4 rounded-lg ${today?.has_entry ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-blue-600 text-white'}`}
          onClick={onNewEntry}
        >
          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="font-medium">
            {today?.has_entry ? 'Entry Added Today ✓' : 'Write Today\'s Entry'}
          </span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`flex flex-col items-center justify-center p-4 rounded-lg ${today?.has_mood_log ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-purple-600 text-white'}`}
          onClick={onLogMood}
        >
          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">
            {today?.has_mood_log ? 'Mood Logged Today ✓' : 'Log Today\'s Mood'}
          </span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-col items-center justify-center p-4 rounded-lg bg-teal-600 text-white"
          onClick={onTryExercise}
        >
          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span className="font-medium">Try an Exercise</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuickActions;
