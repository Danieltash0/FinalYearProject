import { useState, useEffect, useCallback } from 'react';
import { apiRequest, getAuthHeaders } from './config';

export const useCattle = () => {
  const [cattle, setCattle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCattle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setCattle(await apiRequest('/cattle', { headers: getAuthHeaders() }));
    } catch (err) {
      setError(err.message || 'Failed to fetch cattle data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCattle();
  }, [fetchCattle]);

  const run = async (fn) => {
    try {
      const data = await fn();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const addCattle = (body) =>
    run(async () => {
      const res = await apiRequest('/cattle', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body)
      });
      await fetchCattle();
      return res;
    });

  const updateCattle = (id, body) =>
    run(async () => {
      await apiRequest(`/cattle/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(body)
      });
      await fetchCattle();
    });

  const deleteCattle = (id) =>
    run(async () => {
      await apiRequest(`/cattle/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      await fetchCattle();
    });

  // Returns the record, or null if it is missing
  const getCattleById = async (id) => {
    try {
      return await apiRequest(`/cattle/${id}`, { headers: getAuthHeaders() });
    } catch (err) {
      return null;
    }
  };

  return { cattle, loading, error, addCattle, updateCattle, deleteCattle, getCattleById, refreshCattle: fetchCattle };
};
