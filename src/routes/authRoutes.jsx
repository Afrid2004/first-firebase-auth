import React, { useContext } from "react";
import { AuthContext } from "../context/authContext/authContext";
import { Navigate, useLocation } from "react-router";

const AuthRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthRoutes;
