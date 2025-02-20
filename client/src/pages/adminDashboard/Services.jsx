import React, { useState } from "react";
import "./Services.scss";

const Services = () => {
  const [services, setServices] = useState([
    { id: 1, title: "Web Development" },
    { id: 2, title: "Graphic Design" },
    { id: 3, title: "SEO Optimization" },
  ]);

  const removeService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="services-page">
      <h2>Manage Services</h2>
      <div className="services-list">
        <table>
          <thead>
            <tr>
              <th>Service Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="service-item">
                <td>{service.title}</td>
                <td>
                  <button className="remove-btn" onClick={() => removeService(service.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
