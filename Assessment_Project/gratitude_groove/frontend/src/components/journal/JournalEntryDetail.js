import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getJournalEntryById, updateJournalEntry, deleteJournalEntry } from '../../services/dashboardService';

const MOOD_OPTIONS = [
  { value: 'Happy', emoji: '😊', label: 'Happy' },
  { value: 'Grateful', emoji: '🙏', label: 'Grateful' },
  { value: 'Calm', emoji: '😌', label: 'Calm' },
  { value: 'Excited', emoji: '😃', label: 'Excited' },
  { value: 'Reflective', emoji: '🤔', label: 'Reflective' },
  { value: 'Anxious', emoji: '😰', label: 'Anxious' },
  { value: 'Sad', emoji: '😢', label: 'Sad' },
  { value: 'Stressed', emoji: '😫', label: 'Stressed' },
  { value: 'Tired', emoji: '😴', label: 'Tired' },
];

const JournalEntryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entry, setEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    entry_text: '',
    mood: '',
    image_url: '',
  });

  const [selectedMood, setSelectedMood] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        setLoading(true);
        const data = await getJournalEntryById(id);
        setEntry(data);
        setFormData({
          entry_text: data.entry_text,
          mood: data.mood,
          image_url: data.image_url || '',
        });
        setSelectedMood(data.mood);

        // Set image preview if there's an image URL
        if (data.image_url) {
          setImagePreview(data.image_url);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching journal entry:', err);
        setError('Failed to load journal entry. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setFormData(prev => ({
      ...prev,
      mood: mood
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.entry_text.trim()) {
      setError('Please write something in your journal entry.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // If we have a selected image, pass it to the updateJournalEntry function
      if (selectedImage) {
        await updateJournalEntry(id, formData, selectedImage);
      } else {
        await updateJournalEntry(id, formData);
      }

      setSuccess('Journal entry updated successfully!');
      setIsEditing(false);

      // Reset selected image
      setSelectedImage(null);

      // Refresh entry data
      const updatedEntry = await getJournalEntryById(id);
      setEntry(updatedEntry);

      // Update image preview with the new image URL if available
      if (updatedEntry.image_url) {
        setImagePreview(updatedEntry.image_url);
      } else {
        setImagePreview(null);
      }

      // Clear success message after a delay
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error updating journal entry:', err);
      setError(err.response?.data?.message || 'Failed to update your journal entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteJournalEntry(id);
      setSuccess('Journal entry deleted successfully!');

      // Redirect to journal list after a short delay
      setTimeout(() => {
        navigate('/journal');
      }, 1500);
    } catch (err) {
      console.error('Error deleting journal entry:', err);
      setError(err.response?.data?.message || 'Failed to delete your journal entry. Please try again.');
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMoodEmoji = (mood) => {
    const moodOption = MOOD_OPTIONS.find(option => option.value === mood);
    return moodOption ? moodOption.emoji : '😐';
  };

  if (loading && !entry) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !entry) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{error}</span>
          </div>
          <button
            onClick={() => navigate('/journal')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Journal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success message */}
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg text-green-700"
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p>{success}</p>
            </div>
          </motion.div>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg text-red-700"
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </motion.div>
        )}

        {/* Journal Entry */}
        {entry && !isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm text-gray-500">{formatDate(entry.created_at)}</div>
                <div className="text-2xl" title={entry.mood}>{getMoodEmoji(entry.mood)}</div>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="whitespace-pre-line">{entry.entry_text}</p>
              </div>

              {entry.image_url && (
                <div className="mt-6 mb-6">
                  <img
                    src={entry.image_url}
                    alt="Journal entry"
                    className="max-h-96 w-auto mx-auto rounded-md"
                  />
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => navigate('/journal')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back
                </button>

                <div className="space-x-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>

                  <button
                    onClick={() => setIsDeleting(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Edit Form */}
        {entry && isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <form onSubmit={handleUpdate} className="p-6">
              <div className="text-sm text-gray-500 mb-4">
                {formatDate(entry.created_at)}
              </div>

              {/* Mood selection */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  How were you feeling?
                </label>
                <div className="flex flex-wrap gap-2">
                  {MOOD_OPTIONS.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => handleMoodSelect(mood.value)}
                      className={`flex items-center px-3 py-2 rounded-full text-sm ${
                        selectedMood === mood.value
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <span className="mr-1 text-xl">{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Journal entry text */}
              <div className="mb-6">
                <label htmlFor="entry_text" className="block text-gray-700 text-sm font-medium mb-2">
                  Your thoughts
                </label>
                <textarea
                  id="entry_text"
                  name="entry_text"
                  rows="12"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.entry_text}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Image Upload (optional) */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Add an Image (optional)
                </label>

                {/* Image preview */}
                {imagePreview && (
                  <div className="mb-3 relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 rounded-md mx-auto"
                      onError={(e) => {
                        console.log('Image failed to load:', imagePreview);
                        e.target.onerror = null;
                        e.target.src = '/default-avatar.svg';
                      }}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />

                {/* Upload button */}
                {!imagePreview && (
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Upload Image
                      </span>
                    </button>
                  </div>
                )}

                <p className="mt-1 text-xs text-gray-500">
                  Add an image to include a visual with your journal entry
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleting && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md mx-auto"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Journal Entry</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this journal entry? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleting(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </span>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalEntryDetail;
