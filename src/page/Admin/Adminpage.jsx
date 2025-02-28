import React from "react";
import "./AdminCss/Adminland.css";

const AdminPage = () => {
  const adminData = {
    name: "John Doe",
    role: "Super Admin",
    email: "admin@example.com",
    phone: "+234 801 234 5678",
    username: "admin123",
    profilePic: "https://via.placeholder.com/150", 
    lastLogin: "February 27, 2025",
    actions: ["Updated product listings", "Approved order #4567", "Added new admin"],
  };

  return (
    <div className="AdminPage">
      <div className="admin-profile">
        <img src={adminData.profilePic} alt="Admin" className="admin-pic" />
      <div className="admin-info">
      <h2>{adminData.name}</h2>
      <p>{adminData.role}</p>
      </div>
      </div>
      

      <div className="admin-details">
        <h3>Account Information</h3>
        <p><strong>Email:</strong> {adminData.email}</p>
        <p><strong>Phone:</strong> {adminData.phone}</p>
        <p><strong>Username:</strong> {adminData.username}</p>
        <p><strong>Last Login:</strong> {adminData.lastLogin}</p>
      </div>

      <div className="admin-activity">
        <h3>Recent Activities</h3>
        <ul>
          {adminData.actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>

      <div className="admin-actions">
        <button className="settings-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default AdminPage;
