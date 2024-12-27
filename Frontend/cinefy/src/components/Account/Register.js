import React, { useState } from "react";
import axios from "axios";
import "../../styles/Auth.css";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();

        // Reset messages and disable button
        setErrorMessage("");
        setSuccessMessage("");
        setIsSubmitting(true);

        if (password !== password2) {
            setErrorMessage("Passwords do not match");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/users/register/", {
                username,
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                password2,
            });

            setSuccessMessage(response.data.message);
            setUsername("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setPassword2("");

            navigate('/login'); // Redirect to the login page

        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.detail || "Registration failed");
                console.error(error.response);

            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>
                </form>

                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </div>
        </>
    );
};

export default Register;
