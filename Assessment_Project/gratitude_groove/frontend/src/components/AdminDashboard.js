import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAdminDashboardData, getAdminExercises } from '../services/api';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();
  
  // Add state for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAudioFileName, setEditAudioFileName] = useState('');

  // Add state for create prompt modal
  // State for create prompt modal
  const [showCreatePromptModal, setShowCreatePromptModal] = useState(false);
  const [newPromptText, setNewPromptText] = useState('');

  // State for edit prompt modal (reusing showEditModal and creating related states)
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [editPromptText, setEditPromptText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Reusing for both create and edit

  // Function to handle "Add New Prompt" button click
  const handleCreatePromptClick = () => {
    setNewPromptText(''); // Clear any previous input
    setShowCreatePromptModal(true);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAdminDashboardData();
        console.log('Dashboard data received:', data);
        if (!data) {
          throw new Error('No data received');
        }
        setDashboardData(data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    const fetchExercises = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAdminExercises();
        setExercises(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch exercises');
      } finally {
        setLoading(false);
      }
    };

    const fetchPrompts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/admin/prompts');
        setPrompts(response.data); // Assuming you'll create a `prompts` state
      } catch (err) {
        setError(err.message || 'Failed to fetch prompts');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'dashboard') {
      fetchDashboardData();
    } else if (activeTab === 'exercises') {
      fetchExercises();
    } else if (activeTab === 'prompts') {
      fetchPrompts();
    }
  }, [activeTab]);

  const [prompts, setPrompts] = useState([]); // Add state for prompts

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  // Function to handle profile click
  // This function will navigate to the profile edit page
  const handleProfileClick = () => {
    navigate('/admin/edit');
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  // Function to handle edit button click
  const handleEditClick = (exercise) => {
    setCurrentExercise(exercise);
    setEditTitle(exercise.title);
    setEditDescription(exercise.description);
    setEditAudioFileName(exercise.audio_url || '');
    setShowEditModal(true);
  };

  // Function to handle delete button click
  const handleDeleteClick = async (exerciseId) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        await api.delete(`/admin/exercises/${exerciseId}`);
        // Remove the deleted exercise from the state
        setExercises(exercises.filter(exercise => exercise.id !== exerciseId));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete exercise');
      }
    }
  };

  // Function to handle "Edit" button click for prompts
  const handleEditPromptClick = (prompt) => {
    setCurrentPrompt(prompt);
    setEditPromptText(prompt.prompt_text);
    setShowEditModal(true);
  };

  // Function to handle form submission for editing exercise
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.put(`/admin/exercises/${currentExercise.id}`, {
        title: editTitle,
        description: editDescription,
        audio_url: editAudioFileName // Sending the audio URL
      });

      // Update the exercises state with the edited exercise
      setExercises(exercises.map(exercise =>
        exercise.id === currentExercise.id
          ? {
              ...exercise,
              title: editTitle,
              description: editDescription,
              audio_url: editAudioFileName
            }
          : exercise
      ));

      setShowEditModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update exercise');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle form submission for creating a new prompt
  const handleCreatePromptSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.post('/admin/prompts', { prompt_text: newPromptText });
      setPrompts([...prompts, response.data]); // Add the new prompt to the state
      setShowCreatePromptModal(false);
      setNewPromptText('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create prompt');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle form submission for editing a prompt
  const handleEditPromptSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.put(`/admin/prompts/${currentPrompt.id}`, { prompt_text: editPromptText });
      setPrompts(prompts.map(prompt =>
        prompt.id === currentPrompt.id ? response.data : prompt
      ));
      setShowEditModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update prompt');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle "Delete" button click for prompts
  const handleDeletePromptClick = async (promptId) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      setIsSubmitting(true); // You can reuse this to show a loading state if desired
      setError(null);

      try {
        await api.delete(`/admin/prompts/${promptId}`);
        // Remove the deleted prompt from the state
        setPrompts(prompts.filter(prompt => prompt.id !== promptId));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete prompt');
      } finally {
        setIsSubmitting(false); // Reset loading state
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -5,
      borderColor: '#3b82f6',
      boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
      transition: { duration: 0.2 }
    }
  };

  // Prepare chart data
  const prepareMoodChartData = () => {
    if (!dashboardData || !dashboardData.stats || !dashboardData.stats.moodDistribution) {
      return {
        labels: ['No Data'],
        datasets: [{
          data: [1],
          backgroundColor: ['#ccc'],
          borderWidth: 0
        }]
      };
    }

    const moodDistribution = dashboardData.stats.moodDistribution;
    const labels = Object.keys(moodDistribution);
    const data = Object.values(moodDistribution);
    
    // Color mapping for different moods
    const backgroundColors = {
      'Happy': '#4ade80', // green
      'Grateful': '#60a5fa', // blue
      'Calm': '#a78bfa', // purple
      'Excited': '#f97316', // orange
      'Reflective': '#64748b', // slate
      'Anxious': '#f43f5e', // red
      'Sad': '#6b7280', // gray
      'Stressed': '#ef4444', // red
      'Tired': '#8b5cf6', // purple
      'Other': '#94a3b8', // slate
    };

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map(label => backgroundColors[label] || '#94a3b8'),
        borderWidth: 0
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#fff',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1
      }
    }
  };

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button 
              onClick={handleProfileClick}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
            >
              Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Admin Profile</h2>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-400">Logged in as:</p>
                <p className="font-medium">{dashboardData?.admin?.name || 'Admin'}</p>
                <p className="text-gray-400">{dashboardData?.admin?.email || 'admin@example.com'}</p>
              </div>
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
          </div>

          <div className="md:col-span-3">
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <motion.div 
                    className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 shadow-lg"
                    whileHover="hover"
                    variants={cardVariants}
                  >
                    <h3 className="text-lg font-medium mb-2">Total Users</h3>
                    <p className="text-3xl font-bold">{dashboardData?.total_users || 0}</p>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 shadow-lg"
                    whileHover="hover"
                    variants={cardVariants}
                  >
                    <h3 className="text-lg font-medium mb-2">Total Exercises</h3>
                    <p className="text-3xl font-bold">{dashboardData?.total_exercises || 0}</p>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 shadow-lg"
                    whileHover="hover"
                    variants={cardVariants}
                  >
                    <h3 className="text-lg font-medium mb-2">Total Prompts</h3>
                    <p className="text-3xl font-bold">{dashboardData?.total_gratitude_prompts || 0}</p>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg p-6 shadow-lg"
                    whileHover="hover"
                    variants={cardVariants}
                  >
                    <h3 className="text-lg font-medium mb-2">Total Entries</h3>
                    <p className="text-3xl font-bold">{dashboardData?.total_journal_entries || 0}</p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Mood Distribution Chart */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-medium mb-4">Mood Distribution</h3>
                    <div className="h-64">
                      <Pie data={prepareMoodChartData()} options={chartOptions} />
                    </div>
                  </div>
                  
                  {/* Recent Activity or another chart could go here */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {dashboardData?.recentActivity?.length > 0 ? (
                        dashboardData.recentActivity.map((activity, index) => (
                          <div key={index} className="bg-gray-700 rounded-lg p-3">
                            <p className="text-sm">{activity.description}</p>
                            <p className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleString()}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">No recent activity</p>
                      )}
                    </div>
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Exercise Management</h2>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => navigate('/admin/exercises/new')}
                  >
                    Add New Exercise
                  </button>
                </div>
                
                {loading ? (
                  <p>Loading exercises...</p>
                ) : error ? (
                  <p className="text-red-500">Error loading exercises: {error}</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {exercises.map((exercise) => (
                      <motion.div 
                        key={exercise.id}
                        className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 hover:border-blue-500 transition-all duration-200"
                        whileHover={{ y: -5 }}
                      >
                        <div className="p-5">
                          <h3 className="text-xl font-semibold text-blue-400 mb-2">{exercise.title}</h3>
                          <p className="text-gray-300 mb-4 h-20 overflow-hidden">
                            {truncateText(exercise.description, 120)}
                          </p>
                          <div className="mb-4">
                            {exercise.audio_url ? (
                              <div dangerouslySetInnerHTML={{ __html: exercise.audio_url }} />
                            ) : (
                              <p className="text-gray-400 text-sm">No Audio Embedded</p>
                            )}
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => handleEditClick(exercise)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(exercise.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'prompts' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Prompt Management</h2>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    onClick={handleCreatePromptClick}
                  >
                    Add New Prompt
                  </button>
                </div>

                {loading ? (
                  <p>Loading prompts...</p>
                ) : error ? (
                  <p className="text-red-500">Error loading prompts: {error}</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* 2x2 grid */}
                    {prompts.map((prompt) => (
                      <motion.div
                        key={prompt.id}
                        className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 hover:border-blue-500 transition-all duration-200 p-4 h-full"
                        whileHover={{ y: -5 }}
                      >
                        <p className="text-gray-300 line-clamp-3 mb-3"> {/* Truncate long text */}
                          {prompt.prompt_text}
                        </p>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditPromptClick(prompt)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePromptClick(prompt.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Exercise Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Exercise</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-2">Title</label>
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-2">Description</label>
                <textarea 
                  value={editDescription} 
                  onChange={(e) => setEditDescription(e.target.value)} 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white h-32" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-2">Audio URL</label>
                <input
                  type="text"
                  value={editAudioFileName} // Reusing this state for simplicity
                  onChange={(e) => setEditAudioFileName(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Prompt Modal */}
      {showCreatePromptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Prompt</h2>
            <form onSubmit={handleCreatePromptSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="new-prompt-text">
                  Prompt Text
                </label>
                <textarea
                  id="new-prompt-text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white h-32"
                  value={newPromptText}
                  onChange={(e) => setNewPromptText(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreatePromptModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Prompt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Prompt Modal */}
      {showEditModal && currentPrompt && ( // Ensure currentPrompt is not null
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Prompt</h2>
            <form onSubmit={handleEditPromptSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="edit-prompt-text">
                  Prompt Text
                </label>
                <textarea
                  id="edit-prompt-text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white h-32"
                  value={editPromptText}
                  onChange={(e) => setEditPromptText(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;