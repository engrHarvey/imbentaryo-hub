const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// Route to get all categories and their subcategories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
});

module.exports = router;
