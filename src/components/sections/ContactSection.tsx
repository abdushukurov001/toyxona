import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import Button from '../ui/Button';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ContactSection: React.FC = () => {
  const position: [number, number] = [41.2995, 69.2401]; // Tashkent coordinates

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Biz bilan bog'lanish"
          subtitle="Savollaringiz bormi? Biz bilan bog'laning"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ismingiz
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon raqamingiz
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Xabaringiz
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <Button type="submit" className="w-full">
                Yuborish
              </Button>
            </form>
          </motion.div>
          
          {/* Contact Info and Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="text-amber-500 mr-4" />
                  <span>+998 90 123 45 67</span>
                </div>
                <div className="flex items-center">
                  <Mail className="text-amber-500 mr-4" />
                  <span>info@luxuryvenue.uz</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-amber-500 mr-4" />
                  <span>123 Venue Street, Tashkent, Uzbekistan</span>
                </div>
                <div className="flex space-x-4 pt-4">
                  <a href="#" className="text-gray-600 hover:text-amber-500 transition-colors">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-amber-500 transition-colors">
                    <Facebook size={24} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="h-[300px] rounded-lg overflow-hidden shadow-lg">
              <MapContainer 
                center={position} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    Luxury Venue
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;