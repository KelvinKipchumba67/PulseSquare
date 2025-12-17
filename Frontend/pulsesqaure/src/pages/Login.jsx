import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import the AuthContext

const API_BASE_URL = 'https://pulsesquare-1.onrender.com/api/auth';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    // Determine the API endpoint
    const endpoint = isLogin ? `${API_BASE_URL}/login` : `${API_BASE_URL}/register`;
    const dataToSend = isLogin 
      ? { email: formData.email, password: formData.password } 
      : formData; // Send username, email, password for register

    try {
      const res = await axios.post(endpoint, dataToSend);
      
      // Successfully logged in or registered
      const { token, user } = res.data;
      
      // Use the context function to store token and user globally
      login(user, token);
      
      setMessage(`Success! Redirecting to home...`);
      navigate('/');
      
    } catch (err) {
      // Display error message from backend
      const errMsg = err.response?.data?.msg || 'An unknown error occurred.';
      setMessage(errMsg);
      console.error(err);
    }
  };

  // Switch between Login and Register views
  const switchMode = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="p-6 sm:p-8 bg-white shadow-sm border border-slate-200/70 rounded-2xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-slate-900">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="text-center text-slate-600 mb-6">
          {isLogin ? 'Welcome back. Continue where you left off.' : 'Create an account to add businesses and reviews.'}
        </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Username field (only for Register) */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-slate-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required={!isLogin}
              className="mt-1 block w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Your Name"
            />
          </div>
        )}

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            placeholder="you@example.com"
          />
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            placeholder="********"
          />
        </div>

        {/* Submission Button */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>

      </form>

      {/* Message Area */}
      {message && (
        <div
          className={`mt-4 rounded-xl px-4 py-3 text-center border ${
            message.includes('Success')
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      {/* Switch Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button 
          onClick={switchMode}
          className="font-semibold text-indigo-700 hover:text-indigo-800 ml-1"
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
      </div>
    </div>
  );
}