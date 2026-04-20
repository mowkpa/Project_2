import React, { useState, useMemo } from 'react';
import useApplications from '../hooks/useApplications';
import JobCard from '../components/JobCard';
import useDebounce from '../hooks/useDebounce';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Applications = () => {
  const { applications } = useApplications();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("appliedDate");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = 
        (app.company || "").toLowerCase().includes(debouncedSearch.toLowerCase()) || 
        (app.role || "").toLowerCase().includes(debouncedSearch.toLowerCase());
      
      let matchesTab = true;
      if (activeTab === "Bookmarks") {
        matchesTab = app.bookmarked === true;
      } else if (activeTab !== "All") {
        matchesTab = app.status === activeTab;
      }
      
      const matchesPlatform = platformFilter === "All" || app.platform === platformFilter;
      const matchesLocation = locationFilter === "All" || app.location === locationFilter;
      
      return matchesSearch && matchesTab && matchesPlatform && matchesLocation;
    });
  }, [applications, debouncedSearch, activeTab, platformFilter, locationFilter]);

  const sortedApps = useMemo(() => {
    return [...filteredApps].sort((a, b) => {
      if (sortBy === "salary") {
        const salaryA = parseInt((a.salary || "0").toString().replace(/[^0-9]/g, '')) || 0;
        const salaryB = parseInt((b.salary || "0").toString().replace(/[^0-9]/g, '')) || 0;
        return salaryB - salaryA; // Descending
      }
      if (sortBy === "company") {
        return (a.company || "").localeCompare(b.company || "");
      }
      return new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0);
    });
  }, [filteredApps, sortBy]);

  const tabs = ["All", "Applied", "Interview Scheduled", "Offer Received", "Rejected", "Bookmarks"];

  // Unique lists for filters
  const platforms = ["All", ...new Set(applications.map(a => a.platform).filter(Boolean))];
  const locations = ["All", ...new Set(applications.map(a => a.location).filter(Boolean))];

  return (
    <div className="page">
      <header className="apps-header">
        <h2>My Applications ({filteredApps.length})</h2>
        
        <div className="controls-row">
          <div className="search-box">
            <FiSearch />
            <input 
              type="text" 
              placeholder="Search company or role..." 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filters-group">
            <div className="filter-box">
              <FiFilter />
              <select onChange={(e) => setPlatformFilter(e.target.value)} value={platformFilter}>
                {platforms.map(p => <option key={p} value={p}>{p === "All" ? "All Platforms" : p}</option>)}
              </select>
            </div>
            
            <div className="filter-box">
              <FiFilter />
              <select onChange={(e) => setLocationFilter(e.target.value)} value={locationFilter}>
                {locations.map(l => <option key={l} value={l}>{l === "All" ? "All Locations" : l}</option>)}
              </select>
            </div>

            <div className="sort-box">
              <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                <option value="appliedDate">Sort by: Date Applied</option>
                <option value="salary">Sort by: Salary</option>
                <option value="company">Sort by: Company</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="tabs-container">
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="job-grid">
        {sortedApps.length > 0 ? (
          sortedApps.map(app => (
            <JobCard key={app.id} app={app} />
          ))
        ) : (
          <div className="empty-state">
            <p>No applications found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;