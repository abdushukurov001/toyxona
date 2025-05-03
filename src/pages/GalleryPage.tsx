import React from 'react';
import { motion } from 'framer-motion';
import { galleryImages } from '../data';
import SectionHeading from '../components/ui/SectionHeading';

const GalleryPage: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <SectionHeading 
          title="Galereya"
          subtitle="To'yxonamizning eng yaxshi lahzalari"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-lg shadow-lg aspect-square"
            >
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;