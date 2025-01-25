import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("authToken");
            setIsLoggedIn(!!token); // Update login state based on token
        };

        // Check authentication state on component mount
        checkAuth();

        // Add an event listener for the custom `authChange` event
        window.addEventListener("authChange", checkAuth);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("authChange", checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove token
        window.dispatchEvent(new Event("authChange")); // Notify NavBar
        navigate("/login"); // Redirect to login
    };

    return (
        <nav className="navbar">
            <div className="navbar-links">
                {/* Logo */}
                <div>
                    <Link to="/" className="navbar-logo">
                        Cinefy
                    </Link>
                </div>

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

                {isLoggedIn ? (
                    <button onClick={handleLogout} className="navbar-button navbar-logout">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="navbar-button navbar-login">
                            Login
                        </Link>
                        <Link to="/register" className="navbar-button navbar-register">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
