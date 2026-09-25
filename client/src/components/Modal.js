import React from 'react';

const Modal = ({ title, children, onCancel, onConfirm, confirmText = 'Confirm', loading = false }) => (
  <div className="modal-backdrop" onClick={onCancel}>
    <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
      <h3>{title}</h3>
      <div className="modal-body">{children}</div>
      <div className="modal-actions">
        <button className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Working…' : confirmText}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
