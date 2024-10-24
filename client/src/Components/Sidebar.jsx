import React from 'react';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="#profile">Profile</a></li>
        <li><a href="#classes">My Classes</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;