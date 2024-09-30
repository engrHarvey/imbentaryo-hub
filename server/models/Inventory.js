const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', unique: true, required: true }, // One inventory per business
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }], // Array of item references
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
