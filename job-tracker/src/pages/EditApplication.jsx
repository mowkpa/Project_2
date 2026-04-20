import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import useApplications from '../hooks/useApplications';

const schema = yup.object().shape({
  company: yup.string().required("Company name is required"),
  role: yup.string().required("Job role is required"),
  location: yup.string(),
  salary: yup.string().nullable(),
  platform: yup.string(),
  status: yup.string().required(),
  appliedDate: yup.string().required("Applied date is required"),
  interviewDate: yup.string(),
  notes: yup.string(),
});

const EditApplication = () => {
  const { id } = useParams();
  const { applications, updateApplication } = useApplications();
  const navigate = useNavigate();

  const application = applications.find(app => app.id === id);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (application) {
      reset(application);
    }
  }, [application, reset]);

  if (!application) return <div className="page">Application not found</div>;

  const onSubmit = (data) => {
    updateApplication(id, data);
    navigate('/applications');
  };

  return (
    <div className="page form-container">
      <h2>Edit Application</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Company Name *</label>
          <input {...register('company')} placeholder="e.g. Google" />
          {errors.company && <span className="error">{errors.company.message}</span>}
        </div>

        <div className="form-group">
          <label>Job Role *</label>
          <input {...register('role')} placeholder="e.g. Frontend Dev" />
          {errors.role && <span className="error">{errors.role.message}</span>}
        </div>

        <div className="form-group">
          <label>Location</label>
          <input {...register('location')} placeholder="e.g. Remote, New York" />
        </div>

        <div className="form-group">
          <label>Salary Range</label>
          <input {...register('salary')} placeholder="e.g. $100k - $120k" />
        </div>

        <div className="form-group">
          <label>Application Platform</label>
          <input {...register('platform')} placeholder="e.g. LinkedIn" />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select {...register('status')}>
            <option value="Applied">Applied</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offer Received">Offer Received</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label>Applied Date *</label>
          <input type="date" {...register('appliedDate')} />
          {errors.appliedDate && <span className="error">{errors.appliedDate.message}</span>}
        </div>

        <div className="form-group">
          <label>Interview Date</label>
          <input type="date" {...register('interviewDate')} />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea {...register('notes')} rows="3"></textarea>
        </div>

        <button type="submit" className="btn-primary">Update Job</button>
      </form>
    </div>
  );
};
export default EditApplication;