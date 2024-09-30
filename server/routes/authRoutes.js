const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Business = require('../models/Business');
const Inventory = require('../models/Inventory');

const router = express.Router();

// Register route for new owner
router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, address, contactNumber, password, businessName, userType } = req.body;

  if (!businessName) {
    return res.status(400).json({ message: 'Business name is required for owner registration' });
  }

  try {
    // Check if the email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      address,
      contactNumber,
      password: hashedPassword,
      userType: 'owner', // Explicitly set userType as 'owner'
    });

    // Save the new user first before creating the business
    await newUser.save();

    // Create a new Business for the owner only after the user is saved
    const newBusiness = new Business({
      name: businessName,
      owner: newUser._id, // Assign the newly created user as the owner
      users: [], // Do not add the owner to the users array
    });

    // Create an inventory for the new business
    const newInventory = new Inventory({
      business: newBusiness._id,
      items: [], // Initialize with an empty items array
    });

    // Link the inventory to the business
    newBusiness.inventory = newInventory._id;

    // Save the business and inventory in parallel
    await newInventory.save();
    await newBusiness.save();

    // Update the user with the business reference
    newUser.business = newBusiness._id;
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
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
  const { firstName, lastName, username, email, address, contactNumber, password, userType, businessId } = req.body;

  try {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Token must be provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, 'SECRET_KEY');
    const owner = await User.findOne({ username: decoded.username, userType: 'owner' });

    if (!owner || owner.business.toString() !== businessId) {
      return res.status(403).json({ message: 'You are not authorized to create users for this business' });
    }

    if (userType === 'owner') {
      return res.status(400).json({ message: 'Cannot create another owner for this business' });
    }

    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password for the new user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
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

    // Save the new user
    await newUser.save();

    // Update the business to include the new user
    await Business.findByIdAndUpdate(businessId, { $push: { users: newUser._id } });

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'User creation failed', error: error.message });
  }
});

module.exports = router;
