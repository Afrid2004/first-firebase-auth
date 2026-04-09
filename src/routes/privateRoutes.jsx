import React, { useContext } from "react";
import { AuthContext } from "../context/authContext/authContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (user) {
    return children;
  }
  return <Navigate state={location?.pathname} to="/login" replace />;
};

export default PrivateRoutes;
