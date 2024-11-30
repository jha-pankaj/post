// models/Post.js
const mongoose = require('mongoose');
const options = { timestamps: true };

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [String],
  createdAt: { type: Date, default: Date.now },
},options);


module.exports = mongoose.model('Post', PostSchema);
