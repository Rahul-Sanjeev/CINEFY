import React, { useState } from "react";
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

    const handleRegister = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

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
                {/* Keep existing form fields */}
            </form>
        </div>
    );
};

export default Register;