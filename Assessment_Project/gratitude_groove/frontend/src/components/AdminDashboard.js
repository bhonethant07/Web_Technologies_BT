import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAdminDashboardData } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminInfo, setAdminInfo] = useState(null);
  const [stats, setStats] = useState({
    users: 0,
    exercises: 0,
    prompts: 0,
    entries: 0,
    moodDistribution: [
      { emoji: '😊', label: 'Happy', percentage: 42, color: '#4ade80' },
      { emoji: '😐', label: 'Neutral', percentage: 18, color: '#a1a1aa' },
      { emoji: '😢', label: 'Sad', percentage: 12, color: '#60a5fa' },
      { emoji: '🎉', label: 'Excited', percentage: 10, color: '#c084fc' },
      { emoji: '😴', label: 'Tired', percentage: 8, color: '#fbbf24' },
      { emoji: '😡', label: 'Angry', percentage: 6, color: '#f87171' },
      { emoji: '😨', label: 'Anxious', percentage: 4, color: '#a78bfa' }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAdminDashboardData();
        setStats(prevStats => ({
          ...prevStats,
          users: data.total_users,
          exercises: data.total_exercises,
          prompts: data.total_gratitude_prompts,
          entries: data.total_journal_entries,
        }));
        setAdminInfo(data.admin);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const cardVariants = {
    hover: {
      y: -5,
      borderColor: '#3b82f6',
      boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
      transition: { duration: 0.2 }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500">Error: {error}</div>;
  }

  const handleProfileClick = () => {
    navigate('/admin/edit'); // Navigate to admin edit page
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col relative min-h-screen">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-700">
          <motion.button
            onClick={handleProfileClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-3 cursor-pointer"
          >
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </motion.button>
          <h3 className="text-lg font-medium text-center">{adminInfo?.name || 'Admin User'}</h3>
          <p className="text-sm text-gray-400 text-center">Administrator</p>
        </div>
        <div className="flex-1">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2 pl-2">Navigation</h2>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
            >
              Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'exercises' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
            >
              Exercise Management
            </button>
            <button
              onClick={() => setActiveTab('prompts')}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'prompts' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
            >
              Prompt Management
            </button>
          </nav>
        </div>

        {/* Logout Button - fixed at bottom */}
        <div className="sticky bottom-0 left-0 right-0 bg-gray-800 p-4 border-t border-gray-700">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </motion.button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-700">
          <h1 className="text-2xl font-light tracking-wider">GRATITUDE GROVE ADMIN</h1>
          <div className="text-blue-400 font-mono">{currentTime}</div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-4xl mb-3">👥</div>
                <div className="text-lg font-medium mb-1">USERS</div>
                <div className="text-3xl font-mono font-light">{stats.users.toLocaleString()}</div>
              </motion.div>

              <motion.div
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-4xl mb-3">🧘</div>
                <div className="text-lg font-medium mb-1">EXERCISES</div>
                <div className="text-3xl font-mono font-light">{stats.exercises.toLocaleString()}</div>
              </motion.div>

              <motion.div
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-4xl mb-3">✨</div>
                <div className="text-lg font-medium mb-1">PROMPTS</div>
                <div className="text-3xl font-mono font-light">{stats.prompts.toLocaleString()}</div>
              </motion.div>

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

            {/* Mood Distribution List (This data is currently static) */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
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
          </>
        )}

        {activeTab === 'users' && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">User Management</h2>
            <p>User management content will go here</p>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Exercise Management</h2>
            <p>Exercise management content will go here</p>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Prompt Management</h2>
            <p>Prompt management content will go here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;