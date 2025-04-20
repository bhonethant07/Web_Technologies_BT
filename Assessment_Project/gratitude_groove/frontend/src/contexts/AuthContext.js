import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  // Function to handle login
  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
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
      
      // If a callback is provided (like navigate), execute it
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  };

  // Check for token on component mount
  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};