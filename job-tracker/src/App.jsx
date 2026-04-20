import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApplicationProvider } from './context/ApplicationContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import EditApplication from './pages/EditApplication';
import Analytics from './pages/Analytics';
import './App.css';

function App() {
  return (
    <ApplicationProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<AddApplication />} />
              <Route path="/applications/:id" element={<EditApplication />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApplicationProvider>
  );
}
export default App;