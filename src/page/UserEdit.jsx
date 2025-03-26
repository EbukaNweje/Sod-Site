import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin/AdminCss/Adminland.css";

const UserEdit = () => {
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.data?.fullName || "",
    email: user?.data?.email || "",
    username: user?.data?.username || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://sod-back-end.vercel.app/api/updateUser/${user?.data?.id}`,
        formData
      );
      console.log(res.data);
      alert("Profile updated successfully");
      navigate("/user-dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="Edit">
      <h2>Edit Profile</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserEdit;
