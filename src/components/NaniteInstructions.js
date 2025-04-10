import React from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import styles from './NaniteInstructions.module.css';

function NaniteInstructions() {
  const { user } = useUser();

  if (!user?.grants?.includes('medical-record:read')) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.content}>
        <h2>NANITE CONTROL PROTOCOL</h2>
        <p className={styles.instructions}>
          Temporary nanite deactivation sequence:
        </p>
        <p>
          1. Prepare the synthetic heart by assembling it from six pieces
        </p>
        <p>
          2. Empower the heart with 10 crystals of Illuminite per attempt
        </p>
        <p>
          3. A skilled hacker must then disable the nanites personally (challange the infected person to paper-scissors-rock)
        </p>
        <p>
          4. If successful, the nanites will temporarily be deactivated
        </p>
        <p>
          5. If unsuccessful, the nanites will remain active
        </p>
        <p>
          WARNING: Each attempt will completely consume the Illuminite crystals regardless of the outcome
        </p>
      </div>
    </div>
  );
}

export default NaniteInstructions;
