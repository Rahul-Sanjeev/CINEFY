import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

function RegistrationPage() {
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password1: "",
        password2: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/users/register/", formData);
            console.log("User registered successfully:", response.data);
            alert("Registration successful!");
            // Optionally reset the form
            setFormData({
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                password1: "",
                password2: "",
            });
        } catch (error) {
            console.error("Error registering user:", error.response?.data);
            const errorMessage = error.response?.data?.errors || "An unknown error occurred.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password1"
                        value={formData.password1}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}

export default RegistrationPage;
