import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navbar.css';
// import logo from '../../images/sponsify.png';



function Navbar() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const user = JSON.parse(localStorage.getItem('userData'));

  return (
    <nav className="navbar">
      <div className="container container-flex">
        <Link to="/" className="navbar-logo-link">
          {/* <img src={logo} alt="logo" className="navbar-logo-image" /> */}
          <div className="navbar-logo">Sponsify</div>
        </Link>
        <div className="navbar-items">
          <Link to="/projects">Projects</Link>
          <Link to="/sponsors">Sponsors</Link>
          {isLoggedIn ? (
            <div>
              <span>Hello, {user.username}</span>
              <Link to="/logout">Logout</Link>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/basket">Basket(0)</Link>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
