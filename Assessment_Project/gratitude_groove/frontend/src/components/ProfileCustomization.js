import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { updateUserProfile, getUserProfile } from '../services/api';
import { motion } from 'framer-motion';

const ProfileCustomization = () => {
  const { user, updateProfileStatus, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    gratitude_goals: '',
    grateful_for: '',
    favorite_quote: '',
    how_gratitude_feels: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data including image URL
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();

        if (response.user) {
          setFormData({
            gratitude_goals: response.user.gratitude_goals || '',
            grateful_for: response.user.grateful_for || '',
            favorite_quote: response.user.favorite_quote || '',
            how_gratitude_feels: response.user.how_gratitude_feels || '',
          });

          // Set image preview if available
          if (response.image_url) {
            setImagePreview(response.image_url);
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear any previous errors
    if (errors.profile_image) {
      setErrors(prev => ({
        ...prev,
        profile_image: null
      }));
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        profile_image: 'Please select a valid image file (JPEG, PNG, GIF, WEBP)'
      }));
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        profile_image: 'Image size should be less than 2MB'
      }));
      return;
    }

    // Set the file for upload
    setProfileImage(file);

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle removing the image
  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.gratitude_goals.trim()) {
      newErrors.gratitude_goals = 'Please share your gratitude goals';
    }

    if (!formData.grateful_for.trim()) {
      newErrors.grateful_for = 'Please share what you are grateful for';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the API with form data and image file
      const response = await updateUserProfile(formData, profileImage);

      if (response.profile_completed) {
        setSubmitSuccess(true);

        // Update context with new user data and profile status
        updateUser(response.user);
        updateProfileStatus(true);

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Failed to update profile. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Glass-morphism inspired card (light theme) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 w-full max-w-md shadow-lg"
      >
        {/* App logo/header */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-light text-gray-800 mb-1">GRATITUDE GROVE</h1>
          <div className="h-[2px] w-20 bg-blue-500"></div>
          <h2 className="mt-4 text-xl font-medium text-gray-600">Profile Customization</h2>
        </div>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : submitSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-3 bg-green-100 border border-green-200 rounded-lg text-green-700 text-sm"
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="font-medium">
                  Profile updated successfully! Redirecting to dashboard...
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-3 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm"
                >
                  {errors.general}
                </motion.div>
              )}

              {/* Profile Image Upload - Moved to the top */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Profile Image
                </label>
                <div className="flex flex-col items-center">
                  {/* Image Preview */}
                  <div className="mb-4 relative">
                    {imagePreview ? (
                      <motion.div
                        className="relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="h-32 w-32 rounded-full object-cover border-2 border-blue-100 shadow-md"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                          aria-label="Remove image"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </motion.div>
                    ) : (
                      <div className="h-32 w-32 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-300 shadow-md">
                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="profile_image"
                    name="profile_image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />

                  {/* Upload button */}
                  <motion.button
                    type="button"
                    onClick={triggerFileInput}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center px-4 py-2 border border-blue-300 shadow-sm text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {imagePreview ? 'Change Image' : 'Upload Image'}
                  </motion.button>

                  {errors.profile_image && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.profile_image}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="gratitude_goals" className="block text-gray-600 text-sm font-medium mb-2">
                  What are your gratitude goals? *
                </label>
                <div className="relative">
                  <textarea
                    id="gratitude_goals"
                    name="gratitude_goals"
                    rows="3"
                    className={`w-full bg-white border ${errors.gratitude_goals ? 'border-red-300' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="e.g., I want to be more mindful of the small joys in life..."
                    value={formData.gratitude_goals}
                    onChange={handleChange}
                  />
                  {errors.gratitude_goals && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.gratitude_goals}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="grateful_for" className="block text-gray-600 text-sm font-medium mb-2">
                  What are you grateful for today? *
                </label>
                <div className="relative">
                  <textarea
                    id="grateful_for"
                    name="grateful_for"
                    rows="3"
                    className={`w-full bg-white border ${errors.grateful_for ? 'border-red-300' : 'border-gray-300'} rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="e.g., My family, good health, the sunshine today..."
                    value={formData.grateful_for}
                    onChange={handleChange}
                  />
                  {errors.grateful_for && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.grateful_for}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="favorite_quote" className="block text-gray-600 text-sm font-medium mb-2">
                  Your favorite quote about gratitude (optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="favorite_quote"
                    name="favorite_quote"
                    className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="e.g., 'Gratitude turns what we have into enough.'"
                    value={formData.favorite_quote}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="how_gratitude_feels" className="block text-gray-600 text-sm font-medium mb-2">
                  How does practicing gratitude make you feel? (optional)
                </label>
                <div className="relative">
                  <textarea
                    id="how_gratitude_feels"
                    name="how_gratitude_feels"
                    rows="2"
                    className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="e.g., Calm, centered, more aware of the good things..."
                    value={formData.how_gratitude_feels}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <motion.button
                  type="button"
                  onClick={handleSkip}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  Skip for now
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-1/2 py-3 px-4 rounded-lg font-medium text-white transition ${isSubmitting ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : 'Save Profile'}
                </motion.button>
              </div>
            </form>
          )}
      </motion.div>
    </div>
  );
};

export default ProfileCustomization;
