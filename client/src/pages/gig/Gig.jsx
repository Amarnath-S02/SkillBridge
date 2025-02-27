import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  
  const { id } = useParams();

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

  // Fetch seller's orders (using seller's userId from gig)
  const { isLoading: isLoadingOrders, error: errorOrders, data: orders } = useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await newRequest.get(`/orders?sellerId=${userId}`);
      return response.data;
    },
    enabled: !!userId, // Fetch only if userId is available
  });

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
            <span className="breadcrumbs">SkillBridge {">"} Graphics & Design {">"}</span>
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
                  <button>Contact Me</button>
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
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
