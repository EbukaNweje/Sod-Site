import React from "react";
import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state?.id);

  return (
    <div>
      <h1>Welcome, {user?.username || "User"}!</h1>
      <p>Your Dashboard</p>
    </div>
  );
};

export default User;
