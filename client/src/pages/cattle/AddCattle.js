import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCattle } from '../../api/useCattle';
import CattleForm from './CattleForm';

const AddCattle = () => {
  const { addCattle } = useCattle();
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    const result = await addCattle(form);
    if (result.success) navigate('/cattle');
    return result;
  };

  return (
    <div className="container narrow">
      <div className="page-header"><h1>Add cattle</h1></div>
      <CattleForm onSubmit={handleSubmit} submitLabel="Add cattle" />
    </div>
  );
};

export default AddCattle;
