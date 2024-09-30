import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUserPlus, FaBoxes, FaClipboardList, FaSignOutAlt, FaBuilding } from 'react-icons/fa'; // Import FaBuilding for Business Profile icon

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Section */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/home')}>
            <span className="text-yellow-400">Imbentaryo</span>Hub
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200"
            onClick={() => navigate('/home')}
          >
            <FaHome className="text-xl" />
            <span>Home</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200"
            onClick={() => navigate('/create-user')}
          >
            <FaUserPlus className="text-xl" />
            <span>Create User</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200"
            onClick={() => navigate('/inventory')}
          >
            <FaBoxes className="text-xl" />
            <span>Inventory</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200"
            onClick={() => navigate('/business-profile')}
          >
            <FaBuilding className="text-xl" />
            <span>Business Profile</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200"
            onClick={() => navigate('/logs')}
          >
            <FaClipboardList className="text-xl" />
            <span>Logs</span>
          </button>
        </div>

        {/* Logout Button */}
        <button
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-400 transition-all duration-200 px-4 py-2 rounded-lg"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
