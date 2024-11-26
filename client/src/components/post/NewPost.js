import React, { useState } from "react";
import { useAuth } from '../../context/authContext';
import { usePosts } from "../../context/PostContext";
import "./newpost.css";

const NewPost = ({ onPostSuccess }) => {
  const { createPost } = usePosts(); 
  const { user: currentUser } = useAuth();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File size (KB):", file.size / 1024);
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too large. Please select an image under 10MB.");
        return;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        setImg(reader.result); // Set Base64 string for preview
      };
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostData = {
      desc,
      img,
      user: {
        displayName: currentUser.displayName,
        profilePicture: currentUser.profilePicture
      }
    };
    createPost(newPostData); // Send post data to server
    onPostSuccess();
    setDesc("");
    setImg(null);
  };

  return (
    <form className="new-post" onSubmit={handleSubmit}>
      <textarea
        placeholder="What's on your mind?"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <input type="file" onChange={handleImageChange} />
      {img && <img src={img} alt="Preview" />}
      <button type="submit">Post</button>
    </form>
  );
};

export default NewPost;
