import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Allow only authenticated admin users
  return isAuthenticated && user?.role === "admin" ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default AdminRoute;
