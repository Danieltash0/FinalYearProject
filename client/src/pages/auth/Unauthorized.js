import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Unauthorized = () => (
  <div className="auth-page">
    <div className="auth-card">
      <h1 className="auth-title">Access denied</h1>
      <p className="auth-subtitle">You don't have permission to view that page.</p>
      <Link to="/" className="auth-submit" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>
        Back to dashboard
      </Link>
    </div>
  </div>
);

export default Unauthorized;
