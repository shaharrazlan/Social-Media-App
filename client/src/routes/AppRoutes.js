// src/AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login'
import Register from '../pages/register/Register';
import Home from '../pages/home/Home'; 
import Profile from '../pages/profile/Profile';
import { useAuth } from '../context/authContext';


const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/login" />}
      />
      <Route
        path="/register"
        element={!isAuthenticated ? <Register /> : <Navigate to="/register" />}
      />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
       <Route 
       path="/profile/:displayName" 
       element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />

      <Route 
      path="*" 
      element={<Navigate to="/login" />} /> 
    </Routes>
  );
};

export default AppRoutes;
