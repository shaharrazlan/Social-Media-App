const mongoose = require('mongoose');

// Define the comment schema
const commentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: String, required: true },
  userDisplayName: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Define the post schema with the embedded comments
const postSchema = new mongoose.Schema({
  desc: { type: String },
  img: { type: String }, // URL or path to the image file (optional)
  createdAt: { type: Date, default: Date.now },
  user: {
    displayName: { type: String, required: true },
    profilePicture: { type: String }
  },
  likedBy: { type: [String], default: [] }, // Array of user IDs who liked the post
  comments: { type: [commentSchema], default: [] } // Array of comment objects using commentSchema
});

module.exports = mongoose.model('Post', postSchema);
