import React from "react";
import "../styles/NavBar.css"; // Import the external CSS file
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo">
                <Link to="/" className="navbar-logo">
                    Cinefy
                </Link>
            </div>

            {/* Links */}
            <div className="navbar-links">
                <Link to="/" className="navbar-link">
                    Home
                </Link>
                <Link to="/movies" className="navbar-link">
                    Movies
                </Link>
                <Link to="/about" className="navbar-link">
                    About
                </Link>
                <Link to="/contact" className="navbar-link">
                    Contact
                </Link>
                {/* Login and Register Buttons */}
                <Link to="/login" className="navbar-button navbar-login">
                    Login
                </Link>
                <Link to="/register" className="navbar-button navbar-register">
                    Register
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
