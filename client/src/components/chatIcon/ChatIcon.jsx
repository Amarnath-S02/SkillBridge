import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import './ChatIcon.scss';

const ChatIcon = ({ onClick }) => {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/register'];
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));

  // Update currentUser state when localStorage changes (polling every 1s)
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser !== currentUser) {
        setCurrentUser(storedUser);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentUser]);

  if (hideOnRoutes.includes(location.pathname) || !currentUser || currentUser === 'null') {
    return null;
  }

  return (
    <div className="chat-icon" onClick={onClick} title="Chat with SkillBridge AI">
      <MessageCircle size={24} />
    </div>
  );
};

export default ChatIcon;
