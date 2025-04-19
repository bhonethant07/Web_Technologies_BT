import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './components/HomePage';
import UserDashboard from './components/UserDashboard';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import AdminEdit from './components/AdminEdit';
import CreateExercise from './components/CreateExercise';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
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