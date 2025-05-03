import React, { useEffect, useState } from 'react';
import { galleryImages } from '../../data';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';

const GallerySlider: React.FC = () => {
  const allImages = Object.values(galleryImages).flat();
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) =>
        prev + visibleCount >= allImages.length ? 0 : prev + visibleCount
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  const visibleImages = allImages.slice(
    startIndex,
    startIndex + visibleCount
  ).length === visibleCount
    ? allImages.slice(startIndex, startIndex + visibleCount)
    : [
        ...allImages.slice(startIndex),
        ...allImages.slice(0, visibleCount - (allImages.length - startIndex)),
      ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Title */}
        <SectionHeading
          title="Galereya"
          subtitle="To'yxonamizning eng yaxshi lahzalari"
        />

        {/* Slider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700">
          {visibleImages.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl shadow-md group h-64 md:h-80"
            >
              <img
                src={img}
                alt={`Gallery ${idx}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-opacity" />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/gallery')}
            className="text-amber-500 text-lg font-semibold underline hover:text-primary/80 transition"
          >
            Ko‘proq ko‘rish
          </button>
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
