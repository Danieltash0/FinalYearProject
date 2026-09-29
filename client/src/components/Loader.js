import React from 'react';

const Loader = () => (
  <div className="loader-wrap" role="status" aria-live="polite">
    <div className="loader" />
    <span>Loading…</span>
  </div>
);

export default Loader;
