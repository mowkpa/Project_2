import { Link } from 'react-router-dom';
import { FiLayout, FiList, FiPlusCircle, FiPieChart } from 'react-icons/fi';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="logo">JobStack</Link>
    <div className="nav-links">
      <Link to="/dashboard"><FiLayout /> Dashboard</Link>
      <Link to="/applications"><FiList /> My Jobs</Link>
      <Link to="/applications/new"><FiPlusCircle /> Add New</Link>
    </div>
  </nav>
);
export default Navbar;