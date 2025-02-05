import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddMovies.css";
import { FaArrowLeft } from "react-icons/fa"; 
import API_BASE_URL from './config';
import { ClipLoader } from "react-spinners";

function AddMovies() {
    const [formData, setFormData] = useState({
        name: "",
        release_year: "",
        director: "",
        casts: "",
        genre: "",
        description: "",
        poster_image: null,
        trailer_video: "",
        rating: "", 
    });


    const [isLoading, setIsLoading] = useState(false); // New state for loading

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, poster_image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Disable the submit button and show loading state
        setIsLoading(true);

        // Show the loading toast
        const loadingToastId = toast.info(
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ClipLoader color="#36D7B7" size={20} />
                <span>Please wait, your movie is being added...</span>
            </div>,
            {
                position: "top-center", // Center the toast
                autoClose: false, // Don't auto-close
                closeButton: false, // Hide the close button
                hideProgressBar: true, // Hide the progress bar
            }
        );

        const data = new FormData();
        for (let key in formData) {
            if (key === "rating") {
                data.append(key, parseFloat(formData[key])); // Ensure it's a number
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/movies/add/`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Token ${localStorage.getItem('authToken')}`
                    },
                }
            );

            toast.dismiss(loadingToastId);  // Dismiss the loading toast

            toast.success(response.data.message); // Show success toast
            // Redirect after success
            setTimeout(() => {
                navigate("/movies"); // Redirect after success
            }, 2000);
        } catch (error) {
            console.error("Error adding movie:", error.response?.data || error.message);

            toast.dismiss(loadingToastId);// Dismiss the loading toast

            // Show error toast
            toast.error("An error occurred while adding the movie.",
                {
                    position: "top-center",
                    autoClose: 2000,
                }
            );

        } finally {
            // Re-enable the submit button and hide loading state
            setIsLoading(false);
        }
    };

    return (
        <div className="add-movie-container">
            {/* Back Button with Arrow Icon */}
            <button
                onClick={() => navigate(-1)} // Go back to the previous page
                style={{
                    backgroundColor: '#6A7081',
                    color: 'white',
                    marginTop: '15px',
                    marginLeft: '15px',
                    width: '100px',
                    height: '40px',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',  // Space between icon and text
                }}
            >
                <FaArrowLeft />  {/* Arrow Icon */}
                Back
            </button>
            <h1 className="add-movie-title" style={{ color: "#2663EB" }}>Add a New Movie</h1>
            <ToastContainer autoClose={1000} />
            <form onSubmit={handleSubmit} className="add-movie-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Movie Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading} // Disable input while loading
                />
                <input
                    type="number"
                    name="release_year"
                    placeholder="Release Year"
                    value={formData.release_year}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading} // Disable input while loading
                />
                <input
                    type="text"
                    name="director"
                    placeholder="Director"
                    value={formData.director}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading} // Disable input while loading
                />
                <input
                    type="text"
                    name="casts"
                    placeholder="Casts"
                    value={formData.casts}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading} // Disable input while loading
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading} // Disable input while loading
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading} // Disable input while loading
                />
                <input
                    type="file"
                    name="poster_image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    disabled={isLoading} // Disable input while loading
                />
                <input
                    type="url"
                    name="trailer_video"
                    placeholder="Trailer Video URL"
                    value={formData.trailer_video}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading} // Disable input while loading
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (out of 10)"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading} // Disable input while loading
                />

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isLoading}
                >
                    {isLoading ? "Adding Movie..." : "Add Movie"}

                </button>
            </form>
        </div>
    );
}

export default AddMovies;
