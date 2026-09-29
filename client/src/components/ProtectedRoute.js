import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

// Blocks unauthenticated visitors, and (optionally) roles outside allowedRoles
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoute;
