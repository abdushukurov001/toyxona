import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Orqa fon rasmi */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        {/* Qoraytirilgan qatlam */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>
      
      {/* Kontent */}
      <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight max-w-4xl mb-6"
        >
          <span className="block">Unutilmas xotiralarni yarating</span>
          <span className="block">bizning <span className="text-amber-400">Luxury Venue</span>da</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8"
        >
          To‘ylar, bayramlar va maxsus tadbirlar uchun betakror va nafis joy – siz orzu qilgan manzil
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button to="/#about" size="lg">
            Batafsil ma’lumot
          </Button>
          <Button to="/calendar" variant="outline" size="lg">
            Bandlikni tekshirish
          </Button>
        </motion.div>
      </div>
      
      {/* Pastga sirpanish belgisi */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <span className="text-sm mb-2">Pastga aylantiring</span>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </motion.div>
    </div>
  );
};

export default HeroSection;
