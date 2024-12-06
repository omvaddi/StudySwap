import React from 'react';
import './Sidebar.css'; 
import logo from '../Assets/logo.png';
import {Link} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <div className='logo'>
          {/* Display the logo image */}
          <img src={logo} width={80} height={80} alt="logo" />
          <span>StudySwap</span>
        </div>
        <hr />
        {/* Navigation links */}
        <li><Link to={"/home"}>Home</Link></li>
        <li><Link to={"/find"}>Find Classes</Link></li>
        <li><Link to={"/create"}>Create Class</Link></li>
        <li><Link to={"/profile"}>Profile</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;