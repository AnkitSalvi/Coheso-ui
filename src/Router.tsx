// src/Router.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequestTypeList from "./Pages/RequestTypeList/RequestTypeList";
import LoginPage from "./Pages/Login/LoginPage";
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoutes";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Coheso-ui" element={<LoginPage />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<RequestTypeList />} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
