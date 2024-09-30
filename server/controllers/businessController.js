const Business = require('../models/Business');
const User = require('../models/User');
const Inventory = require('../models/Inventory');

// Controller to create a new business and link owner
exports.createBusiness = async (req, res) => {
  const { businessName, ownerId } = req.body;

  try {
    // Check if business name is unique
    const existingBusiness = await Business.findOne({ name: businessName });
    if (existingBusiness) {
      return res.status(400).json({ message: 'Business name already exists.' });
    }

    // Check if the user is a valid owner
    const owner = await User.findById(ownerId);
    if (!owner || owner.userType !== 'owner') {
      return res.status(400).json({ message: 'Invalid owner user.' });
    }

    // Create a new Business and Inventory
    const newBusiness = new Business({ name: businessName, owner: owner._id });
    await newBusiness.save();

    // Create an Inventory for the Business
    const newInventory = new Inventory({ business: newBusiness._id });
    await newInventory.save();

    // Link the Inventory to the Business
    newBusiness.inventory = newInventory._id;
    await newBusiness.save();

    // Link the owner to the new Business
    owner.business = newBusiness._id;
    await owner.save();

    res.status(201).json({ message: 'Business and Inventory created successfully.', business: newBusiness });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create business.', error: error.message });
  }
};
