import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from '../config';
import "../../styles/Auth.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Real time password validation
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [password2Error, setPassword2Error] = useState('');
    const commonPasswords = [
        'password', '12345678', 'qwerty', 'abc123', 'letmein',
        'monkey', 'sunshine', 'admin', 'welcome', 'password1'
    ];

    const validatePassword = (password) => {
        const errors = [];
        const personalInfo = [
            formData.username,
            formData.firstName,
            formData.lastName,
            formData.email.split('@')[0]
        ].filter(Boolean);

        // Minimum length check
        if (password.length < 8) {
            errors.push("Password must contain at least 8 characters");
        }

        // Numeric check
        if (/^\d+$/.test(password)) {
            errors.push("Password cannot be entirely numeric");
        }

        // Common password check
        if (commonPasswords.includes(password.toLowerCase())) {
            errors.push("Password is too common");
        }

        // Similarity check
        const isSimilar = personalInfo.some(info =>
            password.toLowerCase().includes(info.toLowerCase())
        );
        if (isSimilar) {
            errors.push("Password too similar to personal information");
        }

        return errors;
    };

    // Real-time password validation
    useEffect(() => {
        if (formData.password) {
            setPasswordErrors(validatePassword(formData.password));
        }
    }, [formData.password, formData.username,
    formData.firstName, formData.lastName, formData.email]);

    // Password confirmation check
    useEffect(() => {
        if (formData.password2 && formData.password !== formData.password2) {
            setPassword2Error("Passwords do not match");
        } else {
            setPassword2Error('');
        }
    }, [formData.password, formData.password2]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;


        // Final validation check
        const errors = validatePassword(formData.password);
        if (errors.length > 0 || formData.password !== formData.password2) {
            setPasswordErrors(errors);
            if (formData.password !== formData.password2) {
                setPassword2Error("Passwords do not match");
            }
            toast.error("Please fix password errors before submitting");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Registering...");

        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/users/register/`,
                {
                    username: formData.username,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    password2: formData.password2
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    timeout: 5000
                }
            );

            toast.update(toastId, {
                render: data.message,
                type: "success",
                isLoading: false,
                autoClose: 1000
            });

            // Clear form and redirect
            setFormData({
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                password2: ""
            });

            navigate('/login');

        } catch (error) {
            const message = error.response?.data?.detail ||
                error.response?.data?.message ||
                "Registration failed";

            toast.update(toastId, {
                render: `Error: ${message}`,
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
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                {passwordErrors.map((error, index) => (
                    <div key={index} className="error-message">{error}</div>
                ))}

                <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    value={formData.password2}
                    onChange={handleInputChange}
                    required
                />
                {password2Error && <div className="error-message">{password2Error}</div>}

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;