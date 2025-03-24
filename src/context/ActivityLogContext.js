import React, { createContext, useContext, useState } from 'react';

const ActivityLogContext = createContext(null);

export function ActivityLogProvider({ children }) {
  const [activityLogs, setActivityLogs] = useState([]);

  const logActivity = (userId, action, details) => {
    const timestamp = new Date().toISOString();
    setActivityLogs(prev => [...prev, { timestamp, userId, action, details }]);
  };

  return (
    <ActivityLogContext.Provider value={{ activityLogs, logActivity }}>
      {children}
    </ActivityLogContext.Provider>
  );
}

export const useActivityLog = () => useContext(ActivityLogContext);
