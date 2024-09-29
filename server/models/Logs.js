const mongoose = require('mongoose');

// Define the Logs schema
const logsSchema = new mongoose.Schema({
  itemName: { type: String, required: true }, // Name of the item
  action: { type: String, enum: ['added', 'removed', 'sold'], required: true }, // Action performed
  quantity: { type: Number, required: true }, // Quantity added, removed, or sold
  date: { type: Date, default: Date.now }, // Date and time of the action
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, // Reference to the Item
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who performed the action
  username: { type: String, required: true }, // Username of the person who performed the action
  actionType: { type: String, enum: ['icon', 'manual', 'initial'], required: true }, // Action source type
});

const Logs = mongoose.model('Logs', logsSchema);

module.exports = Logs;
