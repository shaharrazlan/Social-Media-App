import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios"; // Assuming axios for API requests


// Create the context
const PostContext = createContext();

// Custom hook to use the PostContext
export const usePosts = () => useContext(PostContext);


export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const fetchPosts = useCallback(async (userDisplayName) => {
    try {
      const response = await axios.get(`/api/posts/getposts`, {
        params: { userDisplayName: userDisplayName || undefined }
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);
  

  // Function to create a new post
  const createPost = async (postData) => {
    try {
      const response = await axios.post("/api/posts", postData); // Endpoint for creating a new post
      setPosts((prevPosts) => [response.data, ...prevPosts]); // Add new post to local state
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const toggleLike = async (postId, userId) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/like`, { userId });
      const updatedPosts = posts.map(post =>
        post._id === postId ? { ...post, likedBy: response.data.likedBy } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const addComment = async (postId, commentData) => {
    try {
      console.log("Sending comment data to backend:", commentData);
  
      const response = await axios.post(`/api/posts/${postId}/comment`, commentData);
  
      console.log("Received new comment from backend:", response.data);
  
      const newComment = response.data;
  
      const updatedPosts = posts.map(post =>
        post._id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      );
  
      console.log("Updated posts array with new comment:", updatedPosts);
  
      setPosts(updatedPosts);
  
      // Ensure we return the new comment to the calling function in `Post.js`
      return newComment;
    } catch (error) {
      console.error("Error adding comment:", error);
      return null; // Optional: Return null in case of an error for better error handling
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const editPost = async (postId, updatedData) => {
    try {
      const response = await axios.put(`/api/posts/${postId}`, updatedData); // Assuming the PUT route for editing is `/api/posts/:id`
      const updatedPost = response.data;
  
      // Update the posts array in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const editComment = async (postId, commentId, newText) => {
    try {
      const response = await axios.put(`/api/posts/${postId}/comment/${commentId}`, { newText });
      const updatedComment = response.data;

      // Update the local state to immediately reflect the edited comment
      setPosts((prevPosts) =>
          prevPosts.map(post =>
              post._id === postId
                  ? {
                        ...post,
                        comments: post.comments.map(comment =>
                            comment._id === commentId ? updatedComment : comment
                        ),
                    }
                  : post
          )
      );
  
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };
  

  const deleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`/api/posts/${postId}/comment/${commentId}`);
      setPosts((prevPosts) =>
        prevPosts.map(post =>
            post._id === postId
                ? {
                      ...post,
                      comments: post.comments.filter(comment => comment._id !== commentId),
                  }
                : post
        )
    );

    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  
  

  return (
    <PostContext.Provider value={{ posts, fetchPosts, createPost, toggleLike, addComment, 
     deletePost, editPost, editComment, deleteComment }}>
      {children}
    </PostContext.Provider>
  );
};
