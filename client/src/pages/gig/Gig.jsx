import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch gig details
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id], // Ensure different gigs don’t mix data
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  // Fetch user details
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", userId], // Unique key per user
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId, // Run query only when userId exists
  });

  // Navigate to the messages page instead of opening email
  const handleContact = (user) => {
    window.location.href = `mailto:${user.email}`;
  };
  

  return (
    <div className="gig">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              SkillBridge {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>

            {/* User Info */}
            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser?.img || "/img/noavatar.jpg"}
                  alt="User Avatar"
                />
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

            {/* Seller Info */}
            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser?.img || "/img/noavatar.jpg"} alt="User" />
                  <div className="info">
                    <span>{dataUser?.username || "Unknown User"}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((_, i) => (
                            <img src="/img/star.png" alt="Star" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button onClick={() => handleContact(dataUser)}>Contact Me</button>

            
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
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Current Projects</span>
                      <span className="desc">2 Active</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser?.desc || "No description available."}</p>
                </div>
              </div>
            )}

            <Reviews gigId={id} />
          </div>

          {/* Gig Pricing Section */}
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>₹ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="Clock Icon" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="Recycle Icon" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="Check Icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
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
