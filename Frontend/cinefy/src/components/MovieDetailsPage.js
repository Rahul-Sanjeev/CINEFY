import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate
import axios from "axios";
import "../styles/MovieDetailsPage.css";
import ReviewSection from "./ReviewSection";
import { FaArrowLeft } from "react-icons/fa";  // Import the arrow icon

function MovieDetailsPage() {
    const { id } = useParams();  // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Initialize useNavigate hook

    useEffect(() => {
        console.log("Fetching movie with ID:", id);
        axios.get(`http://127.0.0.1:8000/movies/${id}/`)
            .then((response) => {
                console.log("Movie details response:", response.data);
                setMovie(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error.response || error.message);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        axios
            .delete(`http://127.0.0.1:8000/movies/${id}/`)  // Correct API endpoint to delete the movie
            .then(() => {
                alert("Movie deleted successfully");
                navigate("/movies");  // Navigate back to the movie list page
            })
            .catch((error) => {
                console.error("Error deleting movie:", error);
                alert("Failed to delete movie.");
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-xl text-gray-700">Loading Movie Details...</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-xl text-red-500">Movie not found.</div>
            </div>
        );
    }

    return (


        <div className="container bg-gray-100 py-12 px-6 sm:px-12">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
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
                <h1 className="text-4xl font-bold mb-4">{movie.name}</h1>
                <div className="poster">
                    <img
                        src={`http://127.0.0.1:8000${movie.poster_image}`}
                        alt={movie.name}
                        className="w-full object-cover"
                    />
                </div>
                <div className="p-6">
                    <p className="text-gray-600 mb-2">
                        <strong>Release Year:</strong> {movie.release_year}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>Director:</strong> {movie.director}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>Casts:</strong> {movie.casts}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>Genre:</strong> {movie.genre}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>Rating:</strong> {movie.rating}/10
                    </p>
                    <p className="text-gray-800 mb-4">{movie.description}</p>
                    <a
                        href={movie.trailer_video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Watch Trailer
                    </a>
                </div>
                {/* Review Section */}
                <ReviewSection />

                {/* Edit and Delete Buttons */}
                <div className="p-6 flex justify-between">
                    <button
                        onClick={() => navigate(`/editmovie/${id}`)}  // Navigate to Edit page
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Edit Movie
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete Movie
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailsPage;