import React from 'react';
import { useUser } from '../context/UserContext';
import { useActivityLog } from '../context/ActivityLogContext';
import { Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import styles from './ActivityLog.module.css';

function ActivityLog() {
  const { user } = useUser();
  const { activityLogs } = useActivityLog();

  if (!user?.grants?.includes('access-log:read')) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className={styles.container}>
      <Navigation />
      <h2>SYSTEM ACTIVITY LOG</h2>
      <div className={styles.logContainer}>
        {activityLogs.map((log, index) => (
          <div key={index} className={styles.logEntry}>
            <div className={styles.timestamp}>{log.timestamp}</div>
            <div className={styles.userId}>USER: {log.userId || 'UNKNOWN'}</div>
            <div className={styles.action}>{log.action}</div>
            <div className={styles.details}>{log.details}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityLog;
