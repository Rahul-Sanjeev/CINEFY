import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../styles/AddMovies.css";

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
    });

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();  // Initialize navigate

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, poster_image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/movies/add/", // your API endpoint here
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setMessage(response.data.message); // Show success message
            setError(null); // Clear error message if success

            // Redirect to the movies page after success
            setTimeout(() => {
                navigate("/movies"); // Replace with your movies page route
            }, 2000); // 2 seconds delay before redirect

        } catch (error) {
            console.error("Error adding movie:", error.response?.data || error.message);
            setError("An error occurred while adding the movie."); // Show error message
            setMessage(null); // Clear success message if error
        }
    };

    return (
        <div className="add-movie-container">
            <h1 className="add-movie-title">Add a New Movie</h1>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="add-movie-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Movie Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="release_year"
                    placeholder="Release Year"
                    value={formData.release_year}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="director"
                    placeholder="Director"
                    value={formData.director}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="casts"
                    placeholder="Casts"
                    value={formData.casts}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="file"
                    name="poster_image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <input
                    type="url"
                    name="trailer_video"
                    placeholder="Trailer Video URL"
                    value={formData.trailer_video}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="submit-btn">Add Movie</button>
            </form>
        </div>
    );
}

export default AddMovies;
