import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import likeRoutes from './routes/likes.js';
import userRoutes from './routes/profile.js';
import bookmarkRoutes from './routes/bookmarks.js';
import authMiddleware from './middleware/authMiddleware.js';
import userPostRoutes from './routes/userposts.js';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/profile',authMiddleware ,userRoutes)
app.use('/posts', authMiddleware, postRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);
app.use('/bookmarks', bookmarkRoutes);
app.use('/', userPostRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
