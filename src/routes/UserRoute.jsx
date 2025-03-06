import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UserVerify } from "../api/authApi";
import UserSidebar from "../layouts/UserSidebar";

const UserRoute = () => {
  const { isAuthenticated, user,role } = useSelector((state) => state.auth);
  
  const [isVerified, setIsVerified] = useState(null); // Store verification status
  const navigate = useNavigate();

  useEffect(()=>{
   const verifyUser = async () => {
          try {
            await UserVerify(user);
            setIsVerified(true);
            console.log("hello user")
          } catch (error) {
            // If verification fails, remove user data, dispatch logout, and redirect
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login", { replace: true }); // Redirect to login page and replace to replace backroute in the stack to login 
          }
        }; 
    
        verifyUser();
  },[])


  // Allow only logged-in non-admin users
  //don't put login component naviagte in here in other condition otherwise it would be just infinite loop of 
  //routing from /user/products to login and login to user products
  return isVerified ? <UserSidebar/> : null;
};

export default UserRoute;
