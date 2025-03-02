import { useNavigate } from "react-router-dom";
import AdminSidebar from "../layouts/AdminSidebar";
import { AdminVerify } from "../api/authApi";
import { useEffect, useState } from "react";

const AdminRoute = () => {

  const [isVerified, setIsVerified] = useState(null); // Store verification status
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        await AdminVerify();
        setIsVerified(true);
      } catch (error) {
        // If verification fails, remove user data, dispatch logout, and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true }); // Redirect to login page and replace to replace backroute in the stack to login 
      }
    };

    verifyAdmin();
  }, []);


  
  return  isVerified=== true ? (
    <div>
      <AdminSidebar />
      
    </div>
  ) : null;
};

export default AdminRoute;
