import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import UserCard from './UserCard'; // Import the UserCard component

const BusinessProfile = () => {
  const [businessData, setBusinessData] = useState({});
  const [isUserModalVisible, setIsUserModalVisible] = useState(false); // Control UserCard visibility
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user details
  const [isUsersModalVisible, setIsUsersModalVisible] = useState(false); // Control "View Users" modal visibility

  // Fetch the business data and associated users
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
      const businessId = userData ? userData.business._id : null;

      if (!businessId) {
        console.error('Business ID is missing. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(`https://imbentaryo-hub.onrender.com/api/business/${businessId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBusinessData(response.data.business);
      } catch (error) {
        console.error('Failed to fetch business details:', error);
      }
    };

    fetchBusinessDetails();
  }, []);

  const { name, owner, address, contactNumber, email, users = [] } = businessData;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="top-0 left-0 w-full z-50 shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center mt-16 mb-16 px-6">
        <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-4xl border border-blue-300">
          <h2 className="text-4xl font-extrabold mb-12 text-center text-blue-900">Business Profile</h2>
          {/* Display Business Information */}
          <div className="mb-12 space-y-8 text-lg">
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-40">Business Name:</span>
              <span>{name || 'Loading...'}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-40">Owner:</span>
              <span>{owner ? `${owner.firstName} ${owner.lastName}` : 'Loading...'}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-40">Address:</span>
              <span>{owner?.address || 'No Address Available'}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-40">Contact Number:</span>
              <span>{owner?.contactNumber || 'No Contact Number Available'}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-40">Email:</span>
              <span>{owner?.email || 'Loading...'}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-700 w-40">Number of Users:</span>
              <span>{users.length}</span>
            </div>
          </div>

          {/* Button to View Users */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsUsersModalVisible(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg py-3 px-12 rounded-full hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-lg transition duration-300"
            >
              View Users
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bottom-0 left-0 w-full shadow-inner bg-white z-50">
        <Footer />
      </div>

      {/* View Users Modal */}
      <Modal isVisible={isUsersModalVisible} onClose={() => setIsUsersModalVisible(false)}>
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg border border-blue-300">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900">Users List</h2>
          <ul className="space-y-6">
            {users.map((user) => (
              <li
                key={user._id}
                className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 border-b border-blue-100 pb-2"
                onClick={() => {
                  setSelectedUser(user);
                  setIsUserModalVisible(true);
                  setIsUsersModalVisible(false);
                }}
              >
                {user.username}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <button
              onClick={() => setIsUsersModalVisible(false)}
              className="w-full bg-blue-700 text-white font-semibold py-3 rounded-full hover:bg-blue-800 shadow-md hover:shadow-lg transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* UserCard Modal */}
      <UserCard isVisible={isUserModalVisible} onClose={() => setIsUserModalVisible(false)} user={selectedUser} />
    </div>
  );
};

export default BusinessProfile;
