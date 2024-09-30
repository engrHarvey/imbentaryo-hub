const express = require('express');
const jwt = require('jsonwebtoken');
const Item = require('../models/Item');
const Logs = require('../models/Logs'); // Import the Logs model
const User = require('../models/User');

const router = express.Router();

// Middleware to validate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Middleware to validate business access for items
const validateBusinessAccess = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username }).populate('business');
    if (!user || !user.business) {
      return res.status(403).json({ message: 'You are not associated with any business' });
    }

    req.businessId = user.business._id;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Route to get all items for a specific business
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).populate('business');
    if (!user) return res.status(403).json({ message: 'User not found' });

    // Filter items by the business of the user
    const items = await Item.find({ business: user.business._id }).populate('addedBy');
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items', error: error.message });
  }
});

// Route to add a new item
router.post('/add-item', authenticateToken, validateBusinessAccess, async (req, res) => {
  const { name, category, subCategory, value, quantity, brand, expirationDate, currency, image } = req.body;

  // Check required fields
  if (!name || !category || !subCategory || quantity == null || value == null) {
    return res.status(400).json({ 
      message: 'Missing required fields. Please provide name, category, subCategory, value, and quantity.' 
    });
  }

  try {
    const user = await User.findOne({ username: req.user.username }).populate('business');
    if (!user) return res.status(403).json({ message: 'User not found' });

    // Create a new item for the business
    const newItem = await Item.create({
      name,
      category,
      subCategory,
      value,
      currency: currency || 'Philippine peso',
      quantity,
      brand,
      expirationDate,
      image,
      business: user.business._id, // Link item to the business
      addedBy: user._id,
    });

    // Create a log for item creation
    await Logs.create({
      itemName: name,
      action: 'added',
      quantity,
      item: newItem._id,
      user: user._id,
      username: user.username,
      actionType: 'initial',
      business: user.business._id // Associate log with the business
    });

    res.json({ message: 'Item added successfully and log created', item: newItem });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add item and create log', error: error.message });
  }
});

// Route to update the quantity of an item
router.post('/update-item', authenticateToken, validateBusinessAccess, async (req, res) => {
  const { itemId, action, quantity } = req.body;

  // Validate request body
  if (!itemId || !action || quantity == null) {
    return res.status(400).json({ message: 'Invalid request data. Please provide itemId, action, and quantity.' });
  }

  try {
    const item = await Item.findById(itemId).populate('business');
    const user = await User.findOne({ username: req.user.username });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the item belongs to the user's business
    if (user.business.toString() !== item.business._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to modify this item' });
    }

    // Update item quantity based on action
    if (action === 'removed' || action === 'sold') {
      if (item.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough items in stock' });
      }
      item.quantity -= quantity;
    } else if (action === 'added') {
      item.quantity += quantity;
    } else {
      return res.status(400).json({ message: 'Invalid action type' });
    }

    // Save the updated item
    await item.save();

    // Create a new log entry for this update
    await Logs.create({
      itemName: item.name,
      action,
      quantity,
      item: item._id,
      user: user._id,
      username: user.username,
      actionType: 'icon',
      business: user.business._id // Associate log with the business
    });

    res.json({ message: `Item ${action} successfully and log created`, item });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update item', error: error.message });
  }
});

module.exports = router;
