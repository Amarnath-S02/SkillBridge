import React, { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { servicesAtom, servicesSelector } from "../../atom/servicesAtom";
import "./Services.scss";

const Services = () => {
  const [services, setServices] = useRecoilState(servicesAtom);
  const servicesLoadable = useRecoilValueLoadable(servicesSelector);

  useEffect(() => {
    if (servicesLoadable.state === "hasValue") {
      setServices(servicesLoadable.contents);
    }
  }, [servicesLoadable.state, servicesLoadable.contents, setServices]);

  const removeService = async (id) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
    try {
      await fetch(`http://localhost:3000/api/gigs/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Error deleting service:", error);
    }
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
            {Array.isArray(services) && services.length > 0 ? (
              services.map((service) => (
                <tr key={service.id} className="service-item">
                  <td>{service.title}</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeService(service.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No services available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
