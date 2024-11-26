import './navbar.css'; 
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import app from '../../assets/icons/apps.png';
import home from '../../assets/icons/home_icon.png';
import moon from '../../assets/icons/moon-line-icon.png';
import magnifier from '../../assets/icons/magnifier.png';
import bell from '../../assets/icons/bell.png';
import email from '../../assets/icons/email-outline.png';
import bright from "../../assets/icons/bright.png"
import logoutbt from "../../assets/icons/logout.png"
import jake from "../../assets/img/jake.jpg"
import { useAuth } from '../../context/authContext'; 




const Navbar = () => {
  const { user: currentUser, logout } = useAuth(); 
  const [ toggle, darkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');  // Navigate to login page after logout
  };


  return (
    <div className="navbar">
      <div className="left">
        <span>FooBar Social</span>
        <Link to={`/${currentUser.displayName}`}>
          <img className="icon" src={home} alt="Home" />
        </Link>
        {darkMode ? (
          <img className="icon" src={moon} alt="Sun" onClick={toggle} />
        ) : (
          <img className="icon" src={bright} alt="Moon" onClick={toggle} />
        )}
        <img className="icon" src={app} alt="app" />
        <div className="search">
          <img className="icon" src={magnifier} alt="Search" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <div className="logout">
          <img className="icon" src={logoutbt} alt="logout"  onClick={handleLogout} />
        </div>
        <img className="icon" src={email} alt="Email" />
        <img className="icon" src={bell} alt="Bell" />
        <div className="user">
          <img src={currentUser.profilePicture || jake} alt="Profile"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
