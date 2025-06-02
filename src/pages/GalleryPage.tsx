import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import client from '../services'; // kerakli client joyi

interface GalleryImage {
  id: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
}

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await client.get('/api/v1/web/get_gallery/');
        console.log(response) // 🔁 pathni moslang
        const sortedImages = response.data.sort(
          (a: GalleryImage, b: GalleryImage) => a.category.id - b.category.id
        );
        setImages(sortedImages);

        const uniqueCategories: { id: number; name: string }[] = [];
        sortedImages.forEach((img: GalleryImage) => {
          if (!uniqueCategories.find(cat => cat.name === img.category.name)) {
            uniqueCategories.push({ id: img.category.id, name: img.category.name });
          }
        });

        // ID bo‘yicha sortlab, saqlaymiz
        uniqueCategories.sort((a, b) => a.id - b.id);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Galereya ma'lumotlarini olishda xatolik:", error);
      }
    };

    fetchGallery();
  }, []);

  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter(img => img.category.name === selectedCategory);

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <SectionHeading
          title="Galereya"
          subtitle="To'yxonamizning eng yaxshi lahzalari"
        />

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2 rounded-full border ${
              selectedCategory === 'all'
                ? 'bg-primary text-amber-500 border-amber-500 font-bold'
                : 'bg-gray-200 text-gray-700'
            } transition`}
          >
            Barchasi
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-5 py-2 rounded-full border ${
                selectedCategory === category.name
                  ? 'bg-primary text-amber-500 border-amber-500 font-bold'
                  : 'bg-gray-200 text-gray-700'
              } transition`}
            >
              {category.name}
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
                src={image.image}
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
