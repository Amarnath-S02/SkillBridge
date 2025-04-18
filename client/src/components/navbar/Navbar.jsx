import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text"><i>SkillBridge</i></span>
          </Link>
          <span className="dot"></span>
        </div>
        <div className="links">
       
          <Link className="link" to="/messages"  style={{ color: "white", textDecoration: "none" }}>
                    Messages
                  </Link>
          <Link 
            className="link2" 
            to="/blog" 
            style={{ color: "white", textDecoration: "none" }}>
            <span>Blog</span> 
          </Link>


          {currentUser !== null && !currentUser?.isSeller && (
            <Link className="link" to="/become-seller" style={{ color: "white", textDecoration: "none" }}>
              Become a Freelancer
            </Link>
          )}

{currentUser ? (
  <div className="user" onClick={() => setOpen(!open)}>
    <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
    <span>{currentUser?.username}</span>
    {open && (
      <div className="options">
        <Link className="link" to={`/profile/${currentUser._id}`}>
          Profile
        </Link>
        {currentUser.isSeller && (
          <>
            <Link className="link" to="/mygigs">
              Services
            </Link>
            <Link className="link" to="/add">
              Add New Services
            </Link>
          </>
        )}
        <Link className="link" to="/orders">
          Orders
        </Link>
        <Link className="link" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    )}
  </div>
) : (
  <>
    <Link to="/login" className="link">Sign in</Link>
    <Link className="link" to="/register">
      <button>Join</button>
    </Link>
  </>
)}

        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
            <div className="menu">
              <Link className="link menuLink" to="/gigs?cat=graphic-design">
                <i>Graphics & Design</i>
              </Link>
              <Link className="link menuLink" to="/gigs?cat=video-animation">
                <i>Video & Animation</i>
              </Link>
              <Link className="link menuLink" to="/gigs?cat=writing-translation">
                <i>Writing & Translation</i>
              </Link>
              <Link className="link menuLink" to="/gigs?cat=ai-services">
                <i>AI Services</i>
              </Link>
              <Link className="link menuLink" to="/gigs?cat=digital-marketing">
                <i>Digital Marketing</i>
              </Link>
              <Link className="link menuLink" to="/gigs?cat=music-audio">
                <i>Music & Audio</i>
              </Link>
              <Link className="link menuLink" to="/gigs?cat=programming-tech">
                <i>Programming & Tech</i>
              </Link>
              <Link className="link menuLink" to="/gigs?cat=business">
                <i>Business</i>
              </Link>
              <Link className="link menuLink" to="/gigs?cat=lifestyle">
                <i>Lifestyle</i>
              </Link>
            </div>

          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;