// components/ChatIcon.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import './ChatIcon.scss';

const ChatIcon = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show icon on login or register pages
  const hideOnRoutes = ['/login', '/register'];
  if (hideOnRoutes.includes(location.pathname)) return null;

  return (
    <div className="chat-icon" onClick={() => navigate('/chatbot')} title="Chat with SkillBridge AI">
    <MessageCircle size={24} />
  </div>
  
  );
};

export default ChatIcon;
