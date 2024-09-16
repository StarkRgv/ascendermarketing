import React, { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import { API } from "../constants";

const OurBrand = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getClientsData = async () => {
      try {
        const result = await fetchData(API.CLIENTS);
        setClients(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getClientsData();
  }, []);

  return (
    <section id="clientsSection" className="ascender-light p-5">
      <h2 className="text-bold text-center">Brands trusted on us</h2>

      <div className="slider-container">
        <div className="slider">
          <div className="logos">
            {loading && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden"></span>
                </div>
              </div>
            )}
            {!loading &&
              clients.map((client, index) => (
                <img
                  className="me-5"
                  key={index}
                  src={client.featured_image.url}
                  alt={client.title.rendered}
                />
              ))}
            {error && (
              <div className="text-center text-danger">
                Failed to load clients.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurBrand;
