import React, { useState } from 'react';
import { API_URL } from "../config";
import { useNavigate, Link } from 'react-router-dom';

function ComposePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');

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
        navigate("/");
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
      <p>Dear {},</p>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={content} 
          onChange={e => setContent(e.target.value)} />
        <button type="submit">Mail</button>
      </form>
      <Link to="/"><button>Back</button></Link>
    </div>
  );
}

export default ComposePage;