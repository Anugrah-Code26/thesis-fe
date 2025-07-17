import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ThesisDTO, ThesisStatus } from '../../types/thesis';
import Button from '../ui/Button';

interface ThesisFormProps {
  initialValues: ThesisDTO;
  onSubmit: (values: ThesisDTO, actions: FormikHelpers<ThesisDTO>) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  studentId: Yup.string().required('Student ID is required'),
  supervisorId: Yup.string().required('Supervisor ID is required'),
  abstractText: Yup.string().required('Abstract is required'),
  status: Yup.string().oneOf(Object.values(ThesisStatus)).required('Status is required'),
});

const ThesisForm: React.FC<ThesisFormProps> = ({
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
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Field
              name="title"
              type="text"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.title && touched.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && touched.title && (
              <div className="text-red-500 text-sm mt-1">{errors.title}</div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                Student ID
              </label>
              <Field
                name="studentId"
                type="text"
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.studentId && touched.studentId ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.studentId && touched.studentId && (
                <div className="text-red-500 text-sm mt-1">{errors.studentId}</div>
              )}
            </div>

            <div>
              <label htmlFor="supervisorId" className="block text-sm font-medium text-gray-700">
                Supervisor ID
              </label>
              <Field
                name="supervisorId"
                type="text"
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.supervisorId && touched.supervisorId ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.supervisorId && touched.supervisorId && (
                <div className="text-red-500 text-sm mt-1">{errors.supervisorId}</div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="abstractText" className="block text-sm font-medium text-gray-700">
              Abstract
            </label>
            <Field
              as="textarea"
              name="abstractText"
              rows={4}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.abstractText && touched.abstractText ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.abstractText && touched.abstractText && (
              <div className="text-red-500 text-sm mt-1">{errors.abstractText}</div>
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
              {Object.values(ThesisStatus).map((status) => (
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

export default ThesisForm;