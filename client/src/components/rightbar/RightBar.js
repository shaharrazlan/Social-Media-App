import "./rightbar.css";


import React, { useEffect } from 'react';
import jake from "../../assets/img/jake.jpg"
import amy from "../../assets/img/Amy_Santiago.png"
import holt from "../../assets/img/holt.jpeg"
import terry from "../../assets/img/terry.jpeg"
import { useFriend } from "../../context/friendContext";




const RightBar = () => {
  const { friendRequests, fetchFriendRequests, acceptFriendRequest, declineFriendRequest } = useFriend();

  // Fetch friend requests when the component mounts
  useEffect(() => {
    fetchFriendRequests();
  }, [fetchFriendRequests]);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Friend Requests</span>
          {friendRequests.length > 0 ? (
            friendRequests.map((request) => (
              <div key={request._id} className="friend-request">
                <div className="userInfo">
                <img src={request.requester?.profilePic || terry} alt="" />
                  <span>{request.requester?.displayName || 'Unknown User'}</span>
                </div>
                <div className="buttons">
                  <button onClick={() => acceptFriendRequest(request._id)}>Accept</button>
                  <button onClick={() => declineFriendRequest(request._id)}>Decline</button>
                </div>
              </div>
            ))
          ) : (
            <p>No new friend requests</p>
          )}
        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={jake} alt="" />
              <p><span>Jake Peralta</span> changed their profile picture</p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={amy} alt="" />
              <p><span>Amy Santiago</span> changed their cover picture</p>
            </div>
            <span>5 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={terry} alt="" />
              <p><span>Terry Jeffords</span> changed their profile picture</p>
            </div>
            <span>10 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={holt} alt="" />
              <p><span>Ray Holt</span> changed their cover picture</p>
            </div>
            <span>20 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online Friends</span>
          {/* Add Online Friends list here if needed */}
        </div>
      </div>
    </div>
  );
};

export default RightBar;