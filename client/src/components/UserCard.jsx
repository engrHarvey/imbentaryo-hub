import React from 'react';
import Modal from './Modal';

const UserCard = ({ isVisible, onClose, user }) => {
  if (!isVisible || !user) return null;

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="bg-gradient-to-br from-white to-blue-50 p-12 rounded-3xl shadow-2xl w-full max-w-lg mx-auto border border-blue-300 transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-black mb-10 text-center text-blue-900">User Profile</h2>
        <div className="space-y-6 text-lg text-gray-900">
          <div className="flex justify-between">
            <span className="font-semibold text-blue-600">First Name:</span> 
            <span>{user.firstName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-600">Last Name:</span> 
            <span>{user.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-600">Username:</span> 
            <span>{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-600">Email:</span> 
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-600">Address:</span> 
            <span>{user.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-600">Contact Number:</span> 
            <span>{user.contactNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-600">User Type:</span> 
            <span>{user.userType}</span>
          </div>
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserCard;
