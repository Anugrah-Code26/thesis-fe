import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { EvaluationDTO } from '../../types';
import Button from '../ui/Button';

interface EvaluationFormProps {
  initialValues: EvaluationDTO;
  onSubmit: (values: EvaluationDTO, actions: FormikHelpers<EvaluationDTO>) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const validationSchema = Yup.object().shape({
  score: Yup.number()
    .required('Score is required')
    .min(0, 'Score must be at least 0')
    .max(100, 'Score cannot exceed 100'),
  comments: Yup.string().required('Comments are required'),
});

const EvaluationForm: React.FC<EvaluationFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="score" className="block text-sm font-medium text-gray-700">
              Score (0-100)
            </label>
            <Field
              name="score"
              type="number"
              min="0"
              max="100"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.score && touched.score ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.score && touched.score && (
              <div className="text-red-500 text-sm mt-1">{errors.score}</div>
            )}
          </div>

          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <Field
              as="textarea"
              name="comments"
              rows={4}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.comments && touched.comments ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.comments && touched.comments && (
              <div className="text-red-500 text-sm mt-1">{errors.comments}</div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            {onCancel && (
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              Submit Evaluation
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EvaluationForm;