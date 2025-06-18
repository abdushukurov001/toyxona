import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import client from '../../services';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await client.get('/uz/api/v1/web/get_news/');
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
        
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              prevEl: '.news-prev',
              nextEl: '.news-next',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
            onSwiper={(swiper) => setSwiperInstance(swiper)}
          >
            {newsItems.map((item) => (
              <SwiperSlide key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  onClick={() => handleOpenModal(item)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition min-h-[420px] flex flex-col group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.image || '/placeholder-news.jpg'} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-news.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-sm text-amber-500 mb-2">
                      {new Date(item.created_at).toLocaleDateString('uz-UZ')}
                    </div>
                    <h3 className="text-xl font-serif line-clamp-1 text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 flex-grow">
                      {item.description}
                    </p>
                    <button className="mt-4 text-amber-600 hover:text-amber-800 text-sm font-medium self-start flex items-center">
                      Batafsil
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button 
            className="news-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 hidden md:flex items-center justify-center w-10 h-10"
            aria-label="Previous news"
          >
            <ChevronLeft size={24} className="text-amber-500" />
          </button>
          <button 
            className="news-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 hidden md:flex items-center justify-center w-10 h-10"
            aria-label="Next news"
          >
            <ChevronRight size={24} className="text-amber-500" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedNews && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-2xl w-full mx-4 shadow-2xl relative max-h-[90vh] overflow-hidden flex flex-col"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black z-10 bg-white rounded-full p-1 shadow"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="h-64 bg-gray-200 overflow-hidden">
              <img
                src={selectedNews.image || '/placeholder-news.jpg'}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-news.jpg';
                }}
              />
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="text-sm text-amber-500 mb-2">
                {new Date(selectedNews.created_at).toLocaleDateString('uz-UZ')}
              </div>
              <h3 className="text-2xl font-serif text-gray-800 mb-4">
                {selectedNews.title}
              </h3>
              <div className="text-gray-700 whitespace-pre-line">
                {selectedNews.description}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default NewsSection;