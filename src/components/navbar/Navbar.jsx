import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { Link } from "react-router-dom";
import "./Navbar.scss"
const Navbar = () => {
  const[active,setActive] = useState(false);
  const[open,setOpen] = useState(false);

  const{pathname}= useLocation()

  const isActive=()=>{
    window.scrollY>0 ? setActive(true):setActive(false)
  }

  useEffect(()=>{
    window .addEventListener("scroll",isActive);
    return ()=>{
      window.removeEventListener("scroll",isActive);
    }
  },[]);

  const currentUser={
    id:1,
    username:'Amar',
    isSeller:true
  }

  return (

    <div className={active || pathname !=="/"? "navbar active":"navbar"}>
      <div>
        <div className="container">
          <div className="logo">
            <Link to="/" className="link">
             <span className='text'>SkillBridge</span>
          </Link>
            <span className='dot'></span>
          </div>
          <div className="links">
          <span >Business</span>
          <span>Explore</span>
          <span>Blog</span>
          <span >Sign in</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img src="./img/man2.png" alt="User profile" />
              <span>{currentUser?.username}</span>
             { open && <div className="options">
                {currentUser?.isSeller&& (
                  <>
                 <Link className="link" to="/mygigs">Services</Link>
                 <Link className="link" to="/add">Add New Services</Link>
                  
                  </>
                )}
               <Link to="/orders" className="link">Orders</Link>
              <Link to="/messages" className="link">Messages</Link>
              <Link to="/logout" className="link">Logout</Link>
              </div>}
            </div>
          )}

          <button>Join</button>
          </div>
          
        </div>
       { (active || pathname !=="/")&& (
        <> 
          <hr  />
          <div className="menu">
          <Link className="link menulink" to="/">Graphics & Design</Link>
        
        <Link className="link" to="/video-and-animation">Video & Animation</Link>
        <Link className="link " to="/writing-and-translation">Writing & Translation</Link>
        <Link className="link " to="/ai-service">AI Service</Link>
        <Link className="link " to="/digital-marketing">Digital Marketing</Link>
        <Link className="link " to="/">Graphics & Design</Link>
        <Link className="link " to="/music-and-audio">Music & Audio</Link>
        <Link className="link " to="/programming-and-tech">Programming & Tech</Link>
        <Link className="link " to="/business">Business</Link>
        <Link className="link " to="/lifestyle">Lifestyle</Link>

          </div>
       </> 
        )}
      </div>
    
    </div>
  );
};

export default Navbar