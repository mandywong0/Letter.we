import React, { useState } from 'react';
import { API_URL } from "../config";
import { useNavigate, Link } from 'react-router-dom';

function PairingPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
        } else {
          
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

    </div>
  );

}

export default PairingPage;