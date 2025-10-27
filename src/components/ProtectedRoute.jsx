// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));


console.log('ProtectedRoute - User:', user); // ← यह देखो!

  if (!user) {
    console.log('No user found, redirect to login');
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    console.log('User is not admin:', user.role);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;