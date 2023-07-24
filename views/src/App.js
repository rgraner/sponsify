import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ProjectPage from './components/projectPage/ProjectPage';
import SponsorPage from './components/sponsorPage/SponsorPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="project/:id" element={<ProjectPage />} />
        <Route path="sponsor/:id" element={<SponsorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
