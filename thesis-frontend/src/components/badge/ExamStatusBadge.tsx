import React from 'react';
import { ExamStatus, ExamStatusLabels } from '../../types/exam';

interface ExamStatusBadgeProps {
  status: ExamStatus;
  className?: string;
}

const ExamStatusBadge: React.FC<ExamStatusBadgeProps> = ({ status, className = '' }) => {
  const statusColor = {
    [ExamStatus.SCHEDULED]: 'bg-yellow-100 text-yellow-800',
    [ExamStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
    [ExamStatus.IN_PROGRESS]: 'bg-purple-100 text-purple-800',
    [ExamStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [ExamStatus.CANCELLED]: 'bg-red-100 text-red-800',
    [ExamStatus.RESCHEDULED]: 'bg-indigo-100 text-indigo-800',
  }[status];

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor} ${className}`}>
      {ExamStatusLabels[status]}
    </span>
  );
};

export default ExamStatusBadge;