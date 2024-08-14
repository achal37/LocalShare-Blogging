import express from 'express';
import Post from '../models/Post.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create Post
router.post('/', authMiddleware, async (req, res) => {
  const { title, content, location } = req.body;
  try {
    const post = new Post({ title, content, location, author: req.user.id });
    post.likes = 0;
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Post
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, content, location } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.location = location || post.location;

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Post
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get a Post
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate('author', 'name');
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name').populate('comments').populate('likes');
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Posts by Location
router.get('/location/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const posts = await Post.find({ location: new RegExp(location, 'i') }) // Case-insensitive search
      .populate('author', 'name')
      .populate('comments')
      .populate('likes');

    if (posts.length === 0) {
      return res.status(404).json({ error: "No posts found for this location" });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
