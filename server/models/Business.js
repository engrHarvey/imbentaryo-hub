const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Business name must be unique
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    validate: {
      validator: async function(value) {
        // Avoid validation during document creation
        if (!this.isNew) {
          const user = await mongoose.model('User').findById(value);
          return user && user.userType === 'owner';
        }
        return true;
      },
      message: 'The specified user must be an owner'
    }
  }, // Reference to the owner user
  users: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    validate: {
      validator: async function(value) {
        const user = await mongoose.model('User').findById(value);
        return user && user.userType !== 'owner';
      },
      message: 'Only sub-owners and employees can be added as additional users'
    }
  }], // Array of sub-owner and employee user references
  inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true }, // Single inventory reference
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
