import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css"

function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/users/login/", formData) // Backend URL for login
            .then((response) => {
                console.log("User logged in successfully:", response.data);
                alert("Login successful!");
            })
            .catch((error) => {
                console.error("Error logging in:", error.response.data);
                alert("Login failed!");
            });
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
