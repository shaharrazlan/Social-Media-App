import './profile.css';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import LeftBar from '../../components/leftbar/LeftBar';
import RightBar from '../../components/rightbar/RightBar';
import Feed from '../../components/feed/Feed';
import { useAuth } from '../../context/authContext';
import { useParams } from 'react-router-dom';
import facebook from '../../assets/img/facebook.png';
import whatsapp from '../../assets/img/whatsapp.png';
import twitter from '../../assets/img/twitter.png';
import tiktok from '../../assets/img/tik-tok.png';
import place from '../../assets/img/place.png';
import web from '../../assets/img/web.png';
import email from '../../assets/img/email.png';
import Morevert from '../../assets/img/Morevert.png';
import crew from '../../assets/img/thecrew.jpg';
import { useFriend } from '../../context/friendContext';


const Profile = () => {
  const { getUserByDisplayName, user: currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const { displayName } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sendFriendRequest, unfollowFriend, checkFriendshipStatus } = useFriend(); 
  const [requestStatus, setRequestStatus] = useState("none");
  const isCurrentUserProfile = currentUser?.displayName === displayName;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (displayName) {
        try {
          const userData = await getUserByDisplayName(displayName);
          setUserProfile(userData);
          
          // Check friendship status
          const friendshipStatus = await checkFriendshipStatus(userData.id);
          setRequestStatus(friendshipStatus);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
    fetchUserProfile();
  }, [displayName, getUserByDisplayName, checkFriendshipStatus]);


  const handleFollow = async () => {
    if (userProfile) {
      try {
        await sendFriendRequest(userProfile.id);
        setRequestStatus("pending");
      } catch (error) {
        console.error("Error sending friend request:", error);
      }
    }
  };

  const handleUnfollowOrCancel = async () => {
    if (userProfile) {
      try {
        await unfollowFriend(userProfile.id);
        setRequestStatus("none");
      } catch (error) {
        console.error("Error unfollowing or canceling request:", error);
      }
    }
  };

  const getButtonLabel = () => {
    if (requestStatus.status === "accepted") {
      return "Unfollow";
    } else if (requestStatus.status === "pending") {
      return requestStatus.role === "requester" ? "Request Sent" : "Waiting for Approval";
    }
    return "Follow";
  };
  
  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <LeftBar />
        <div className="profile-main">
          <div className="images">
            <img src={crew} alt="Cover" className="cover" />
            {userProfile && (
              <img src={userProfile.profilePicture} alt="Profile" className="profilePic" />
            )}
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <img src={facebook} alt="Facebook" className="icon facebook" />
                <img src={tiktok} alt="TikTok" className="icon tiktok" />
                <img src={twitter} alt="Twitter" className="icon twitter" />
                <img src={whatsapp} alt="WhatsApp" className="icon whatsapp" />
              </div>
              <div className="center">
                <span>{displayName}</span>
                <div className="info">
                  <div className="item">
                    <img src={place} alt="Location" className="icon" />
                    <span>USA</span>
                  </div>
                  <div className="item">
                    <img src={web} alt="Language" className="icon" />
                    <span>EN</span>
                  </div>
                </div>
                {!isCurrentUserProfile && (
                  requestStatus.status === "none" ? (
                    <button className="follow-button" onClick={handleFollow}>
                      {getButtonLabel()}
                    </button>
                  ) : (
                    <button className="unfollow-button" onClick={handleUnfollowOrCancel}>
                      {getButtonLabel()}
                    </button>
                  )
                )}
              </div>
              <div className="right">
                <img src={email} alt="Email" className="icon" />
                <img
                  src={Morevert}
                  alt="More"
                  className="icon"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
            </div>
            <div className="feed-container">
              {isCurrentUserProfile || requestStatus.status === "accepted" ? (
                <Feed pageType="profile" userDisplayName={displayName} />
              ) : (
                <p>{displayName} has locked their profile.</p>
              )}
            </div>
          </div>
        </div>
        <RightBar />
      </div>
    </div>
  );
};

export default Profile;
