import React from 'react';
import { motion } from 'framer-motion';

const RecentEntries = ({ entries, onViewAll, onViewEntry }) => {
  // If data is not yet loaded
  if (!entries) {
    return (
      <div className="bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md mb-6">
        <div className="animate-pulse flex flex-col">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-24 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-24 bg-gray-200 rounded w-full mb-2"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Journal Entries</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onViewAll}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All
        </motion.button>
      </div>
      
      {entries.length === 0 ? (
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <p className="text-gray-500">No journal entries yet. Start writing today!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <EntryCard 
              key={entry.id} 
              entry={entry} 
              index={index}
              onClick={() => onViewEntry(entry)} 
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const EntryCard = ({ entry, index, onClick }) => {
  // Format date
  const date = new Date(entry.created_at);
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
  
  // Truncate text
  const truncatedText = entry.entry_text.length > 150 
    ? `${entry.entry_text.substring(0, 150)}...` 
    : entry.entry_text;
  
  // Get mood emoji
  const moodEmoji = getMoodEmoji(entry.mood);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={onClick}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <span className="text-xl" title={entry.mood}>{moodEmoji}</span>
      </div>
      <p className="text-gray-700">{truncatedText}</p>
      {entry.image_url && (
        <div className="mt-2">
          <div className="w-8 h-8 bg-gray-200 rounded-md overflow-hidden">
            <img 
              src={entry.image_url} 
              alt="Journal entry" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
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
  
  return moods[mood] || '😐';
};

export default RecentEntries;
