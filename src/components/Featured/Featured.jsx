import React from 'react';
import './featured.scss';

const Featured = () => {
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
              <input type="text" placeholder='Try "Building Mobile App"' />
            </div>
            <button>Search</button>
          </div>

          {/* Popular Section */}
          <div className="popular">
            <span>Popular:</span>
            <button>AI Services</button>
            <button>Video & Animation</button>
            <button>Graphics & Design</button>
            <button>Logo Design</button>
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
