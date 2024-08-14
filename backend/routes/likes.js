import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js'; // Import the User model
import authMiddleware from '../middleware/authMiddleware.js';
import Like from '../models/Like.js';

const router = express.Router();

// Like a Post
router.post('/:postId/like', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId); // Find the user

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (user.likedPosts.includes(postId)) {
      return res.status(400).json({ error: 'User has already liked this post' });
    }

    // Create a new like (optional: depends on whether you're using a Like model)
    const like = new Like({ post: postId, user: userId });
    await like.save();

    // Increment the like count on the post
    post.likes += 1;
    await post.save();

    // Add the post ID to the user's likedPosts array
    user.likedPosts.push(postId);
    await user.save();

    res.status(200).json({ message: 'Post liked successfully', likes: post.likes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Unlike the Post
router.post('/:postId/unlike', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId); // Find the user

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user has liked the post
    if (!user.likedPosts.includes(postId)) {
      return res.status(400).json({ error: 'User has not liked this post' });
    }

    // Remove the like (optional: depends on whether you're using a Like model)
    await Like.deleteOne({ post: postId, user: userId });

    // Decrement the like count if it's greater than 0
    if (post.likes > 0) {
      post.likes -= 1;
      await post.save();
    }

    // Remove the post ID from the user's likedPosts array
    user.likedPosts = user.likedPosts.filter(id => id.toString() !== postId);
    await user.save();

    res.status(200).json({ message: 'Post unliked successfully', likes: post.likes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Likes for a Post
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json("Post not found");
    }

    res.json({ likes: post.likes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
