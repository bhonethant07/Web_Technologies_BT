import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

// User-side components
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import ProfileCustomization from './components/ProfileCustomization';
import UserProfile from './components/UserProfile';

// Journal components
import CreateJournalEntry from './components/journal/CreateJournalEntry';
import JournalEntryList from './components/journal/JournalEntryList';
import JournalEntryDetail from './components/journal/JournalEntryDetail';

// Mood components
import LogMood from './components/mood/LogMood';

// Exercise components
import ExerciseList from './components/exercises/ExerciseList';
import ExerciseDetail from './components/exercises/ExerciseDetail';

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
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />

          {/* Journal Routes */}
          <Route path="/journal" element={<PrivateRoute><JournalEntryList /></PrivateRoute>} />
          <Route path="/journal/new" element={<PrivateRoute><CreateJournalEntry /></PrivateRoute>} />
          <Route path="/journal/:id" element={<PrivateRoute><JournalEntryDetail /></PrivateRoute>} />

          {/* Mood Routes */}
          <Route path="/mood/log" element={<PrivateRoute><LogMood /></PrivateRoute>} />

          {/* Exercise Routes */}
          <Route path="/exercises" element={<PrivateRoute><ExerciseList /></PrivateRoute>} />
          <Route path="/exercises/:id" element={<PrivateRoute><ExerciseDetail /></PrivateRoute>} />

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