import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheses } from '@/hooks/useThesis';
import { useExams } from '@/hooks/useExam';
import { ExamScheduleDTO, User, UserRole } from '@/types';
import { getUsersByRole } from '@/services/userService';
import { deleteExam, scheduleExam, updateExam } from '@/services/examService';
import Button from '@/components/ui/Button';
import ExamList from '@/components/list/ExamList';
import Modal from '@/components/ui/Modal';
import ExamForm from '@/components/form/ExamForm';


const ExamListPage: React.FC = () => {
  const { exams, loading, error, refresh } = useExams();
  const { theses } = useTheses();
  const [examiners, setExaminers] = useState<User[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState<ExamScheduleDTO | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExaminers = async () => {
      try {
        const examiners = await getUsersByRole(UserRole.EXAMINER);
        setExaminers(examiners);
      } catch (err) {
        console.error('Failed to fetch examiners', err);
      }
    };

    fetchExaminers();
  }, []);

  const handleSubmit = async (values: ExamScheduleDTO) => {
    try {
      if (currentExam?.id) {
        await updateExam(currentExam.id, values);
      } else {
        await scheduleExam(values);
      }
      refresh();
      setIsFormOpen(false);
      setCurrentExam(null);
    } catch (err) {
      console.error('Failed to save exam', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await deleteExam(id);
        refresh();
      } catch (err) {
        console.error('Failed to delete exam', err);
      }
    }
  };

  if (loading) return <div>Loading exams...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exam Management</h1>
        <Button onClick={() => {
          setCurrentExam(null);
          setIsFormOpen(true);
        }}>
          Schedule New Exam
        </Button>
      </div>

      <ExamList
        exams={exams}
        onEdit={(exam) => {
          setCurrentExam(exam);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
        onView={(id) => navigate(`/exams/${id}`)}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCurrentExam(null);
        }}
        title={currentExam ? 'Edit Exam' : 'Schedule Exam'}
        size="lg"
      >
        <ExamForm
          initialValues={currentExam || {
            thesisId: '',
            examinerId: '',
            scheduledDate: new Date().toISOString(),
            location: '',
            status: 'SCHEDULED',
          }}
          theses={theses}
          examiners={examiners}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setCurrentExam(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default ExamListPage;