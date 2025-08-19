import newRequest from "../../utils/newRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility toggle
import "./AdminLogin.scss";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await  newRequest.post(
        "login",
        { email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      console.log("✅ Login Successful:", res.data);

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin");
      } else {
        console.error("❌ Token is missing from response:", res.data);
      }
    } catch (err) {
      console.error("❌ Login Failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>

        <label>Email</label>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <a href="#">Forgot password?</a>

        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
