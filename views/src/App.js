import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Projects from './components/projects/Projects';
import ProjectPage from './components/projectPage/ProjectPage';
import SponsorPage from './components/sponsorPage/SponsorPage';


function App() {
  const projects = [
    { id: 1, name: 'Project X', logoUrl: '/images/companies-logo/project-x.png' },
    { id: 2, name: 'Project Y', logoUrl: '/images/companies-logo/project-x.png' },
    // Add more project data as needed
  ];

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/projects" element={<Projects projects={projects} />} />
        <Route path="projects/:projectId" element={<ProjectPage />} />
        <Route path="sponsor/:id" element={<SponsorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
