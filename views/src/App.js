import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import SponsorUsPage from './components/sponsorUsPage/SponsorUsPage';


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="sponsor-us" element={<SponsorUsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
