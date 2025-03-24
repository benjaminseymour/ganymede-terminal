import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import logsData from '../data/captainsLog.json';  // Fixed import path
import styles from './CaptainsLog.module.css';
import Navigation from './Navigation';
import { useActivityLog } from '../context/ActivityLogContext';

function CaptainsLog() {
  const { user } = useUser();
  const { logActivity } = useActivityLog();
  const [selectedLog, setSelectedLog] = useState(logsData?.logs?.[0] || null);

  if (!user?.grants?.includes('captains-log:read')) {
    return <Navigate to="/dashboard" />;
  }

  if (!logsData?.logs) {
    return <div className={styles.container}>ERROR: Log data unavailable</div>;
  }

  const handleLogSelection = (log) => {
    setSelectedLog(log);
    logActivity(user.id, 'VIEW_LOG', `Viewed captain's log: ${log.id} - ${log.title}`);
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.sidebar}>
        <h2>LOG ENTRIES</h2>
        <div className={styles.logList}>
          {logsData.logs.map(log => (
            <div
              key={log.id}
              className={`${styles.logItem} ${selectedLog?.id === log.id ? styles.selected : ''}`}
              onClick={() => handleLogSelection(log)}
            >
              <div className={styles.logDate}>{log.date}</div>
              <div className={styles.logTitle}>{log.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.mainContent}>
        {selectedLog && (
          <>
            <h1>{selectedLog.title}</h1>
            <div className={styles.logDate}>STARDATE: {selectedLog.date}</div>
            <div className={styles.logContent}>{selectedLog.content}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default CaptainsLog;
