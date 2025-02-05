import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API_BASE_URL from '../config';
import "../../styles/Auth.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

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


    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {
            username: '',
            password: ''
        };

        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!validateForm()) return;

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

                // Notify all components about auth state change
                window.dispatchEvent(new Event("authChange"));

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
            const backendError = error.response?.data?.detail || "Authentication failed";
            // Handle different error types
            if (backendError.toLowerCase().includes('password')) {
                setErrors(prev => ({
                    ...prev,
                    password: backendError
                }));
            } else if (backendError.toLowerCase().includes('user')) {
                setErrors(prev => ({
                    ...prev,
                    username: backendError
                }));
            } else {
                toast.update(toastId, {
                    render: `Login failed: ${backendError}`,
                    type: "error",
                    isLoading: false,
                    autoClose: 2000
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>

                {/* Username Input */}
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors(prev => ({ ...prev, username: '' }));
                        }}
                        required
                        autoComplete="username"
                        className={errors.username ? 'error' : ''}
                    />
                    {errors.username && (
                        <div className="error-message">{errors.username}</div>
                    )}
                </div>
                {/* Password Input */}
                <div className="input-group">
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors(prev => ({ ...prev, password: '' }));
                            }}
                            required
                            autoComplete="current-password"
                            className={errors.password ? 'error' : ''}
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={isSubmitting ? "loading" : ""}
                >
                    {isSubmitting ? "Authenticating..." : "Login"}
                </button>

                {errors.password && (
                    <div className="error-message">{errors.password}</div>
                )}

            </form>
        </div>
    );
};

export default Login;