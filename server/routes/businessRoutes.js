// server/routes/businessRoutes.js
const express = require('express');
const { createBusiness } = require('../controllers/businessController');
const Business = require('../models/Business');

const router = express.Router();

// Route to create a new business
router.post('/create', createBusiness);

// Route to fetch business details by ID, including owner and users details
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('owner', 'firstName lastName address contactNumber email') // Populate owner details
      .populate('users', 'username firstName lastName email address contactNumber userType'); // Populate all associated users

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json({ business });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch business details', error: error.message });
  }
});

module.exports = router;
