const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.log('MongoDB connection error:', err));

const seedCategories = async () => {
  const categories = [
    { name: 'Electronics', subCategories: ['Mobile Phones', 'Laptops & Computers', 'Cameras & Drones', 'Audio & Video Devices', 'Wearable Technology', 'Home Appliances'] },
    { name: 'Fashion', subCategories: ['Men’s Clothing', 'Women’s Clothing', 'Shoes', 'Bags & Accessories', 'Watches & Jewelry', 'Eyewear'] },
    { name: 'Health & Beauty', subCategories: ['Skincare', 'Haircare', 'Makeup', 'Fragrances', 'Vitamins & Supplements', 'Personal Care'] },
    { name: 'Home & Living', subCategories: ['Furniture', 'Home Décor', 'Kitchen & Dining', 'Bedding & Linens', 'Tools & Hardware', 'Home Improvement'] },
    { name: 'Sports & Outdoors', subCategories: ['Exercise Equipment', 'Outdoor Gear', 'Sports Apparel', 'Camping & Hiking', 'Bikes & Scooters', 'Water Sports'] },
    { name: 'Toys, Kids & Babies', subCategories: ['Baby Gear', 'Diapers & Baby Care', 'Toys & Games', 'Kids’ Clothing', 'Baby Food & Formula'] },
    { name: 'Automotive', subCategories: ['Car Accessories', 'Motorcycles', 'Car Electronics', 'Tires & Wheels', 'Oils & Fluids'] },
    { name: 'Groceries', subCategories: ['Food & Beverages', 'Fresh Produce', 'Snacks', 'Health & Wellness Products', 'Household Supplies'] },
    { name: 'Pets', subCategories: ['Pet Food', 'Pet Accessories', 'Pet Health & Grooming', 'Pet Toys', 'Fish & Aquariums'] },
    { name: 'Books & Media', subCategories: ['Fiction & Non-Fiction Books', 'Music & Instruments', 'Magazines & Comics', 'Movies & TV Shows'] },
    { name: 'Gaming', subCategories: ['Consoles', 'Video Games', 'Gaming Accessories', 'PC Gaming'] },
    { name: 'Travel & Luggage', subCategories: ['Luggage & Travel Bags', 'Travel Accessories', 'Outdoor Gear'] },
  ];

  await Category.insertMany(categories);
  console.log('Categories seeded successfully!');
  mongoose.connection.close();
};

seedCategories();
