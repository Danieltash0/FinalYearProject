import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCattle } from '../../api/useCattle';
import Loader from '../../components/Loader';
import CattleForm, { emptyCattle } from './CattleForm';

const EditCattle = () => {
  const { id } = useParams();
  const { getCattleById, updateCattle } = useCattle();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let active = true;
    getCattleById(id).then((c) => {
      if (!active) return;
      if (!c) return setMissing(true);
      setInitial({
        ...emptyCattle,
        tag_number: c.tag_number || '',
        name: c.name || '',
        breed: c.breed || '',
        health: c.health || 'Good',
        gender: c.gender || 'Female',
        date_of_birth: c.date_of_birth ? String(c.date_of_birth).slice(0, 10) : '',
        notes: c.notes || ''
      });
    });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (form) => {
    const result = await updateCattle(id, form);
    if (result.success) navigate(`/cattle/${id}`);
    return result;
  };

  if (missing) {
    return (
      <div className="container narrow">
        <div className="alert alert-error">Cattle not found.</div>
        <Link to="/cattle" className="btn btn-outline">Back to cattle</Link>
      </div>
    );
  }
  if (!initial) return <Loader />;

  return (
    <div className="container narrow">
      <div className="page-header"><h1>Edit cattle</h1></div>
      <CattleForm initial={initial} onSubmit={handleSubmit} submitLabel="Save changes" tagRequired />
    </div>
  );
};

export default EditCattle;
