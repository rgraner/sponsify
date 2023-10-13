import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useDispatch } from 'react-redux'; 
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Projects from './components/projects/Projects';
import ProjectPage from './components/projects/ProjectPage';
import Sponsors from './components/sponsors/Sponsors';
import SponsorPage from './components/sponsors/SponsorPage';
import PreRegistration from './components/auth/PreRegistration';
import SponsorRegistration from './components/auth/SponsorRegistration';
import ProjectRegistration from './components/auth/ProjectRegistration';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import { loginSuccess } from './redux/actions/authenticationActions';
import PaymentFlow from './components/payment/PaymentFlow';

function App() {
  //  Store isLoggedIn to maintain the persistence of the login session
  const dispatch = useDispatch();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      dispatch(loginSuccess()); // Dispatch a login success action to set isLoggedIn to true
    }
  }, [dispatch]);
  
  return (
    <Router>
			<Navbar />
				<main>
					<Routes>
						<Route exact path="/" element={<Projects />} />
						<Route path="/projects/:projectId" element={<ProjectPage />} />
						<Route exact path="/sponsors" element={<Sponsors />} />
						<Route path="/sponsors/:sponsorId" element={<SponsorPage />} />
						<Route path="/pre-registration" element={<PreRegistration />} />
						<Route path="/sponsor-registration" element={<SponsorRegistration />} />
						<Route path="/project-registration" element={<ProjectRegistration />} />
						<Route path="/login" element={<Login />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/payment-flow" element={<PaymentFlow />} />
					</Routes>
				</main>
			<Footer />
    </Router>
  );
}

export default App;
