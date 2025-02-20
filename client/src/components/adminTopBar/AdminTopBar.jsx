import React from "react";
import "./AdminTopbar.scss";

const AdminTopbar = ({ onLogout }) => {
  return (
    <div className="admin-topbar">
      <h2>Admin Dashboard</h2>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminTopbar;
