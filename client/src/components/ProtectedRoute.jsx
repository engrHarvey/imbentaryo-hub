import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for the presence of a token

  if (!token) {
    // If no token is present, redirect to login page
    return <Navigate to="/login" />;
  }

  // If the token exists, render the child components (protected content)
  return children;
};

export default ProtectedRoute;
