import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useCattle } from '../../api/useCattle';

const COPY = {
  [ROLES.ADMIN]: 'Manage users and oversee the whole system.',
  [ROLES.MANAGER]: 'Keep the herd records accurate and the team on task.',
  [ROLES.VET]: 'Review the herd and keep health histories up to date.',
  [ROLES.WORKER]: 'Register animals and check the herd during your rounds.'
};

// Shared shell for the four role dashboards. Later branches add role-specific widgets here.
const Dashboard = () => {
  const { user, hasRole } = useAuth();
  const { cattle, loading } = useCattle();

  const total = cattle.length;
  const needAttention = cattle.filter((c) => c.health === 'Fair' || c.health === 'Poor').length;
  const canAdd = hasRole(ROLES.ADMIN, ROLES.MANAGER, ROLES.WORKER);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1>Hello, {user.name.split(' ')[0]}</h1>
          <p className="muted">{user.role} · {COPY[user.role]}</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="card stat">
          <span className="stat-label">Cattle in herd</span>
          <span className="stat-value">{loading ? '…' : total}</span>
        </div>
        <div className="card stat">
          <span className="stat-label">Need attention</span>
          <span className="stat-value">{loading ? '…' : needAttention}</span>
          <span className="muted">Health rated Fair or Poor</span>
        </div>
      </div>

      <div className="card">
        <h3>Quick actions</h3>
        <div className="card-actions">
          <Link to="/cattle" className="btn btn-primary">View cattle</Link>
          {canAdd && <Link to="/cattle/add" className="btn btn-outline">Add cattle</Link>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
