import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

// Register necessary Chart.js components
Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

function LineChart() {
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://imbentaryo-hub.onrender.com/api/logs/sales', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Group sales data by month
        const monthlySales = response.data.reduce((acc, log) => {
          const month = new Date(log.date).toLocaleString('default', { month: 'long' });
          acc[month] = (acc[month] || 0) + log.quantity;
          return acc;
        }, {});

        // Prepare data for the chart
        const labels = Object.keys(monthlySales);
        const data = Object.values(monthlySales);

        setSalesData({
          labels,
          datasets: [
            {
              label: 'Monthly Sales',
              data,
              fill: false,
              borderColor: '#36A2EB',
              backgroundColor: '#36A2EB',
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch sales data', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full h-80 flex flex-col justify-between transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Monthly Sales Overview</h2>
      <div className="flex-grow">
        <Line
          data={salesData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: 10,
                bottom: 10,
              },
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Sales Performance',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default LineChart;
