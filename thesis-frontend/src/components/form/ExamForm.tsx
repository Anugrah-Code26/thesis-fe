import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ExamScheduleDTO, ExamStatus } from '../../types/exam';
import { Thesis } from '../../types/thesis';
import { User } from '../../types/user';
import Button from '../ui/Button';

interface ExamFormProps {
  initialValues: ExamScheduleDTO;
  theses: Thesis[];
  examiners: User[];
  onSubmit: (values: ExamScheduleDTO, actions: FormikHelpers<ExamScheduleDTO>) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const validationSchema = Yup.object().shape({
  thesisId: Yup.string().required('Thesis is required'),
  examinerId: Yup.string().required('Examiner is required'),
  scheduledDate: Yup.string().required('Scheduled date is required'),
  location: Yup.string().required('Location is required'),
  status: Yup.string().oneOf(Object.values(ExamStatus)).required('Status is required'),
});

const ExamForm: React.FC<ExamFormProps> = ({
  initialValues,
  theses,
  examiners,
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
            <label htmlFor="thesisId" className="block text-sm font-medium text-gray-700">
              Thesis
            </label>
            <Field
              as="select"
              name="thesisId"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.thesisId && touched.thesisId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a thesis</option>
              {theses.map((thesis) => (
                <option key={thesis.id} value={thesis.id}>
                  {thesis.title} (ID: {thesis.id})
                </option>
              ))}
            </Field>
            {errors.thesisId && touched.thesisId && (
              <div className="text-red-500 text-sm mt-1">{errors.thesisId}</div>
            )}
          </div>

          <div>
            <label htmlFor="examinerId" className="block text-sm font-medium text-gray-700">
              Examiner
            </label>
            <Field
              as="select"
              name="examinerId"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.examinerId && touched.examinerId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select an examiner</option>
              {examiners.map((examiner) => (
                <option key={examiner.id} value={examiner.id}>
                  {examiner.name} ({examiner.email})
                </option>
              ))}
            </Field>
            {errors.examinerId && touched.examinerId && (
              <div className="text-red-500 text-sm mt-1">{errors.examinerId}</div>
            )}
          </div>

          <div>
            <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700">
              Scheduled Date & Time
            </label>
            <Field
              name="scheduledDate"
              type="datetime-local"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.scheduledDate && touched.scheduledDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.scheduledDate && touched.scheduledDate && (
              <div className="text-red-500 text-sm mt-1">{errors.scheduledDate}</div>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <Field
              name="location"
              type="text"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.location && touched.location ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.location && touched.location && (
              <div className="text-red-500 text-sm mt-1">{errors.location}</div>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <Field
              as="select"
              name="status"
              className="mt-1 block w-full rounded-md shadow-sm border-gray-300"
            >
              {Object.values(ExamStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Field>
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
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ExamForm;