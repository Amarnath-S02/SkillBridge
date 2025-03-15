import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import "./BecomeSeller.scss";

function BecomeSeller() {
  const [user, setUser] = useState({
    phone: "",
    desc: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch the authenticated user when the component loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await newRequest.get("/auth/current-user"); // Adjust based on your API
        setCurrentUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser._id) {
      console.error("User not logged in!");
      return;
    }

    try {
      await newRequest.put(`/users/${currentUser._id}`, {
        ...user,
        isSeller: true,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log("Error updating user:", err);
    }
  };

  return (
    <div className="become-seller">
      <form onSubmit={handleSubmit}>
        <h1>Become a Seller</h1>
        <label htmlFor="phone">Phone Number</label>
        <input name="phone" type="text" onChange={handleChange} required />

        <label htmlFor="desc">Description</label>
        <textarea name="desc" cols="30" rows="5" onChange={handleChange} required></textarea>

        <button type="submit">Submit</button>
        {success && <p className="success-msg">✅ You are now a seller! Redirecting...</p>}
      </form>
    </div>
  );
}

export default BecomeSeller;
