import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname, search } = useLocation();
  const currentCategory = new URLSearchParams(search).get("cat");

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
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
        <Link className="link" to="/messages" style={{ color: "white", textDecoration: "none" }}>Messages</Link>
        <Link className="link" to="/blog" style={{ color: "white", textDecoration: "none" }}><span>Blog</span></Link>
        {currentUser && !currentUser.isSeller && (
          <Link className="link" to="/become-seller" style={{ color: "white", textDecoration: "none" }}>
            Become a Freelancer
          </Link>
        )}


          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="User Avatar" />
              <span>{currentUser.username}</span>
              {open && (
                <div className="options">
                  <Link className="link" to={`/profile/${currentUser._id}`}>Profile</Link>
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">Services</Link>
                      <Link className="link" to="/add">Add New Services</Link>
                    </>
                  )}
                  <Link className="link" to="/orders">Orders</Link>
                  <Link className="link" onClick={handleLogout}>Logout</Link>
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
            <Link className="link menuLink" to="/gigs">
              <i>All Categories</i>
            </Link>

            {[
              { cat: "graphic-design", label: "Graphics & Design" },
              { cat: "video-animation", label: "Video & Animation" },
              { cat: "writing-translation", label: "Writing & Translation" },
              { cat: "ai-services", label: "AI Services" },
              { cat: "digital-marketing", label: "Digital Marketing" },
              { cat: "music-audio", label: "Music & Audio" },
              { cat: "programming-tech", label: "Programming & Tech" },
              { cat: "business", label: "Business" },
              { cat: "lifestyle", label: "Lifestyle" },
            ].map(({ cat, label }) => (
              <Link
                key={cat}
                className={`link menuLink ${currentCategory === cat ? "activeCategory" : ""}`}
                to={`/gigs?cat=${cat}`}
              >
                <i>{label}</i>
              </Link>
            ))}
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
