import React from 'react';
import './Sidebar.css'; 
import logo from '../Assets/logo.png';
import {Link} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <div className='logo'>
          <img src={logo}  width={80} height={80}  alt="logo" />
          StudySwap
        </div>
        <hr />
        <li><Link to={"/home"}>Home</Link></li>
        <li><Link to={"/classes"}>My Classes</Link></li>
        <li><Link to={"/upload"}>Find Classes</Link></li>
        <li><Link to={"/profile"}>Profile</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;