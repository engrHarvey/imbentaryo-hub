const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Main category name
  subCategories: [{ type: String }], // Array of subcategory names
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
