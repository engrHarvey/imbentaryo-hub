import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import AddItem from './AddItem';
import Item from './Item';
import Sidebar from './Sidebar';
import Modal from './Modal';
import axios from 'axios';
import { isUserLoggedIn } from '../utils/helpers';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/item', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data.items);
      setFilteredItems(response.data.items);
    } catch (error) {
      alert('Failed to fetch items: ' + error.response.data.message);
    }
  };

  useEffect(() => {
    fetchItems(); // Fetch items on component mount
  }, []);

  // Handle search input
  const handleSearch = (searchTerm) => {
    const searchResults = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(searchResults);
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    console.log('Filters applied:', filters);
    let filtered = [...items];

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((item) => {
        return item.category && item.category.toLowerCase() === filters.category.toLowerCase();
      });
    }

    // Apply value range filter
    if (filters.minValue !== null) {
      filtered = filtered.filter((item) => item.value >= filters.minValue);
    }
    if (filters.maxValue !== null) {
      filtered = filtered.filter((item) => item.value <= filters.maxValue);
    }

    // Apply expiration date filter
    if (filters.expirationDate) {
      filtered = filtered.filter(
        (item) => new Date(item.expirationDate).toISOString().split('T')[0] === filters.expirationDate
      );
    }

    setFilteredItems(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Fixed Header */}
      <div className="top-0 left-0 w-full z-50 shadow-md bg-white">
        <Header />
      </div>

      {/* Main Content Container */}
      <div className="flex-grow flex mt-24 mb-16 px-8 container mx-auto">
        {/* Sidebar with "Apply Filter" Button */}
        <Sidebar
          onSearch={handleSearch}
          onFilterSubmit={handleFilterChange}
          categories={[
            'Electronics',
            'Fashion',
            'Health & Beauty',
            'Home & Living',
            'Sports & Outdoors',
            'Toys, Kids & Babies',
            'Automotive',
            'Groceries',
            'Pets',
            'Books & Media',
            'Gaming',
            'Travel & Luggage',
          ]}
        />

        {/* Main Inventory Section */}
        <div className="flex-grow bg-white rounded-lg shadow-lg p-8 ml-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-blue-700">Inventory</h1>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md"
              onClick={() => setIsModalVisible(true)}
            >
              + Add Item
            </button>
          </div>

          {/* Modal for adding new items */}
          <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
            <AddItem />
          </Modal>

          {/* Display filtered items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <Item key={item._id} item={item} onQuantityChange={fetchItems} />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      {isUserLoggedIn() && (
        <div className="bottom-0 left-0 w-full shadow-inner bg-white">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Inventory;
