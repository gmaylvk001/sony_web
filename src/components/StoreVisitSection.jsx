import React, { useState, useEffect, useRef } from "react";
import "./StoreVisitSection.css";

export default function StoreVisitSection() {
  const [isInView, setIsInView] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  const directMapsUrl =
    "https://www.google.com/maps?q=Sony%20Center%20-%20Palladam%20Main%20Road%2C%20Tiruppur%2011.0693727%2C77.3399508%2C814m";
  const embedMapsUrl =
    "https://maps.google.com/maps?q=11.0693727,77.3399508&hl=en&z=16&output=embed";

  return (
    <section className="store-visit-section">
      <div ref={cardRef} className={`store-visit-card ${isInView ? "in-view" : ""}`}>
        {/* Left Side: Store Details, Hours & Features */}
        <div className="store-visit-details">
          <div>
            <h2 className="store-visit-title">Visit the store</h2>
            <div className="store-address-block">
              <strong>Sony Center</strong>
              <p style={{ margin: "2px 0 0" }}>
                Samy Complex, Palladam Main Rd, near Bosch Brand Store,
              </p>
              <p style={{ margin: "2px 0 0" }}>
                Veerapandi, Tiruppur, Tamil Nadu 641605
              </p>
            </div>

            {/* Action Buttons: Open in Google Maps & Phone */}
            <div className="store-visit-buttons">
              <a
                href={directMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Open in Google Maps
              </a>

              <a href="tel:9965544323" className="pill-btn">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 99655 44323
              </a>
            </div>
          </div>

          {/* Opening Hours Schedule */}
          <div className="store-hours-block">
            <div className="hours-heading">HOURS</div>
            <div className="hours-table">
              <div className="hours-row">
                <span className="hours-day">Monday – Saturday</span>
                <span className="hours-time">10:00 am – 9:00 pm</span>
              </div>
              <div className="hours-row">
                <span className="hours-day">Sunday</span>
                <span className="hours-time">10:30 am – 8:30 pm</span>
              </div>
              <div className="hours-row">
                <span className="hours-day">Festival days</span>
                <span className="hours-time" style={{ color: "#38bdf8" }}>
                  Check Instagram
                </span>
              </div>
            </div>
          </div>

          {/* Highlights / Amenities */}
          <div className="store-amenities-list">
            <div className="amenity-item">
              <span className="amenity-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </span>
              <span>Free parking in front of the store</span>
            </div>

            <div className="amenity-item">
              <span className="amenity-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 10h18" />
                  <path d="M8 20v2" />
                  <path d="M16 20v2" />
                </svg>
              </span>
              <span>5 min from Tirupur new bus stand</span>
            </div>

            <div className="amenity-item">
              <span className="amenity-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="4" r="2" />
                  <path d="M18 19l-4-4v-4l4-1" />
                  <path d="M9 19l3-7 4 1" />
                  <path d="M5 22v-3l4-3" />
                </svg>
              </span>
              <span>Step-free entrance</span>
            </div>
          </div>
        </div>

        {/* Right Side: Embedded Google Map with Dark Styling & Marker */}
        <div className="store-map-wrapper">
          <iframe
            title="Sony Center Tiruppur Store Map"
            src={embedMapsUrl}
            className="store-map-iframe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Exact Store Location: Clean White Marker Pin */}
          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-floating-pin"
            title="Sony Center Tiruppur - Click to open in Google Maps"
            aria-label="Sony Center Tiruppur exact store location on Google Maps"
          >
            <div className="white-pin-container">
              <svg
                className="white-pin-icon"
                viewBox="0 0 24 24"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
              </svg>
              <span className="white-pin-pulse"></span>
              <span className="white-pin-ground-dot"></span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
