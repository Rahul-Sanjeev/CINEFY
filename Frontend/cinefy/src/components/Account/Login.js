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
            const response = await axios.post("http://127.0.0.1:8000/users/login/", {
                username,
                password,
            });

            // Save token to localStorage
            localStorage.setItem("authToken", response.data.token);

            // Dispatch custom event to notify NavBar
            window.dispatchEvent(new Event("authChange"));

            // Show success toast and navigate to home
            toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
            navigate("/");
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
