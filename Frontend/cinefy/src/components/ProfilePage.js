import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ProfilePage.css"; // Add your custom styles

function ProfilePage() {
  const [user, setUser] = useState(null); // State to store user details
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("authToken"); // Get auth token

      // Check if user is authenticated
      if (!token) {
        toast.error("You are not logged in. Redirecting to login...");
        navigate("/login"); // Redirect to login if user is not authenticated
        return;
      }

      try {
        const API_BASE_URL =
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_API_URL_LOCALHOST
            : process.env.REACT_APP_API_URL_DEPLOY;

        // Fetch current user details from the backend
        const response = await axios.get(`${API_BASE_URL}/users/current-user/`, {
          headers: {
            Authorization: `Token ${token}`, // Include the auth token in the request
          },
        });

        // Set user details in state
        setUser(response.data);
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching user details:", error);

        // Handle specific error cases
        if (error.response && error.response.status === 401) {
          toast.error("Your session has expired. Please log in again.");
        } else {
          toast.error("Failed to fetch user details. Please try again.");
        }

        // Redirect to login page on error
        navigate("/login");
      }
    };

    fetchCurrentUser(); // Call the function to fetch current user details
  }, [navigate]);

  // Show loading message while fetching data
  if (loading) {
    return (
      <div className="profile-loading">
        <p>Loading user details...</p>
      </div>
    );
  }

  // Show error message if user details are not found
  if (!user) {
    return (
      <div className="profile-error">
        <p>User not found.</p>
      </div>
    );
  }

  // Render the user profile details
  return (
    <div className="profile-container">
      <h1>Account</h1>
      <div className="profile-details">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Full Name:</strong> {user.first_name} {user.last_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
}

export default ProfilePage;