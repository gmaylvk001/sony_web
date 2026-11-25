import React, { useState, useEffect, useRef } from "react";
import "./ContactForm.css";

const API_KEY =
  import.meta.env.VITE_SONY_API_KEY ||
  "bea_sony_center_key_7f8c92a1e4b6d0c5a39e8b1d";

// Candidates to try: local first if on localhost, otherwise production
const getEndpoints = () => {
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const envUrl = import.meta.env.VITE_SONY_LEAD_API_URL;

  if (envUrl) {
    return [
      envUrl,
      isLocal
        ? "http://localhost:3000/api/sony-center/lead"
        : "https://www.bharathelectronics.in/api/sony-center/lead",
    ];
  }

  return isLocal
    ? [
        "http://localhost:3000/api/sony-center/lead",
        "https://bharathelectronics.in/api/sony-center/lead",
      ]
    : [
        "https://bharathelectronics.in/api/sony-center/lead",
        "http://localhost:3000/api/sony-center/lead",
      ];
};

export default function ContactForm({ selectedProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // If a product was selected from "Our Products", pre-fill the message and focus
  useEffect(() => {
    if (selectedProduct) {
      const categoryPrefix = selectedProduct.category ? `${selectedProduct.category} - ` : "";
      setFormData((prev) => ({
        ...prev,
        message: `I'm interested in ${categoryPrefix}${selectedProduct.title}. Please provide more details and pricing.`,
      }));

      // Focus the name input after smooth scroll arrives
      setTimeout(() => {
        const nameInput = document.getElementById("name");
        if (nameInput) {
          nameInput.focus();
        }
      }, 600);
    }
  }, [selectedProduct]);

  // Trigger right-to-left slide animation when entering the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Restrict mobile number to only digits and maximum 10 digits
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Phone validation: exactly 10 digits required
    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }
    const cleanPhone = digitsOnly;

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address (e.g. name@gmail.com).");
      return;
    }

    // 3. Prepare payload matching the 5 required fields
    const payload = {
      name: formData.name.trim(),
      phone: cleanPhone,
      email: formData.email.trim().toLowerCase(),
      location: formData.location.trim(),
      message: formData.message.trim(),
    };

    setLoading(true);

    const endpoints = getEndpoints();
    let sentSuccessfully = false;
    let lastErrorMsg = "";

    // Try endpoints in sequence (e.g. localhost first when testing, production as fallback)
    for (const endpoint of endpoints) {
      try {
        console.log(`Sending lead data to: ${endpoint}`, payload);
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => null);

        if (response.ok && data?.success) {
          setSuccessResponse(data.message || "Sony Center lead submitted successfully!");
          setFormData({
            name: "",
            phone: "",
            email: "",
            location: "",
            message: "",
          });
          sentSuccessfully = true;
          break;
        } else if (response.status === 400 || response.status === 401) {
          // Validation or Auth error returned directly by the server
          lastErrorMsg = data?.message || `Server error: ${response.status}`;
          break;
        } else {
          lastErrorMsg = data?.message || `Request failed with status ${response.status}`;
        }
      } catch (networkErr) {
        console.warn(`Connection failed for endpoint ${endpoint}:`, networkErr);
        lastErrorMsg = "Connection to server failed. Please check your network or try again.";
      }
    }

    if (!sentSuccessfully) {
      setErrorMessage(lastErrorMsg || "Failed to submit lead. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      {/* Header with Right-to-Left Entrance Animation */}
      <div className={`contact-header-wrapper ${isVisible ? "slide-in" : ""}`}>
        <h2 className="contact-title">Get In Touch</h2>
        <div className="contact-underline" />
      </div>

      {/* Form Container Card */}
      <div className={`contact-form-card ${isVisible ? "fade-in" : ""}`}>
        {successResponse ? (
          <div className="success-banner">
            <span style={{ fontSize: "28px" }}>✓</span>
            <div>
              <strong style={{ fontSize: "17px" }}>{successResponse}</strong>
              <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#a1a1aa" }}>
                Our Bharath Electronics Sony Center team will contact you shortly.
              </p>
            </div>
            <button
              type="button"
              className="btn-reset-form"
              onClick={() => {
                setSuccessResponse(null);
                setErrorMessage(null);
              }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Row 1: Name & Mobile Number */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  NAME <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  MOBILE NO <span className="required-star">*</span>
                </label>
                <div className="phone-input-group">
                  <div className="phone-prefix">
                    <span className="flag-icon" role="img" aria-label="India flag">
                      🇮🇳
                    </span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className="phone-input"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & Location */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  EMAIL <span className="required-star">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="location">
                  LOCATION <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  placeholder="City, area, or branch location (e.g. Tiruppur)"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={loading}
                  className="form-input"
                />
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="form-group">
              <label className="form-label" htmlFor="message">
                MESSAGE <span className="required-star">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Requirement / query / product interested in..."
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                className="form-textarea"
              />
            </div>

            {/* Error banner displayed directly above the submit button */}
            {errorMessage && (
              <div className="error-banner">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="form-submit-container">
              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
