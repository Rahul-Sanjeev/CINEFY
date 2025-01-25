import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        rating: "", // Add rating field
    });

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
                "http://127.0.0.1:8000/movies/add/",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success(response.data.message); // Show success toast
            setTimeout(() => {
                navigate("/movies"); // Redirect after success
            }, 2000);
        } catch (error) {
            console.error("Error adding movie:", error.response?.data || error.message);
            toast.error("An error occurred while adding the movie."); // Show error toast
        }
    };

    return (
        <div className="add-movie-container">
            <h1 className="add-movie-title">Add a New Movie</h1>
            <ToastContainer position="top-right" autoClose={5000} />
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
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (out of 10)"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="submit-btn">Add Movie</button>
            </form>
        </div>
    );
}

export default AddMovies;
