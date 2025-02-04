import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.scss"; 
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // Added error state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>

        <label>Email or Username</label>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <label>Password</label>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <a href="/forgot-password">Forgot password?</a>

        <button type="submit">Continue</button>
        
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
