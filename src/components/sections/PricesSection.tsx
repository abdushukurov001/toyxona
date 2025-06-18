import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Check } from 'lucide-react';
import client from '../../services'; // axios instance
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

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await client.get('/api/v1/web/get_prices/');
        setPrices(response.data);
        setError(null);
      } catch (err) {
        setError("Narxlarni yuklashda xatolik yuz berdi.");
        console.error("Narxlarni olishda xatolik:", err);
        toast.error("Narxlarni yuklashda xatolik");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return (
    <section id="prices" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Narxlar"
          subtitle="Har bir mehmon uchun maxsus tariflar"
        />
        
        {loading && <p className="text-center text-gray-600">Yuklanmoqda...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!loading && !error && prices.length === 0 && (
          <p className="text-center text-gray-500">Narxlar topilmadi.</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prices.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
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
      </div>
    </section>
  );
};

export default PricesSection;