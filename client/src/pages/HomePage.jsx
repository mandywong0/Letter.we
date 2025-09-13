import React, { useState, useEffect } from 'react';
import { API_URL } from "../config";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useUser } from "../context/AppContext";
import "./HomePage.css";

function HomePage() {
  const [dailyPrompt, setDailyPrompt] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const { fetchCurrentUser } = useUser();
  const letterMailed = useLocation().state?.letterMailed;

  const fetchPrompt = async () => {
    try {
      const response = await fetch(`${API_URL}/prompt`, {
        headers: {"Authorization": `Bearer ${token}`}
      });
      const data = await response.json();
      if (response.ok) {
        setDailyPrompt(data.prompt)
      } else {
        console.error("Fetch failed:", data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPrompt();
  }, []);

  return (
    <div>
      {letterMailed && <div style={{backgroundColor: "#B7E4C7", padding: "7px",}}>Letter mailed!</div>}
      <h2>Prompt of the Day</h2>
      <p>{dailyPrompt}</p>

      <Link to="/inbox"><button id="inbox-button"></button></Link> 
      <Link to="/compose"><button id="compose-button">Compose Letter</button></Link>
    </div>

  );
}

export default HomePage;