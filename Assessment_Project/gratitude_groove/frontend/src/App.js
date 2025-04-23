import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import api from './services/api';

// User-side components
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import UserProfileSettings from './components/UserProfileSettings'; // Import UserProfileSettings

// Admin-side components
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import AdminEdit from './components/AdminEdit';
import CreateExercise from './components/CreateExercise';

function App() {
  const { isAuthenticated, authToken } = useContext(AuthContext);
  const [profileSetupComplete, setProfileSetupComplete] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (isAuthenticated && authToken) {
        try {
          const response = await api.get('/user');
          // Check if any of the profile fields (other than name and email) are filled
          const { gratitude_goals, grateful_for, favorite_quote, how_gratitude_feels } = response.data;
          setProfileSetupComplete(!!(gratitude_goals || grateful_for || favorite_quote || how_gratitude_feels || response.data.profile_image));
        } catch (error) {
          console.error('Error checking profile:', error);
          // Handle error (e.g., maybe consider profile not setup)
          setProfileSetupComplete(false);
        } finally {
          setLoadingCheck(false);
        }
      } else {
        setProfileSetupComplete(false);
        setLoadingCheck(false);
      }
    };

    checkProfile();
  }, [isAuthenticated, authToken]);

  if (loadingCheck) {
    return null; // Or a spinner
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Routes */}
        <Route
          path="/profile/settings"
          element={
            <PrivateRoute>
              {profileSetupComplete ? <Navigate to="/dashboard" replace /> : <UserProfileSettings />}
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {profileSetupComplete ? <UserDashboard /> : <Navigate to="/profile/settings" replace />}
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/edit" element={<AdminEdit />} />
        <Route path="/admin/exercises/new" element={<CreateExercise />} />
      </Routes>
    </Router>
  );
}

export default App;