import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage';
import ComposePage from './pages/ComposePage';
import InboxPage from './pages/InboxPage';

function App() {
  useEffect(() => {
    axios.get("http://localhost:4000/")
      .then(response => {
        console.log("Backend response:", response.data);
      })
      .catch(error => {
        console.error("Error calling backend:", error);
      });
  }, []);


  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
      <Route path="/compose" element={<ProtectedRoute><ComposePage /></ProtectedRoute>}/>
      <Route path="/inbox" element={<ProtectedRoute><InboxPage /></ProtectedRoute>}/>
    </Routes>
  );
}

export default App
