import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  const [categoryData, setCategoryData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://imbentaryo-hub.onrender.com/api/item', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Group items by category and count
        const categoryCounts = response.data.items.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        // Prepare data for the chart
        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);

        setCategoryData({
          labels,
          datasets: [
            {
              label: 'Items by Category',
              data,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#B4CD93',
                '#8D8C7F',
                '#3A8DFF',
                '#D32F2F',
                '#009688',
                '#FFC107',
              ],
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch category data', error);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full h-full flex flex-col justify-center items-center transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Items by Category</h2>
      <div className="w-4/5 h-full">
        <Doughnut
          data={categoryData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%', // Adjust cutout for better proportions
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default DonutChart;
