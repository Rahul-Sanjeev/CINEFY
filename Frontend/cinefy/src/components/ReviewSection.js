import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from './config'

const ReviewSection = () => {
    const { id: movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ comments: "", rating: 0 });
    const [editingReviewId, setEditingReviewId] = useState(null);

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/movies/${movieId}/reviews/`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                toast.error("Failed to fetch reviews. Please try again.");
            }
        };
        fetchReviews();
    }, [movieId]);

    // Handle review submission (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");

        if (!token) {
            toast.error("You must be logged in to submit a review.");
            return;
        }

        // 🔹 **Validation Before API Call**
        if (!newReview.comments.trim()) {
            toast.error("Review cannot be empty.");
            return;
        }
        if (newReview.rating < 0 || newReview.rating > 5) {
            toast.error("Rating must be between 0 and 5.");
            return;
        }

        try {
            const url = editingReviewId
                ? `${API_BASE_URL}/movies/${movieId}/reviews/${editingReviewId}/`
                : `${API_BASE_URL}/movies/${movieId}/reviews/`;

            const method = editingReviewId ? "put" : "post";

            const response = await axios({
                method,
                url,
                data: newReview,
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setReviews((prevReviews) =>
                editingReviewId
                    ? prevReviews.map((r) => (r.id === editingReviewId ? response.data : r))
                    : [...prevReviews, response.data]
            );

            toast.success(editingReviewId ? "Review updated!" : "Review submitted!");
            setNewReview({ comments: "", rating: 0 });
            setEditingReviewId(null);
        } catch (error) {
            console.error("Error submitting review:", error);

            if (error.response?.status === 401) {
                toast.error("Session expired. Please log in again.");
                localStorage.removeItem("authToken");
                window.location.href = "/login";
            } else {
                toast.error("Failed to submit review. Try again.");
            }
        }
    };

    // Handle review deletion
    const handleDelete = async (reviewId) => {
        const token = localStorage.getItem("authToken");

        // 🔹 **Check if User is Logged In Before Deleting**
        if (!token) {
            toast.error("You must be logged in to delete a review.");
            return;
        }

        try {
            await axios.delete(
                `${API_BASE_URL}/movies/${movieId}/reviews/${reviewId}/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            setReviews(reviews.filter(review => review.id !== reviewId));
            toast.success("Review deleted successfully!");
        } catch (error) {
            console.error("Error deleting review:", error);
            toast.error("Failed to delete review. Please try again.");
        }
    };

    return (
        <div className="p-4">
            <ToastContainer position="top-right" autoClose={3000} />

            <h3 className="text-xl font-bold mb-4">Reviews</h3>

            {reviews.length > 0 ? (
                reviews.map((review) => {
                    const currentUserId = localStorage.getItem("userId");
                    const isCurrentUser = review.user_id === Number(currentUserId);

                    return (
                        <div key={review.id} className="border p-4 rounded-lg shadow-md bg-white my-2">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${review.user}`}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <p className="font-semibold">{review.user}</p>
                            </div>
                            <p className="text-gray-700">{review.comments}</p>
                            <p className="text-yellow-500">⭐ {review.rating}</p>

                            {isCurrentUser && (
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        onClick={() => {
                                            setEditingReviewId(review.id);
                                            setNewReview({ comments: review.comments, rating: review.rating });
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <p className="text-gray-500">No reviews found.</p>
            )}

            {/* Review Form */}
            <form onSubmit={handleSubmit} className="mt-4">
                <h4 className="text-lg font-semibold">{editingReviewId ? "Edit Review" : "Add Review"}</h4>
                <textarea
                    value={newReview.comments}
                    onChange={(e) => setNewReview({ ...newReview, comments: e.target.value })}
                    placeholder="Write your review..."
                    required
                    className="w-full p-2 border rounded-lg mt-2"
                    aria-label="Review Comments"
                />
                <input
                    type="number"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    placeholder="Rating (0-5)"
                    min={0}
                    max={5}
                    step={0.1}
                    required
                    className="w-full p-2 border rounded-lg mt-2"
                    aria-label="Review Rating"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full"
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
                        className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default ReviewSection;
