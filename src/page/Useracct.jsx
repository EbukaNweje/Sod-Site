import React, { useEffect, useState } from "react";
import "./Admin/AdminCss/Adminland.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  
const Useracct = () => {
  const [admin, setAdmin] = useState(null)
  const id = useSelector((state)=> state.id)
  console.log("userAcct id", id)
const nav = useNavigate()

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
  

  return (
    <div className="AdminPage">
        
      <div className="admin-profile">
      <div className="admin-info">
      <h2>{admin?.fullName}</h2>
      <p>{admin?.username}</p>
      </div>
      </div>
      
      <div className="admin-details">
        <h3>Account Information</h3>
        <p><strong>Email:</strong> {admin?.email}</p>
        <p><strong>Username:</strong> {admin?.username}</p>
        <p><strong>Wallet balance:</strong> {admin?.username}</p>
        <p><strong>Last Login:</strong> {admin?.lastLogin}</p>
      </div>
      <div className="admin-actions">
        <button className="settings-btn" onClick={()=> nav('')} >Edit Profile</button>
      </div>
    </div>
  );
};

export default Useracct;
