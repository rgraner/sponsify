import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Projects from './components/projects/Projects';
import ProjectPage from './components/projects/ProjectPage';
import Sponsors from './components/sponsors/Sponsors';
import SponsorPage from './components/sponsors/SponsorPage';
import SponsorRegistration from './components/auth/SponsorRegistration';
import ProjectRegistration from './components/auth/ProjectRegistration';
import Login from './components/auth/Login';
import store from './redux/store';

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
          <Route path="sponsor-registration" element={<SponsorRegistration />} />
          <Route path="project-registration" element={<ProjectRegistration />} />
          <Route path="login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
