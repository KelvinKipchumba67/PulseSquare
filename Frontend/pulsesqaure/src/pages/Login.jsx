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
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {isLogin ? 'Sign In' : 'Create Account'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Username field (only for Register) */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required={!isLogin}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your Name"
            />
          </div>
        )}

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="********"
          />
        </div>

        {/* Submission Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>

      </form>

      {/* Message Area */}
      {message && (
        <p className={`mt-4 text-center ${message.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      {/* Switch Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button 
          onClick={switchMode}
          className="font-medium text-blue-600 hover:text-blue-500 ml-1"
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
}