const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify the token and decode the payload
    const decodedUser = jwt.verify(token, 'SECRET_KEY');
    console.log('Decoded User:', decodedUser); // Log the decoded user object to confirm `id` is present

    // Verify that the decoded payload has the `id` field
    if (!decodedUser.id) {
      console.log('Decoded user does not have an id');
      return res.status(403).json({ message: 'Invalid token payload: User ID missing' });
    }

    // Find the user based on the decoded ID
    const user = await User.findById(decodedUser.id);
    if (!user) {
      console.log('User not found for ID:', decodedUser.id);
      return res.status(403).json({ message: 'User not found' });
    }

    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware
  } catch (err) {
    console.log('Invalid token:', err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
