import React from 'react';
import { motion } from 'framer-motion';
import { pricePackages } from '../../data';
import SectionHeading from '../ui/SectionHeading';
import { Check } from 'lucide-react';

const PricesSection: React.FC = () => {
  return (
    <section id="prices" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Narxlar"
          subtitle="Har bir mehmon uchun maxsus tariflar"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricePackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-serif text-gray-800 mb-2">{pkg.title}</h3>
              <div className="text-3xl font-bold text-amber-500 mb-4">
                {pkg.price.toLocaleString()} so'm
                <span className="text-sm text-gray-500 font-normal">/kishi</span>
              </div>
              <p className="text-gray-600 mb-6">{pkg.description}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <Check size={20} className="text-amber-500 mr-2" />
                    {feature}
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