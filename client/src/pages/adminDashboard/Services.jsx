import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Services.scss";

const Services = () => {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/gigs");
        setServices(response.data);

        // Fetch user details for each service
        const userIds = [...new Set(response.data.map((s) => s.userId))]; // Get unique userIds
        const userResponses = await Promise.all(
          userIds.map((id) => axios.get(`http://localhost:3000/api/users/${id}`))
        );
        
        const usersData = userResponses.reduce((acc, res) => {
          acc[res.data._id] = res.data;
          return acc;
        }, {});

        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-page">
      <h2>Manage Services</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="services-list">
          <table>
            <thead>
              <tr>
              <th>Seller</th>
                <th>Service Title</th>
               
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="service-item">
                  <td>
                    <div className="seller-info">
                    
                      <span>{service.userId}</span>
                    </div>
                  </td>
                  <td>{service.title}</td>
                  
                  <td>{service.cat}</td>
                  <td>₹{service.price}</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeService(service._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Services;