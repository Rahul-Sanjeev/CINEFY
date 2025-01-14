import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditMoviePage.css";

function EditMoviePage() {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState({
        name: "",
        release_year: "",
        director: "",
        casts: "",
        genre: "",
        rating: "",
        description: "",
        poster_image: "",
        trailer_video: "",
    });
    const [loading, setLoading] = useState(true);
    const history = useNavigate(); // To navigate programmatically

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/movies/${id}/`)
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
                setLoading(false);
            });
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "poster_image") {
            setMovie((prevMovie) => ({
                ...prevMovie,
                [name]: files[0], // Ensure `files[0]` is being used correctly
            }));
        } else {
            setMovie((prevMovie) => ({
                ...prevMovie,
                [name]: value,
            }));
        }
    };




    // Handle form submission to update the movie
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", movie.name);
        formData.append("release_year", movie.release_year);
        formData.append("director", movie.director);
        formData.append("casts", movie.casts);
        formData.append("genre", movie.genre);
        formData.append("rating", movie.rating);
        formData.append("description", movie.description);
        formData.append("poster_image", movie.poster_image);  // Leave unchanged in the backend if it's a URL (string)
        formData.append("trailer_video", movie.trailer_video);



        // Log FormData to check if image is correctly appended
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }


        axios
            .put(`http://127.0.0.1:8000/movies/${id}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                history(`/movies/${id}`); // Correct usage of history
            })
            .catch((error) => {
                console.error("Error updating movie:", error);
            });
    };





    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-xl text-gray-700">Loading Movie Details...</div>
            </div>
        );
    }

    return (
        <div className="container bg-gray-100 py-12 px-6 sm:px-12">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <h1 className="text-4xl font-bold mb-4">Edit Movie</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700" htmlFor="name">
                            Movie Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={movie.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="release_year">
                            Release Year:
                        </label>
                        <input
                            type="text"
                            name="release_year"
                            value={movie.release_year}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="director">
                            Director:
                        </label>
                        <input
                            type="text"
                            name="director"
                            value={movie.director}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="casts">
                            Casts:
                        </label>
                        <input
                            type="text"
                            name="casts"
                            value={movie.casts}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="genre">
                            Genre:
                        </label>
                        <input
                            type="text"
                            name="genre"
                            value={movie.genre}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="rating">
                            Rating:
                        </label>
                        <input
                            type="number"
                            name="rating"
                            value={movie.rating}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="description">
                            Description:
                        </label>
                        <textarea
                            name="description"
                            value={movie.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="poster_image">
                            Movie Image:
                        </label>
                        <input
                            type="file"
                            name="poster_image"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700" htmlFor="trailer_video">
                            Trailer Video URL:
                        </label>
                        <input
                            type="url"
                            name="trailer_video"
                            value={movie.trailer_video}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditMoviePage;
