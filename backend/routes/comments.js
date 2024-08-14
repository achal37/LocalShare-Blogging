import express from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create or Update Comment
router.post('/', authMiddleware, async (req, res) => {
  const { post, content } = req.body;
  const userId = req.user.id;
  
  try {
    // Check if the user has already commented on this post
    const existingComment = await Comment.findOne({ post, user: userId });

    if (existingComment) {
      // Update existing comment
      existingComment.content = content;
      await existingComment.save();

      res.status(200).json({ message: 'Comment updated successfully', comment: existingComment });
    } else {
      // Create a new comment
      const newComment = new Comment({ post, user: userId, content });
      await newComment.save();

      // Update the Post with the new comment ID
      await Post.findByIdAndUpdate(post, { $push: { comments: newComment._id } });

      res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Comments for a Post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('user', 'name');
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
