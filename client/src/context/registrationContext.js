// RegistrationContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const registerUser = async (userData) => {
    try {
      // Directly send userData as JSON
      const response = await axios.post('/api/auth/register', userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setSuccess(true);
      setError('');
      return response.data;
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error("Registration error:", err);
      throw err;
    }
  };

  return (
    <RegistrationContext.Provider value={{ registerUser, error, success }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
