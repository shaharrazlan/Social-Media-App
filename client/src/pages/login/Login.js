import "./login.css"
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = async () => {
    if (!isLoading) {
      try{
        await login(username, password);
        alert("Logged in successfully...");
        navigate('/home');
      } catch (error) {
        console.error("Login error:", error);
        alert("Invalid credentials or user does not exist.");
      }
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>FooBar Social Network</h1>
          <p>Welcome to the best social media app!</p>
          <Link to="/register"><button>Register</button></Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="loginUsername">Username</label>
            <input
              type="text"
              id="loginUsername"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              id="loginPassword"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button id="loginButton" onClick={handleLoginClick} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
