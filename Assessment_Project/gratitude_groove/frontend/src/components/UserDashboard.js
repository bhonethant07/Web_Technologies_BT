import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getDashboardData } from '../services/dashboardService';

// Dashboard Components
import DashboardHeader from './dashboard/DashboardHeader';
import QuickActions from './dashboard/QuickActions';
import DailyPrompt from './dashboard/DailyPrompt';
import RecentEntries from './dashboard/RecentEntries';
import MoodChart from './dashboard/MoodChart';
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
    console.log('Create new journal entry');
    // navigate('/journal/new');
  };

  const handleLogMood = () => {
    // Navigate to mood logging page
    console.log('Log mood');
    // navigate('/mood/log');
  };

  const handleTryExercise = () => {
    // Navigate to exercises page
    console.log('Try exercise');
    // navigate('/exercises');
  };

  const handleUsePrompt = (prompt) => {
    // Navigate to new journal entry with prompt
    console.log('Use prompt:', prompt);
    // navigate('/journal/new', { state: { prompt } });
  };

  const handleViewAllEntries = () => {
    // Navigate to all journal entries
    console.log('View all entries');
    // navigate('/journal');
  };

  const handleViewEntry = (entry) => {
    // Navigate to specific journal entry
    console.log('View entry:', entry);
    // navigate(`/journal/${entry.id}`);
  };

  const handleViewAllExercises = () => {
    // Navigate to all exercises
    console.log('View all exercises');
    // navigate('/exercises');
  };

  const handleViewExercise = (exercise) => {
    // Navigate to specific exercise
    console.log('View exercise:', exercise);
    // navigate(`/exercises/${exercise.id}`);
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
                  onClick={handleLogout}
                  className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <DashboardHeader user={dashboardData?.user} stats={dashboardData?.stats} />

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
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">
            <DailyPrompt
              prompt={dashboardData?.daily_prompt}
              onUsePrompt={handleUsePrompt}
            />

            <MoodChart moods={dashboardData?.recent_moods} />

            <ExercisesPreview
              exercises={dashboardData?.exercises}
              onViewAll={handleViewAllExercises}
              onViewExercise={handleViewExercise}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;