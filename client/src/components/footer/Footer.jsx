import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        {/* Top Section */}
        <div className="top">
          {/* Contact Section */}

            <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <div className="item">
            <h2>Contact</h2>
            <span>
              <img src="/img/email.png" alt="Email Icon" /> s******@mail.com
            </span>
            <span>
              <img src="/img/telephone.png" alt="Phone Icon" /> 936*****165
            </span>
            <span>
              <img src="/img/location.png" alt="Location Icon" /> ***********
            </span>
          </div>

          {/* About Section */}
        

          {/* Support Section */}
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
           
          </div>

          {/* Community Section */}
          <div className="item">
            <h2>Community</h2>
            <span>Community Hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
          </div>

          {/* More from SkillBridge */}
          <div className="item">
            <h2>More From SkillBridge</h2>
            <span>SkillBridge Business</span>
            <span>SkillBridge Pro</span>
            <span>SkillBridge Logo Maker</span>
           
          </div>
        </div>

        {/* Divider */}
        <hr />

        {/* Bottom Section */}
        <div className="bottom">
          {/* Left Section */}
          <div className="left">
           
            <span>©SkillBridge 2025</span>
          </div>

          {/* Right Section */}
          <div className="right">
            {/* Social Media */}
            {/* <div className="social">
              <img src="/img/twitter.png" alt="Twitter Icon" />
              <img src="/img/facebook.png" alt="Facebook Icon" />
              <img src="/img/linkedin.png" alt="LinkedIn Icon" />
              <img src="/img/pinterest.png" alt="Pinterest Icon" />
              <img src="/img/instagram.png" alt="Instagram Icon" />
            </div> */}

            {/* Currency */}
            <div className="link">
              <img src="/img/rupeee.png" alt="Rupee Icon" />
              <span>INR</span>
            </div>

            {/* Accessibility */}
            <img src="/img/accessibility.png" alt="Accessibility Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
