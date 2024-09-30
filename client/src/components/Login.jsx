import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Redirect to home if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://imbentaryo-hub.onrender.com/api/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user details
      navigate('/home'); // Redirect to home page after successful login
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300 shadow-md"
        >
          Login
        </button>
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:text-blue-400 transition duration-200"
              onClick={() => navigate('/register')}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
