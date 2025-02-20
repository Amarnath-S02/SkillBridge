import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/adminSideBar/AdminSideBar";
import AdminTopbar from "../../components/adminTopBar/AdminTopBar";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar onLogout={handleLogout} />
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
