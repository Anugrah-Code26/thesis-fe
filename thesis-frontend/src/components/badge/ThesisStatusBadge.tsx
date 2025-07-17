import React from 'react';
import { ThesisStatus, ThesisStatusLabels } from '../../types/thesis';

interface ThesisStatusBadgeProps {
  status: ThesisStatus;
  className?: string;
}

const ThesisStatusBadge: React.FC<ThesisStatusBadgeProps> = ({ status, className = '' }) => {
  const statusColor = {
    [ThesisStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [ThesisStatus.SUBMITTED]: 'bg-blue-100 text-blue-800',
    [ThesisStatus.APPROVED]: 'bg-green-100 text-green-800',
    [ThesisStatus.REJECTED]: 'bg-red-100 text-red-800',
    [ThesisStatus.REVISION_REQUIRED]: 'bg-yellow-100 text-yellow-800',
    [ThesisStatus.DEFENDED]: 'bg-purple-100 text-purple-800',
    [ThesisStatus.ARCHIVED]: 'bg-indigo-100 text-indigo-800',
  }[status];

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor} ${className}`}>
      {ThesisStatusLabels[status]}
    </span>
  );
};

export default ThesisStatusBadge;