import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import PricesSection from './components/sections/PricesSection';
import NewsSection from './components/sections/NewsSection';
import StaffSection from './components/sections/StaffSection';
import ContactSection from './components/sections/ContactSection';
import CalendarPage from './pages/CalendarPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GalleryPage from './pages/GalleryPage';
import GallerySlider from './components/sections/GallerySlider'



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Public Routes */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={
                    <>
                      <HeroSection />
                      <AboutSection />
                      <ServicesSection />
                      <GallerySlider/>
                      <PricesSection />
                      <NewsSection />
                      <StaffSection />
                      <ContactSection />
                    </>
                  } />
                  <Route path="/gallery" element={<GalleryPage/>} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;