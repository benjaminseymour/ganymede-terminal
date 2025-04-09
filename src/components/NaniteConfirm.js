import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import styles from './NaniteConfirm.module.css';

function NaniteConfirm() {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user?.grants?.includes('medical-record:read')) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className={styles.container}>
      <p className={styles.message}>Confirm you have assembled the synthetic heart</p>
      <button 
        onClick={() => navigate('/nanite-instructions')} 
        className={styles.button}
      >
        CONFIRM
      </button>
    </div>
  );
}

export default NaniteConfirm;
