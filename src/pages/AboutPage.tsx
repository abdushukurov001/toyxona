import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServicesSection from '../components/sections/ServicesSection';
import StaffSection from '../components/sections/StaffSection';
import client from '../services'; // Make sure this is set up to call your API

interface AboutData {
  id: number;
  main_description: string;
  successful_events: string;
  work_experience: number;
  image: string;
}

const AboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const res = await client.get('/api/v1/web/get_about_us_details/');
        setAboutData(res.data);
      } catch (err) {
        console.error('Failed to fetch about info:', err);
      }
    };

    fetchAboutInfo();
  }, []);

  if (!aboutData) {
    return <div className="pt-20 text-center">Yuklanmoqda...</div>;
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 md:px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-4">BizHaqimizda</h1>
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
            <h2 className="text-3xl font-serif text-gray-800 mb-6">Nima uchun aynan biz?</h2>
            <p className="text-gray-600 mb-6 whitespace-pre-line">{aboutData.main_description}</p>

            <div className="grid grid-cols-2 gap-6">
              {/* <div className="text-center">
                <img
                  src={aboutData.successful_events}
                  alt="Successful events"
                  className="w-16 h-16 mx-auto mb-2"
                />
                <div className="text-gray-600">Sertifikat</div>
              </div> */}
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-500 mb-2">{aboutData.work_experience}+</div>
                <div className="text-gray-600">Tajribali xizmat</div>
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
              src={`${aboutData.image}`}
              alt="Venue Interior"
              className="rounded-lg h-[400px]  md:h-[500px] w-full shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white py-3 px-6 rounded shadow-lg">
              <p className="text-lg font-serif">{aboutData.work_experience} yillik tajriba</p>
            </div>
          </motion.div>
        </div>

        <ServicesSection />

        <StaffSection />
      </div>
    </div>
  );
};

export default AboutPage;

