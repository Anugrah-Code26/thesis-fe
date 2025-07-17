import api from './api';
import { ThesisExam, ExamStatus, ExamScheduleDTO, EvaluationDTO, ListParams } from '../types';

export const getExams = async (params?: ListParams): Promise<ThesisExam[]> => {
  return api.get('/exams', { params });
};

export const getExamById = async (id: string): Promise<ThesisExam> => {
  return api.get(`/exams/${id}`);
};

export const scheduleExam = async (examData: ExamScheduleDTO): Promise<ThesisExam> => {
  return api.post('/exams', examData);
};

export const updateExam = async (id: string, examData: Partial<ExamScheduleDTO>): Promise<ThesisExam> => {
  return api.put(`/exams/${id}`, examData);
};

export const updateExamStatus = async (id: string, status: ExamStatus): Promise<ThesisExam> => {
  return api.patch(`/exams/${id}/status`, { status });
};

export const submitEvaluation = async (evaluationData: EvaluationDTO): Promise<void> => {
  return api.post('/exams/evaluate', evaluationData);
};

export const deleteExam = async (id: string): Promise<void> => {
  return api.delete(`/exams/${id}`);
};