import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function CategoryMonthlySalesChart() {
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://imbentaryo-hub.onrender.com/api/logs/sales-category', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Group data by month and category
        const monthlyCategorySales = response.data.reduce((acc, log) => {
          const month = new Date(log.date).toLocaleString('default', { month: 'long' });
          if (!acc[month]) acc[month] = {};
          acc[month][log.category] = (acc[month][log.category] || 0) + log.quantity;
          return acc;
        }, {});

        // Prepare labels and datasets for the chart
        const months = Object.keys(monthlyCategorySales);
        const categories = [...new Set(response.data.map((log) => log.category))];
        const datasets = categories.map((category) => ({
          label: category,
          data: months.map((month) => monthlyCategorySales[month][category] || 0),
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.7)`, // Generate random colors
        }));

        setSalesData({
          labels: months,
          datasets,
        });
      } catch (error) {
        console.error('Failed to fetch sales data by category', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full h-96 flex flex-col justify-between transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Monthly Sales by Category</h2>
      <div className="flex-grow">
        <Bar
          data={salesData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Monthly Sales Breakdown by Category',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default CategoryMonthlySalesChart;
