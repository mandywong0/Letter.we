import React, { useState } from 'react';
import { API_URL } from "../config";
import { useNavigate, Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h2>Prompt of the Day</h2>

      <Link to="/inbox"><button>Inbox</button></Link> 
      <Link to="/compose"><button>Compose Letter</button></Link>
    </div>

  );
}

export default HomePage;