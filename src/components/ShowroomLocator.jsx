import React, { useState, useEffect, useRef } from "react";
import "./ShowroomLocator.css";

const showroomImages = [
  { id: 2, src: "/uploads/sonyCenterShowroom2.jpeg", alt: "Sony Center Showroom 2" },
  { id: 3, src: "/uploads/sonyCenterShowroom3.png", alt: "Sony Center Showroom 3" },
  { id: 4, src: "/uploads/sonyCenterShowroom4.jpeg", alt: "Sony Center Showroom 4" },
  { id: 5, src: "/uploads/sonyCenterShowroom5.jpeg", alt: "Sony Center Showroom 5" },
  { id: 6, src: "/uploads/sonyCenterShowroom6.jpeg", alt: "Sony Center Showroom 6" },
  { id: 7, src: "/uploads/sonyCenterShowroom7.jpeg", alt: "Sony Center Showroom 7" },
  { id: 8, src: "/uploads/sonyCenterShowroom8.jpeg", alt: "Sony Center Showroom 8" },
];

export default function ShowroomLocator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const showroomRef = useRef(null);

  useEffect(() => {
    const el = showroomRef.current;
    if (!el) return;

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

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? showroomImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === showroomImages.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = (e) => {
    // Fallback from /uploads/... to /... if needed
    if (e.target.src.includes("/uploads/")) {
      e.target.src = e.target.src.replace("/uploads/", "/");
    }
  };

  const googleMapsUrl =
    "https://www.google.com/maps?q=Sony%20Center%20-%20Palladam%20Main%20Road%2C%20Tiruppur%2011.0693727%2C77.3399508%2C814m";
  const whatsappUrl =
    "https://wa.me/919965544323?text=Hi%20Sony%20Center%20Tiruppur,%20I%20would%20like%20to%20enquire%20about%20products";

  return (
    <section id="showroom" ref={showroomRef} className="showroom-section">
      {/* Centered Section Header */}
      <div className="showroom-header-wrapper">
        <h2 className="showroom-title">Our Showroom Locator</h2>
        <div className="showroom-underline" />
      </div>

      <div className="showroom-content-grid">
        {/* Left Side: Instant Camera / Polaroid Photo Frame */}
        <div className={`instant-photo-column ${isInView ? "in-view" : ""}`}>
          <div className="instant-camera-frame">
            <div className="photo-inner-wrapper">
              <img
                src={showroomImages[currentIndex].src}
                alt={showroomImages[currentIndex].alt}
                className="showroom-photo"
                onError={handleImageError}
              />

              {/* Prev Button */}
              <button
                type="button"
                className="photo-nav-btn photo-nav-prev"
                onClick={handlePrev}
                aria-label="Previous Showroom Photo"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                type="button"
                className="photo-nav-btn photo-nav-next"
                onClick={handleNext}
                aria-label="Next Showroom Photo"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Instant Camera Bottom Label */}
            <div className="polaroid-caption">
              <span className="caption-label">Sony Center • Tiruppur</span>
              <span className="caption-counter">
                {currentIndex + 1} / {showroomImages.length}
              </span>
            </div>
          </div>

          {/* 8-Photo Thumbnails Strip */}
          <div className="thumbnails-strip">
            {showroomImages.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                className={`thumbnail-item ${idx === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`View showroom photo ${idx + 1}`}
              >
                <img
                  src={img.src}
                  alt={`Thumbnail ${idx + 1}`}
                  onError={handleImageError}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Showroom Address & Contact Details */}
        <div className={`showroom-details-card ${isInView ? "in-view" : ""}`}>
          <h3 className="store-name-title">
            Sony Center - Palladam Main Road, Tiruppur
          </h3>

          {/* Detailed Info List */}
          <div className="info-items-list">
            {/* Address */}
            <div className="info-item">
              <svg
                className="info-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="info-link"
              >
                Samy Complex, Palladam Main Rd, near Bosch Brand Store, Veerapandi,
                Tiruppur, Tamil Nadu 641605
              </a>
            </div>

            {/* Phone Number */}
            <div className="info-item">
              <svg
                className="info-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="tel:+919965544323" className="info-link">
                +91 9965544323
              </a>
            </div>

            {/* Opening Hours */}
            <div className="info-item">
              <svg
                className="info-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                <strong>Open Today: 10:00 AM - 09:00 PM</strong>
                <span className="all-days-open">(All Days Open)</span>
              </span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="store-actions-row">
            {/* 1. Get Directions */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn btn-directions"
            >
              <svg
                width="15"
                height="15"
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
              Get Directions
            </a>

            {/* 2. WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn btn-whatsapp"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ flexShrink: 0 }}
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              WhatsApp
            </a>

            {/* 3. Call Store */}
            <a href="tel:+919965544323" className="store-btn btn-call-store">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Store
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
