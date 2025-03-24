import { useState } from 'react';
import users from "../data/users.json";

function useAuth() {
  const [error, setError] = useState(null);

  const attemptLogin = async (userId) => {
    try {
      const user = users.find(u => u.id === userId);
      
      return {
        success: !!user,
        user: user || null,
        error: null
      };
    } catch (error) {
      setError('SYSTEM ERROR: UNABLE TO VERIFY CREDENTIALS');
      return {
        success: false,
        user: null,
        error
      };
    }
  };

  return { attemptLogin, error };
}

export default useAuth;
