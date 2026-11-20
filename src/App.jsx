import React from "react";
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
        <ProductGrids />

        {/* Promotional Banner 4 (After Products, Before Get In Touch) */}
        <MidBanner />

        {/* Get In Touch Contact & Feedback Form */}
        <ContactForm />

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
