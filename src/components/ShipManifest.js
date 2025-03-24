import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import users from '../data/users.json';
import styles from './ShipManifest.module.css';
import Navigation from './Navigation';
import { useActivityLog } from '../context/ActivityLogContext';

function ShipManifest() {
  const { user } = useUser();
  const { logActivity } = useActivityLog();
  const [searchId, setSearchId] = useState('');
  const [manifestRecord, setManifestRecord] = useState(null);
  const [error, setError] = useState('');

  if (!user?.grants?.includes('ship-manifest:read')) {
    return <Navigate to="/dashboard" />;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    logActivity(user.id, 'MANIFEST_SEARCH', `Searched manifest for ID: ${searchId}`);
    const found = users.find(u => u.id === searchId);
    if (found?.manifest) {
      setManifestRecord(found);
      setError('');
    } else {
      setManifestRecord(null);
      setError('NO MANIFEST RECORD FOUND');
    }
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.searchSection}>
        <h2>SHIP MANIFEST SEARCH</h2>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Passenger ID"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>SEARCH</button>
        </form>
      </div>
      
      <div className={styles.results}>
        {error && <div className={styles.error}>{error}</div>}
        {manifestRecord && (
          <div className={styles.record}>
            <h3>PASSENGER: {manifestRecord.name}</h3>
            <p>ID: {manifestRecord.id}</p>
            <div className={styles.manifestData}>
              <div className={styles.dataSection}>
                <h4>EMBARKATION POINT</h4>
                <p>{manifestRecord.manifest.embarked}</p>
              </div>
              <div className={styles.dataSection}>
                <h4>REGISTERED CARGO</h4>
                <p>{manifestRecord.manifest.cargo}</p>
              </div>
              <div className={styles.dataSection}>
                <h4>CAPTAIN'S NOTES</h4>
                <p>{manifestRecord.manifest.captainsNotes}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShipManifest;
