import React, { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Navigation links: "Offers", "Service", and "Home Theatre" removed
  const navLinks = [
    { label: "TVs", href: "#tvs" },
    { label: "Audio", href: "#audio" },
    { label: "Cameras", href: "#cameras" },
    { label: "PlayStation", href: "#playstation" },
    {
      label: "Visit us",
      href: "#showroom",
      isSpecial: true,
    },
  ];

  // Smooth scroll handler for internal page navigation
  const handleNavClick = (e, item) => {
    if (item.isExternal || !item.href.startsWith("#")) return;

    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = item.href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navbar = document.querySelector(".sony-navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementTop - navbarHeight - 16;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className={`sony-navbar ${isScrolled ? "scrolled" : ""} ${mobileMenuOpen ? "menu-open" : ""}`}>
      {/* Brand Logo - TIRUPUR removed */}
      <a
        href="#"
        className="brand-link"
        onClick={(e) => {
          e.preventDefault();
          setMobileMenuOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <span className="brand-title">SONY CENTER</span>
      </a>

      {/* Desktop Navigation items */}
      <nav className="nav-links">
        {navLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`nav-item ${item.isSpecial ? "nav-item-highlight" : ""}`}
            target={item.isExternal ? "_blank" : "_self"}
            rel={item.isExternal ? "noopener noreferrer" : undefined}
            onClick={(e) => handleNavClick(e, item)}
          >
            {item.label}
            {item.isSpecial && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "4px" }}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            )}
          </a>
        ))}
      </nav>

      {/* Desktop Action Buttons */}
      <div className="nav-actions">
        <a
          className="btn btn-secondary"
          href="tel:9965544323"
          title="Call store at 9965544323"
        >
          {/* Phone Icon */}
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
          Contact us
        </a>
        <a
          className="btn btn-primary"
          href="#contact"
          onClick={(e) => handleNavClick(e, { href: "#contact" })}
        >
          Feedback
        </a>
      </div>

      {/* Mobile Controls: Quick Call Button + Hamburger Toggle Button */}
      <div className="mobile-nav-controls">
        <a
          className="mobile-call-btn"
          href="tel:9965544323"
          title="Call store"
          aria-label="Call store"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>

        <button
          type="button"
          className={`mobile-toggle-btn ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
          <span className="hamburger-line line-3"></span>
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-links">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`mobile-drawer-item ${item.isSpecial ? "mobile-drawer-highlight" : ""}`}
                onClick={(e) => handleNavClick(e, item)}
              >
                <span>{item.label}</span>
                {item.isSpecial ? (
                  <span className="mobile-pill-badge">Showroom</span>
                ) : (
                  <span className="mobile-arrow">&rarr;</span>
                )}
              </a>
            ))}
          </div>

          <div className="mobile-drawer-actions">
            <a
              className="mobile-action-btn mobile-call-action"
              href="tel:9965544323"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call +91 99655 44323
            </a>
            <a
              className="mobile-action-btn mobile-feedback-action"
              href="#contact"
              onClick={(e) => handleNavClick(e, { href: "#contact" })}
            >
              Leave Feedback
            </a>
          </div>
        </div>
      </div>

      {/* Bottom glowing divider line */}
      <div className="nav-divider" />
    </header>
  );
}
