import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../images/sponsify.png';



function Navbar() {

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-link">
        {/* <img src={logo} alt="logo" className="navbar-logo-image" /> */}
        <div className="navbar-logo">Sponsify</div>
      </Link>
      <div className="navbar-items">
        <Link to="/signin">Sign In</Link>
        <Link to="/signout">Sign Out</Link>
        <Link to="/register">Register</Link>
        <Link to="/basket">Basket(0)</Link>
      </div>
    </nav>
  );
}


export default Navbar;
