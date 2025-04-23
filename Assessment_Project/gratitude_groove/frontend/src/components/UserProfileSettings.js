import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

const UserProfileSettings = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [gratitudeGoals, setGratitudeGoals] = useState('');
  const [gratefulFor, setGratefulFor] = useState('');
  const [favoriteQuote, setFavoriteQuote] = useState('');
  const [howGratitudeFeels, setHowGratitudeFeels] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
        setName(response.data.name || '');
        setGratitudeGoals(response.data.gratitude_goals || '');
        setGratefulFor(response.data.grateful_for || '');
        setFavoriteQuote(response.data.favorite_quote || '');
        setHowGratitudeFeels(response.data.how_gratitude_feels || '');
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error appropriately (e.g., redirect to login)
        navigate('/login');
      }
    };

    if (authToken) {
      fetchUserProfile();
    } else {
      navigate('/login');
    }
  }, [authToken, navigate]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append('name', name);
    formData.append('gratitude_goals', gratitudeGoals);
    formData.append('grateful_for', gratefulFor);
    formData.append('favorite_quote', favoriteQuote);
    formData.append('how_gratitude_feels', howGratitudeFeels);
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }

    try {
      const response = await api.put('/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      console.log('Profile updated:', response.data);
      navigate('/dashboard'); // Redirect to dashboard after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        // Handle other errors
      }
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (field) => {
    return errors[field] ? errors[field][0] : null;
  };

  if (!user) {
    return <div>Loading profile settings...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Set Up Your Profile</h2>
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
            {getFieldError('name') && <p className="text-red-500 text-xs italic mt-1">{getFieldError('name')}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email (Read-only)
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 text-gray-500 cursor-not-allowed"
              value={user.email || ''}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gratitude_goals">
              My Gratitude Goals/Intentions
            </label>
            <textarea
              id="gratitude_goals"
              className={`shadow appearance-none border ${getFieldError('gratitude_goals') ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              value={gratitudeGoals}
              onChange={(e) => setGratitudeGoals(e.target.value)}
            />
            {getFieldError('gratitude_goals') && <p className="text-red-500 text-xs italic mt-1">{getFieldError('gratitude_goals')}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grateful_for">
              Things I'm Grateful For (Separate by commas or newlines)
            </label>
            <textarea
              id="grateful_for"
              className={`shadow appearance-none border ${getFieldError('grateful_for') ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              value={gratefulFor}
              onChange={(e) => setGratefulFor(e.target.value)}
            />
            {getFieldError('grateful_for') && <p className="text-red-500 text-xs italic mt-1">{getFieldError('grateful_for')}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="favorite_quote">
              Favorite Gratitude Quote
            </label>
            <textarea
              id="favorite_quote"
              className={`shadow appearance-none border ${getFieldError('favorite_quote') ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              value={favoriteQuote}
              onChange={(e) => setFavoriteQuote(e.target.value)}
            />
            {getFieldError('favorite_quote') && <p className="text-red-500 text-xs italic mt-1">{getFieldError('favorite_quote')}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="how_gratitude_feels">
              How Gratitude Makes Me Feel
            </label>
            <textarea
              id="how_gratitude_feels"
              className={`shadow appearance-none border ${getFieldError('how_gratitude_feels') ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              value={howGratitudeFeels}
              onChange={(e) => setHowGratitudeFeels(e.target.value)}
            />
            {getFieldError('how_gratitude_feels') && <p className="text-red-500 text-xs italic mt-1">{getFieldError('how_gratitude_feels')}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_image">
              Profile Image (Optional)
            </label>
            <input
              type="file"
              id="profile_image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleImageChange}
              accept="image/*"
            />
            {getFieldError('profile_image') && <p className="text-red-500 text-xs italic mt-1">{getFieldError('profile_image')}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving Profile...' : 'Save Profile'}
            </button>
          </div>
        </form>
        <p className="text-gray-500 text-xs italic mt-4">Account created on: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default UserProfileSettings;