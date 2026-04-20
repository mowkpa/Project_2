import { FiTrash2, FiBookmark, FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useApplications from '../hooks/useApplications';

const JobCard = ({ app }) => {
  const { deleteApplication, toggleBookmark } = useApplications();

  // Clean company name for the logo API (removes spaces/special chars)
  const domain = (app.company || "").toLowerCase().replace(/\s+/g, '') + '.com';

  return (
    <div className="job-card">
      <div className="job-header">
        <img src={`https://logo.clearbit.com/${domain}`} alt="logo" onError={(e) => e.target.src = 'https://via.placeholder.com/40'} />
        <button onClick={() => toggleBookmark(app.id)} className={app.bookmarked ? 'active bookmark-btn' : 'bookmark-btn'}>
          <FiBookmark />
        </button>
      </div>
      <h3>{app.role}</h3>
      <p className="company-name">{app.company}</p>

      <div className="job-details">
        {app.location && <span>📍 {app.location}</span>}
        {app.salary && <span>💰 {app.salary}</span>}
      </div>

      <div className="badge">{app.status}</div>
      <div className="card-actions">
        <Link to={`/applications/${app.id}`} className="edit-btn"><FiEdit /></Link>
        <button onClick={() => deleteApplication(app.id)} className="delete-btn"><FiTrash2 /></button>
      </div>
    </div>
  );
};
export default JobCard;