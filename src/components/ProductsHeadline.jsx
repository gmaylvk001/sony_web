import React, { useState, useEffect } from "react";
import "./ProductsHeadline.css";

const productCategories = ["TVs", "Audio", "Cameras", "PlayStation"];

export default function ProductsHeadline() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = productCategories[wordIndex];
    let timer;

    if (!isDeleting && currentText === currentWord) {
      // Pause at fully typed word before starting to delete
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1600);
    } else if (isDeleting && currentText === "") {
      // Completed deleting word, advance to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % productCategories.length);
    } else {
      // Typing or deleting letter by letter
      const speed = isDeleting ? 70 : 130;
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <section className="products-headline-section">
      <div className="headline-wrapper">
        <h2 className="headline-title">
          <span className="headline-prefix">Our</span>
          <span className="headline-dynamic-container">
            <span className="headline-dynamic">{currentText}</span>
            <span className="headline-cursor">|</span>
          </span>
          <span className="headline-suffix">Products</span>
        </h2>
        {/* Accent underline bar styled after the reference image */}
        <div className="headline-underline" />
      </div>
    </section>
  );
}
