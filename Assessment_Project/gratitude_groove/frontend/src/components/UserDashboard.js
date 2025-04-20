import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const UserDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(() => navigate('/login')); // Pass navigate function as callback
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">User Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">Welcome to your Gratitude Grove!</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
        {/* More dashboard content will go here */}
      </div>
    </div>
  );
};

export default UserDashboard;