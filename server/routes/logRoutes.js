const express = require('express');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library
const Logs = require('../models/Logs');
const User = require('../models/User');

const router = express.Router();

// Middleware to authenticate user token
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

// Middleware to validate business access for logs
const validateBusinessAccess = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username }).populate('business');
    if (!user || !user.business) {
      return res.status(403).json({ message: 'You are not associated with any business' });
    }

    // Attach business ID to request for use in routes
    req.businessId = user.business._id;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Route to fetch all logs sorted by date (latest at the top)
router.get('/', authenticateToken, validateBusinessAccess, async (req, res) => {
  try {
    // Filter logs by the business ID associated with the user
    const logs = await Logs.find({ business: req.businessId }).sort({ date: -1 }).populate('user').populate('item');
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
  }
});

// Endpoint to get sales logs grouped by month
router.get('/sales', authenticateToken, validateBusinessAccess, async (req, res) => {
  try {
    const salesLogs = await Logs.find({ action: 'sold', business: req.businessId });
    res.json(salesLogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sales logs', error: error.message });
  }
});

// Endpoint to get inventory logs grouped by month
router.get('/inventory', authenticateToken, validateBusinessAccess, async (req, res) => {
  try {
    const inventoryLogs = await Logs.find({ business: req.businessId });
    res.json(inventoryLogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inventory logs', error: error.message });
  }
});

// Endpoint to get monthly sales grouped by category
router.get('/sales-category', authenticateToken, validateBusinessAccess, async (req, res) => {
  try {
    const salesLogs = await Logs.find({ action: 'sold', business: req.businessId });
    res.json(salesLogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sales by category', error: error.message });
  }
});

module.exports = router;
