import React from 'react';
import Slider from 'infinite-react-carousel';
import "./gig.scss";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom';
import newRequest from "../../utils/newRequest"; // Ensure correct import

const Gig = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id], // Include id in queryKey
    queryFn: () =>
      newRequest
        .get(`/gigs/single/${id}`)
        .then((res) => res.data),
  });

  return (
    <div className="gig">
      {isLoading ? "Loading..." : error ? "Something went wrong!" : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">SkillBridge {">"} Graphics & Design {">"}</span>
            <h1>{data?.title}</h1>
            <div className="user">
              <img className="pp" src="https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=500&auto=format&fit=crop&q=60" alt="User" />
              <span>Amar</span>
              <div className="stars">
                <img src="/img/star.png" alt="Star" />
                <img src="/img/star.png" alt="Star" />
                <img src="/img/star.png" alt="Star" />
                <span>3</span>
              </div>
            </div>
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data?.images?.map((img) => (
                <img key={img} src={img} alt="Gig" />
              ))}
            </Slider>
            <h2>About This Service</h2>
            <p>{data?.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src="https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=500&amp;auto=format&amp;fit=crop&amp;q=60" alt="" />
                <div className="info">
                  <span>Amar</span>
                  <div className="stars">
                    <img src="/img/star.png" alt="Star" />
                    <img src="/img/star.png" alt="Star" />
                    <img src="/img/star.png" alt="Star" />
                    <span>3</span>
                  </div>
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item"><span className="title">From</span><span className="desc">India</span></div>
                  <div className="item"><span className="title">Member Since</span><span className="desc">Jan 2025</span></div>
                  <div className="item"><span className="title">Avg Response Time</span><span className="desc">2 hours</span></div>
                  <div className="item"><span className="title">Last Delivery</span><span className="desc">1 day</span></div>
                  <div className="item"><span className="title">Current Projects</span><span className="desc">2 active</span></div>
                </div>
                <hr />
                <p>
                  Hi, I'm Amar! I create unique AI-generated art that blends creativity and technology to bring your ideas to life.
                </p>
              </div>
            </div>
            <div className="reviews">
              <h2>Reviews</h2>
              {/* Ensure to check data before mapping */}
              {data?.reviews?.map((review, index) => (
                <div key={index} className="item">
                  <div className="user">
                    <img className="pp" src={review.userImg} alt="User" />
                    <div className="info">
                      <span>{review.username}</span>
                      <div className="country">
                        <img src="/img/india.png" alt="India Flag" />
                        <span>{review.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="stars">
                    {Array(review.rating).fill().map((_, i) => (
                      <img key={i} src="/img/star.png" alt="Star" />
                    ))}
                    <span>{review.rating}</span>
                  </div>
                  <p>{review.comment}</p>
                  <div className="helpful">
                    <span>Helpful?</span>
                    <img src="/img/like.png" alt="Like" />
                    <span>Yes</span>
                    <img src="/img/dislike.png" alt="Dislike" />
                    <span>No</span>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <div className="price">
              <h3>{data?.shortTitle}</h3>
              <h2>Rs {data?.price}</h2>
            </div>
            <p>{data?.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="Clock" />
                <span>{data?.deliveryTime}</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="Recycle" />
                <span>{data?.revisionNumber}</span>
              </div>
            </div>
            <div className="features">
              {data?.features?.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/check2.png" alt="Check" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
