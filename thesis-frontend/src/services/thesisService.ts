import api from './api';
import { Thesis, ThesisStatus, ThesisSubmissionDTO, ThesisDTO, ListParams } from '../types';

export const getTheses = async (params?: ListParams): Promise<Thesis[]> => {
  return api.get('/theses', { params });
};

export const getThesisById = async (id: string): Promise<Thesis> => {
  return api.get(`/theses/${id}`);
};

export const createThesis = async (thesisData: ThesisDTO): Promise<Thesis> => {
  return api.post('/theses', thesisData);
};

export const updateThesis = async (id: string, thesisData: Partial<ThesisDTO>): Promise<Thesis> => {
  return api.put(`/theses/${id}`, thesisData);
};

export const submitThesis = async (submissionData: ThesisSubmissionDTO): Promise<Thesis> => {
  const formData = new FormData();
  formData.append('file', submissionData.thesisFile);
  return api.post(`/theses/${submissionData.thesisId}/submit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateThesisStatus = async (id: string, status: ThesisStatus): Promise<Thesis> => {
  return api.patch(`/theses/${id}/status`, { status });
};

export const deleteThesis = async (id: string): Promise<void> => {
  return api.delete(`/theses/${id}`);
};