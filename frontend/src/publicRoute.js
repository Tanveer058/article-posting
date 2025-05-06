import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if the user is logged in

  if (token) {
    // If the user is logged in, redirect to the homepage
    return <Navigate to="/" />;
  }

  // If the user is not logged in, render the child component
  return children;
};

export default PublicRoute;