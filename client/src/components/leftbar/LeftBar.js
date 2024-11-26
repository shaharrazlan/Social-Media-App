import "./leftbar.css";
import Friends from "../../assets/img/friends.png";
import Groups from "../../assets/img/groups.png";
import Market from "../../assets/img/market.png";
import Watch from "../../assets/img/watch.png";
import Memories from "../../assets/img/memories.png";
import Events from "../../assets/img/events.png";
import Gaming from "../../assets/img/gaming.png";
import Gallery from "../../assets/img/gallery.png";
import Videos from "../../assets/img/videos.png";
import Messages from "../../assets/img/messages.png";
import Tutorials from "../../assets/img/tutorials.png";
import Courses from "../../assets/img/courses.png";
import Fund from "../../assets/img/fund.png";
import { useAuth } from '../../context/authContext'; 




const LeftBar = () => {

    const { user: currentUser } = useAuth(); 

  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={currentUser.profilePicture} alt="Profile"/>
            <span>{currentUser.displayName}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
