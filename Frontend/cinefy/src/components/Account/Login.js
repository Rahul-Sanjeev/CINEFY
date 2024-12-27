import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Auth.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();

        // Reset messages and disable button
        setErrorMessage("");
        setSuccessMessage("");
        setIsSubmitting(true);

        try {
            const response = await axios.post("http://127.0.0.1:8000/users/login/", {
                username,
                password,
            });

            setSuccessMessage(response.data.message);
            localStorage.setItem("token", response.data.token);
            navigate("/"); // Redirect to the home page

            setUsername("");
            setPassword("");
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error || "Invalid credentials");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>

            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    );
};

export default Login;
