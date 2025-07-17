import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheses } from '@/hooks/useThesis';
import { ThesisDTO } from '@/types';
import { createThesis, deleteThesis, updateThesis } from '@/services/thesisService';
import Button from '@/components/ui/Button';
import ThesisList from '@/components/list/ThesisList';
import Modal from '@/components/ui/Modal';
import ThesisForm from '@/components/form/ThesisForm';


const ThesisListPage: React.FC = () => {
  const { theses, loading, error, refresh } = useTheses();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentThesis, setCurrentThesis] = useState<ThesisDTO | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: ThesisDTO) => {
    try {
      if (currentThesis?.id) {
        await updateThesis(currentThesis.id, values);
      } else {
        await createThesis(values);
      }
      refresh();
      setIsFormOpen(false);
      setCurrentThesis(null);
    } catch (err) {
      console.error('Failed to save thesis', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this thesis?')) {
      try {
        await deleteThesis(id);
        refresh();
      } catch (err) {
        console.error('Failed to delete thesis', err);
      }
    }
  };

  if (loading) return <div>Loading theses...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Thesis Management</h1>
        <Button onClick={() => {
          setCurrentThesis(null);
          setIsFormOpen(true);
        }}>
          Create New Thesis
        </Button>
      </div>

      <ThesisList
        theses={theses}
        onEdit={(thesis) => {
          setCurrentThesis(thesis);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
        onView={(id) => navigate(`/theses/${id}`)}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCurrentThesis(null);
        }}
        title={currentThesis ? 'Edit Thesis' : 'Create Thesis'}
      >
        <ThesisForm
          initialValues={currentThesis || {
            title: '',
            studentId: '',
            supervisorId: '',
            status: 'DRAFT',
            abstractText: '',
          }}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setCurrentThesis(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default ThesisListPage;