import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import {
  registerSponsorRequest,
  registerSponsorSuccess,
  registerSponsorFailure,
} from '../../redux/actions/registrationActions';

const SponsorRegistration = ({
  registrationState, // Access the registration state from Redux
  registerSponsorRequest,
  registerSponsorSuccess,
  registerSponsorFailure,
}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check the password confirmation field
    if (formData.password !== formData.confirmPassword) {
      // Passwords don't match, handle the error
      console.error('Passwords do not match');
      return; // Prevent further processing
    }

    // Dispatch the request action to indicate that registration is in progress
    registerSponsorRequest();

    try {
      const response = await fetch('/api/auth/register/sponsor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.status === 201) {
        // Successful registration, reset the form fields
        registerSponsorSuccess();
        // Reset the form fields
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else if (response.status === 400) {
        // Handle registration error with specific error message
        const data = await response.json();
        if (data.error === 'Email already in use') {
          registerSponsorFailure('Email already in use');
        } else if (data.error === 'Username already in use') {
          registerSponsorFailure('Username already in use');
        } else {
          // Handle other 400 errors if needed
          console.error('Registration failed with unknown error');
          registerSponsorFailure('Registration failed with unknown error');
        }
      } else {
        // Handle other response status codes (e.g., 500) if needed
        console.error('Registration failed with unknown error');
        registerSponsorFailure('Registration failed with unknown error');
      }
    } catch (error) {
      // Handle network error
      console.error('Registration failed', error);
      registerSponsorFailure('Registration failed');
    } 
  };

  return (
    <div className="container">
      {registrationState.success ? (
        <div>
          <p>Registration successful! You can now <Link to="/login">login</Link>.</p>
        </div>
      ) : (
      <div>
        <h2 class="section-title">Sponsor Registration</h2>

        {registrationState.isLoading && <p>Registering...</p>}
        
        {registrationState.error && <p>{registrationState.error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="current-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type="submit">Register Sponsor</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  registrationState: state.registration, // Map the registration state to props
});

const mapDispatchToProps = {
  registerSponsorRequest,
  registerSponsorSuccess,
  registerSponsorFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(SponsorRegistration);
