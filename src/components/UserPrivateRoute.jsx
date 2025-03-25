import { Outlet, Navigate } from "react-router-dom";

const UserPrivateRoute = () => {
  const isAuthenticated = true; // Replace with actual auth logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default UserPrivateRoute;
