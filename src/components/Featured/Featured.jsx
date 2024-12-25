import React from 'react'
import "./featured.scss"

const Featured = () => {
  return (
    <div className='featured'>
        <div className="container">
             <div className="left">
                <h1>
                    Find the perfect <i>freelance</i> service for your business
                </h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="./img/search.png" alt="" />
                        <input type="text" placeholder='Try"Building Mobile App"'/>
                    </div>
                    <button>Search</button>
                </div>
                <div className="popular">
                    <span>Popular:</span>
                    <button>Ai Services</button>
                    <button>Video & Animation</button>
                    <button>Graphics & Design</button>
                    <button>Logo Design</button>
                    
                    
                </div>
             </div>
             <div className="right"></div>
             <img src="./img/man.png" alt=""/>
        </div>
    </div>
  )
}

export default Featured 