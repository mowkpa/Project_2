import React, { createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchMockJobs } from '../services/api';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useLocalStorage('job_apps', []);

  useEffect(() => {
    // If no applications, fetch mock ones on first load
    if (applications.length === 0) {
      fetchMockJobs().then(mockJobs => {
        if (mockJobs.length > 0) {
          setApplications(mockJobs);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addApplication = (app) => {
    const newApp = { ...app, id: Date.now().toString(), bookmarked: false };
    setApplications([...applications, newApp]);
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const toggleBookmark = (id) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
    ));
  };

  const updateApplication = (id, updatedData) => {
    setApplications(applications.map(app => app.id === id ? { ...app, ...updatedData } : app));
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      addApplication,
      deleteApplication,
      toggleBookmark,
      updateApplication
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};