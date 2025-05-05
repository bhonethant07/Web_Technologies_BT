import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../styles/calendar.css';

const MoodCalendar = ({ moods }) => {
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [moodMap, setMoodMap] = useState({});
  const [mostCommonMood, setMostCommonMood] = useState(null);
  const [moodStats, setMoodStats] = useState({});
  const [currentStreak, setCurrentStreak] = useState(0);

  // Map mood values to colors
  const moodColors = {
    'Happy': 'bg-yellow-200 border-yellow-300',
    'Grateful': 'bg-green-200 border-green-300',
    'Calm': 'bg-blue-200 border-blue-300',
    'Excited': 'bg-pink-200 border-pink-300',
    'Reflective': 'bg-purple-200 border-purple-300',
    'Anxious': 'bg-orange-200 border-orange-300',
    'Sad': 'bg-indigo-200 border-indigo-300',
    'Stressed': 'bg-red-200 border-red-300',
    'Tired': 'bg-gray-200 border-gray-300',
  };

  // Map mood values to emojis
  const moodEmojis = {
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

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Format date as YYYY-MM-DD for comparison, handling timezone issues
  const formatDate = (date) => {
    // Create a new date object and set it to midnight in the local timezone
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0);

    // Get year, month, and day components in local timezone
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');

    // Return formatted date string
    return `${year}-${month}-${day}`;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  // Navigate to current month
  const goToCurrentMonth = () => {
    setCurrentMonth(new Date());
  };

  // Format month name
  const formatMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Check if a date is today
  const isToday = (year, month, day) => {
    const today = new Date();
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  // Check if a date is in the future
  const isFuture = (year, month, day) => {
    const today = new Date();
    const checkDate = new Date(year, month, day);
    return checkDate > today;
  };

  // Generate calendar days
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, empty: true });
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Create date at noon to avoid timezone issues
      const date = new Date(year, month, day, 12, 0, 0);

      days.push({
        day,
        date,
        dateString: formatDate(date), // Pre-calculate the date string
        empty: false,
        isToday: isToday(year, month, day),
        isFuture: isFuture(year, month, day)
      });
    }

    setCalendarDays(days);
  }, [currentMonth]);

  // Map moods to dates and calculate statistics
  useEffect(() => {
    if (!moods || moods.length === 0) return;

    const moodsByDate = {};
    const moodCounts = {};

    // Sort moods by date (newest first)
    const sortedMoods = [...moods].sort((a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
    );

    sortedMoods.forEach(mood => {
      // Use the formatted_date from the backend if available, otherwise parse locally
      let dateStr;

      if (mood.formatted_date) {
        // Use the pre-formatted date from the backend
        dateStr = mood.formatted_date;
        console.log('Using backend formatted date:', dateStr);
      } else {
        // Parse the date in the local timezone to avoid timezone offset issues
        const dateObj = new Date(mood.created_at);
        dateStr = formatDate(dateObj);
        console.log('Using locally formatted date:', dateStr, 'from', mood.created_at);
      }

      // Log the date processing for debugging
      console.log('Processing mood:', {
        original: mood.created_at,
        formatted: dateStr,
        mood: mood.mood
      });

      moodsByDate[dateStr] = mood.mood;

      // Count occurrences of each mood
      moodCounts[mood.mood] = (moodCounts[mood.mood] || 0) + 1;
    });

    setMoodMap(moodsByDate);

    // Find the most common mood
    let mostCommonMood = null;
    let highestCount = 0;

    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > highestCount) {
        mostCommonMood = mood;
        highestCount = count;
      }
    });

    // Calculate current streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentDate = new Date(today);

    // Check if there's a mood logged today
    const todayStr = formatDate(today);
    console.log('Today string for streak calculation:', todayStr);
    console.log('Available mood dates:', Object.keys(moodsByDate));

    let hasMoodToday = moodsByDate[todayStr] !== undefined;

    // If no mood today, start checking from yesterday
    if (!hasMoodToday) {
      currentDate.setDate(currentDate.getDate() - 1);
      console.log('No mood today, checking from yesterday:', formatDate(currentDate));
    } else {
      console.log('Found mood for today:', moodsByDate[todayStr]);
    }

    // Check consecutive days backwards
    while (true) {
      const dateStr = formatDate(currentDate);
      if (moodsByDate[dateStr] !== undefined) {
        console.log(`Found mood for ${dateStr}: ${moodsByDate[dateStr]}`);
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        console.log(`No mood found for ${dateStr}, ending streak calculation`);
        break;
      }
    }

    console.log('Final streak calculation:', streak);

    // Store the calculated values in the component state
    setMostCommonMood(mostCommonMood);
    setMoodStats(moodCounts);
    setCurrentStreak(streak);
  }, [moods]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white shadow-md rounded-lg overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Mood Calendar</h2>
          <div className="flex space-x-2">
            <button
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToCurrentMonth}
              className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Next month"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm">{formatMonthName(currentMonth)}</p>
      </div>

      <div className="p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayObj, index) => {
            if (dayObj.empty) {
              return <div key={`empty-${index}`} className="aspect-square"></div>;
            }

            // Use the pre-calculated date string
            const dateStr = dayObj.dateString;
            console.log(`Rendering day ${dayObj.day}, date string: ${dateStr}`);
            const mood = moodMap[dateStr];

            if (mood) {
              console.log(`Found mood for ${dateStr}: ${mood}`);
            }

            const moodColor = mood ? moodColors[mood] : '';
            const moodEmoji = mood ? moodEmojis[mood] : '';

            return (
              <div
                key={`day-${index}`}
                className={`aspect-square rounded-md flex flex-col items-center justify-center text-xs relative calendar-day
                  ${dayObj.isToday ? 'ring-2 ring-blue-500' : ''}
                  ${dayObj.isFuture ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                  ${moodColor ? `${moodColor} border` : 'border border-gray-200'}
                `}
                title={mood ? `${dayObj.day}: ${mood}` : ''}
              >
                <span className="absolute top-1 left-1 text-xs font-medium">
                  {dayObj.day}
                </span>
                {moodEmoji && (
                  <span className="text-xl mt-2 mood-emoji" title={mood}>
                    {moodEmoji}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mood Summary */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Current Streak */}
            <div className="mb-4 md:mb-0">
              <p className="text-xs text-gray-600 mb-1">Current Streak:</p>
              <div className="flex items-center">
                <span className="text-2xl mr-2">🔥</span>
                <span className="text-lg font-medium text-gray-800">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</span>
              </div>
            </div>

            {/* Most Common Mood */}
            <div className="mb-4 md:mb-0">
              <p className="text-xs text-gray-600 mb-1">Most Common Mood:</p>
              {mostCommonMood && (
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{moodEmojis[mostCommonMood]}</span>
                  <span className="text-sm font-medium text-gray-800">{mostCommonMood}</span>
                </div>
              )}
            </div>
          </div>

          {/* Mood Distribution */}
          <div>
            <p className="text-xs text-gray-600 mb-1">Your Mood Distribution:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(moodStats)
                .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
                .slice(0, 5) // Show top 5
                .map(([mood, count]) => (
                  <div key={mood} className="flex items-center text-xs bg-gray-100 rounded-full px-2 py-1">
                    <span className="mr-1">{moodEmojis[mood]}</span>
                    <span className="text-gray-700">{mood}</span>
                    <span className="ml-1 text-gray-500">({count})</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600 mb-2">Mood Legend:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(moodEmojis).map(([mood, emoji]) => (
              <div key={mood} className="flex items-center text-xs">
                <span className="mr-1">{emoji}</span>
                <span className="text-gray-700">{mood}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MoodCalendar;
