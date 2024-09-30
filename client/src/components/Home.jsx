import React, { useEffect, useState } from 'react';
import DonutChart from '../components/DonutChart';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import CategoryMonthlySalesChart from '../components/CategoryMonthlySalesChart';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

function Home() {
  const [businessName, setBusinessName] = useState(''); // State to store the business name

  // Fetch business details to get the business name
  const fetchBusinessDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const businessId = user?.business?._id;

      if (!businessId) {
        console.error('Business ID is missing. Please log in again.');
        return;
      }

      const response = await axios.get(`https://imbentaryo-hub.onrender.com/api/business/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.business && response.data.business.name) {
        setBusinessName(response.data.business.name); // Corrected to access business name correctly
      }
    } catch (error) {
      console.error('Failed to fetch business details:', error);
    }
  };

  useEffect(() => {
    fetchBusinessDetails(); // Fetch business details on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Fixed Header */}
      <div className="top-0 left-0 w-full z-50 shadow-md bg-white">
        <Header />
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-grow mt-24 mb-16 px-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-center">
          {/* Use dynamic business name here */}
          <h1 className="text-5xl font-bold text-blue-700 mb-2">{businessName} Dashboard</h1>
          <p className="text-lg text-gray-600">Overview of sales, inventory, and performance metrics</p>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Donut Chart for Items by Category */}
          <div className="lg:col-span-2 md:col-span-2 col-span-1 h-full">
            <DonutChart />
          </div>

          {/* Line Chart for Monthly Sales */}
          <div className="lg:col-span-2 md:col-span-2 col-span-1 h-full">
            <LineChart />
          </div>

          {/* Bar Chart for Monthly Inventory Changes */}
          <div className="lg:col-span-2 md:col-span-2 col-span-1 h-full">
            <BarChart />
          </div>

          {/* Monthly Sales by Category Chart */}
          <div className="lg:col-span-2 md:col-span-2 col-span-1 h-full">
            <CategoryMonthlySalesChart />
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="bottom-0 left-0 w-full shadow-inner bg-white">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
