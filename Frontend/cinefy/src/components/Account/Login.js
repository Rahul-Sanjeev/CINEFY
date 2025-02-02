import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/Auth.css";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const API_BASE_URL =
                process.env.NODE_ENV === "development"
                    ? process.env.REACT_APP_API_URL_LOCALHOST
                    : process.env.REACT_APP_API_URL_DEPLOY;

            const response = await axios.post(`${API_BASE_URL}/users/login/`, {
                username,
                password,
            });

            // Ensure the response contains the expected data
            if (response.data && response.data.token && response.data.user && response.data.user.id) {
                // Save token, user ID, and username to localStorage
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("userId", response.data.user.id);
                localStorage.setItem("username", response.data.user.username); // Store username

                // Dispatch custom event to notify NavBar
                window.dispatchEvent(new Event("authChange"));

                // Show success toast and navigate to home
                toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
                navigate("/");
            } else {
                toast.error("Invalid response from server.", { position: "top-right" });
            }
        } catch (error) {
            toast.error("Login failed! Please check your credentials.", { position: "top-right" });
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
        </div>
    );
};

export default Login;
