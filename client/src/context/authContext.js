import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Login function
  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      setUser(response.data.user); // Assuming response has user data
      setIsLoading(false);
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Check if the user is authenticated
  const isAuthenticated = Boolean(user);

  // Fetch user by display name
  const getUserByDisplayName = async (displayName) => {
    try {
      const response = await axios.get(`/api/auth/${displayName}`);
      return response.data; // Expected to return user data including profilePicture
    } catch (error) {
      console.error("Error fetching user by display name:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading, getUserByDisplayName }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
