import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.scss'; // 👈 SCSS file import

const Chatbot = ({ userId, userType }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I’m SkillBridge AI. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
  
    try {
      const res = await axios.post('http://localhost:3000/api/chat', {
        userId,
        message: input,
        userType,
      }, {
        withCredentials: true
      });
  
      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { from: 'bot', text: 'Oops! Something went wrong.' }]);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot">
      <h3 className="chatbot__title">SkillBridge AI</h3>
      <div className="chatbot__messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chatbot__message ${msg.from}`}>
            <span className="chatbot__bubble">{msg.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        className="chatbot__input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Chatbot;

