import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./AdminTopBar.scss";

const AdminTopbar = () => {
  const navigate = useNavigate(); // ✅ Define navigate

  const handleAdminLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/admin/logout", {}, { withCredentials: true });
  
      localStorage.removeItem("adminToken"); // Remove token from local storage
      navigate("/admin/login");  // ✅ Correct path
// Redirect to login page
    } catch (err) {
      console.error("❌ Logout Failed:", err.response?.data || err.message);
    }
  };
  
  return (
    <div className="admin-topbar">
      <h2>Admin Dashboard</h2>
      <button className="logout-btn" onClick={handleAdminLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminTopbar;
