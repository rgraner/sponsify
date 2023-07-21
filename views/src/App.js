import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import OrgPage from './components/orgPage/OrgPage';
import SponsorPage from './components/sponsorPage/SponsorPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="org/:id" element={<OrgPage />} />
        <Route path="sponsor/:id" element={<SponsorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
