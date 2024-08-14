// routes/bookmarks.js
import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Add Bookmark
router.post('/', authMiddleware, async (req, res) => {
  const { postId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user.bookmarkedPosts.includes(postId)) {
      user.bookmarkedPosts.push(postId);
      await user.save();
    }
    res.status(200).json({ message: 'Bookmark added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove Bookmark
router.delete('/', authMiddleware, async (req, res) => {
  const { postId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.bookmarkedPosts = user.bookmarkedPosts.filter(id => id.toString() !== postId);
    await user.save();
    res.status(200).json({ message: 'Bookmark removed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
