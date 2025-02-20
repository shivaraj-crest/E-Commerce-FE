import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import allRoutes from "./routes";
import Loader from "./components/Loader";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {allRoutes.map(({ path, element, children }) => (
            <Route key={path} path={path} element={element}>
              {children?.map(({ path, element }) => {
                console.log("path",path);
              
                return <Route key={path} path={path} element={element} />
})}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
