
import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import client from '../../services';
import ContactForm from './ContactForm';
import ContactInfoMap from './ContactInfoMap';

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

const ContactSection: React.FC = () => {
  const defaultPosition: [number, number] = [41.3453, 69.2060];
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [mapPosition, setMapPosition] = useState<[number, number]>(defaultPosition);
  const [mapReady, setMapReady] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const extractCoordinatesFromUrl = (url: string): [number, number] | null => {
    try {
      // Google Maps URL: q=lat,lng
      const googleMatch = url.match(/q=([-]?\d+\.\d+),([-]?\d+\.\d+)/);
      if (googleMatch) {
        const lat = parseFloat(googleMatch[1]);
        const lng = parseFloat(googleMatch[2]);
        console.log('Google Maps koordinatalari:', { lat, lng });
        return [lat, lng];
      }

      // Yandex Maps URL: ll=long,lat
      const yandexMatch = url.match(/ll=([0-9.-]+)%2C([0-9.-]+)/);
      if (yandexMatch) {
        const lng = parseFloat(yandexMatch[1]);
        const lat = parseFloat(yandexMatch[2]);
        console.log('Yandex koordinatalari:', { lat, lng });
        return [lat, lng];
      }

      // Other formats
      const patterns = [
        /@([-]?\d+\.\d+),([-]?\d+\.\d+)/,
        /!3d([-]?\d+\.\d+)!4d([-]?\d+\.\d+)/,
        /place\/[^/]+\/@([-]?\d+\.\d+),([-]?\d+\.\d+)/,
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          console.log('Boshqa format koordinatalari:', { lat, lng });
          return [lat, lng];
        }
      }

      return null;
    } catch (error) {
      console.error('Koordinatalarni olishda xatolik:', error);
      return null;
    }
  };

  const fetchContactInfo = async () => {
    try {
      const res = await client.get('/api/v1/web/get_contact_us_info/');
      console.log('Contact info:', res.data);
      setContactInfo(res.data);

      let coordinates: [number, number] = defaultPosition;
      if (res.data.latitude && res.data.longitude) {
        coordinates = [res.data.latitude, res.data.longitude];
        console.log('Backend koordinatalari:', coordinates);
      } else if (res.data.location_url) {
        const urlCoordinates = extractCoordinatesFromUrl(res.data.location_url);
        if (urlCoordinates) {
          coordinates = urlCoordinates;
          console.log('URL dan olingan koordinatalar:', coordinates);
        }
      }

      setMapPosition(coordinates);
      setMapReady(true);
    } catch (e) {
      console.error('Kontakt maʼlumotlarini olishda xatolik:', e);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const res = await client.get('/api/v1/web/get_web_social_media/');
      setSocialLinks(res.data);
    } catch (e) {
      console.error('Ijtimoiy tarmoqlarni olishda xatolik:', e);
    }
  };

  useEffect(() => {
    fetchContactInfo();
    fetchSocialLinks();
  }, []);

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <ToastContainer />
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          title="Biz bilan bog'lanish"
          subtitle="Savollaringiz bormi? Biz bilan bog'laning"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfoMap
            contactInfo={contactInfo}
            mapPosition={mapPosition}
            mapReady={mapReady}
            socialLinks={socialLinks}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
