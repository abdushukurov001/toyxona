import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import client from '../../services';
import { toast } from 'react-toastify';

interface Highlight {
  id: number;
  description: string;
}

interface PricePackage {
  id: number;
  type: string;
  price: number;
  description: string;
  highlights: Highlight[];
}

const PricesSection: React.FC = () => {
  const [prices, setPrices] = useState<PricePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await client.get('/uz/api/v1/web/get_prices/');
        setPrices(response.data);
        setError(null);
      } catch (err) {
        setError('Narxlarni yuklashda xatolik yuz berdi.');
        console.error('Narxlarni olishda xatolik:', err);
        toast.error('Narxlarni yuklashda xatolik');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (prices.length <= 1) return;

    const startSlider = () => {
      sliderRef.current = setInterval(() => {
        if (!isHovered) {
          setCurrentIndex((prev) => (prev + 1) % prices.length);
        }
      }, 3000);
    };

    startSlider();

    return () => {
      if (sliderRef.current) {
        clearInterval(sliderRef.current);
      }
    };
  }, [prices.length, isHovered]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % prices.length);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + prices.length) % prices.length);
    resetTimer();
  };

  const resetTimer = () => {
    if (sliderRef.current) {
      clearInterval(sliderRef.current);
    }
    if (prices.length > 1) {
      sliderRef.current = setInterval(() => {
        if (!isHovered) {
          setCurrentIndex((prev) => (prev + 1) % prices.length);
        }
      }, 3000);
    }
  };

  const getVisiblePackages = () => {
    const width = window.innerWidth;
    let numVisible: number;

    if (width >= 1024) {
      numVisible = 3; // Large screens: 3 cards
    } else if (width >= 768) {
      numVisible = 2; // Medium screens: 2 cards
    } else {
      numVisible = 1; // Small screens: 1 card
    }

    // Ensure we don't try to display more cards than available
    numVisible = Math.min(numVisible, prices.length);

    const visiblePackages: PricePackage[] = [];
    for (let i = 0; i < numVisible; i++) {
      const index = (currentIndex + i) % prices.length;
      visiblePackages.push(prices[index]);
    }

    return visiblePackages;
  };

  if (loading) return <p className="text-center text-gray-600 py-20">Yuklanmoqda...</p>;
  if (error) return <p className="text-center text-red-500 py-20">{error}</p>;
  if (prices.length === 0) return <p className="text-center text-gray-500 py-20">Narxlar topilmadi.</p>;

  return (
    <section id="prices" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          title="Narxlar"
          subtitle="Har bir mehmon uchun maxsus tariflar"
        />

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {getVisiblePackages().map((pkg, index) => (
              <motion.div
                key={pkg.id} // Use only pkg.id for stable keys
                initial={{ opacity: 0, x: index * 50 - 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: index * 50 - 50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full mx-auto w-full"
              >
                <h3 className="text-2xl font-serif text-gray-800 mb-2">{pkg.type}</h3>
                <div className="text-3xl font-bold text-amber-500 mb-4">
                  {pkg.price.toLocaleString()} so'm
                  <span className="text-sm text-gray-500 font-normal">/kishi</span>
                </div>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex-1">
                  {pkg.highlights.map((highlight) => (
                    <li key={highlight.id} className="flex items-center text-gray-600">
                      <Check size={20} className="text-amber-500 mr-2 flex-shrink-0" />
                      <span>{highlight.description}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {prices.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={24} className="text-amber-500" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                aria-label="Next"
              >
                <ChevronRight size={24} className="text-amber-500" />
              </button>
            </>
          )}
        </div>

        {prices.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {prices.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  resetTimer();
                }}
                className={`w-3 h-3 rounded-full ${
                  currentIndex % prices.length === index ? 'bg-amber-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PricesSection;