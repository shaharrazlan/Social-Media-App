// routes/friendshipRoutes.js
const express = require("express");
const { sendFriendRequest, acceptFriendRequest, declineFriendRequest, getFriends, unfollowFriend, checkFriendshipStatus,fetchPendingFriendRequests } = require("../controllers/friendshipController");

const router = express.Router();

router.post("/friend-request", sendFriendRequest); // Send a friend request
router.put("/accept-request/:requestId", acceptFriendRequest); // Accept a friend request
router.put("/decline-request/:requestId", declineFriendRequest); // Decline a friend request
router.get("/friends", getFriends); // Get all friends for a user
router.delete('/unfollow/:friendId', unfollowFriend);
router.get('/check-friendship/:friendId', checkFriendshipStatus);
router.get('/friend-requests/:userId', fetchPendingFriendRequests);


module.exports = router;
