import React, { useState, useEffect, useRef } from "react";
import "./MidBanner.css";

export default function MidBanner() {
  const [isInView, setIsInView] = useState(true);
  const bannerRef = useRef(null);

  useEffect(() => {
    const el = bannerRef.current;
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
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const handleImageError = (e) => {
    if (e.target.src.includes("/uploads/")) {
      e.target.src = e.target.src.replace("/uploads/", "/");
    }
  };

  return (
    <section ref={bannerRef} className="mid-banner-section">
      <div className={`mid-banner-wrapper ${isInView ? "in-view" : ""}`}>
        <img
          src="/uploads/banner4.webp"
          alt="Sony Center Promotional Banner"
          className="mid-banner-image"
          loading="lazy"
          onError={handleImageError}
        />
      </div>
    </section>
  );
}
