import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const HEALTH_OPTIONS = ['Excellent', 'Good', 'Fair', 'Poor'];
export const GENDER_OPTIONS = ['Female', 'Male'];

export const emptyCattle = {
  tag_number: '',
  name: '',
  breed: '',
  health: 'Good',
  gender: 'Female',
  date_of_birth: '',
  notes: ''
};

// Shared by AddCattle and EditCattle
const CattleForm = ({ initial = emptyCattle, onSubmit, submitLabel, tagRequired = false }) => {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const result = await onSubmit(form);
    if (!result.success) {
      setError(result.error || 'Something went wrong');
      setSaving(false);
    }
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      {error && <div className="alert alert-error" role="alert">{error}</div>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tag_number">Tag number{tagRequired ? '' : ' (auto-generated if blank)'}</label>
          <input id="tag_number" name="tag_number" value={form.tag_number} onChange={handleChange} required={tagRequired} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="breed">Breed</label>
          <input id="breed" name="breed" value={form.breed} onChange={handleChange} placeholder="e.g. Holstein-Friesian, Jersey, Ayrshire" />
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth">Date of birth</label>
          <input id="date_of_birth" name="date_of_birth" type="date" max={today} value={form.date_of_birth} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
            {GENDER_OPTIONS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="health">Health status</label>
          <select id="health" name="health" value={form.health} onChange={handleChange}>
            {HEALTH_OPTIONS.map((h) => <option key={h}>{h}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={handleChange} />
      </div>

      <div className="card-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : submitLabel}
        </button>
        <Link to="/cattle" className="btn btn-secondary">Cancel</Link>
      </div>
    </form>
  );
};

export default CattleForm;
