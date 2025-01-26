import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const ReviewSection = () => {
    const { id: movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ comments: "", rating: 0 });
    const [editingReviewId, setEditingReviewId] = useState(null); // Track editing state

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/movies/${movieId}/reviews/`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                toast.error("Failed to fetch reviews. Please try again."); // Toast for fetch error
            }
        };
        fetchReviews();
    }, [movieId]);

    // Handle review submission (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId"); // Get current user's ID

        try {
            if (editingReviewId) {
                // Update existing review
                const response = await axios.put(
                    `http://127.0.0.1:8000/movies/${movieId}/reviews/${editingReviewId}/`,
                    newReview,
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                // Update the review in the state
                setReviews(reviews.map(review =>
                    review.id === editingReviewId ? response.data : review
                ));
                setEditingReviewId(null); // Reset editing state
                toast.success("Review updated successfully!"); // Toast for successful update
            } else {
            // Create new review
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
                // Add new review to the state
                setReviews([...reviews, response.data]);
                toast.success("Review submitted successfully!"); // Toast for successful submission
            }
            setNewReview({ comments: "", rating: 0 }); // Clear form
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review. Please try again."); // Toast for submission error
        }
    };

    // Handle review deletion
    const handleDelete = async (reviewId) => {
        const token = localStorage.getItem("authToken");
        try {
            await axios.delete(
                `http://127.0.0.1:8000/movies/${movieId}/reviews/${reviewId}/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            // Remove the deleted review from the state
            setReviews(reviews.filter(review => review.id !== reviewId));
            toast.success("Review deleted successfully!"); // Toast for successful deletion
        } catch (error) {
            console.error("Error deleting review:", error);
            toast.error("Failed to delete review. Please try again."); // Toast for deletion error
        }
    };

    return (
        <div>
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <h3>Reviews</h3>
            {reviews.length > 0 ? (
                reviews.map((review) => {
                    const currentUserId = localStorage.getItem("userId"); // Get current user's ID
                    const isCurrentUser = review.user_id === Number(currentUserId);

                    return (
                        <div key={review.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                            <p><strong>{review.user}:</strong> {review.comments}</p>
                            <p>Rating: {review.rating}</p>
                            {isCurrentUser && (
                                <div>
                                    <button
                                        onClick={() => {
                                            setEditingReviewId(review.id);
                                            setNewReview({
                                                comments: review.comments,
                                                rating: review.rating,
                                            });
                                        }}
                                        style={{
                                            backgroundColor: 'blue',
                                            color: 'white',
                                            marginTop: '15px',
                                            margin: '15px',
                                            width: '100px',
                                            height: '30px',
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            marginTop: '15px',
                                            margin: '15px',
                                            width: '100px',
                                            height: '30px',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <p>No reviews found.</p>
            )}

            <form onSubmit={handleSubmit}>
                <h4>{editingReviewId ? "Edit Review" : "Add Review"}</h4>
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
                    {editingReviewId ? "Update Review" : "Submit Review"}
                </button>
                {editingReviewId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingReviewId(null);
                            setNewReview({ comments: "", rating: 0 });
                        }}
                        style={{ marginLeft: '10px' }}
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default ReviewSection;