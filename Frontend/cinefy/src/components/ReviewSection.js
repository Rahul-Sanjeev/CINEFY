import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReviewSection = () => {
    const { id: movieId } = useParams(); // Use 'id' from the URL and rename it to 'movieId'
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ comments: "", rating: 0 });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/movies/${movieId}/reviews/`
                );
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [movieId]);

    // Handle review submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the auth token from localStorage
        const token = localStorage.getItem("authToken");

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/movies/${movieId}/reviews/`,
                newReview,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Refresh reviews after submission
            setReviews([...reviews, response.data]);
            setNewReview({ comments: "", rating: 0 }); // Clear the form
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div>
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                        <p><strong>{review.user}:</strong> {review.comments}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))
            ) : (
                <p>No reviews found.</p>
            )}

            <form onSubmit={handleSubmit}>
                <h4>Add Review</h4>
                <textarea
                    value={newReview.comments}
                    onChange={(e) => setNewReview({ ...newReview, comments: e.target.value })}
                    placeholder="Write your review..."
                    required
                />
                <input
                    type="number"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseFloat(e.target.value) })}
                    placeholder="Rating (0-5)"
                    min={0}
                    max={5}
                    step={0.1}
                    required
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        marginTop: '15px',
                        width: '200px',
                    }}
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewSection;