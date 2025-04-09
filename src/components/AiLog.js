import React from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import styles from './AiLog.module.css';
import Image from '../assets/omg.jpg';

function ActivityLog() {
  const { user } = useUser();

  if (!user?.grants?.includes('ai-log:read')) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className={styles.container}>
      <Navigation />
      <h2>S.I.R.L.I.E.'s Private Log</h2>
      <div className={styles.container}>
      <img className="photo" src={Image} alt={"😍 Matthew Mcconaughey 😍"}/>
      </div>
    </div>
  );
}

export default ActivityLog;
