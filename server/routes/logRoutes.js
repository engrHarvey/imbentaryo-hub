const express = require('express');
const Logs = require('../models/Logs'); // Import the Logs model

const router = express.Router();

// Route to fetch all logs sorted by date (latest at the top)
router.get('/', async (req, res) => {
  try {
    const logs = await Logs.find().sort({ date: -1 }).populate('user').populate('item'); // Sort by date in descending order
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
  }
});

// Endpoint to get sales logs grouped by month
router.get('/sales', async (req, res) => {
  try {
    const salesLogs = await Logs.find({ action: 'sold' });
    res.json(salesLogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sales logs', error: error.message });
  }
});

// Endpoint to get inventory logs grouped by month
router.get('/inventory', async (req, res) => {
  try {
    const inventoryLogs = await Logs.find({});
    res.json(inventoryLogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inventory logs', error: error.message });
  }
});

// Endpoint to get monthly sales grouped by category
router.get('/sales-category', async (req, res) => {
  try {
    const salesLogs = await Logs.find({ action: 'sold' });
    res.json(salesLogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sales by category', error: error.message });
  }
});

module.exports = router;
