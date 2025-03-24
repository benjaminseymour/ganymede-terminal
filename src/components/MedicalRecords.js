import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import users from '../data/users.json';
import styles from './MedicalRecords.module.css';
import Navigation from './Navigation';
import { useActivityLog } from '../context/ActivityLogContext';

function MedicalRecords() {
  const { user } = useUser();
  const { logActivity } = useActivityLog();
  const [searchId, setSearchId] = useState('');
  const [patientRecord, setPatientRecord] = useState(null);
  const [error, setError] = useState('');

  if (!user?.grants?.includes('medical-record:read')) {
    return <Navigate to="/dashboard" />;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const found = users.find(u => u.id === searchId);
    logActivity(user.id, 'MEDICAL_SEARCH', `Searched medical records for ID: ${searchId}`);
    
    if (found?.medical) {
      setPatientRecord(found);
      setError('');
    } else {
      setPatientRecord(null);
      setError('NO MEDICAL RECORDS FOUND');
    }
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.searchSection}>
        <h2>MEDICAL RECORDS SEARCH</h2>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Patient ID"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>SEARCH</button>
        </form>
      </div>
      
      <div className={styles.results}>
        {error && <div className={styles.error}>{error}</div>}
        {patientRecord && (
          <div className={styles.record}>
            <h3>PATIENT: {patientRecord.name}</h3>
            <p>ID: {patientRecord.id}</p>
            <div className={styles.medicalData}>
              <div className={styles.dataSection}>
                <h4>BLOOD TYPE</h4>
                <p>{patientRecord.medical.bloodType}</p>
              </div>
              <div className={styles.dataSection}>
                <h4>GENETIC RISK MARKERS</h4>
                <p>{patientRecord.medical.geneticRiskMarkers}</p>
              </div>
              <div className={styles.dataSection}>
                <h4>BODY SCAN RESULTS</h4>
                <p>{patientRecord.medical.bodyScanResults}</p>
              </div>
              <div className={styles.dataSection}>
                <h4>MEDICAL OFFICER'S NOTES</h4>
                <p>{patientRecord.medical.medicalOfficersNotes}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalRecords;
