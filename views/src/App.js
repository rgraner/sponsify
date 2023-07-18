import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import SponsoredPage from './components/sponsoredPage/SponsoredPage';


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="sponsored" element={<SponsoredPage />} />
      </Routes>
    </Router>
  );
}

export default App;
