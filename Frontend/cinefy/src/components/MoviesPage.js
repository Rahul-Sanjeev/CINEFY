import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/MoviesPage.css";
import API_BASE_URL from './config'  // Import API_BASE_URL
import Loader from "./loader"


function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/movies/`) // Fetch movie data from Django API
            .then((response) => {
                setMovies(response.data.movies_data);
                setLoading(false);
                const csrfToken = response.data.csrfToken;
                axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const handleAddMovieClick = () => {
        navigate("/add-movie"); // Navigate to AddMovies page
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-gray-700"><Loader size={40} color="#36D7B7" />Loading Movies</div>
            </div>
        );
    }

    return (
        <div className=" container min-h-screen py-12 px-6 sm:px-12">
            <div className="max-w-7xl mx-auto container">
                <h1 className="text-3xl font-extrabold text-center mb-10">
                    All Movies
                </h1>

                <button
                    className="add-movie-btn"
                    onClick={handleAddMovieClick}
                >
                    Add Movie
                </button>

                <ul className="movies-list">
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <Link to={`/movies/${movie.id}`} className="movie-card-link">
                                <img
                                    src={
                                        movie.poster_image.startsWith('http')
                                            ? movie.poster_image
                                            : `${API_BASE_URL}${movie.poster_image}`
                                    }
                                    alt={movie.name}
                                    className="movie-poster"
                                />

                                <div className="movie-content">
                                    <h2>{movie.name} ({movie.release_year})</h2>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MoviesPage;
