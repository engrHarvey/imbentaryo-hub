import React, { useState } from 'react';

const Sidebar = ({ onSearch, onFilterSubmit, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterSubmit = () => {
    onFilterSubmit({
      category: selectedCategory,
      minValue: minValue ? parseFloat(minValue) : null,
      maxValue: maxValue ? parseFloat(maxValue) : null,
      expirationDate: expirationDate || null,
    });
  };

  return (
    <div className="w-80 h-full bg-gradient-to-b from-gray-100 to-gray-200 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Filter Items</h2>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Search</label>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Value Range Filter */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Value Range</label>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Min"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Expiration Date Filter */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Expiration Date</label>
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Apply Filter Button */}
      <div className="mt-8">
        <button
          onClick={handleFilterSubmit}
          className="w-full bg-blue-600 text-white font-semibold text-lg px-4 py-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-200"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
