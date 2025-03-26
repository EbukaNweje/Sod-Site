import React, { useEffect, useState } from "react";
import "./Admin/AdminCss/Adminland.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  
const Useracct = () => {
  const [admin, setAdmin] = useState(null)
  const userId = useSelector((state)=> state.id)
  console.log("userAcct id", userId)
const nav = useNavigate()

  const getOne = async() =>{
    try{
      const res = await axios.get(`https://sod-back-end.vercel.app/api/oneuserdata/${userId} `)
      console.log(res.data.data)
      setAdmin(res?.data?.data)
    }
    catch (error){
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
   if (userId) getOne();
  }, [userId])
  

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
        <p><strong>Email:</strong>{admin?.email} </p>
        <p><strong>Username:</strong>{admin?.username} </p>
        <p><strong>Wallet balance:</strong>{admin?.balance} </p>
        <p><strong>Account created At:</strong> {admin?.createdAt} </p>
        <p><strong>Account last updated At:</strong> {admin?.updatedAt} </p>
      </div>
      <div className="admin-actions">
        <button className="settings-btn" onClick={()=> nav('edit-profile')} >Edit Profile</button>
      </div>
    </div>
  );
};

export default Useracct;
