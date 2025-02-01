import React from 'react';
import { Link } from 'react-router-dom';
import "./message.scss";

const Message = () => {
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> > Prakash >
        </span>
        <div className="messages">
          <div className="item">
            <img src="/img/edison.jpeg" alt="" />
            <p>
              Hi, I’m looking for someone to help me develop a mobile app for my business.
            </p>
          </div>
          <div className="item owner">
            <img src="/img/leo.jpeg" alt="" />
            <p>
              Sure! I can help. Could you share more details about the app you need?
            </p>
          </div>
          <div className="item">
            <img src="/img/edison.jpeg" alt="" />
            <p>
              It’s for a fitness studio. I need class schedules, bookings, and payments.
            </p>
          </div>
          <div className="item owner">
            <img src="/img/leo.jpeg" alt="" />
            <p>
              Got it. Do you have a design preference or a deadline for this project?
            </p>
          </div>
          <div className="item">
            <img src="/img/edison.jpeg" alt="" />
            <p>
            I’d like it to look sleek and modern, and I’d need it ready within a month. 
            </p>
          </div>
          <div className="item owner">
            <img src="/img/leo.jpeg" alt="" />
            <p>
            Absolutely, I can work with that timeline. Do you have a color scheme or branding in mind that we should align with the design? Also, would you like the app to support both iOS and Android?
            </p>
          </div>
        </div>
        
        <hr />
        <div className="write">
          <textarea placeholder="Write a message" cols="30" rows="10"></textarea>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
