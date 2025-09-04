import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/AppContext";

function PairingPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const token = localStorage.getItem("token");
  const { fetchCurrentUser } = useUser();

  const fetchCode = async () => {
    try {
      const response = await fetch(`${API_URL}/pairing-code`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${token}`}
      });
      const data = await response.json();
      if (response.ok) {
        setCode(data.code)
        setExpiresAt(data.expires_at)
      } else {
        console.error("Fetch failed:", data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchCode();
  }, []);

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diffMs = new Date(expiresAt).getTime() - now;

      if (diffMs <= 0) {
        setTimeLeft("expired");
        clearInterval(interval);
      } else {
        const minutes = Math.floor(diffMs / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API_URL}/pairing-code/pair`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ enteredCode }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Paired with ${data.partnerUsername}!`);
        await fetchCurrentUser();
        navigate('/');
      } else {
        console.error('Pairing failed:', data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div>   
      {error && <p>{error}</p>}
      <h1>Link with partner</h1>
      <p>Enter your partner's pairing code or have your partner enter yours to begin using the app!</p>
      <h3>Your Pairing Code:</h3>
      <h3>{code}</h3>
      <p>
        {timeLeft === 'expired' ? 
          "This code has expired. Please refresh and generate a new code." : 
          `This code expires in ${timeLeft}.`
        }
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          maxLength={6}
          value={enteredCode}
          onChange={(e) => setEnteredCode(e.target.value)}
        />
        <button type="submit">Pair</button>
      </form>
    </div>
  );

}

export default PairingPage;