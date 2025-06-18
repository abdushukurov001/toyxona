import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import PricesSection from "../components/sections/PricesSection";
import NewsSection from "../components/sections/NewsSection";
import StaffSection from "../components/sections/StaffSection";
import ContactSection from "../components/sections/ContactSection";
import GallerySlider from "../components/sections/GallerySlider";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Location state:', location.state); // Debugging
    if (location.state?.scrollTo === "contact") {
      setTimeout(() => {
        const element = document.getElementById("contact");
        if (element) {
          console.log('Found contact element:', element); // Debugging
          const yOffset = -80; // Navbar height offset
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        } else {
          console.warn('Contact element not found'); // Debugging
        }
      }, 500); // Increased delay to ensure rendering
    }
  }, [location]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySlider />
      <PricesSection />
      <NewsSection />
      <StaffSection />
      <ContactSection />
    </>
  );
};

export default HomePage;