import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('employee'); // Default user type

  const business = JSON.parse(localStorage.getItem('user')).business;

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/auth/create-user', {
        token,
        firstName,
        lastName,
        username,
        email,
        address,
        contactNumber,
        password,
        userType,
        businessId: business._id,
      });
      alert('User created successfully');
    } catch (error) {
      alert('User creation failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header Section */}
      <div className="top-0 left-0 w-full z-50 shadow-lg">
        <Header />
      </div>

      {/* Create User Form */}
      <div className="flex-grow flex justify-center items-center mt-20 mb-16 px-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg transform transition duration-300 hover:shadow-3xl">
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">Create New User</h2>

          {/* Form Fields Container */}
          <div className="space-y-6">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            >
              <option value="sub-owner">Sub-owner</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Create User Button */}
          <button
            onClick={handleCreateUser}
            className="w-full mt-10 bg-blue-600 text-white font-bold text-lg py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition duration-300"
          >
            Create User
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bottom-0 left-0 w-full shadow-inner bg-white z-50">
        <Footer />
      </div>
    </div>
  );
}

export default CreateUser;
