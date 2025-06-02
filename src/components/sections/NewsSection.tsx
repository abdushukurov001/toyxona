import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import client from '../../services';

type NewsItem = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  created_at: string;
};

const NewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await await client.get('/api/v1/web/get_news/');
        setNewsItems(res.data);
      } catch (error) {
        console.error('Yangiliklarni yuklashda xatolik:', error);
      }
    };

    fetchNews();
  }, []);

  const handleOpenModal = (item: NewsItem) => {
    setSelectedNews(item);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Yangiliklar"
          subtitle="Eng so'nggi yangiliklar va aksiyalar"
        />
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {newsItems.map((item) => (
            <SwiperSlide key={item.id}>
             <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  onClick={() => handleOpenModal(item)}
  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition min-h-[420px] flex flex-col"
>
  <div className="h-48 overflow-hidden">
    <img 
      src={`${item.image}`} 
      alt={item.title}
      className="w-full h-full object-cover"
    />
  </div>
  <div className="p-6 flex-1 flex flex-col">
    <div className="text-sm text-amber-500 mb-2">
      {new Date(item.created_at).toLocaleDateString('uz-UZ')}
    </div>
    <h3 className="text-xl font-serif line-clamp-1 text-gray-800 mb-2">{item.title}</h3>
    <p className="text-gray-600 line-clamp-3 flex-grow">{item.description}</p>
  </div>
</motion.div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {selectedNews && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white h-[500px] overflow-y-auto rounded-lg max-w-lg w-full mx-4 p-6 relative shadow-2xl"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <img
              src={`${selectedNews.image}`}
              alt={selectedNews.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <div className="text-sm text-amber-500 mb-2">
              {new Date(selectedNews.created_at).toLocaleDateString('uz-UZ')}
            </div>
            <h3 className="text-2xl font-serif text-gray-800 mb-4">{selectedNews.title}</h3>
            <p className="text-gray-700">{selectedNews.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;
