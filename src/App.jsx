import React, { useState } from "react";
import Navbar from "./components/Navbar";
import BannerCarousel from "./components/BannerCarousel";
import ProductsHeadline from "./components/ProductsHeadline";
import ProductGrids from "./components/ProductGrids";
import MidBanner from "./components/MidBanner";
import ContactForm from "./components/ContactForm";
import FAQSection from "./components/FAQSection";
import ShowroomLocator from "./components/ShowroomLocator";
import StoreVisitSection from "./components/StoreVisitSection";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const navbar = document.querySelector(".sony-navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const elementTop = contactSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementTop - navbarHeight - 16,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="app-container">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Banner Carousel */}
        <BannerCarousel />

        {/* Animated Typewriter Headline */}
        <ProductsHeadline />

        {/* Ordered Product Grids (TVs, Audio, Cameras, PlayStation) */}
        <ProductGrids onProductClick={handleProductClick} />

        {/* Promotional Banner 4 (After Products, Before Get In Touch) */}
        <MidBanner />

        {/* Get In Touch Contact & Feedback Form */}
        <ContactForm selectedProduct={selectedProduct} />

        {/* Frequently Asked Questions Accordion */}
        <FAQSection />

        {/* Our Showroom Locator (Instant Camera Photos & Details) */}
        <ShowroomLocator />

        {/* Visit the Store (Map & Hours Split Card) */}
        <StoreVisitSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
