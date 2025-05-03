import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { galleryImages } from '../data';
import SectionHeading from '../components/ui/SectionHeading';

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allImages = Object.values(galleryImages).flat();

  const filteredImages =
    selectedCategory === 'all'
      ? allImages
      : galleryImages[selectedCategory as keyof typeof galleryImages] || [];

  const categories = ['all', ...Object.keys(galleryImages)];

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <SectionHeading
          title="Galereya"
          subtitle="To'yxonamizning eng yaxshi lahzalari"
        />

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full border ${
                selectedCategory === category
                  ? 'bg-primary text-amber-500 border-amber-500 font-bold'
                  : 'bg-gray-200 text-gray-700'
              } transition`}
            >
              {category === 'all'
                ? "Barchasi"
                : category === 'toy'
                ? "To'y"
                : category === 'osh'
                ? "Osh"
                : category === 'tugilganKun'
                ? "Tug'ilgan kun"
                : category === 'korporativ'
                ? 'Korporativ'
                : category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
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
