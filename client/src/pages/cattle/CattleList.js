import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useCattle } from '../../api/useCattle';
import CattleCard from '../../components/CattleCard';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import { HEALTH_OPTIONS } from './CattleForm';

const CattleList = () => {
  const { hasRole } = useAuth();
  const { cattle, loading, error, deleteCattle } = useCattle();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [health, setHealth] = useState('all');
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const canManage = hasRole(ROLES.ADMIN, ROLES.MANAGER);
  const canAdd = hasRole(ROLES.ADMIN, ROLES.MANAGER, ROLES.WORKER);

  const term = search.trim().toLowerCase();
  const filtered = cattle.filter((c) => {
    const matches =
      !term ||
      [c.name, c.tag_number, c.breed].some((v) => v && v.toLowerCase().includes(term));
    return matches && (health === 'all' || c.health === health);
  });

  const confirmDelete = async () => {
    setDeleting(true);
    const result = await deleteCattle(toDelete.cattle_id);
    setDeleting(false);
    if (result.success) {
      setToDelete(null);
      setDeleteError('');
    } else {
      setDeleteError(result.error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1>Cattle</h1>
          <p className="muted">{cattle.length} animal{cattle.length === 1 ? '' : 's'} in the herd</p>
        </div>
        {canAdd && <Link to="/cattle/add" className="btn btn-primary">Add cattle</Link>}
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {deleteError && <div className="alert alert-error">{deleteError}</div>}

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search by name, tag or breed"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search cattle"
        />
        <select value={health} onChange={(e) => setHealth(e.target.value)} aria-label="Filter by health">
          <option value="all">All health statuses</option>
          {HEALTH_OPTIONS.map((h) => <option key={h}>{h}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card empty">
          <p>{cattle.length === 0 ? 'No cattle registered yet.' : 'No cattle match your search.'}</p>
        </div>
      ) : (
        <div className="cattle-grid">
          {filtered.map((cow) => (
            <CattleCard
              key={cow.cattle_id}
              cow={cow}
              canManage={canManage}
              onEdit={(c) => navigate(`/cattle/${c.cattle_id}/edit`)}
              onDelete={(c) => { setDeleteError(''); setToDelete(c); }}
            />
          ))}
        </div>
      )}

      {toDelete && (
        <Modal
          title="Delete cattle"
          confirmText="Delete"
          loading={deleting}
          onCancel={() => setToDelete(null)}
          onConfirm={confirmDelete}
        >
          <p>
            Delete <strong>{toDelete.name || toDelete.tag_number}</strong> (tag {toDelete.tag_number})?
            This cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default CattleList;
