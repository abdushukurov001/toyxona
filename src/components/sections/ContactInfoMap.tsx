
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

interface ContactInfo {
  phone_number: string;
  email: string;
  location: string;
  location_url: string;
  latitude?: number;
  longitude?: number;
}

interface SocialLink {
  id: number;
  url: string;
  social_media_image: string;
}

interface ContactInfoMapProps {
  contactInfo: ContactInfo | null;
  mapPosition: [number, number];
  mapReady: boolean;
  socialLinks: SocialLink[];
}

const ContactInfoMap: React.FC<ContactInfoMapProps> = ({
  contactInfo,
  mapPosition,
  mapReady,
  socialLinks,
}) => {
  const createGoogleMapsEmbedUrl = (lat: number, lng: number): string => {
    return `https://www.google.com/maps?q=${lat},${lng}&output=embed&z=16`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
        <div className="flex items-center">
          <Phone className="text-amber-500 mr-4" />
          {contactInfo?.phone_number ? (
            <a href={`tel:${contactInfo.phone_number}`} className=" hover:underline">
              {contactInfo.phone_number}
            </a>
          ) : (
            <span className="text-gray-500">Yuklanmoqda...</span>
          )}
        </div>
        <div className="flex items-center">
          <Mail className="text-amber-500 mr-4" />
          {contactInfo?.email ? (
            <a href={`mailto:${contactInfo.email}`} className=" hover:underline">
              {contactInfo.email}
            </a>
          ) : (
            <span className="text-gray-500">Yuklanmoqda...</span>
          )}
        </div>
        <div className="flex items-center">
          <MapPin className="text-amber-500 mr-4" />
          {contactInfo?.location ? (
            <a
              
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:underline"
            >
              {contactInfo.location}
            </a>
          ) : (
            <span className="text-gray-500">Yuklanmoqda...</span>
          )}
        </div>
        <div className="flex space-x-4 pt-4">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform"
            >
              <img
                src={link.social_media_image}
                alt="social"
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/default-social-icon.png';
                }}
              />
            </a>
          ))}
        </div>
      </div>

      {mapReady && (
        <div className="bg-white h-64 rounded-lg shadow-lg overflow-hidden">
          <div className="relative pt-[56.25%]">
            <iframe
              src={createGoogleMapsEmbedUrl(mapPosition[0], mapPosition[1])}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bizning joylashuvimiz"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ContactInfoMap;