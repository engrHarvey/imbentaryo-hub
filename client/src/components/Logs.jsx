import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { isUserLoggedIn } from '../utils/helpers';

function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://imbentaryo-hub.onrender.com/api/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(response.data.logs);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600">Loading Logs...</h2>
      </div>
    );
  }

  // Function to determine the text color for the action column
  const getActionColor = (action) => {
    switch (action) {
      case 'added':
        return 'text-green-600 font-semibold';
      case 'removed':
        return 'text-red-600 font-semibold';
      case 'sold':
        return 'text-yellow-600 font-semibold';
      default:
        return '';
    }
  };

  // Function to determine the text color for the user type column
  const getUserTypeColor = (userType) => {
    switch (userType) {
      case 'owner':
        return 'text-purple-600 font-bold';
      case 'sub-owner':
        return 'text-blue-600 font-bold';
      case 'employee':
        return 'text-gray-600 font-semibold';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Fixed Header */}
      <div className="top-0 left-0 w-full z-50 shadow-md">
        <Header />
      </div>

      {/* Main Content Section */}
      <div className="flex-grow mt-20 mb-16 px-8 container mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Item Logs</h1>
          <p className="text-lg text-gray-600">A detailed view of all inventory actions</p>
        </div>

        {/* Logs Table */}
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-3 font-medium border-b border-gray-200">Date & Time</th>
                <th className="px-6 py-3 font-medium border-b border-gray-200">Item Name</th>
                <th className="px-6 py-3 font-medium border-b border-gray-200">Action</th>
                <th className="px-6 py-3 font-medium border-b border-gray-200">Quantity</th>
                <th className="px-6 py-3 font-medium border-b border-gray-200">User</th>
                <th className="px-6 py-3 font-medium border-b border-gray-200">User Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="px-6 py-4 border-b border-gray-200">{new Date(log.date).toLocaleString()}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{log.itemName}</td>
                  {/* Action Column with Dynamic Color */}
                  <td className={`px-6 py-4 border-b border-gray-200 capitalize ${getActionColor(log.action)}`}>
                    {log.action}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">{log.quantity}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{log.username}</td>
                  {/* User Type Column with Dynamic Color */}
                  <td className={`px-6 py-4 border-b border-gray-200 ${getUserTypeColor(log.user?.userType)}`}>
                    {log.user?.userType || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="bottom-0 left-0 w-full shadow-inner bg-white">
        {isUserLoggedIn() && <Footer />}
      </div>
    </div>
  );
}

export default Logs;
