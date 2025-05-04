import React from 'react';
import { motion } from 'framer-motion';

const DailyPrompt = ({ prompt, onUsePrompt }) => {
  // If data is not yet loaded
  if (!prompt) {
    return (
      <div className="bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md mb-6">
        <div className="animate-pulse flex flex-col">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md mb-6"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Today's Prompt</h2>
        <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Daily Inspiration</div>
      </div>
      
      <p className="text-gray-700 mb-4 italic">"{prompt.prompt_text}"</p>
      
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onUsePrompt(prompt)}
        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Use This Prompt
      </motion.button>
    </motion.div>
  );
};

export default DailyPrompt;
