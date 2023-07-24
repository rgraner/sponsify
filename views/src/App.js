import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Projects from './components/projects/Projects';
import ProjectPage from './components/projectPage/ProjectPage';
import Sponsors from './components/sponsors/Sponsors';
import SponsorPage from './components/sponsorPage/SponsorPage';


function App() {
  const sponsors = [
    { id: 1, name: 'Company A', logoUrl: '/images/companies-logo/company-a.png' },
    { id: 2, name: 'Company B', logoUrl: '/images/companies-logo/company-b.png' },
    { id: 3, name: 'Company C', logoUrl: '/images/companies-logo/company-c.png' },
    { id: 4, name: 'Company D', logoUrl: '/images/companies-logo/company-d.png' },
    { id: 5, name: 'Company E', logoUrl: '/images/companies-logo/company-e.png' },
  ];

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
        <Route exact path="/sponsors" element={<Sponsors sponsors={sponsors} />} />
        <Route path="sponsors/:sponsorId" element={<SponsorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
