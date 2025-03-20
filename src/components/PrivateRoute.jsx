import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const admintoken = useSelector((state) => state?.adminToken);
  
  if (!admintoken) {
    return <Navigate to="/admin-login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
