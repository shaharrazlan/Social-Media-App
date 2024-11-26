import "./feed.css";
import Post from "../post/Post";
import React, { useEffect } from "react";
import { usePosts } from "../../context/PostContext"; 


const Feed = ( {pageType, userDisplayName} ) => {
  const { posts, fetchPosts, } = usePosts();


  useEffect(() => {
    if (pageType === "home") {
      fetchPosts(); 
    } else if (pageType === "profile" && userDisplayName) {
      fetchPosts(userDisplayName); }
  }, [pageType, fetchPosts]); 

  return (
    <div className="feed">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
