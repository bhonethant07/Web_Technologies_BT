import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getDashboardData } from '../services/dashboardService';

// Dashboard Components
import DashboardHeader from './dashboard/DashboardHeader';
import QuickActions from './dashboard/QuickActions';
import DailyPrompt from './dashboard/DailyPrompt';
import RecentEntries from './dashboard/RecentEntries';
import MoodCalendar from './dashboard/MoodCalendar';
import ExercisesPreview from './dashboard/ExercisesPreview';

const UserDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        console.log('Dashboard data:', data);

        // If we have user data with a profile image, log it
        if (data?.user?.profile_image) {
          console.log('User profile image:', data.user.profile_image);
          console.log('User profile image URL:', data.user.profile_image_url);
        }

        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout(() => navigate('/login'));
  };

  // Handler functions for dashboard actions
  const handleNewEntry = () => {
    // Navigate to new journal entry page
    navigate('/journal/new');
  };

  const handleLogMood = () => {
    // Check if user has already logged a mood today
    if (dashboardData?.today?.has_mood_log) {
      // Show a notification or alert that mood has already been logged
      alert('You have already logged your mood for today. You can log your mood again tomorrow.');
    } else {
      // Navigate to mood logging page
      navigate('/mood/log');
    }
  };

  const handleTryExercise = () => {
    // Navigate to exercises page
    navigate('/exercises');
  };

  const handleUsePrompt = (prompt) => {
    // Navigate to new journal entry with prompt
    navigate('/journal/new', { state: { prompt } });
  };

  const handleViewAllEntries = () => {
    // Navigate to all journal entries
    navigate('/journal');
  };

  const handleViewEntry = (entry) => {
    // Navigate to specific journal entry
    navigate(`/journal/${entry.id}`);
  };

  const handleViewAllExercises = () => {
    // Navigate to all exercises
    navigate('/exercises');
  };

  const handleViewExercise = (exercise) => {
    // Navigate to specific exercise
    console.log('Dashboard - Clicked exercise:', exercise);
    navigate(`/exercises/${exercise.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="text-red-500 text-center mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <div className="flex justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">GRATITUDE GROVE</h1>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors bg-gray-100 flex items-center justify-center">
                    {dashboardData?.user?.profile_image ? (
                      <img
                        src={dashboardData.user.profile_image_url || `/storage/${dashboardData.user.profile_image}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log('Dashboard image failed to load:', dashboardData.user.profile_image);
                          e.target.onerror = null;
                          e.target.src = '/default-avatar.svg';
                        }}
                      />
                    ) : (
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header - Full Width */}
        <DashboardHeader user={dashboardData?.user} stats={dashboardData?.stats} className="mb-6" />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <QuickActions
              today={dashboardData?.today}
              onNewEntry={handleNewEntry}
              onLogMood={handleLogMood}
              onTryExercise={handleTryExercise}
            />

            <RecentEntries
              entries={dashboardData?.recent_entries}
              onViewAll={handleViewAllEntries}
              onViewEntry={handleViewEntry}
            />

            {/* Moved Exercises to Left Column */}
            <ExercisesPreview
              exercises={dashboardData?.exercises}
              onViewAll={handleViewAllExercises}
              onViewExercise={handleViewExercise}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">
            <DailyPrompt
              prompt={dashboardData?.daily_prompt}
              onUsePrompt={handleUsePrompt}
            />

            <MoodCalendar moods={dashboardData?.recent_moods} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;