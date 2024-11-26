import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext'; // Import the auth context to access current user

const FriendContext = createContext();

export const useFriend = () => useContext(FriendContext);

export const FriendProvider = ({ children }) => {
  const { user: currentUser } = useAuth(); // Access the current user from auth context
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  
  // Fetch the current user's friends
  const fetchFriends = useCallback(async () => {
    if (!currentUser) {
      console.error("User is not authenticated");
      return;
    }
    
    try {
      const response = await axios.get(`/api/friends/friends/userId=${currentUser.id}`);
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }, [currentUser]);

  // Send a friend request
  const sendFriendRequest = async (recipientId) => {
    if (!currentUser) {
      console.error("User is not authenticated");
      return;
    }
    
    try {
      await axios.post('/api/friends/friend-request', { recipientId, requesterId: currentUser.id });
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  // Accept a friend request
  const acceptFriendRequest = async (requestId) => {
    try {
      await axios.put(`/api/friends/accept-request/${requestId}`);
      alert("Friend request accepted!");
      setFriendRequests((prev) => prev.filter((req) => req._id !== requestId)); // Remove from pending requests
      fetchFriends(); // Refresh friends list
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  // Decline a friend request
  const declineFriendRequest = async (requestId) => {
    try {
      await axios.put(`/api/friends/decline-request/${requestId}`);
      alert("Friend request declined.");
      setFriendRequests((prev) => prev.filter((req) => req._id !== requestId)); // Remove from pending requests
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  // Fetch pending friend requests
  const fetchFriendRequests = useCallback(async () => {
    if (!currentUser) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await axios.get(`/api/friends/friend-requests/${currentUser.id}`);
      setFriendRequests(response.data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  }, [currentUser]);

  // Remove a friend
  const unfollowFriend = async (friendId) => {
    if (!currentUser) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await axios.delete(`/api/friends/unfollow/${friendId}`, { data: { userId: currentUser.id } });
      alert("Friend removed successfully.");
      fetchFriends(); // Refresh the friends list
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  // Check friendship status between users
  const checkFriendshipStatus = async (friendId) => {
    if (!currentUser) {
      console.error("User is not authenticated");
      return 'none';
    }

    try {
      const response = await axios.get(`/api/friends/check-friendship/${friendId}?userId=${currentUser.id}`);
      return response.data;
    } catch (error) {
      console.error("Error checking friendship status:", error);
      return 'none';
    }
  };

  return (
    <FriendContext.Provider value={{
      friends,
      friendRequests,
      fetchFriends,
      sendFriendRequest,
      acceptFriendRequest,
      declineFriendRequest,
      fetchFriendRequests,
      unfollowFriend,
      checkFriendshipStatus
    }}>
      {children}
    </FriendContext.Provider>
  );
};
