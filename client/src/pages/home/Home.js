// Home.js
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Stories from "../../components/stories/Stories";
import LeftBar from "../../components/leftbar/LeftBar";
import RightBar from "../../components/rightbar/RightBar";
import Feed from "../../components/feed/Feed";
import NewPost from "../../components/post/NewPost";
import { useState } from "react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewPostClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePostSuccess = () => {
    closeModal();
    // Here, Feed will automatically refresh posts from the server
  };



  return (
    <div className="home">
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div className="main-content">
          <div className="stories-container">
            <Stories />
            <button className="new-post-button" onClick={handleNewPostClick}>
              New Post
            </button>
          </div>
          <Feed pageType="home" /> 
        </div>
        <RightBar />
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <NewPost onPostSuccess={handlePostSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
