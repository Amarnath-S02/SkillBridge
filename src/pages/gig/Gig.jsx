import React from 'react';
import Slider from 'infinite-react-carousel';
import "./gig.scss";

const Gig = () => {
  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">SkillBridge > Graphics & Design ></span>
          <h1>I will create AI-generated art for you</h1>
          <div className="user">
            <img  className="pp"src="https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFydmVsfGVufDB8fDB8fHww" alt="User" />
            <span>Amar</span>
            <div className="stars">
              <img src="/img/star.png" alt="Star" />
              <img src="/img/star.png" alt="Star" />
              <img src="/img/star.png" alt="Star" />
              <span>3</span>
            </div>
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            <img
              src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1=600"
              alt="Artwork 1"
            />
            <img
              src="https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Artwork 2"
            />
            <img
              src="https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Artwork 3"
            />
          </Slider>
          <h2>About This Service</h2>
          <p>
            Hi, I’m Amar, and I specialize in creating AI-generated art that brings imagination to life. Using cutting-edge
            AI tools, I craft unique and stunning visuals tailored to your needs. Whether it’s abstract designs, digital
            portraits, or surreal landscapes, my creations blend technology and creativity to produce art that’s both
            innovative and captivating.
          </p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img src="https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFydmVsfGVufDB8fDB8fHww" alt="User" />
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
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">India</span>
                </div>
                <div className="item">
                  <span className="title">Member Since</span>
                  <span className="desc">Jan 2025</span>
                </div>
                <div className="item">
                  <span className="title">Avg Response Time</span>
                  <span className="desc">2 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last Delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Current Projects</span>
                  <span className="desc">2 active</span>
                </div>
              </div>
              <hr />
              <p>
                Hi, I'm Amar! I create unique AI-generated art that blends creativity and technology to bring your ideas to
                life. From stunning visuals to custom designs, I deliver art that's innovative and one of a kind.
              </p>
            </div>
          </div>
          <div className="reviews">
            <h2>Reviews</h2>
            <div className="item">
              <div className="user">
                <img  className="pp"src="/img/Spiderman.jpeg" alt="User" />
                <div className="info">
                  <span>user1</span>
                  <div className="country">
                    <img src="/img/india.png" alt="India Flag" />
                    <span>India</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="Star" />
                <img src="/img/star.png" alt="Star" />
                <img src="/img/star.png" alt="Star" />
                
                <span>3</span>
              </div>
              <p>
                "Amar is amazing! The AI-generated art he created was stunning and exactly what I wanted. Great communication
                and quick delivery. Highly recommend!"
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="Like" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="Dislike" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img className="pp"src="/img/spiderman2.jpeg" alt="User" />
                <div className="info">
                  <span>user2</span>
                  <div className="country">
                    <img src="/img/india.png" alt="India Flag" />
                    <span>India</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="Star" />
                <img src="/img/star.png" alt="Star" />
                <img src="/img/star.png" alt="Star" />
                <img src="/img/star.png" alt="Star" />
                <span>4</span>
              </div>
              <p>
                "Amar is amazing! The AI-generated art he created was stunning and exactly what I wanted. Great communication
                and quick delivery. Highly recommend!"
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="Like" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="Dislike" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img className="pp" src="/img/leo.jpeg" alt="User" />
                <div className="info">
                  <span>user3</span>
                  <div className="country">
                    <img src="/img/india.png" alt="India Flag" />
                    <span>India</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="Star" />
                <img src="/img/star.png" alt="Star" />
                <img src="/img/star.png" alt="Star" />
                
                <span>3</span>
              </div>
              <p>
                "Amar is amazing! The AI-generated art he created was stunning and exactly what I wanted. Great communication
                and quick delivery. Highly recommend!"
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="Like" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="Dislike" />
                <span>No</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default Gig;
