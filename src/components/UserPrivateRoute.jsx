import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPrivateRoute = () => {
  const user = useSelector((state) => state?.id);

  // Redirect to login if not authenticated
  if (!user?.id) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default UserPrivateRoute;
