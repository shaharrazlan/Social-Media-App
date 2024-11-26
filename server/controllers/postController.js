// controllers/postController.js
const Post = require('../models/postModel');
const mongoose = require('mongoose');

// Create a new post

const createPost = async (req, res) => {
  try {
    const { desc, img, user } = req.body;

    // Create and save the new post
    const newPost = new Post({
      desc,
      img,
      user
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Send the saved post back to the client
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};


const fetchPosts = async (req, res) => {
  const { userDisplayName } = req.query; // Access userDisplayName from query parameters

  try {
    let posts;
    if (userDisplayName) {
      // If userDisplayName is provided, find posts by that user display name
      console.log(`Searching for posts by user display name: ${userDisplayName}`);
      posts = await Post.find({ "user.displayName": userDisplayName });
      console.log(`Found ${posts.length} posts for user display name: ${userDisplayName}`);
    } else {
      // Otherwise, retrieve all posts
      console.log("Retrieving all posts");
      posts = await Post.find();
      console.log(`Found ${posts.length} total posts`);
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};




  const addComment = async (req, res) => {
    const { postId } = req.params;
    const { userId, text, userDisplayName } = req.body;
  
    try {
      console.log("Received comment data:", { userId, text, userDisplayName }); // Log incoming data
  
      const post = await Post.findById(postId);
      if (!post) {
        console.error("Post not found with ID:", postId);
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const newComment = {
        _id: new mongoose.Types.ObjectId(),
        userId,
        userDisplayName,
        text,
        createdAt: new Date()
      };
      
      console.log("New comment created:", newComment); // Log the new comment
  
      post.comments.push(newComment);
      await post.save();
  
      console.log("Updated post with new comment:", post.comments); // Log updated comments array
  
      res.status(201).json(newComment); // Send new comment back as response
    } catch (error) {
      console.error("Error in addComment:", error);
      res.status(500).json({ message: 'Error adding comment', error });
    }
  };
  
  // Toggle like on a post
  const toggleLike = async (req, res) => {
    const { id } = req.params; // Post ID
    const { userId } = req.body;
  
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
  
      const index = post.likedBy.indexOf(userId);
      if (index === -1) {
        post.likedBy.push(userId); // Add like
      } else {
        post.likedBy.splice(index, 1); // Remove like
      }
  
      await post.save();
      res.status(200).json({ likedBy: post.likedBy });
    } catch (error) {
      res.status(500).json({ message: 'Error toggling like', error });
    }
  };

  const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { desc, img } = req.body;
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { desc, img },
        { new: true } // Return the updated post
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json(updatedPost); // Send updated post back to client
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post", details: error.message });
    }
  };

  const editComment = async (req, res) => {
    const { postId, commentId } = req.params;
    const { newText } = req.body;
  
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      const comment = post.comments.id(commentId);
      if (!comment) return res.status(404).json({ error: "Comment not found" });
  
      comment.text = newText;
      await post.save();
  
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "Error editing comment", details: error.message });
    }
  };
  
  const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;
  
    try {
      // Use the $pull operator to remove the comment directly
      const post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: { _id: commentId } } }, // Removes comment with the specific ID
        { new: true } // Returns the updated document
      );
  
      if (!post) {
        console.error("Post not found");
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error.message);
      res.status(500).json({ error: "Error deleting comment", details: error.message });
    }
  };
  
  
  
  
  module.exports = {
    createPost,
    fetchPosts,
    addComment,
    toggleLike,
    deletePost,
    updatePost,
    editComment,
    deleteComment,

  };
  