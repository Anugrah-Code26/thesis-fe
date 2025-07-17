import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Thesis } from '@/types';
import { getThesisById } from '@/services/thesisService';
import Button from '@/components/ui/Button';
import ThesisStatusBadge from '@/components/badge/ThesisStatusBadge';

const ThesisDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [thesis, setThesis] = useState<Thesis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThesis = async () => {
      try {
        const data = await getThesisById(id!);
        setThesis(data);
      } catch (err) {
        setError('Failed to load thesis');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchThesis();
  }, [id]);

  if (loading) return <div>Loading thesis...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!thesis) return <div>Thesis not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Thesis Details</h1>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card title={thesis.title}>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Abstract</h3>
                <p className="mt-1 text-sm text-gray-900">{thesis.abstractText || 'No abstract provided'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Keywords</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {thesis.keywords && thesis.keywords.length > 0 ? (
                    thesis.keywords.map(keyword => (
                      <span key={keyword} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No keywords</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Details">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-1">
                  <ThesisStatusBadge status={thesis.status} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
                <p className="mt-1 text-sm text-gray-900">{thesis.studentId}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Supervisor ID</h3>
                <p className="mt-1 text-sm text-gray-900">{thesis.supervisorId}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Submission Date</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {thesis.submissionDate ? new Date(thesis.submissionDate).toLocaleDateString() : 'Not submitted'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(thesis.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-6 space-x-2">
            <Button
              variant="primary"
              onClick={() => navigate(`/theses/${thesis.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => navigate(`/theses/${thesis.id}/delete`)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThesisDetailPage;