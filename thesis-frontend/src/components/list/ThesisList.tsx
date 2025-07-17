import React from 'react';
import { Thesis } from '../../types/thesis';
import ThesisStatusBadge from '../badge/ThesisStatusBadge';
import Button from '../ui/Button';

interface ThesisListProps {
  theses: Thesis[];
  onEdit: (thesis: Thesis) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const ThesisList: React.FC<ThesisListProps> = ({ theses, onEdit, onDelete, onView }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submission Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {theses.map((thesis) => (
            <tr key={thesis.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{thesis.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ThesisStatusBadge status={thesis.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {thesis.submissionDate ? new Date(thesis.submissionDate).toLocaleDateString() : 'Not submitted'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onView(thesis.id)}
                >
                  View
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onEdit(thesis)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(thesis.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThesisList;