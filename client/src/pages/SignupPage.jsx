import React, { useState } from 'react';
import { API_URL } from "../config";
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API_URL}/register`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful!', data);
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        // Redirect and show a success message
        navigate('/login');
      } else {
        console.error('Signup failed:', data.error);
        setError(data.error);
      }

    } catch (error) {
      console.error('Network error:', error);
    }
    // Example: POST /register with username, email, password
    console.log('Submit', { username, email, password });
  };

  return (
    <div>
      <h1>Create a new account</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Display Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
      <p>Have an account? <Link to="/login">Log in</Link></p>
    </div>

  );
}

export default SignupPage;