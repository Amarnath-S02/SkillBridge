import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chatbot from './Chatbot';
import { MessageCircle, X, Maximize2, Minimize2 } from 'lucide-react';
import './FloatingChatbot.scss';

const FloatingChatbot = () => {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/register'];
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser || currentUser === 'null') {
        setIsOpen(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      {!isOpen && (
        <div
          className="chat-icon"
          onClick={() => setIsOpen(true)}
          title="Chat with SkillBridge AI"
        >
          <MessageCircle size={24} />
        </div>
      )}

      {isOpen && (
        <div className={`floating-chatbot ${isMaximized ? 'maximized' : ''}`}>
          <div className="floating-chatbot__header">
            <span>SkillBridge AI</span>
            <div className="btn-group">
              <button
                className="maximize-btn"
                onClick={() => setIsMaximized((prev) => !prev)}
              >
                {isMaximized ? <Minimize2 size={18} color="white" /> : <Maximize2 size={18} color="white" />}
              </button>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <X size={18} color="white" />
              </button>
            </div>
          </div>
          <Chatbot />
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
