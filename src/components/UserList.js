import React from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import users from '../data/users.json';
import styles from './UserList.module.css';
import Navigation from './Navigation';
import { useActivityLog } from '../context/ActivityLogContext';

function UserList() {
  const { user } = useUser();
  const { logActivity } = useActivityLog();

  if (!user?.grants?.includes('ship-manifest:read')) {
    return <Navigate to="/dashboard" />;
  }

  logActivity(user.id, 'VIEW_USERS', 'Accessed user list');

  return (
    <div className={styles.container}>
      <Navigation />
      <h2>PASSENGER LIST</h2>
      <div className={styles.userGrid}>
        {users.map(passenger => (
          <div key={passenger.id} className={styles.userCard}>
            <div className={styles.userId}>ID: {passenger.id}</div>
            <div className={styles.userName}>{passenger.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
