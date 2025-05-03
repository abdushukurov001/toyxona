import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import ServicesSection from '../components/sections/ServicesSection';
import StaffSection from '../components/sections/StaffSection';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1600)'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 md:px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Biz Haqimizda</h1>
            <p className="text-xl text-gray-200">
              Professional xizmat va unutilmas lahzalar yaratish - bizning asosiy maqsadimiz
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-serif text-gray-800 mb-6">
              Nima uchun aynan biz?
            </h2>
            <p className="text-gray-600 mb-6">
              2015-yildan buyon biz mijozlarimizga yuqori sifatli xizmat ko'rsatib kelmoqdamiz. 
              Bizning to'yxonamiz zamonaviy jihozlar, professional xodimlar va qulay sharoitlar bilan 
              ta'minlangan.
            </p>
            <p className="text-gray-600 mb-6">
              Har bir tadbir bizning uchun alohida ahamiyatga ega. Shuning uchun biz har bir 
              detalga alohida e'tibor qaratamiz va mijozlarimizning barcha istakalarini 
              inobatga olamiz.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-500 mb-2">1000+</div>
                <div className="text-gray-600">Muvaffaqiyatli tadbirlar</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-500 mb-2">98%</div>
                <div className="text-gray-600">Mijozlar tavsiyasi</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img 
              src="https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Venue Interior"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white py-3 px-6 rounded shadow-lg">
              <p className="text-lg font-serif">8 yillik tajriba</p>
            </div>
          </motion.div>
        </div>

        {/* Services Section */}
        <ServicesSection />

        {/* Staff Section */}
        <StaffSection />
      </div>
    </div>
  );
};

export default AboutPage;