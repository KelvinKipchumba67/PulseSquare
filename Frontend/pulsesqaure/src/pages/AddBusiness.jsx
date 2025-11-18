import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; 

const API_BASE_URL = 'http://localhost:5000/api/businesses';

export default function AddBusiness() {
  const { token, user } = useAuth(); // Get token and user from context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    priceRange: '$', // Default to $
    contact: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not logged in (basic client-side protection)
  if (!user) {
    navigate('/login');
    return null; 
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // 1. Send data with JWT token in the header
      await axios.post(API_BASE_URL, formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });

      setMessage('Business added successfully! Redirecting...');
      
      // 2. Clear form and redirect after a delay
      setFormData({ name: '', category: '', location: '', priceRange: '$', contact: '' });
      setTimeout(() => navigate('/'), 1500); 

    } catch (err) {
      console.error("Add Business Failed:", err.response || err);
      const errMsg = err.response?.data?.msg || 'Failed to add business. Check server.';
      setMessage(errMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add a New Business</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category (e.g., Barber, Cafe, Gym)</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location / Address</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <select name="priceRange" value={formData.priceRange} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option value="$">$ (Inexpensive)</option>
            <option value="$$">$$ (Moderate)</option>
            <option value="$$$">$$$ (Expensive)</option>
          </select>
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Info (Phone or Website)</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
        </div>

        {/* Submission Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit New Business'}
        </button>
      </form>

      {/* Message Area */}
      {message && (
        <p className={`mt-4 text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}