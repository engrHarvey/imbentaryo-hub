const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Ensure dotenv is loaded to access environment variables

const router = express.Router();

// Route to search for images using Google Custom Search API
router.get('/search-images', async (req, res) => {
  const { query } = req.query; // Get the search query from the request

  // Use environment variables for Google API
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  if (!apiKey || !searchEngineId) {
    return res.status(500).json({ message: 'API key or Search Engine ID not defined in environment variables' });
  }

  try {
    // Make a request to Google Custom Search API
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?q=${query}&searchType=image&key=${apiKey}&cx=${searchEngineId}`
    );

    // Check if the response has the expected data
    if (!response.data.items) {
      return res.status(500).json({ message: 'No images found' });
    }

    // Extract the top 3 image URLs from the response
    const images = response.data.items.slice(0, 3).map((item) => item.link);

    res.json({ images });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch images', error: error.message });
  }
});

module.exports = router;
