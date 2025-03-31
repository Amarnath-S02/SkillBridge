import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Fetch all reviews
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  // ✅ Check if the user has purchased the gig
  const { data: purchaseData, isLoading: isCheckingPurchase } = useQuery({
    queryKey: ["purchaseCheck", gigId, currentUser?._id],
    queryFn: () =>
      newRequest.get(`/orders/checkPurchase/${gigId}`).then((res) => res.data),
    enabled: !!currentUser, // Run query only if user is logged in
  });

  const hasPurchased = purchaseData?.purchased;

  // Handle review submission
  const mutation = useMutation({
    mutationFn: (review) =>
      newRequest.post("/reviews", review, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Ensure you send the token
        },
      }),
    onSuccess: () => queryClient.invalidateQueries(["reviews"]),
    onError: (error) => {
      console.error("Review Submission Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to submit review.");
    },
  });
  

  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value.trim(); // Ensure description is not empty
  
    if (!desc || rating === 0) {
      alert("Please enter a review and select a rating!");
      return;
    }
  
    mutation.mutate(
    { gigId, desc, star: rating },
    {
      onSuccess: () => {
        e.target[0].value = ""; // Reset input field
        setRating(0); // Reset rating selection
      },
    }
  );
  };
  

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">Something went wrong!</p>
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}

      <div className="add">
        <h3>Add a review</h3>
        {isCheckingPurchase ? (
          <p className="loading">Checking purchase status...</p>
        ) : hasPurchased ? (
          <form className="addForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Write your opinion..." className="review-input" />
            <div className="stars">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() => setRating(num)}
                  className={num <= rating ? "star active" : "star"}
                >
                  ★
                </span>
              ))}
            </div>
            <button className="submit-button">Send</button>
          </form>
        ) : (
          <p className="warning">⚠ You must purchase this gig before leaving a review.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
