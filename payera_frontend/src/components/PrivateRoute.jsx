import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();

  // Jika belum login, redirect ke login
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Jika sudah login, izinkan akses
  return children;
}

export default PrivateRoute;
