import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
  const [user, setUser] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);

  // Function to handle login
  const login = (token, userData, hasCompletedProfile) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setUser(userData);
    setProfileCompleted(hasCompletedProfile);
  };

  // Function to handle logout
  const logout = async (callback) => {
    try {
      await api.post('/logout'); // Optional: Invalidate token on the backend
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthToken(null);
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUser(null);
      setProfileCompleted(false);

      // If a callback is provided (like navigate), execute it
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  };

  // Function to update profile completion status
  const updateProfileStatus = (status) => {
    setProfileCompleted(status);
  };

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Check for token on component mount and fetch user data if authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      if (authToken) {
        try {
          // The interceptor will handle adding the token to the request
          const response = await api.get('/user');
          setUser(response.data);
          setIsAuthenticated(true);

          // Check if profile is completed
          const profileResponse = await api.get('/profile');
          setProfileCompleted(profileResponse.data.profile_completed);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // If there's an error (like token expired), logout
          if (error.response?.status === 401) {
            // Clear token and state without making the logout API call
            setAuthToken(null);
            localStorage.removeItem('authToken');
            setIsAuthenticated(false);
            setUser(null);
            setProfileCompleted(false);
          }
        }
      }
    };

    if (authToken) {
      fetchUserData();
    } else {
      // If no token, ensure user is logged out
      setIsAuthenticated(false);
      setUser(null);
      setProfileCompleted(false);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{
      authToken,
      isAuthenticated,
      user,
      profileCompleted,
      login,
      logout,
      updateProfileStatus,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};