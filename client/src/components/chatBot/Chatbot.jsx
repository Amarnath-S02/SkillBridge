import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.scss';

const Chatbot = () => {
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const userId = userData?._id;
  const userType = userData?.isSeller ? 'isSeller' : 'Client';

  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I’m SkillBridge AI. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

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
      }, { withCredentials: true });

      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
    } catch (err) {
      console.error("❌ Chat error:", err.response?.data || err.message);
      setMessages(prev => [...prev, { from: 'bot', text: 'Oops! Something went wrong.' }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/chat/${userId}`, {
          withCredentials: true,
        });
  
        const history = res.data.messages.map(msg => ({
          from: msg.role === 'user' ? 'user' : 'bot',
          text: msg.content,
          timestamp: msg.timestamp,
        }));
  
        setMessages([
          { from: 'bot', text: 'Hi! I’m SkillBridge AI. How can I help you today?' },
          ...history
        ]);
      } catch (err) {
        console.error("❌ Error fetching chat history:", err.message);
      }
    };
  
    fetchHistory();
  }, []);
  const handleReset = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/chat/${userId}`, {
        withCredentials: true,
      });
      setMessages([
        { from: 'bot', text: 'Hi! I’m SkillBridge AI. How can I help you today?' }
      ]);
    } catch (err) {
      console.error("❌ Error resetting chat:", err.message);
    }
  };
  
  

  return (
    <div className="chatbot">
      <div className="chatbot__messages">
      {messages.map((msg, i) => (
          <div key={i} className={`chatbot__message ${msg.from}`}>
            <span className="chatbot__sender">{msg.from === 'user' ? 'You' : 'SkillBridge AI'}</span>
            <span className="chatbot__bubble">{msg.text}</span>
            {msg.timestamp && (
              <span className="chatbot__timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot__input-area">
        <input
          type="text"
          placeholder="Type your message..."
          className="chatbot__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="chatbot__send-btn" onClick={sendMessage}>
          Send
        </button>
        <button className="chatbot__reset-btn" onClick={handleReset}>
        Reset
      </button>

      </div>
    </div>
  );
};

export default Chatbot;
