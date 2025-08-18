import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Users, Briefcase, Settings, Home } from "lucide-react";
import "./AdminSideBar.scss";
const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        <Menu size={24} />
      </button>
      <ul>
        <li>
        <Link to="/admin"> <Home size={20} /> {!isCollapsed && "Home"} </Link> 

        </li>
        <li>
          <Link to="/admin/users">
            <Users size={20} /> {!isCollapsed && "Users"}
          </Link>
        </li>
        <li>
          <Link to="/admin/services">
            <Briefcase size={20} /> {!isCollapsed && "Services"}
          </Link>
        </li>
        <li>
          <Link to="/admin/settings">
            <Settings size={20} /> {!isCollapsed && "Settings"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
