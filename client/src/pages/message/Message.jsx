import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();

  // Fetch messages
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: async () => {
      const res = await newRequest.get(`/messages/${id}`);
      return res.data;
    },
  });

  // Fetch conversation details (to get buyer/seller info)
  const { data: conversationData, isLoading: loadingConversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: async () => {
      const res = await newRequest.get(`/conversations/single/${id}`);
      return res.data;
    },
  });

  // Determine the other user's role
  const isSeller = currentUser._id === conversationData?.sellerId;
  const otherUserRole = isSeller ? "Buyer" : "Seller";

  // Mutation to send messages
  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: () => queryClient.invalidateQueries(["messages"]),
  });

  // Handle message submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textMessage = e.target[0].value;
    
    let imageUrl = null;
    if (image) {
      imageUrl = await upload(image); // Upload image to Cloudinary
    }
  
    const messageData = {
      conversationId: id,
      desc: textMessage,
      img: imageUrl, // Attach uploaded image URL
    };
  
    mutation.mutate(messageData);
    e.target[0].value = ""; // Clear input
    setImage(null);
  };
  

  return (
    <div className="message">
      <div className="container">
        <Link to="/messages" className="breadcrumb">Messages</Link> {`>`}
        {loadingConversation ? (
          <p className="loading">Loading conversation...</p>
        ) : (
          <h3>Chat with {otherUserRole}</h3>
        )}
        {isLoading ? (
          <p className="loading">Loading messages...</p>
        ) : error ? (
          <p className="error">Error loading messages</p>
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div key={m._id} className={m.userId === currentUser._id ? "owner item" : "item"}>
                <p>{m.desc}</p>
                {m.img && <img src={m.img} alt="message" />}
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="message-form">
          <textarea placeholder="Write a message..." required />
          <label className="file-label">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

            Upload Image
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
