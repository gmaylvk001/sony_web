import React, { useState, useEffect, useRef } from "react";
import "./ShowroomLocator.css";

const showroomImages = [
  { id: 1, src: "/uploads/sonyCenterShowroom1.jpeg", alt: "Sony Center Showroom 1" },
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

  // Typewriter effect specifically for "Tiruppur"
  const targetWord = "Tiruppur";
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!isDeleting && currentText === targetWord) {
      // Pause when "Tiruppur" is fully typed
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && currentText === "") {
      // Pause when deleted before typing again
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    } else {
      const speed = isDeleting ? 75 : 140;
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? targetWord.substring(0, prev.length - 1)
            : targetWord.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting]);

  return (
    <section id="showroom" ref={showroomRef} className="showroom-section">
      {/* Centered Section Header with Typewriter "Tiruppur" */}
      <div className="showroom-header-wrapper">
        <h2 className="showroom-title">
          <span className="showroom-prefix">Our</span>
          <span className="showroom-dynamic-container">
            <span className="showroom-dynamic">{currentText}</span>
            <span className="showroom-cursor">|</span>
          </span>
          <span className="showroom-suffix">Showroom Locator</span>
        </h2>
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

          <p className="store-type-subtext">
            Electronics & Home Appliances Store in Tiruppur
          </p>

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
              <a href="tel:9965544323" className="info-link">
                9965544323
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
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.301-.15-1.781-.879-2.056-.98-.276-.101-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.422-1.495-.895-.798-1.5-1.783-1.676-2.084-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.175.201-.301.301-.501.101-.201.05-.376-.025-.527-.075-.15-.677-1.632-.927-2.233-.244-.585-.492-.505-.677-.515-.175-.009-.376-.011-.577-.011s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.508s1.078 2.908 1.229 3.109c.15.201 2.121 3.24 5.138 4.544.718.311 1.278.497 1.716.636.721.229 1.377.197 1.895.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.352zm-5.466 7.618c-2.052 0-3.957-.594-5.568-1.621l-.399-.256-4.14 1.086 1.105-4.037-.28-.445c-1.127-1.79-1.724-3.864-1.724-5.992 0-6.195 5.04-11.235 11.236-11.235 3.003 0 5.825 1.17 7.949 3.295 2.123 2.124 3.291 4.947 3.29 7.952-.002 6.197-5.043 11.253-11.469 11.253zm0-24c-7.28 0-13.2 5.92-13.2 13.2 0 2.327.608 4.599 1.764 6.602l-1.87 6.834 7.006-1.838c1.942 1.06 4.129 1.62 6.3 1.62 7.28 0 13.2-5.92 13.2-13.2s-5.92-13.218-13.2-13.218z" />
              </svg>
              WhatsApp
            </a>

            {/* 3. Call Store */}
            <a href="tel:9965544323" className="store-btn btn-call-store">
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
