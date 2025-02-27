import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/adminSideBar/AdminSideBar";
import AdminTopbar from "../../components/adminTopBar/AdminTopBar";
import axios from "axios";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "./AdminDashboard.scss";

// Colors for Users Pie Chart
const USER_COLORS = ["#FF6B6B", "#4ECDC4"];

// Dynamic colors for Service Categories
const SERVICE_COLORS = [
  "#FF5733", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#C70039",
  "#00A86B", "#DAA520", "#FF4500", "#4682B4", "#9ACD32", "#8A2BE2"
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userStats, setUserStats] = useState({ totalUsers: 0, sellers: 0, buyers: 0 });
  const [totalServices, setTotalServices] = useState(0);
  const [serviceCategories, setServiceCategories] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, serviceRes] = await Promise.all([
          axios.get("http://localhost:3000/api/users"),
          axios.get("http://localhost:3000/api/gigs"),
        ]);

        // Filter out admin users
        const users = userRes.data.filter(user => user.isAdmin !== true);
        const totalUsers = users.length;
        const sellers = users.filter(user => user.isSeller).length;
        const buyers = totalUsers - sellers;
        setUserStats({ totalUsers, sellers, buyers });

        // Service Statistics
        const services = serviceRes.data;
        const totalServices = services.length;
        setTotalServices(totalServices);

        // Group services by category
        const categoryMap = {};
        services.forEach(service => {
          categoryMap[service.cat] = (categoryMap[service.cat] || 0) + 1;
        });

        const formattedCategories = Object.keys(categoryMap).map((key, index) => ({
          name: key,
          value: categoryMap[key],
          color: SERVICE_COLORS[index % SERVICE_COLORS.length], // Assign colors dynamically
        }));

        setServiceCategories(formattedCategories);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const pieChartDataUsers = [
    { name: "Sellers", value: userStats.sellers },
    { name: "Buyers", value: userStats.buyers },
  ];

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar onLogout={handleLogout} />
        <div className="admin-main">
          
          {location.pathname === "/admin" && (
            <>
              <h2><i>User & Service Statistics</i></h2>

              {/* User Distribution Chart */}
              <div className="charts-container">
                <div className="chart-box user-distribution">
                  <h3>User Distribution</h3>
                  <div className="chart-content">
                    <ResponsiveContainer width={300} height={300}>
                      <PieChart>
                        <Pie data={pieChartDataUsers} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                          {pieChartDataUsers.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={USER_COLORS[index]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* User Stats */}
                    <div className="user-stats">
                      <div className="stat-box">
                        <h3>Total Users</h3>
                        <p>{userStats.totalUsers}</p>
                      </div>
                      <div className="stat-box">
                        <h3>Sellers</h3>
                        <p>{userStats.sellers}</p>
                      </div>
                      <div className="stat-box">
                        <h3>Buyers</h3>
                        <p>{userStats.buyers}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Categories Chart */}
              <div className="charts-container">
                <div className="chart-box service-distribution">
                  <h3>Service Categories</h3>
                  <div className="chart-content">
                    {serviceCategories.length > 0 ? (
                      <ResponsiveContainer width={300} height={300}>
                        <PieChart>
                          <Pie data={serviceCategories} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                            {serviceCategories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Legend />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p>No data available</p>
                    )}

                    {/* Service Stats */}
                    <div className="service-stats">
                      <div className="stat-box">
                        <h3>Total Services</h3>
                        <p>{totalServices}</p>
                      </div>
                      {serviceCategories.map((category, index) => (
                        <div className="stat-box2" key={index} style={{ borderLeft: `8px solid ${category.color}` }}>
                          <h3>{category.name}</h3>
                          <p>{category.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
