import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import client from '../../services'; // 👈 client joylashgan pathni moslang

interface HighlightItem {
  title: string;
  description: string;
}

interface AboutData {
  title: string;
  description: string;
  image: string;
  highlight: HighlightItem[];
}

const AboutSection: React.FC = () => {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await client.get('/api/v1/web/get_about_us/');
        setAbout(response.data);
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
      }
    };

    fetchAbout();
  }, []);

  if (!about) return null; // ⏳ Loading holatini qo‘shsangiz ham bo‘ladi

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title='Bizning Zal Haqida'
          subtitle={about.title}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img 
              src={about.image} 
              alt="Zal ichki ko‘rinishi" 
              className="rounded-lg shadow-xl w-full md:h-[500px] h-[400px] object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 mb-4">
              {about.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {about.highlight.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button to="/about" size="lg">
              Batafsil ma’lumot
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
