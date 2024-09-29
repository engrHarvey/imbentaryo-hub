import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password field
  const [businessName, setBusinessName] = useState(''); // Field for business name
  const [userType] = useState('owner'); // Default userType as 'owner'

  const handleRegister = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        username,
        email,
        address,
        contactNumber,
        password,
        businessName,
        userType, // Automatically set userType as owner
      });
      alert('User registered successfully as Business Owner');
      window.location.href = '/login';
    } catch (error) {
      alert('Registration failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Register as Business Owner</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {/* Disabled userType input, pre-set to "owner" */}
          <div>
            <label className="block mb-1 text-gray-600 font-semibold">User Type</label>
            <input
              type="text"
              value={userType}
              disabled
              className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300 shadow-md"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
