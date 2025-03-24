import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from './Login.module.css';
import { useUser } from '../context/UserContext';
import { useActivityLog } from '../context/ActivityLogContext';
import Header from './Header';

function Login() {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const { attemptLogin } = useAuth();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { logActivity } = useActivityLog();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await attemptLogin(userId);
    
    if (result.success) {
      logActivity(userId, 'LOGIN_SUCCESS', 'User successfully authenticated');
      setUser(result.user);
      setMessage('ACCESS GRANTED');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      logActivity(userId, 'LOGIN_FAILED', 'Invalid user ID provided');
      setMessage('ACCESS DENIED: INVALID USER ID');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Header />
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
      <div className={`${styles.message} ${message.includes('DENIED') ? styles.error : ''}`}>
        {message}
      </div>
    </div>
  );
}

export default Login;
