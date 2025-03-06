import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import {publicRoutes,adminRoutes,userRoutes} from "./routes";
import Loader from "./components/Loader";
import AdminRoute from "./routes/AdminRoute";
import UserRoutes from "./routes/UserRoute"
import { UserVerify } from "./api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user,role } = useSelector((state) => state.auth);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const user = localStorage.getItem("user");
  //       if(!user){
  //         return;
  //       }
  //       console.log("userrrrrr")
  //       const response = await UserVerify(user);
  //       console.log("ehsdlfjalsdkfjsdlk",response);
  //       dispatch(loginSuccess(response));
        
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); // ✅ Runs only once on page reload


  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {publicRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          
          {/* Admin routes under a single parent route */}
          <Route path="/admin/*" element={<AdminRoute />}>  {/* Add * here */}
            {adminRoutes.map(route => (
              <Route 
                key={route.path}
                path={route.path}        // Remove the replace
                element={route.element}
              />
            ))}
          </Route>
          
          <Route path="/user/*" element={<UserRoutes />}>  {/* Add * here */}
            {userRoutes.map(route => (
              <Route 
                key={route.path}
                path={route.path}        // Remove the replace
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
