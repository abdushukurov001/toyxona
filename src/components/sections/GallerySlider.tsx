import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import client from '../../services';

interface GalleryImage {
  id: number;
  image: string;
}

const GallerySlider: React.FC = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 2;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await client.get('/api/v1/web/get_gallery/');
        setGallery(res.data);
      } catch (error) {
        console.error("Galereya yuklashda xatolik:", error);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) =>
        prev + visibleCount >= gallery.length ? 0 : prev + visibleCount
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [gallery.length]);

  const visibleImages = gallery.slice(
    startIndex,
    startIndex + visibleCount
  ).length === visibleCount
    ? gallery.slice(startIndex, startIndex + visibleCount)
    : [
        ...gallery.slice(startIndex),
        ...gallery.slice(0, visibleCount - (gallery.length - startIndex)),
      ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          title="Galereya"
          subtitle="To'yxonamizning eng yaxshi lahzalari"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700">
          {visibleImages.map((item) => (
           <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-2xl shadow-md group">
  <img
    src={`${item.image}`}
    alt="Gallery image"
    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-opacity" />
</div>

          ))}
        </div>

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
