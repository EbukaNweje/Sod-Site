import React, { useEffect, useState } from "react";
import "./AdminCss/Adminland.css";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminPage = () => {
  const [admin, setAdmin] = useState(null)
  const id = useSelector((state)=> state.id)
  console.log(id)

  const getOne = async() =>{
    try{
      const res = await axios.get(`https://sod-back-end.vercel.app/api/admindata/${id} `)
      console.log(res)
      setAdmin(res?.data)
    }
    catch (error){
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
   if (id) getOne();
  }, [id])
  

  const adminData = {
    name: "John Doe",
    role: "Super Admin",
    email: "admin@example.com",
    phone: "+234 801 234 5678",
    username: "admin",
    profilePic: "https://via.placeholder.com/150", 
    lastLogin: "February 27, 2025",
    actions: ["Updated product listings", "Approved order #4567", "Added new admin"],
  };

  return (
    <div className="AdminPage">
      <div className="admin-profile">
        {/* <img src={adminData.profilePic} alt="Admin" className="admin-pic" /> */}
      <div className="admin-info">
      <h2>{admin?.fullName}</h2>
      <p>{adminData.role}</p>
      </div>
      </div>
      

      <div className="admin-details">
        <h3>Account Information</h3>
        <p><strong>Email:</strong> {admin?.email}</p>
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
