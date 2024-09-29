const mongoose = require('mongoose');

// Define Item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  value: { type: Number, required: true }, // Value should be a number
  currency: { type: String, default: 'Philippine peso' }, // Default currency
  quantity: { type: Number, required: true },
  brand: { type: String }, // Optional
  expirationDate: { type: Date }, // Optional
  image: { type: String }, // New image field to store image URL
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
