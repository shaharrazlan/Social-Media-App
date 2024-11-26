
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { RegistrationProvider } from './context/registrationContext'
import { PostProvider } from './context/PostContext'
import AppRoutes from './routes/AppRoutes';
import { FriendProvider } from './context/friendContext';

function App() {
  return (
    <AuthProvider>
      <RegistrationProvider> {/* Wrap the app in RegistrationProvider */}
        <Router>
          <PostProvider>
            <FriendProvider>
              <AppRoutes />
            </FriendProvider>
          </PostProvider>
        </Router>
      </RegistrationProvider>
    </AuthProvider>
  );
}

export default App;

