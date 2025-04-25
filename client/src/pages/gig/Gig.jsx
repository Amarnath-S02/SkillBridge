import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch gig details
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  // Fetch seller details
  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId, // Fetch only if userId is available
  });

  // Fetch seller's orders
  const { isLoading: isLoadingOrders, error: errorOrders, data: orders } = useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await newRequest.get(`/orders?sellerId=${userId}`);
      return response.data;
    },
    enabled: !!userId, // Fetch only if userId is available
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleContact = async () => {
    if (!currentUser) {
      alert("Please log in to contact the seller.");
      return;
    }

    const sellerId = data?.userId;
    const buyerId = currentUser?._id;
    if (!sellerId || !buyerId) return;

    const conversationId = sellerId + buyerId; // Ensure IDs are valid

    try {
      // Check if conversation already exists
      const res = await newRequest.get(`/conversations/single/${conversationId}`);
      console.log("Existing conversation found:", res.data);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Conversation does not exist, create a new one
        try {
          const res = await newRequest.post(`/conversations/`, {
            id: conversationId,  // Ensure consistency with backend schema
            sellerId: sellerId,
            buyerId: buyerId,
          });

          console.log("New conversation created:", res.data);
          navigate(`/message/${res.data.id}`);
        } catch (createErr) {
          console.error("Error creating conversation:", createErr);
          alert("Failed to create conversation. Please try again later.");
        }
      } else {
        console.error("Error fetching conversation:", err);
        alert("Error checking conversation. Please try again later.");
      }
    }
  };

  // Filter orders to count active ("pending") and completed projects
  const sellerOrders = orders || [];
  const pendingOrders = sellerOrders.filter((order) => order.status === "pending").length;
  const completedOrders = sellerOrders.filter((order) => order.status === "completed").length;

  return (
    <div className="gig">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">SkillBridge</span>
            <h1>{data.title}</h1>

            {/* Seller Info */}
            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img className="pp" src={dataUser?.img || "/img/noavatar.jpg"} alt="User Avatar" />
                <span>{dataUser?.username || "Unknown User"}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    <img src="/img/star.png" alt="Star" />
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}

            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="Gig Image" />
              ))}
            </Slider>

            <h2>About This Service</h2>
            <p>{data.desc}</p>

            {/* Seller Statistics */}
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src={dataUser?.img || "/img/noavatar.jpg"} alt="User" />
                <div className="info">
                  <span>{dataUser?.username || "Unknown User"}</span>
                  <button onClick={handleContact}>Contact Me</button>
                </div>
              </div>

              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{dataUser?.country || "N/A"}</span>
                  </div>
                  <div className="item">
                    <span className="title">Email</span>
                    <span className="desc">{dataUser?.email}</span>
                  </div>
                  <div className="item">
                    <span className="title">Current Projects</span>
                    <span className="desc">{isLoadingOrders ? "Loading..." : `${pendingOrders} Active`}</span>
                  </div>
                  <div className="item">
                    <span className="title">Total Projects Completed</span>
                    <span className="desc">{isLoadingOrders ? "Loading..." : `${completedOrders} Completed`}</span>
                  </div>
                </div>
                <hr />
                <p>{dataUser?.desc || "No description available."}</p>
              </div>
            </div>

            <Reviews gigId={id} />
          </div>

          {/* Pricing Section */}
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>₹ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/check2.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}

              <div className="details-row">
                <div className="item">
                  <img src="/img/clock.png" alt="" />
                  <span>{data.deliveryTime} Days Delivery</span>
                 
                  <img src="/img/recycle.png" alt="" />
                  <span>{data.revisionNumber} Revisions</span>
                </div>
               
              </div>    
            </div>

            {currentUser ? (
              currentUser._id !== data.userId && (
                <Link to={`/pay/${id}`}>
                  <button>Continue</button>
                </Link>
              )
            ) : (
              <button onClick={() => navigate("/login")}>Continue</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
