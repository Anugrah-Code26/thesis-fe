import { useState, useEffect } from 'react';
import { getTheses } from '../services/thesisService';
import { Thesis } from '../types';

export const useTheses = () => {
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTheses = async () => {
    try {
      setLoading(true);
      const data = await getTheses();
      setTheses(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch theses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheses();
  }, []);

  return { theses, loading, error, refresh: fetchTheses };
};