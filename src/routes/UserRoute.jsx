import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Allow only logged-in non-admin users
  return isAuthenticated && user?.role === "user" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserRoute;
