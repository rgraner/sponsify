import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SponsorRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false); // Track loading state
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return; // Exit early if passwords don't match
    }

    setLoading(true); // Start loading indicator

    // Send registration data to the backend
    // const registrationData = {
    //   username: formData.username,
    //   email: formData.email,
    //   password: formData.password,
    // };

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
        setRegistrationSuccess(true);
        // Reset the form fields
        setFormData({
          username: '',
          email: '',
          password: '',
        });
      } else {
          // Handle registration error
          console.error('Registration failed');
      }
    } catch (error) {
        // Handle network error
        console.error('Network error:', error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="container">
      <h2>Sponsor Registration</h2>
      {registrationSuccess ? (
        <p>Registration successful! You can now <Link to="/login">Login</Link></p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
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
          <div>
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
          <div>
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
          <div>
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
            {!passwordsMatch && <p>Passwords do not match</p>}
          </div>
          <div>
            <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SponsorRegistration;
