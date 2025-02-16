import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import allRoutes from "./routes";
import Loader from "./components/Loader";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {allRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
