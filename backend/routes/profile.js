import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/User.js';
const router = express.Router();

// Get user data
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      location: user.location,
      likedPosts: user.likedPosts, // Assuming likedPosts is a part of the user schema
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      bookmarkedPosts: user.bookmarkedPosts,
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Update User Data
router.post('/me/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;  // Get the user ID from the request parameters
    const { name, email, location } = req.body;  // Get the updated data from the request body

    // Find the user by ID and update the details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, location },
      { new: true }  // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
