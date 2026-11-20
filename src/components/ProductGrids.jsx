import React, { useEffect, useRef } from "react";
import "./ProductGrids.css";

// 1. TVs - 3 columns order 1 -> 2 -> 3
const tvProducts = [
  {
    id: "tv-1",
    tag: "TV",
    title: "OLEDs",
    image: "/uploads/TVs-OLEDs-1.webp",
    fallback: "/uploads/LEDs.webp",
  },
  {
    id: "tv-2",
    tag: "TV",
    title: "Mini LEDs",
    image: "/uploads/TVs-MINI LEDs-2.webp",
  },
  {
    id: "tv-3",
    tag: "TV",
    title: "RGB LEDs",
    image: "/uploads/TVs-RGB LEDs-3.webp",
  },
];

// 2. Audio - 4 columns order 1 -> 2 -> 3 -> 4
const audioProducts = [
  {
    id: "audio-1",
    title: "Headphones",
    image: "/uploads/Audio-Headphones-1.webp",
  },
  {
    id: "audio-2",
    title: "Portable Speakers",
    image: "/uploads/Audio-Portable Speakers-2.webp",
  },
  {
    id: "audio-3",
    title: "Home Theatre & Soundbars",
    image: "/uploads/Audio-Home Theatre & Soungbars-3.avif",
  },
  {
    id: "audio-4",
    title: "TWS",
    image: "/uploads/Audio-TWS-4.webp",
  },
];

// 3. Cameras - 3 columns using the 3 uploaded images
const cameraProducts = [
  {
    id: "cam-1",
    tag: "Camera",
    title: "APS-C Cameras",
    image: "/uploads/For APS_C Camera.webp",
  },
  {
    id: "cam-2",
    tag: "Camera",
    title: "Full Frame Cameras",
    image: "/uploads/Full Frame Cameras.webp",
  },
  {
    id: "cam-3",
    tag: "Camera",
    title: "Cinema Line Cameras",
    image: "/uploads/For Cinema Camera.webp",
  },
];

// 4. PlayStation - 3 columns order 1 -> 2 -> 3
const playstationProducts = [
  {
    id: "ps-1",
    title: "PS5 Console",
    image: "/uploads/PlayStation-PS5 Console-1.png",
  },
  {
    id: "ps-2",
    title: "GamePads",
    image: "/uploads/PlayStation-GamePads-2.png",
  },
  {
    id: "ps-3",
    title: "Games",
    image: "/uploads/PlayStation-Games-3.png",
  },
];

export default function ProductGrids() {
  const containerRef = useRef(null);

  // IntersectionObserver to animate cards moving up into place on scroll
  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".product-card");
    if (!cards || !cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleImageError = (e, fallback) => {
    if (fallback && !e.target.dataset.triedFallback) {
      e.target.dataset.triedFallback = "true";
      e.target.src = fallback;
    } else if (e.target.src.includes("/uploads/")) {
      e.target.src = e.target.src.replace("/uploads/", "/");
    }
  };

  return (
    <div ref={containerRef} className="product-showcase-section">
      {/* TVs Section (3 Cards: Left End to Right End) */}
      <section id="tvs" className="category-group">
        <h3 className="category-header-title">TVs</h3>
        <div className="grid-3-cols">
          {tvProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="product-img-wrapper">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-img"
                  loading="lazy"
                  onError={(e) => handleImageError(e, product.fallback)}
                />
              </div>
              <div className="product-info">
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <h4 className="product-title">{product.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audio Section (4 Cards: Left End to Right End) */}
      <section id="audio" className="category-group">
        <h3 className="category-header-title">Audio</h3>
        <div className="grid-4-cols">
          {audioProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="product-img-wrapper">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-img"
                  loading="lazy"
                  onError={(e) => handleImageError(e, product.fallback)}
                />
              </div>
              <div className="product-info">
                <h4 className="product-title">{product.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cameras Section (3 Cards: Left End to Right End) */}
      <section id="cameras" className="category-group">
        <h3 className="category-header-title">Cameras</h3>
        <div className="grid-3-cols">
          {cameraProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="product-img-wrapper">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-img"
                  loading="lazy"
                  onError={(e) => handleImageError(e, product.fallback)}
                />
              </div>
              <div className="product-info">
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <h4 className="product-title">{product.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PlayStation Section (3 Cards: Left End to Right End) */}
      <section id="playstation" className="category-group">
        <h3 className="category-header-title">PlayStation</h3>
        <div className="grid-3-cols">
          {playstationProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="product-img-wrapper">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-img"
                  loading="lazy"
                  onError={(e) => handleImageError(e, product.fallback)}
                />
              </div>
              <div className="product-info">
                <h4 className="product-title">{product.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
