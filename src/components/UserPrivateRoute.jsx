import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPrivateRoute = () => {
  const id = useSelector((state) => state?.id); 

  return id ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserPrivateRoute;
