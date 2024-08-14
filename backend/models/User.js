import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Array of liked post IDs
  bookmarkedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] // Array of bookmarked post IDs
}, {
  timestamps: true, // Optional: to add createdAt and updatedAt timestamps
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', UserSchema);
