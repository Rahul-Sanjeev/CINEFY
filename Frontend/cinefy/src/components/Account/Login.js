import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API_BASE_URL from '../config';
import "../../styles/Auth.css";


const getCSRFToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
            return decodeURIComponent(value); // Add URI decoding
        }
    }
    return '';
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Test backend connectivity first
            await axios.get(`${API_BASE_URL}/health-check/`); // Add this endpoint in Django

            const response = await axios.post(
                `${API_BASE_URL}/users/login/`,
                { username, password },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCSRFToken()
                    },
                    timeout: 10000 // Add timeout
                }
            );

            if (response.data?.token) {
                localStorage.setItem("authToken", response.data.token);
                axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;

                // Store user data
                localStorage.setItem("userId", response.data.user?.id);
                localStorage.setItem("username", response.data.user?.username);

                // Notify app and redirect
                window.dispatchEvent(new Event("authChange"));
                toast.success("Login successful!", {
                    position: "top-right",
                    autoClose: 2000,
                    onClose: () => navigate("/")
                });

            } else {
                toast.error("Authentication token missing", { position: "top-right" });
            }

        } catch (error) {
            if (error.code === "ECONNABORTED") {
                toast.error("Connection timeout - check your internet");
            } else if (!error.response) {
                toast.error("Backend server unavailable");
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
                    autoComplete="username"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={isSubmitting ? "loading" : ""}
                >
                    {isSubmitting ? "Authenticating..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;