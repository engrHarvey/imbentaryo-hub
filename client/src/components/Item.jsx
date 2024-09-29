import React, { useState } from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import Modal from './Modal';
import axios from 'axios';

function Item({ item, onQuantityChange }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubtractModal, setShowSubtractModal] = useState(false);
  const [quantityToUpdate, setQuantityToUpdate] = useState(0);
  const [subtractAction, setSubtractAction] = useState('');

  // Handle add quantity request
  const handleAddQuantity = async () => {
    if (quantityToUpdate <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/item/update-item',
        { itemId: item._id, action: 'added', quantity: quantityToUpdate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowAddModal(false);
      onQuantityChange(); // Refresh the parent component
    } catch (error) {
      alert('Failed to update quantity: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle subtract quantity request
  const handleSubtractQuantity = async () => {
    if (quantityToUpdate <= 0 || !subtractAction) {
      alert('Please select a valid action and enter a quantity greater than 0');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/item/update-item',
        { itemId: item._id, action: subtractAction, quantity: quantityToUpdate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowSubtractModal(false);
      onQuantityChange(); // Refresh the parent component
    } catch (error) {
      alert('Failed to update quantity: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 transform hover:scale-105 transition duration-300 ease-in-out">
      {/* Item Card Display */}
      <img className="w-full h-48 object-cover" src={item.image} alt={item.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-2xl text-gray-800 mb-2">{item.name}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Value:</span> {item.value} {item.currency}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Quantity:</span> {item.quantity}
        </p>
      </div>
      <div className="px-6 py-4 flex justify-between items-center border-t">
        <button onClick={() => setShowAddModal(true)} className="hover:text-green-600 transform hover:scale-125 transition duration-300">
          <FaPlusCircle className="text-green-500 text-3xl" />
        </button>
        <button
          onClick={() => setShowSubtractModal(true)}
          disabled={item.quantity <= 0}
          className="hover:text-red-600 transform hover:scale-125 transition duration-300"
        >
          <FaMinusCircle className={`text-3xl ${item.quantity <= 0 ? 'text-gray-400' : 'text-red-500'}`} />
        </button>
      </div>

      {/* Add Quantity Modal */}
      <Modal isVisible={showAddModal} onClose={() => setShowAddModal(false)}>
        <div>
          <h2 className="text-lg font-bold text-green-700 mb-6 text-center">Add Quantity</h2>
          <input
            type="number"
            placeholder="Quantity to add"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mb-4 text-base"
            value={quantityToUpdate}
            onChange={(e) => setQuantityToUpdate(parseInt(e.target.value, 10))}
          />
          <button
            onClick={handleAddQuantity}
            className="w-full bg-green-500 text-white font-semibold text-md py-3 rounded-md hover:bg-green-600 transition duration-300 shadow-lg"
          >
            Add Quantity
          </button>
        </div>
      </Modal>

      {/* Subtract Quantity Modal */}
      <Modal isVisible={showSubtractModal} onClose={() => setShowSubtractModal(false)}>
        <div>
          <h2 className="text-lg font-bold text-red-600 mb-6 text-center">Update Quantity</h2>
          <select
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 mb-4 text-base"
            value={subtractAction}
            onChange={(e) => setSubtractAction(e.target.value)}
          >
            <option value="">Select Action</option>
            <option value="removed">Remove</option>
            <option value="sold">Sold</option>
          </select>
          <input
            type="number"
            placeholder="Quantity to subtract"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 mb-4 text-base"
            value={quantityToUpdate}
            onChange={(e) => setQuantityToUpdate(parseInt(e.target.value, 10))}
          />
          <button
            onClick={handleSubtractQuantity}
            className="w-full bg-red-500 text-white font-semibold text-md py-3 rounded-md hover:bg-red-600 transition duration-300 shadow-lg"
          >
            Update Quantity
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Item;
