import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-8">Welcome to Gratitude Grove</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Discover the power of gratitude and enhance your well-being. Join our community to start your journey today!
      </p>
      <div className="flex space-x-4">
        <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
          Sign Up
        </Link>
        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;