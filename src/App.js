import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivacyPolicy from './Policy/PrivacyPolicy';
import Home from './Home/Home'; // Your main home component (where you show main content)
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the different routes */}
        <Route path="/" element={<Home />} /> {/* Main Home Page */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Privacy Policy Page */}
      </Routes>
    </Router>
  );
}

export default App;
