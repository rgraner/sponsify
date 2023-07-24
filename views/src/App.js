import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Add this import
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Projects from './components/projects/Projects';
import ProjectPage from './components/projects/ProjectPage';
import Sponsors from './components/sponsors/Sponsors';
import SponsorPage from './components/sponsors/SponsorPage';
import store from './redux/store'; // Add this import


function App() {

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectPage />} />
          <Route exact path="/sponsors" element={<Sponsors />} />
          <Route path="sponsors/:sponsorId" element={<SponsorPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
