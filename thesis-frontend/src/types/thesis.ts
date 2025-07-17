export enum ThesisStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  REVISION_REQUIRED = "REVISION_REQUIRED",
  DEFENDED = "DEFENDED",
  ARCHIVED = "ARCHIVED"
}

export const ThesisStatusLabels: Record<ThesisStatus, string> = {
  [ThesisStatus.DRAFT]: "Draft",
  [ThesisStatus.SUBMITTED]: "Submitted",
  [ThesisStatus.APPROVED]: "Approved",
  [ThesisStatus.REJECTED]: "Rejected",
  [ThesisStatus.REVISION_REQUIRED]: "Revision Required",
  [ThesisStatus.DEFENDED]: "Defended",
  [ThesisStatus.ARCHIVED]: "Archived"
};

export interface Thesis {
  id: string;
  title: string;
  status: ThesisStatus;
  studentId: string;
  supervisorId: string;
  filePath?: string;
  abstractText?: string;
  keywords?: string[];
  submissionDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ThesisSubmissionDTO {
  thesisId: string;
  thesisFile: File;
}

export interface ThesisDTO {
  id?: string;
  title: string;
  studentId: string;
  supervisorId: string;
  status?: ThesisStatus;
  abstractText?: string;
  keywords?: string[];
}