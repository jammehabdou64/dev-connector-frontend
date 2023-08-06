import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, redirectPath }) => {
  const { auth, authLoading } = useSelector((state) => state.auth);
  const user = Object.entries(auth).length > 0 ? true : false;
  if (!user && authLoading) {
    return <Navigate replace to={redirectPath ? redirectPath : "/login"} />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
