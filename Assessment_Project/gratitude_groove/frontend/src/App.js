import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

// User-side components
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import ProfileCustomization from './components/ProfileCustomization';

// Admin-side components
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import AdminEdit from './components/AdminEdit';
import CreateExercise from './components/CreateExercise';


function App() {
  return (
    <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          <Route path="/profile-customization" element={<PrivateRoute><ProfileCustomization /></PrivateRoute>} />

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