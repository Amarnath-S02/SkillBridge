import React from 'react';
import './featured.scss';
import  { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  const handleCategoryClick = (category) => {
    navigate(`/gigs?cat=${encodeURIComponent(category)}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          {/* Heading Section */}
          <h1>
            Connect with skilled <i>freelancers</i> <br />
            to elevate your business
          </h1>
          
          {/* Search Bar */}
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="Search Icon" />
              <input type="text" placeholder='Try "Building Mobile App"'
                 onChange={(e) => setInput(e.target.value)} />

            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>

          {/* Popular Section */}
          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => handleCategoryClick("AI Services")}>AI Services</button>
      <button onClick={() => handleCategoryClick("Video & Animation")}>Video & Animation</button>
      <button onClick={() => handleCategoryClick("Graphics & Design")}>Graphics & Design</button>
      <button onClick={() => handleCategoryClick("Logo Design")}>Logo Design</button>
          </div>
        </div>

        {/* Right Section */}
        <div className="right">
        
        </div>
      </div>
    </div>
  );
};

export default Featured;
