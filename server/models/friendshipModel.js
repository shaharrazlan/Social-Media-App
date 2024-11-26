const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who sent the friend request
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who received the request
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model("Friendship", friendshipSchema);
