import React, { useEffect, useState } from 'react';
import { API_URL } from "../config";
import { useNavigate, Link } from 'react-router-dom';

function InboxPage() {
  const navigate = useNavigate();
  const [letters, setLetters] = useState('');
  const token = localStorage.getItem('token');
  
  const fetchInbox = async () => {
    try {
      const response = await fetch(`${API_URL}/letters`, {headers: {'Authorization': `Bearer ${token}`}});
      const data = await response.json();
      if (response.ok) {
        setLetters(data.letters)
      } else {
        console.error('Fetch failed:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  const today = new Date().toISOString().split('T')[0]; 

  return (
    <div>
      <h1>Inbox</h1>
      {letters[0] && letters[0].sent_at.split('T')[0] === today ? (
        <p>{letters[0].content}</p>
      ) : (
        <p>No letters for today yet.</p>
      )}
      
      <Link to="/"><button>Back</button></Link>
    </div>
  );
}

export default InboxPage;