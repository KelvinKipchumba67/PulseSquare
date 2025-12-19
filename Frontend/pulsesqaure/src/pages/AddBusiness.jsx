import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; 

const API_BASE_URL = 'https://pulsesquare-brk7.onrender.com/api/businesses';

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
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm border border-slate-200/70 rounded-2xl p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Add a New Business</h2>
          <p className="text-slate-600 mt-1">Create a listing so customers can discover and review it.</p>
        </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Business Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"/>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Category (e.g., Barber, Cafe, Gym)</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"/>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Location / Address</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"/>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Price Range</label>
          <select name="priceRange" value={formData.priceRange} onChange={handleChange} className="mt-1 block w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500">
            <option value="$">$ (Inexpensive)</option>
            <option value="$$">$$ (Moderate)</option>
            <option value="$$$">$$$ (Expensive)</option>
          </select>
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Contact Info (Phone or Website)</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} required className="mt-1 block w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"/>
        </div>

        {/* Submission Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none disabled:opacity-50 transition"
        >
          {isLoading ? 'Submitting...' : 'Submit New Business'}
        </button>
      </form>

      {/* Message Area */}
      {message && (
        <div
          className={`mt-4 rounded-xl px-4 py-3 text-center border ${
            message.toLowerCase().includes('success')
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {message}
        </div>
      )}
      </div>
    </div>
  );
}