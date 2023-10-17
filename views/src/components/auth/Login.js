import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions/authenticationActions';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchSponsorData = async (userId) => {
    try {
      const sponsorResponse = await fetch(`/api/sponsors/user/${userId}`);
      if (sponsorResponse.status === 200) {
        const sponsorData = await sponsorResponse.json();
        const sponsorId = sponsorData.sponsor_id;
        console.log('Sponsor ID:', sponsorId);
        return sponsorId;
      } else {
        console.error('Failed to fetch sponsor data');
        // Handle the error, e.g., display an error message to the user
        return null;
      }
    } catch (sponsorError) {
      console.error('Error fetching sponsor data:', sponsorError);
      // Handle the error, e.g., display an error message to the user
      return null;
    }
  };
  
  const fetchProjectData = async (userId) => {
    try {
      const projectResponse = await fetch(`/api/projects/user/${userId}`);
      if (projectResponse.status === 200) {
        const projectData = await projectResponse.json();
        const projectId = projectData.project_id;
        console.log('Project ID:', projectId);
        return projectId;
      } else {
        console.error('Failed to fetch project data');
        // Handle the error, e.g., display an error message to the user
        return null;
      }
    } catch (projectError) {
      console.error('Error fetching project data:', projectError);
      // Handle the error, e.g., display an error message to the user
      return null;
    }
  };
  
  const handleLogin = async () => {
    // Send login data to the backend
    const loginData = {
      email: formData.email,
      password: formData.password,
    };
  
    // Make an API request to the login endpoint
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.status === 200) {
        const responseData = await response.json();
        console.log('Login successful');
        dispatch(loginSuccess());
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(responseData.user));
        const userId = responseData.user.id;
  
        // Fetch sponsor data
        const sponsorId = await fetchSponsorData(userId);
        
        // Fetch project data
        const projectId = await fetchProjectData(userId);

        // Redirect after successful login
        const storedRedirectPath = localStorage.getItem('redirectPath');
        if (storedRedirectPath) {
          navigate(storedRedirectPath);
          localStorage.removeItem(storedRedirectPath);
        } else if (responseData.user.user_type === 'sponsor') {
          navigate(`/sponsors/${sponsorId}`);
        } else {
          navigate(`/projects/${projectId}`);
        }
    
      } else {
        console.error('Login failed');
        // Handle login error, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network error, e.g., display an error message to the user
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(); // Call handleLogin when the form is submitted
  };

  return (
    <div className="container">
      <h2 className="section-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
          <button className="button" type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/pre-registration">Register</Link>
      </p>
    </div>
  );
};

export default Login;
