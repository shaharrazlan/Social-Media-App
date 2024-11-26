// controllers/friendshipController.js
const Friendship = require('../models/friendshipModel');


exports.sendFriendRequest = async (req, res) => {
  try {
    const { recipientId, requesterId } = req.body;
  

    // Check if a request already exists
    let friendship = await Friendship.findOne({ requester: requesterId, recipient: recipientId });
    if (!friendship) {
      friendship = new Friendship({ requester: requesterId, recipient: recipientId });
      await friendship.save();
    }
    
    res.status(200).json({ message: "Friend request sent!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending friend request", error });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const friendship = await Friendship.findById(requestId);
    
    if (friendship) {
      friendship.status = 'accepted';
      await friendship.save();
      res.status(200).json({ message: "Friend request accepted!" });
    } else {
      res.status(404).json({ message: "Friend request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error accepting friend request", error });
  }
};

exports.declineFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const friendship = await Friendship.findById(requestId);

    if (friendship) {
      friendship.status = 'declined';
      await friendship.save();
      res.status(200).json({ message: "Friend request declined." });
    } else {
      res.status(404).json({ message: "Friend request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error declining friend request", error });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const userId = req.query;
    const friends = await Friendship.find({
      $or: [
        { requester: userId, status: 'accepted' },
        { recipient: userId, status: 'accepted' }
      ]
    }).populate("requester recipient");

    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: "Error fetching friends", error });
  }
};

exports.unfollowFriend = async (req, res) => {
  try {
    const { friendId } = req.params;
    const {userId} = req.body;

    // Find and delete the friendship where userId and friendId are in a friendship
    const friendship = await Friendship.findOneAndDelete({
      $or: [
        { requester: userId, recipient: friendId, status: 'accepted' },
        { requester: friendId, recipient: userId, status: 'accepted' }
      ]
    });

    if (friendship) {
      res.status(200).json({ message: "Friend removed successfully." });
    } else {
      res.status(404).json({ message: "Friendship not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing friend", error });
  }
};

exports.checkFriendshipStatus = async (req, res) => {
  const { friendId } = req.params;
  const { userId } = req.query;

  try {
    const friendship = await Friendship.findOne({
      $or: [
        { requester: userId, recipient: friendId },
        { requester: friendId, recipient: userId }
      ]
    });

    let status = 'none'; // Default status
    let role = null; // Default role

    if (friendship) {
      status = friendship.status === 'accepted' ? 'accepted' : 'pending';
      role = friendship.requester.toString() === userId ? 'requester' : 'recipient';
    }
    
    res.status(200).json({ status, role });
    
  } catch (error) {
    console.error("Error checking friendship status:", error);
    res.status(500).json({ message: "Error checking friendship status", error });
  }
};

exports.fetchPendingFriendRequests = async (req, res) => {
  const { userId } = req.params; // ID of the logged-in user

  try {
    const pendingRequests = await Friendship.find({
      recipient: userId,
      status: 'pending'
    })
    .populate('requester', 'displayName profilePic') // Include relevant fields for requester
    .exec();


    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error("Error fetching pending friend requests:", error);
    res.status(500).json({ message: "Error fetching pending friend requests", error });
  }
};



