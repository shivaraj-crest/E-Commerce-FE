import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import {publicRoutes,adminRoutes} from "./routes";
import Loader from "./components/Loader";
import AdminRoute from "./routes/AdminRoute";

const App = () => {
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
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
