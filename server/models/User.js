const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, default: 'owner', enum: ['owner', 'sub-owner', 'employee'] },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' }, // Reference to the Business
});

const User = mongoose.model('User', userSchema);

module.exports = User;
