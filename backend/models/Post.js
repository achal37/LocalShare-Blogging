import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  location: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: { type: Number, default: 0 },
});

export default mongoose.model('Post', PostSchema);
