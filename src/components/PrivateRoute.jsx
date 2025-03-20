import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const user = useSelector((state) => state?.id);
  
  if (!user?.id) {
    return <Navigate to="/admin-login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
