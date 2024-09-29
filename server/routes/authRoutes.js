const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Business = require('../models/Business');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, address, contactNumber, password, businessName, userType } = req.body;

  if (!businessName) {
    return res.status(400).json({ message: 'Business name is required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Create a new user as the business owner
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      address,
      contactNumber,
      password: hashedPassword,
      userType: userType || 'owner', // Ensure userType defaults to 'owner'
    });

    // Create a new Business with the owner
    const newBusiness = await Business.create({
      name: businessName,
      owner: newUser._id,
      users: [newUser._id], // Add the owner as the first user in the business
    });

    // Update the user's business reference
    newUser.business = newBusiness._id;
    await newUser.save();

    res.json({ message: 'Owner registered successfully and business created' });
  } catch (error) {
    res.status(400).json({ message: 'User registration failed', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).populate('business'); // Populate business details
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username, userType: user.userType }, 'SECRET_KEY');
  res.json({
    token,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
      business: user.business,
    },
  });
});

// Create User Route (Only for Owner)
router.post('/create-user', async (req, res) => {
  const { token, firstName, lastName, username, email, address, contactNumber, password, userType, businessId } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, 'SECRET_KEY');
    const owner = await User.findOne({ username: decoded.username, userType: 'owner' });

    if (!owner || owner.business.toString() !== businessId) {
      return res.status(403).json({ message: 'You are not authorized to create users for this business' });
    }

    if (userType === 'owner') {
      return res.status(400).json({ message: 'Cannot create another owner' });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      address,
      contactNumber,
      password: hashedPassword,
      userType,
      business: businessId,
    });

    // Update the business to include the new user
    await Business.findByIdAndUpdate(businessId, { $push: { users: newUser._id } });

    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'User creation failed', error: error.message });
  }
});

module.exports = router;
