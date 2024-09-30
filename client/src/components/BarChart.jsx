import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function BarChart() {
  const [inventoryData, setInventoryData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://imbentaryo-hub.onrender.com/api/logs/inventory', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Group logs by month and action (added, sold, removed)
        const monthlyInventory = response.data.reduce((acc, log) => {
          const month = new Date(log.date).toLocaleString('default', { month: 'long' });
          if (!acc[month]) {
            acc[month] = { added: 0, sold: 0, removed: 0 };
          }
          acc[month][log.action] += log.quantity;
          return acc;
        }, {});

        // Prepare data for the chart
        const labels = Object.keys(monthlyInventory);
        const addedData = labels.map((month) => monthlyInventory[month].added);
        const soldData = labels.map((month) => monthlyInventory[month].sold);
        const removedData = labels.map((month) => monthlyInventory[month].removed);

        setInventoryData({
          labels,
          datasets: [
            {
              label: 'Added',
              data: addedData,
              backgroundColor: '#4BC0C0',
            },
            {
              label: 'Sold',
              data: soldData,
              backgroundColor: '#FF6384',
            },
            {
              label: 'Removed',
              data: removedData,
              backgroundColor: '#FFCE56',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch inventory data', error);
      }
    };

    fetchInventoryData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full h-96 flex flex-col justify-between transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Monthly Inventory Changes</h2>
      <div className="flex-grow">
        <Bar
          data={inventoryData}
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
                labels: {
                  boxWidth: 20,
                },
              },
              title: {
                display: true,
                text: 'Inventory Changes (Added, Sold, Removed)',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default BarChart;
