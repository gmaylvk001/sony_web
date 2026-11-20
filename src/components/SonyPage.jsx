import React from "react";
import "./SonyPage.css";

export default function SonyPage() {
  const storePhone = "9965544323";
  const mapsLink = "https://www.google.com/maps/search/?api=1&query=Sony+Center+Tirupur";

  const categories = [
    {
      id: "tvs",
      tag: "Display & Cinema",
      title: "BRAVIA XR Series",
      desc: "Experience pure OLED blacks and vibrant 4K Mini LED displays powered by Cognitive Processor XR.",
    },
    {
      id: "audio",
      tag: "Premium Sound",
      title: "Headphones & Audio",
      desc: "Industry-leading noise canceling with WH-1000XM5 and high-resolution wireless sound systems.",
    },
    {
      id: "cameras",
      tag: "Imaging",
      title: "Alpha Cameras & Lenses",
      desc: "Revolutionary full-frame sensors and G Master lenses engineered for creators and professionals.",
    },
    {
      id: "playstation",
      tag: "Gaming",
      title: "PlayStation 5 Ecosystem",
      desc: "Next-gen gaming with ultra-high speed SSD, haptic feedback triggers, and 3D Audio immersion.",
    },
  ];

  return (
    <div className="sony-page">
      {/* Hero Section */}
      <section className="hero-section">
        <span className="hero-badge">Authorized Experience Center</span>
        <h1 className="hero-title">The World of Sony. Engineered for Emotion.</h1>
        <p className="hero-subtitle">
          Discover premium BRAVIA TVs, world-renowned Alpha imaging systems, 
          immersive audio gear, and PlayStation 5 consoles.
        </p>
        <div className="hero-cta-group">
          <a href="#tvs" className="hero-btn hero-btn-primary">
            Explore Products
          </a>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-secondary"
          >
            Visit Our Store ↗
          </a>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="categories-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Explore by Category</h2>
            <p className="section-subtitle">
              Official products with manufacturer warranty and in-store demo support.
            </p>
          </div>
        </div>

        <div className="grid">
          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="card">
              <span className="card-tag">{cat.tag}</span>
              <h3 className="card-title">{cat.title}</h3>
              <p className="card-desc">{cat.desc}</p>
              <a href="#demo" className="card-link">
                Request In-store Demo →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Store Visit & Contact Banner */}
      <section className="store-banner">
        <div className="store-info">
          <h3>Need expert guidance?</h3>
          <p>
            Connect directly with our store specialists or drop by the store for a live demo.
          </p>
        </div>
        <div className="store-actions">
          <a
            href={`tel:${storePhone}`}
            className="hero-btn hero-btn-primary"
          >
            Call {storePhone}
          </a>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-secondary"
          >
            Get Directions
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="sony-footer">
        <p>© {new Date().getFullYear()} SONY CENTER. All rights reserved.</p>
      </footer>
    </div>
  );
}
