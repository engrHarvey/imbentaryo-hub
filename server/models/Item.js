const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  value: { type: Number, required: true },
  currency: { type: String, default: 'Philippine peso' },
  quantity: { type: Number, required: true },
  brand: { type: String },
  expirationDate: { type: Date },
  image: { type: String },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true }, // Link item to a business
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference the user who created it
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
