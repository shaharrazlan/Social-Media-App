import "./register.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegistration } from '../../context/registrationContext';


const Register = () => {
  const navigate = useNavigate();
  const { registerUser, error: contextError } = useRegistration(); // Get registerUser and error from context
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [error, setError] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [validUser, setValidUser] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); 

    if (!validUser || !validPassword || !validMatch) {
      setError("Please ensure all fields are valid.");
      return;
    }
    
    setIsSubmitting(true);
    try {
        const userData = {
          username: user,
          password,
          displayName: userDisplayName,
          profilePicture, 
        };
  
        // Await registerUser call from context
        await registerUser(userData);
        alert("Account created successfully!");
        navigate("/login"); 

      } catch (error) {
        console.error("Registration error:", error);
        setIsSubmitting(false);
      }
    };

  const validateUser = (value) => {
    setUser(value);
    setValidUser(/^[A-Za-z][A-Za-z0-9-_]{3,23}$/.test(value));
  };

  const validatePassword = (value) => {
    setPassword(value);
    setValidPassword(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/.test(value));
    setValidMatch(value === confirmPassword);
  };

  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);
    setValidMatch(value === password);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File size (KB):", file.size / 1024);
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too large. Please select an image under 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
    }
  };
  

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>FooBar Social Network</h1>
          <p>Welcome to the best social media app!</p>
          <span>Already have an account?</span>
          <Link to="/Login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            {error && <p className="error">{error}</p>}
            {contextError && <p className="error">{contextError}</p>}
            
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              onChange={(e) => validateUser(e.target.value)}
              value={user}
              required
            />
            {!validUser && user && <p className="error">Username must be 4-24 characters, starting with a letter.</p>}
            
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => validatePassword(e.target.value)}
              value={password}
              required
            />
            {!validPassword && password && <p className="error">Password must be 8-24 characters with letters, numbers, and a special character.</p>}

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              onChange={(e) => validateConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
            {!validMatch && confirmPassword && <p className="error">Passwords do not match.</p>}

            <label htmlFor="userDisplayName">Display Name:</label>
            <input
              type="text"
              id="userDisplayName"
              onChange={(e) => setUserDisplayName(e.target.value)}
              value={userDisplayName}
              required
            />

            <label htmlFor="profilePicture">Profile Picture (optional):</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
            />
            {profilePicture && <img src={profilePicture} alt="Profile Preview" width="100" />}
            
            <button type="submit" onClick={handleRegister}>
               {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
