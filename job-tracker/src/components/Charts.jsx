// Pie Chart for statuses, Bar Chart for monthly breakdown
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Charts = ({ applications }) => {
  // Compute Pie Chart Data
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  // Compute Bar Chart Data (Monthly)
  const monthMap = {};
  applications.forEach(app => {
    if (app.appliedDate) {
      const month = new Date(app.appliedDate).toLocaleString('default', { month: 'short' });
      monthMap[month] = (monthMap[month] || 0) + 1;
    }
  });

  const barData = Object.keys(monthMap).map(month => ({
    name: month,
    applications: monthMap[month]
  }));

  return (
    <div className="charts-grid">
      <div className="chart-wrapper">
        <h3>Applications by Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-wrapper">
        <h3>Monthly Applications</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#64748B" />
            <YAxis allowDecimals={false} stroke="#64748B" />
            <Tooltip cursor={{ fill: '#F1F5F9' }} />
            <Bar dataKey="applications" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
