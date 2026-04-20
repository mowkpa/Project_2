import useApplications from '../hooks/useApplications';
import Charts from '../components/Charts';

const Dashboard = () => {
  const { applications } = useApplications();

  const stats = [
    { label: 'Total', count: applications.length },
    { label: 'Interviews', count: applications.filter(a => a.status === 'Interview Scheduled').length },
    { label: 'Offers', count: applications.filter(a => a.status === 'Offer Received').length },
    { label: 'Bookmarked', count: applications.filter(a => a.bookmarked).length },
  ];

  return (
    <div className="page">
      <h2>Welcome Back!</h2>
      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <h3>{s.count}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>

      {applications.length > 0 ? (
        <div className="charts-container" style={{ marginTop: '2rem' }}>
          <Charts applications={applications} />
        </div>
      ) : (
        <div className="empty-state" style={{ marginTop: '2rem' }}>
          <p>Add some applications to see your analytics!</p>
        </div>
      )}
    </div>
  );
};
export default Dashboard;