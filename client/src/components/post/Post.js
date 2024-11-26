import "./post.css";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import { useAuth } from '../../context/authContext';
import { usePosts } from '../../context/PostContext'; // Import PostContext hook
import favorite from '../../assets/icons/favorite.svg';
import favoriteBorder from '../../assets/icons/favorite_border.svg';
import shareIcon from '../../assets/icons/share_icon.svg';
import msgIcon from '../../assets/icons/textsms.svg';
import moreIcon from '../../assets/icons/more_horiz.svg';

const Post = ({ post }) => {
  const { user: currentUser } = useAuth();
  const { toggleLike, addComment, deletePost, editPost, editComment, deleteComment } = usePosts(); // Access context functions
  const [actionOpen, setActionOpen] = useState(false);

  const [liked, setLiked] = useState(post.likedBy.includes(currentUser.id));

  const [commentActionOpen, setCommentActionOpen] = useState({});
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editedDesc, setEditedDesc] = useState(post.desc);
  const [editedImg, setEditedImg] = useState(post.img);

  const [isEditingComment, setIsEditingComment] = useState(null); // Holds the comment ID currently being edited
  const [editedCommentText, setEditedCommentText] = useState("");

  useEffect(() => {
    setComments(post.comments || []);
  }, [post.comments]);


  const timeSince = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds + 1} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  const handleToggleLike = async () => {
    try {
      await toggleLike(post._id, currentUser.id);
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentClick = () => {
    setCommentOpen(!commentOpen);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
  
    const commentData = {
      userId: currentUser.id,
      userDisplayName: currentUser.displayName,
      text: newComment
    };
  
    console.log("Prepared comment data:", commentData);
  
    try {
      const addedComment = await addComment(post._id, commentData);
  
      if (addedComment) {
        console.log("New comment added:", addedComment);
        setComments([...comments, addedComment]); // Update local comments state
        setNewComment(""); // Clear input field
        console.log("Comments data:", comments);
      } else {
        console.error("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post._id);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = async () => {
    await editPost(post._id, { desc: editedDesc, img: editedImg });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File size (KB):", file.size / 1024);
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too large. Please select an image under 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setEditedImg(reader.result); // Set the image as base64
      reader.readAsDataURL(file);
    }
  };

  const handleEditCommentToggle = (commentId, currentText) => {
    setIsEditingComment(commentId);
    setEditedCommentText(currentText);
  };

  const handleSaveCommentEdit = async (commentId) => {

    console.log("Editing comment with ID:", commentId); // Log comment ID
    if (!commentId) {
        console.error("No commentId provided for editing");
        return;
    }
    await editComment(post._id, commentId, editedCommentText);
    setIsEditingComment(null); // Close the edit mode
};

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(post._id, commentId);
    }
  };

  const toggleCommentActionMenu = (commentId) => {
    setCommentActionOpen((prev) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };
  
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.user.profilePicture} alt="Profile" />
            <div className="details">
              <Link to={`/profile/${post.user.displayName}`} className="name">
              {post.user.displayName}
              </Link>
              <span className="date">{timeSince(post.createdAt)}</span>
            </div>
          </div>
          <div className="more" onClick={() => setActionOpen(!actionOpen)}>
            <img src={moreIcon} alt="More options" />
            {actionOpen && (
              <div className="post-actions">
                <button onClick={handleEditToggle}>{isEditing ? "Cancel" : "Edit"}</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
        
        <div className="content">
          {isEditing ? (
            <>
              <textarea value={editedDesc} onChange={(e) => setEditedDesc(e.target.value)} />
              <input type="file" onChange={handleImageChange} />
              {editedImg && <img src={editedImg} alt="Preview" />}
              <button onClick={handleSaveEdit}>Save</button>
            </>
          ) : (
            <>
              <p>{post.desc}</p>
              {post.img && <img src={post.img} alt="Post content" />}
            </>
          )}
        </div>

        <div className="info">
          <div className="item" onClick={handleToggleLike}>
            <img src={liked ? favorite : favoriteBorder} alt="Likes" />
            {liked ? "Liked" : "Like"}
          </div>
          <div className="item" onClick={handleCommentClick}>
            <img src={msgIcon} alt="Comments" />
            Comments
          </div>
          <div className="item">
            <img src={shareIcon} alt="Share" />
            Share
          </div>
        </div>

        {commentOpen && (
          <div className="comments-section">
            <div className="write">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button onClick={handleAddComment}>Post</button>
            </div>
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <img src={comment.userProfilePicture} alt="User" />
                <div className="info">
                  <div className="username">{comment.userDisplayName || "Anonymous"}</div>
                  {isEditingComment === comment._id ? (
                    <div className="comment-edit">
                      <input
                        type="text"
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                        placeholder="Edit your comment..."
                      />
                      <button className="save-comment-button" onClick={() => handleSaveCommentEdit(comment._id)}>
                        Save
                      </button>
                      <button className="cancel-comment-button" onClick={() => setIsEditingComment(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="text">{comment.text}</p>
                  )}
                  <div className="date">{timeSince(comment.createdAt)}</div>
                  {comment.userId === currentUser.id && (
                    <div className="more-comment" onClick={() => toggleCommentActionMenu(comment._id)}>
                      <img src={moreIcon} alt="More options" />
                      {commentActionOpen[comment._id] && (
                        <div className="comment-actions">
                          <button onClick={() => handleEditCommentToggle(comment._id, comment.text)}>Edit</button>
                          <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
