import React from 'react';
import { useAuth } from '../context/AuthContext';

const ROLE_LABELS = {
  manager: 'Farm Manager',
  vet: 'Veterinarian',
  worker: 'Worker',
  admin: 'Admin'
};

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome, {user?.name}</h1>
      <p>Signed in as {ROLE_LABELS[user?.role] || user?.role}.</p>
      <p>Role-specific dashboards land here as their feature branches merge in.</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Dashboard;
