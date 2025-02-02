import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API_BASE_URL from '../config';
import "../../styles/Auth.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Cache CSRF token to avoid repeated cookie parsing
    let csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1] || '';

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        const toastId = toast.loading("Authenticating...");

        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/users/login/`,
                { username, password },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken
                    },
                    timeout: 5000 // Reduced timeout
                }
            );

            if (data?.token) {
                // Batch localStorage operations
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userId", data.user?.id);
                localStorage.setItem("username", data.user?.username);

                // Update axios defaults once
                axios.defaults.headers.common['Authorization'] = `Token ${data.token}`;

                toast.update(toastId, {
                    render: "Login successful!",
                    type: "success",
                    isLoading: false,
                    autoClose: 1000
                });

                // Immediate navigation without waiting for toast
                navigate("/");
            }
        } catch (error) {
            const message = error.response?.data?.detail ||
                "Connection failed. Check credentials and network.";

            toast.update(toastId, {
                render: `Login failed: ${message}`,
                type: "error",
                isLoading: false,
                autoClose: 2000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                {/* Keep existing form fields */}
            </form>
        </div>
    );
};

export default Login;