import React from "react";
import "../styles/NavBar.css"; // Import the external CSS file
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    // Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token
        navigate("/login"); // Redirect to the login page
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <Link to="/" className="navbar-logo">
                Cinefy
            </Link>

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

                {/* Conditional Rendering for Auth Buttons */}
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="navbar-button navbar-login">
                            Login
                        </Link>
                        <Link to="/register" className="navbar-button navbar-register">
                            Register
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="navbar-button navbar-logout"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
