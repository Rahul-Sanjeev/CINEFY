import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/MovieDetailsPage.css";

function MovieDetailsPage() {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/movies/${id}/`) // Fetch single movie details
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
                setLoading(false);
            });
    }, [id]);

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
                <h1 className="text-4xl font-bold mb-4">{movie.name}</h1>
                <div className="poster">
                    <img
                        src={`http://127.0.0.1:8000${movie.image_url}`}
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
            </div>
        </div>
    );
}

export default MovieDetailsPage;
