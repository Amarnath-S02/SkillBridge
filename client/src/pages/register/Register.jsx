import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false); // New success state
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = file ? await upload(file) : "";
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      setSuccess(true); // Show success message
      setTimeout(() => {
        navigate("/"); // Redirect after 2 seconds
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input name="username" type="text" onChange={handleChange} />
          <label htmlFor="">Email</label>
          <input name="email" type="email" onChange={handleChange} />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input name="country" type="text" placeholder="India" onChange={handleChange} />
          <button type="submit">Register</button>
          {success && <p className="success-msg">✅ Registration successful! Redirecting...</p>}
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input name="phone" type="text" onChange={handleChange} />
          <label htmlFor="">Description</label>
          <textarea name="desc" cols="30" rows="10" onChange={handleChange}></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
