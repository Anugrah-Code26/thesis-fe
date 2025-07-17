export enum ExamStatus {
  SCHEDULED = "SCHEDULED",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  RESCHEDULED = "RESCHEDULED"
}

export const ExamStatusLabels: Record<ExamStatus, string> = {
  [ExamStatus.SCHEDULED]: "Scheduled",
  [ExamStatus.CONFIRMED]: "Confirmed",
  [ExamStatus.IN_PROGRESS]: "In Progress",
  [ExamStatus.COMPLETED]: "Completed",
  [ExamStatus.CANCELLED]: "Cancelled",
  [ExamStatus.RESCHEDULED]: "Rescheduled"
};

export interface ThesisExam {
  id: string;
  thesisId: string;
  examinerId: string;
  scheduledDate: string;
  location: string;
  status: ExamStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ExamScheduleDTO {
  thesisId: string;
  examinerId: string;
  scheduledDate: string;
  location: string;
  status?: ExamStatus;
}

export interface EvaluationDTO {
  examId: string;
  evaluatorId: string;
  score: number;
  comments: string;
}