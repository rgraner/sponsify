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
        console.log(responseData.user.user_type);
        // Successful login, you can handle the success here
        console.log('Login successful');

        // Dispatch login success action to update Redux store
        dispatch(loginSuccess());

        // Store in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Determine the user type and redirect accordingly
        if (responseData.user.user_type === 'sponsor') {
          navigate('/sponsors');
        } else {
          navigate('/projects');
        }
      } else {
        // Handle login error
        console.error('Login failed');
        // You can display an error message to the user
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(); // Call handleLogin when the form is submitted
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
