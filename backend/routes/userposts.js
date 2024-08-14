import express from 'express';
import Post from '../models/Post.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get Posts by User
router.get('/user/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ author: userId })
      .populate('author', 'name')
      .populate('comments')
      .populate('likes');

    if (posts.length === 0) {
      return res.status(404).json({ error: "No posts found for this user" });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



export default router;
