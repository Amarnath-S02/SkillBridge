import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import "./Review.scss";

const Review = ({ review }) => {
  const queryClient = useQueryClient();

  // Fetch reviewer details
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  // Local state for optimistic UI updates
  const [helpfulYes, setHelpfulYes] = useState(review.helpfulYes || 0);
  const [helpfulNo, setHelpfulNo] = useState(review.helpfulNo || 0);
  const [selected, setSelected] = useState(null); // Track user's selection

  // Mutation for updating helpful votes
  const helpfulMutation = useMutation({
    mutationFn: ({ reviewId, type }) =>
      newRequest.put(`/reviews/${reviewId}/helpful`, { type }),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]); // Refresh reviews data
    },
  });

  // Handle helpful vote click
  const handleHelpfulClick = (type) => {
    if (selected) return; // Prevent multiple selections

    setSelected(type);

    if (type === "yes") {
      setHelpfulYes((prev) => prev + 1);
    } else {
      setHelpfulNo((prev) => prev + 1);
    }

    helpfulMutation.mutate({ reviewId: review._id, type });
  };

  return (
    <div className="review">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error loading user data"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/img/noavatar.jpg"} alt="User" />
          <div className="info">
            <span className="username">{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <img src="/img/star.png" alt="star" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <button
          className={`helpful-option ${selected === "yes" ? "selected" : ""}`}
          onClick={() => handleHelpfulClick("yes")}
          disabled={selected !== null}
        >
          <img src="/img/like.png" alt="Yes" />
          <span>{helpfulYes}</span>
        </button>
        <button
          className={`helpful-option ${selected === "no" ? "selected" : ""}`}
          onClick={() => handleHelpfulClick("no")}
          disabled={selected !== null}
        >
          <img src="/img/dislike.png" alt="No" />
          <span>{helpfulNo}</span>
        </button>
      </div>
    </div>
  );
};

export default Review;
