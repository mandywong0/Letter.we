import React, { useState, useContext } from 'react';
import { API_URL } from "../config";
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import "./ComposePage.css";

function ComposePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [stamped, setStamped] = useState(false);
  const token = localStorage.getItem('token');
  const { user, partner } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch (`${API_URL}/letters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (response.ok) {
        setContent('');
        navigate("/", { state: { letterMailed: true } });
      } else {
        console.error('', data.error);
      }

    } catch (error) {
      console.error('Network error:', error);
    }

  };
  
  return (
    <div>
      <h2>Compose a letter</h2>
      <div id="stamp-slot">
        <p style={{ fontSize: "13.5px", color: "#4a7057" }}>stamp your letter here to make it ready to mail</p>
        <img onClick={() => setStamped(true)} src="/stamp.png" alt="stamp" style={{opacity: stamped ? 1 : 0, transition: "opacity 0.5s ease-in-out", cursor: "pointer",}}/>
      </div>
      {partner ? (
        <p class="signature-line">To {partner.username}:</p>
      ) : (
        <p>No partner yet</p>
      )}
      <form onSubmit={handleSubmit}>
        <textarea 
          value={content} 
          placeholder="Begin writing here..."
          onChange={e => setContent(e.target.value)} />
        <button 
          id="mail-button" type="submit"
          style={{
            opacity: stamped ? 1 : 0,
            pointerEvents: stamped ? "auto" : "none",
            transition: "opacity 3s ease-in-out",
          }}>Mail
        </button>
      </form>
      <p class="signature-line">Sincerely,</p>
      <p class="signature-line username-display">{user.username}</p>
      <Link to="/"><button class="back-button">← Back</button></Link>
    </div>
  );
}

export default ComposePage;