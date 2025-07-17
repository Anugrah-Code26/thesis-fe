import ExamStatusBadge from '@/components/badge/ExamStatusBadge';
import ThesisStatusBadge from '@/components/badge/ThesisStatusBadge';
import { useAuth } from '@/context/AuthContext';
import { useExams } from '@/hooks/useExam';
import { useTheses } from '@/hooks/useThesis';
import React from 'react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { theses, loading: thesesLoading } = useTheses();
  const { exams, loading: examsLoading } = useExams();

  if (thesesLoading || examsLoading) {
    return <div>Loading dashboard...</div>;
  }

  const userTheses = theses.filter(t => t.studentId === user?.id);
  const userExams = exams.filter(e => e.examinerId === user?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="My Theses" count={userTheses.length}>
          {userTheses.length > 0 ? (
            <ul className="space-y-2">
              {userTheses.slice(0, 3).map(thesis => (
                <li key={thesis.id} className="flex justify-between items-center">
                  <span className="truncate">{thesis.title}</span>
                  <ThesisStatusBadge status={thesis.status} />
                </li>
              ))}
              {userTheses.length > 3 && (
                <li className="text-sm text-gray-500">+{userTheses.length - 3} more</li>
              )}
            </ul>
          ) : (
            <p className="text-gray-500">No theses found</p>
          )}
        </Card>

        <Card title="My Exams" count={userExams.length}>
          {userExams.length > 0 ? (
            <ul className="space-y-2">
              {userExams.slice(0, 3).map(exam => (
                <li key={exam.id} className="flex justify-between items-center">
                  <span>{new Date(exam.scheduledDate).toLocaleDateString()}</span>
                  <ExamStatusBadge status={exam.status} />
                </li>
              ))}
              {userExams.length > 3 && (
                <li className="text-sm text-gray-500">+{userExams.length - 3} more</li>
              )}
            </ul>
          ) : (
            <p className="text-gray-500">No exams found</p>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Recent Activity">
          <p className="text-gray-500">No recent activity</p>
        </Card>
        
        <Card title="Notifications">
          <p className="text-gray-500">No new notifications</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;