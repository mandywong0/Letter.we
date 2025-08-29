import React, { useState, useContext } from "react";
import { API_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setPartner } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful!', data);
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        // Redirect to home IF paired if not, redirect to pairing page
        if (data.user.partner_id) {
          navigate('/');
          setPartner(data.user.partner_id);
        } else {
          navigate('/pairing');
        }
      } else {
        console.error('Login failed:', data.error);
        setError(data.error);
      }

    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );

}

export default LoginPage;