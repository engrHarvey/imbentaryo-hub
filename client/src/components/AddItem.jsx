import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddItem() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [value, setValue] = useState(0);
  const [currency, setCurrency] = useState('Philippine peso');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [image, setImage] = useState('');
  const [imageResults, setImageResults] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://imbentaryo-hub.onrender.com/api/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle image search using the item name
  const handleSearchImages = async () => {
    try {
      const response = await axios.get(`https://imbentaryo-hub.onrender.com/api/images/search-images?query=${name}`);
      setImageResults(response.data.images); // Store the fetched images
    } catch (error) {
      alert('Failed to search images: ' + error.message);
    }
  };

  // Filter subcategories based on selected category
  const subCategories = categories.find((cat) => cat.name === category)?.subCategories || [];

  const handleAddItem = async () => {
    if (!name || !category || !quantity || value === 0) {
      alert('Please provide item name, category, quantity, and value.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://imbentaryo-hub.onrender.com/api/item/add-item',
        {
          name,
          category,
          subCategory,
          value,
          currency,
          quantity: parseInt(quantity),
          brand,
          expirationDate,
          image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Item added successfully');
      setName('');
      setCategory('');
      setSubCategory('');
      setValue(0);
      setCurrency('Philippine peso');
      setQuantity('');
      setBrand('');
      setExpirationDate('');
      setImage('');
      setImageResults([]);
    } catch (error) {
      alert('Failed to add item: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Add New Item</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Search and Display Image Results */}
        <div className="col-span-2 flex items-center space-x-4">
          <button
            onClick={handleSearchImages}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-400 transition duration-300 shadow-md"
          >
            Search Images
          </button>
          {image && (
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-medium mb-2">Selected Image:</h3>
              <img src={image} alt="Selected" className="w-32 h-32 rounded-lg border-4 border-blue-500" />
            </div>
          )}
        </div>

        <div className="col-span-2 overflow-x-auto flex space-x-4 p-2 bg-gray-100 rounded-lg">
          {imageResults.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="search result"
              className={`w-24 h-24 rounded-lg border-2 cursor-pointer transition duration-300 ${
                img === image ? 'border-blue-500 shadow-lg' : 'border-gray-300'
              }`}
              onClick={() => setImage(img)}
            />
          ))}
        </div>

        {/* Category and Sub-Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!category}
        >
          <option value="">Select Sub Category</option>
          {subCategories.map((subCat, index) => (
            <option key={index} value={subCat}>
              {subCat}
            </option>
          ))}
        </select>

        {/* Value and Currency */}
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Philippine peso">Philippine peso</option>
          <option value="US dollar">US dollar</option>
          <option value="Euro">Euro</option>
          <option value="Japanese yen">Japanese yen</option>
        </select>

        {/* Quantity, Brand, and Expiration Date */}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Brand (Optional)"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Add Item Button */}
        <div className="col-span-2 mt-6">
          <button
            onClick={handleAddItem}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300 shadow-md"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
