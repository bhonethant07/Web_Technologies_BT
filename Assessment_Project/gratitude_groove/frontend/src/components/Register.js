
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    setGeneralError('');
    
    // Client-side validation
    if (password !== passwordConfirmation) {
      setErrors({ password_confirmation: ["Passwords do not match."] });
      return;
    }

    setLoading(true);

    try {
      // Note: sending password_confirmation as Laravel expects this field name
      await api.post('/register', { 
        name, 
        email, 
        password,
        password_confirmation: passwordConfirmation 
      });
      
      // On success, redirect to login
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err.response?.status === 422) {
        // Handle validation errors from Laravel
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else if (err.response.data.message) {
          setGeneralError(err.response.data.message);
        }
      } else {
        // Handle other errors
        setGeneralError(err.response?.data?.message || 'Registration failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper to display field error
  const getFieldError = (field) => {
    return errors[field] ? errors[field][0] : null;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Register</h2>
        
        {generalError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {generalError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`shadow appearance-none border ${getFieldError('name') ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {getFieldError('name') && (
              <p className="text-red-500 text-xs italic mt-1">{getFieldError('name')}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`shadow appearance-none border ${getFieldError('email') ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {getFieldError('email') && (
              <p className="text-red-500 text-xs italic mt-1">{getFieldError('email')}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`shadow appearance-none border ${getFieldError('password') ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {getFieldError('password') && (
              <p className="text-red-500 text-xs italic mt-1">{getFieldError('password')}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirmation">
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              className={`shadow appearance-none border ${getFieldError('password_confirmation') ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
            {getFieldError('password_confirmation') && (
              <p className="text-red-500 text-xs italic mt-1">{getFieldError('password_confirmation')}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
