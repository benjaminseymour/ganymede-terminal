import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useActivityLog } from '../context/ActivityLogContext';
import styles from './Navigation.module.css';

function Navigation({ showBack = true }) {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { logActivity } = useActivityLog();

  const handleLogout = () => {
    logActivity(user?.id, 'LOGOUT', 'User logged out');
    setUser(null);
    navigate("/", { replace: true }); 
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className={styles.navigation}>
      {showBack && (
        <button onClick={handleBack} className={styles.button}>
          BACK
        </button>
      )}
      <button onClick={handleLogout} className={styles.button}>
        LOGOUT
      </button>
    </div>
  );
}

export default Navigation;
