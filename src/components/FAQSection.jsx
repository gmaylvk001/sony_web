import React, { useState, useEffect, useRef } from "react";
import "./FAQSection.css";

const faqData = [
  {
    id: 1,
    question: "1. What products are available at Sony Center?",
    answer:
      "Explore a wide range of Sony products, including BRAVIA TVs, headphones, wireless speakers, home theatres, soundbars, Alpha cameras, PlayStation consoles, games and accessories. Product availability may vary.",
  },
  {
    id: 2,
    question: "2. What types of Sony TVs can I explore?",
    answer:
      "Explore Sony BRAVIA televisions featuring OLED, Mini LED and RGB LED technologies, depending on the current product range and availability.",
  },
  {
    id: 3,
    question: "3. What is the difference between Sony OLED, Mini LED and RGB LED TVs?",
    answer:
      "Sony OLED TVs deliver perfect blacks, rich colours and excellent contrast with self-lit pixels. Sony Mini LED TVs use advanced LED backlighting for higher brightness, precise light control and detailed picture quality. Sony RGB LED TVs use individually controlled red, green and blue LED backlights to deliver enhanced colour accuracy, vibrant visuals and improved brightness. Each technology offers a premium viewing experience suited to different preferences.",
  },
  {
    id: 4,
    question: "4. Which Sony cameras can I find at Sony Center?",
    answer:
      "Explore Sony Alpha APS-C cameras, full-frame cameras and Cinema Line cameras, along with compatible lenses and selected accessories, subject to availability.",
  },
  {
    id: 5,
    question: "5. Are PlayStation 5 consoles, games and accessories available?",
    answer:
      "Sony Center offers a selection of PlayStation products, including PS5 consoles, games and gaming accessories. Please contact the store to confirm current stock.",
  },
  {
    id: 6,
    question: "6. Can I experience Sony products before purchasing?",
    answer:
      "You can enquire about in-store demonstrations of selected Sony TVs, audio products, cameras and gaming devices. Demonstration availability depends on the products displayed at the store.",
  },
];

export default function FAQSection() {
  const [activeId, setActiveId] = useState(1);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef(null);

  // Scroll reveal animation for FAQ section and cards
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

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
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Typewriter effect specifically for the word "Asked"
  const targetWord = "Asked";
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!isDeleting && currentText === targetWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && currentText === "") {
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

  const toggleFAQ = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section ref={containerRef} className="faq-section">
      {/* Title with typewriter effect on "Asked" */}
      <div className="faq-header-wrapper">
        <h2 className="faq-title">
          <span className="faq-prefix">Frequently</span>
          <span className="faq-dynamic-container">
            <span className="faq-dynamic">{currentText}</span>
            <span className="faq-cursor">|</span>
          </span>
          <span className="faq-suffix">Questions</span>
        </h2>
        <div className="faq-underline" />
      </div>

      {/* Accordion FAQ List */}
      <div className="faq-list">
        {faqData.map((item, index) => {
          const isOpen = activeId === item.id;
          return (
            <div
              key={item.id}
              className={`faq-card ${isInView ? "in-view" : ""} ${isOpen ? "active" : ""}`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => toggleFAQ(item.id)}
                aria-expanded={isOpen}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-icon-wrapper">
                  <span className="faq-icon">+</span>
                </span>
              </button>

              {/* Smooth expand/collapse answer */}
              <div className={`faq-answer-wrapper ${isOpen ? "open" : ""}`}>
                <div className="faq-answer-content">
                  <p className="faq-answer-text">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
