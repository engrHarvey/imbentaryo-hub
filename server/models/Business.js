const mongoose = require('mongoose');

// Define Business schema
const businessSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Business name
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the owner user
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user references (sub-owner, employee)
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
