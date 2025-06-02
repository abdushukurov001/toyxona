import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionHeading from '../ui/SectionHeading';
import client from '../../services';

type TeamMember = {
  id: number;
  image: string | null;
  first_name: string;
  last_name: string;
  position: string;
};

const StaffSection: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await client.get('/api/v1/web/get_our_team/');
        setStaffMembers(res.data);
      } catch (error) {
        console.error('Jamoa ma\'lumotlarini olishda xatolik:', error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Bizning Jamoa"
          subtitle="Professional va tajribali xodimlar"
        />
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="pb-12"
        >
          {staffMembers.map((member) => (
            <SwiperSlide key={member.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="w-full md:h-[400px] h-[300px] aspect-[3/4] overflow-hidden">
  <img 
    src={member.image ? `${member.image}` : '/no-image.png'} 
    alt={`${member.first_name} ${member.last_name}`}
    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
  />
</div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-serif text-gray-800 mb-1">
                    {member.first_name} {member.last_name}
                  </h3>
                  <p className="text-amber-500">{member.position}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default StaffSection;
