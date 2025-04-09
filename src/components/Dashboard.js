import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaLock } from 'react-icons/fa';
import styles from './Dashboard.module.css';
import Navigation from './Navigation';
import Header from './Header';

function Dashboard() {
  const { user } = useUser();
  
  if (!user) {
    return <Navigate to="/" />;
  }

  const hasPermission = (grant) => {
    return user?.grants?.includes(grant) ?? false;
  };

  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <Navigation showBack={false} />
      <div className={styles.userInfo}>
        <h2>WELCOME, {user?.name}</h2>
        <p>ID: {user?.id}</p>
      </div>
      <div className={styles.optionsContainer}>
        { 
          hasPermission('ai-log:read') ?        
          <Link
          to='/ai-log'
          className={styles.option}
        >
          S.I.R.L.I.E.'S PRIVATE LOG
        </Link> : <></>
      }
        <Link
          to={hasPermission('captains-log:read') ? '/captains-log' : '#'}
          className={`${styles.option} ${!hasPermission('captains-log:read') ? styles.disabled : ''}`}
        >
          CAPTAIN'S LOG
          {!hasPermission('captains-log:read') && <FaLock className={styles.lockIcon} />}
        </Link>
        <Link
          to={hasPermission('medical-record:read') ? '/medical-records' : '#'}
          className={`${styles.option} ${!hasPermission('medical-record:read') ? styles.disabled : ''}`}
        >
          MEDICAL RECORDS
          {!hasPermission('medical-record:read') && <FaLock className={styles.lockIcon} />}
        </Link>
        <Link
          to={hasPermission('ship-manifest:read') ? '/ship-manifest' : '#'}
          className={`${styles.option} ${!hasPermission('ship-manifest:read') ? styles.disabled : ''}`}
        >
          SHIP MANIFEST
          {!hasPermission('ship-manifest:read') && <FaLock className={styles.lockIcon} />}
        </Link>
        <Link
          to={hasPermission('access-log:read') ? '/activity-log' : '#'}
          className={`${styles.option} ${!hasPermission('access-log:read') ? styles.disabled : ''}`}
        >
          ACTIVITY LOG
          {!hasPermission('access-log:read') && <FaLock className={styles.lockIcon} />}
        </Link>
        <Link
          to={hasPermission('ship-manifest:read') ? '/user-list' : '#'}
          className={`${styles.option} ${!hasPermission('ship-manifest:read') ? styles.disabled : ''}`}
        >
          PASSENGER LIST
          {!hasPermission('ship-manifest:read') && <FaLock className={styles.lockIcon} />}
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
