import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaPlus } from "react-icons/fa";
import "./Admin/AdminCss/Adminland.css";
import { useSelector } from "react-redux";

const UserDashHead = () => {
  const user = useSelector((state)=> state?.User);   

  return (
    <div className="Sidebar">
      <nav className="nav-links">
        <NavLink to={`/user-dashboard/${user?.data?.fullName}`} className="nav-item">
          <FaTachometerAlt className="icon" />
          <span>Account settings</span>
        </NavLink>
        <NavLink to="fund-wallet" className="nav-item">
          <FaPlus className="icon" />
          <span>Wallet</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default UserDashHead;
