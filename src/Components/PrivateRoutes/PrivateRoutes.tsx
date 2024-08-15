import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
