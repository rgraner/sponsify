import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';



function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container container-flex">
                <Link to="/" className="navbar-logo-link">
                {/* <img src={logo} alt="logo" className="footer-logo-image" /> */}
                <div className="footer-logo">Sponsify</div>
                </Link>
                <p className="footer-copyright">
                    ©{currentYear} All rights reserved.
                </p>
            </div>
        </footer>
    );
}


export default Footer;