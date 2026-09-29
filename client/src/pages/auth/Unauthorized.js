import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, dashboardPathFor } from '../../context/AuthContext';

const Unauthorized = () => {
  const { user } = useAuth();
  return (
    <div className="auth-container">
      <div className="auth-card center">
        <h2>Access denied</h2>
        <p className="muted">Your role does not have permission to view that page.</p>
        <Link to={user ? dashboardPathFor(user.role) : '/login'} className="btn btn-primary">
          {user ? 'Back to my dashboard' : 'Go to login'}
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
