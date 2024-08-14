import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
}, { timestamps: true });

// Ensure a user can only comment once per post
CommentSchema.index({ post: 1, user: 1 }, { unique: true });

export default mongoose.model('Comment', CommentSchema);
