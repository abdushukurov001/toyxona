// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CalendarPage from './pages/CalendarPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GalleryPage from './pages/GalleryPage';
import HomePage from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Public Layout */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/about" element={<AboutPage />} />

                  {/* fallback 404 → home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
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
