import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {        
        username,
        password,
      });
      console.log(response.data.message); 

      // Check for a success message
      if (response.data.message === 'Login successful') {
        // Call the onLogin callback to inform the parent component about the successful login
        onLogin();
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      
      <form className="login-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <div className="password-input-container">
        <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
      <button type="button" className="submit-button" onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
