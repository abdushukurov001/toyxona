import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Bizning Zal Haqida"
          subtitle="Bizning eksklyuziv zalimizning nafisligi va ko‘p funksionalligini kashf eting"
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
              src="https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Zal ichki ko‘rinishi" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
            {/* <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white py-3 px-6 rounded shadow-lg">
              <p className="text-lg font-serif">2015-yildan beri</p>
            </div> */}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-serif text-gray-800 mb-4">Unutilmas daqiqalarni yaratamiz</h3>
            <p className="text-gray-600 mb-4">
              "Luxury Venue"ga xush kelibsiz! Bu yerda nafislik va zamonaviy hashamat uyg‘unlashgan muhitda unutilmas lahzalar yaratiladi. Bizning zalimiz zamonaviy qulayliklar va abadiy jozibani uyg‘unlashtirib, maxsus tadbirlaringiz uchun ideal joyni taqdim etadi.
            </p>
            <p className="text-gray-600 mb-6">
              Keng zallar, go‘zal bog‘lar va e’tiborli xodimlar bilan biz to‘ylar, tug‘ilgan kunlar, korporativ tadbirlar va an’anaviy marosimlarga birdek yondashamiz. Tajribali jamoamiz har bir tafsilotni mukammal bajarilishini ta’minlaydi.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-800">Nafis Joylar</h4>
                  <p className="text-gray-600">Chiroyli bezatilgan zallar va bog‘ hududlari</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-800">Gurme Taomlar</h4>
                  <p className="text-gray-600">Har xil didlar uchun betakror taomlar</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-800">Fidokor Jamoa</h4>
                  <p className="text-gray-600">Sizga xizmat ko‘rsatishga tayyor mutaxassislar</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-800">Moslashtirish Imkoni</h4>
                  <p className="text-gray-600">Tadbirlaringizni sizning istagingizga moslab o‘tkazamiz</p>
                </div>
              </div>
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
