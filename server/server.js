const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const imageRoutes = require('./routes/imageRoutes');
const logRoutes = require('./routes/logRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Import the new category routes
const businessRoutes = require('./routes/businessRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/categories', categoryRoutes); // Register the category routes
app.use('/api/business', businessRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
