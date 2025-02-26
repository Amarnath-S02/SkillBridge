import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Services.scss";

const Services = () => {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/gigs");
        setServices(response.data);
        setFilteredServices(response.data);

        const userIds = [...new Set(response.data.map((s) => s.userId))];
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

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;

    const filtered = services.filter(
      (service) =>
        (service.title.toLowerCase().includes(query) ||
          service.userId.toLowerCase().includes(query) ||
          service.cat.toLowerCase().includes(query)) &&
        service.price >= min &&
        service.price <= max
    );
    setFilteredServices(filtered);
  };

  return (
    <div className="services-page">
      <h2>Manage Services</h2>
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="price-input"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="price-input"
        />
        <button onClick={handleSearch} className="filter-btn">Search</button>
      </div>
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
              {filteredServices.map((service) => (
                <tr key={service._id} className="service-item">
                  <td>{users[service.userId]?.username || service.userId}</td>
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
