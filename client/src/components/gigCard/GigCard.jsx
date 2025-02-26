import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigUser", item.userId],
    queryFn: () =>
      item.userId && /^[a-fA-F0-9]{24}$/.test(item.userId) // Check if it's a valid ObjectId
        ? newRequest.get(`/users/${item.userId}`).then((res) => res.data)
        : null,
    enabled: !!item.userId && /^[a-fA-F0-9]{24}$/.test(item.userId),
  });

  // Function to truncate description after 2 lines (Approx. 100 characters)
  const truncateDescription = (text, maxChars = 100) => {
    if (!text) return "";
    return text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
  };

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="Gig Cover" className="cover-img" />
        
        <div className="info">
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : error ? (
            <p className="error">Something went wrong!</p>
          ) : (
            <div className="user">
              <img src={data?.img || "/img/noavatar.jpg"} alt="User Avatar" className="user-img" />
              <span className="username">{data?.username || "Unknown User"}</span>
            </div>
          )}

          {/* Truncated description */}
          <p className="description">{truncateDescription(item.desc)}</p>

          <div className="star">
            <img src="./img/star.png" alt="Star" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>

        <div className="detail">
          <img src="./img/heart.png" alt="Heart" className="wishlist-icon" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>₹ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
