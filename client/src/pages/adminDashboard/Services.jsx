import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // Import Skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import the default skeleton styles
import "./Services.scss";

const categories = [
  "Graphics & Design",
  "Video & Animation",
  "Writing & Translation",
  "AI Services",
  "Digital Marketing",
  "Music & Audio",
  "Programming & Tech",
  "Business",
  "Lifestyle",
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

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

  useEffect(() => {
    filterServices(); // Automatically filter whenever inputs change
  }, [searchQuery, selectedCategory]);

  const filterServices = () => {
    let filtered = services;

    if (searchQuery) {
      filtered = filtered.filter((service) => {
        const freelancerName = users[service.userId]?.username?.toLowerCase() || "";
        const serviceTitle = service.title.toLowerCase();
        return (
          freelancerName.includes(searchQuery.toLowerCase()) ||
          serviceTitle.includes(searchQuery.toLowerCase())
        );
      });
    }

    if (selectedCategory) {
      filtered = filtered.filter((service) => service.cat === selectedCategory);
    }

    setFilteredServices(filtered);
  };

  const openModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const confirmDelete = async () => {
    if (!selectedService) return;

    try {
      await axios.delete(`http://localhost:3000/api/gigs/admin/delete/${selectedService._id}`);
      setFilteredServices(filteredServices.filter(service => service._id !== selectedService._id));
      setServices(services.filter(service => service._id !== selectedService._id));
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      closeModal();
    }
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
        
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="skeleton-loading">
          <Skeleton height={40} width="100%" style={{ marginBottom: "10px" }} />
          <Skeleton height={40} width="100%" style={{ marginBottom: "10px" }} />
          <Skeleton height={40} width="100%" style={{ marginBottom: "10px" }} />
        </div>
      ) : (
        <div className="services-list">
          <table>
            <thead>
              <tr>
                <th>Freelancer</th>
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
                    <button className="remove-btn" onClick={() => openModal(service)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this service?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmDelete}>Yes, Delete</button>
              <button className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
