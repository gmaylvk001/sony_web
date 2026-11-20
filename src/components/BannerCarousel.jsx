import React, { useState, useEffect } from "react";
import "./BannerCarousel.css";

const banners = [
  { id: 1, src: "/uploads/banner1.webp", alt: "Sony Banner 1" },
  { id: 2, src: "/uploads/banner2.webp", alt: "Sony Banner 2" },
  { id: 3, src: "/uploads/banner3.webp", alt: "Sony Banner 3" },
  { id: 4, src: "/uploads/banner4.webp", alt: "Sony Banner 4" },
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to previous banner
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next banner
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Jump directly to specific banner
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Optional: Auto-slide every 5 seconds (pauses on hover can be added or auto-rotates)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      {/* Track wrapper */}
      <div className="carousel-track-wrapper">
        <div
          className="carousel-track"
          style={{
            width: `${banners.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / banners.length)}%)`,
            transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className="carousel-slide"
              style={{
                width: `${100 / banners.length}%`,
                flex: `0 0 ${100 / banners.length}%`,
              }}
            >
              <img
                src={banner.src}
                alt={banner.alt}
                className="carousel-image"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left Navigation Button */}
      <button
        type="button"
        className="carousel-btn carousel-btn-left"
        onClick={handlePrev}
        aria-label="Previous Banner"
      >
        <svg
          width="20"
          height="20"
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

      {/* Right Navigation Button */}
      <button
        type="button"
        className="carousel-btn carousel-btn-right"
        onClick={handleNext}
        aria-label="Next Banner"
      >
        <svg
          width="20"
          height="20"
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

      {/* Bottom Carousel Dots */}
      <div className="carousel-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
