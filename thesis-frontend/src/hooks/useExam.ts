import { useState, useEffect } from 'react';
import { getExams } from '../services/examService';
import { ThesisExam } from '../types';

export const useExams = () => {
  const [exams, setExams] = useState<ThesisExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const data = await getExams();
      setExams(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch exams');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return { exams, loading, error, refresh: fetchExams };
};