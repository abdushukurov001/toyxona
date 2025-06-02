import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import client from '../../services';

interface ContactInfo {
  id: number;
  phone_number: string;
  email: string;
  location: string;
  open_from: string;
  close_to: string;
}

interface SocialLink {
  id: number;
  url: string;
  social_media_image: string;
}

const Footer: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  // 24 soatlik formatni 12 soatlik formatga o'zgartirish
  const formatTime = (time: string): string => {
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const minute = minutes;

      if (hour === 0) return `12:${minute} AM`;
      if (hour < 12) return `${hour}:${minute} AM`;
      if (hour === 12) return `12:${minute} PM`;
      return `${hour - 12}:${minute} PM`;
    } catch {
      return time;
    }
  };

  const fetchContactInfo = async () => {
    try {
      const res = await client.get('/api/v1/web/get_contact_us_info_for_footer/');
      setContactInfo(res.data);
    } catch (error) {
      console.error('Footer kontakt maʼlumotlarini olishda xatolik:', error);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const res = await client.get('/api/v1/web/get_web_social_media/');
      setSocialLinks(res.data);
    } catch (error) {
      console.error('Ijtimoiy tarmoq havolalarini olishda xatolik:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchContactInfo(), fetchSocialLinks()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none"></div>

      <div className="relative">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="flex justify-between flex-wrap gap-12 lg:gap-8">

            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-serif mb-4 text-amber-400 font-bold">Luxury Venue</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-4"></div>
              </div>

              <p className="text-gray-300 max-w-[400px] leading-relaxed mb-6 text-sm">
                Maxsus kunlaringiz uchun unutilmas lahzalarni yaratamiz. Bizning majmua 
                to'ylar, bayramlar va korporativ tadbirlar uchun ideal muhitni taklif etadi.
              </p>

              {/* Social Links */}
              <div className="space-y-3">
                
                <div className="flex flex-wrap gap-3">
                  {loading ? (
                    <>
                      <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
                      <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
                    </>
                  ) : (
                    socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-10 h-10 bg-gray-800 hover:bg-amber-500 
                          rounded-lg transition-all duration-300 flex items-center justify-center
                          hover:scale-110 hover:shadow-lg hover:shadow-amber-500/25"
                      >
                        <img 
                          src={link.social_media_image} 
                          alt="Social media" 
                          className="w-5 h-5 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                        />
                        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-amber-400">Tez havolalar</h4>
                <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
              </div>

              <nav className="space-y-3">
                {[
                  { to: '/', label: 'Bosh sahifa' },
                  { to: '/#about', label: 'Biz haqimizda' },
                  { to: '/gallery', label: 'Galereya' },
                  { to: '/#prices', label: 'Narxlar' },
                  { to: '/calendar', label: 'Kalendar' },
                  { to: '/#contact', label: 'Bogʻlanish' }
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    className="group flex items-center text-gray-300 hover:text-amber-400 
                      transition-all duration-300 text-sm py-1"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item.label}
                    <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-amber-400">Biz bilan bogʻlaning</h4>
                <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-gray-700 rounded animate-pulse mt-1"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className=" grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Telefon */}
                    <div className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <Phone size={18} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Telefon</p>
                        <a href={`tel:${contactInfo?.phone_number}`} className="text-gray-300 hover:text-amber-400 font-medium">
                          {contactInfo?.phone_number || 'Yuklanmoqda...'}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <Mail size={18} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                        <a href={`mailto:${contactInfo?.email}`} className="text-gray-300 hover:text-amber-400 font-medium break-all">
                          {contactInfo?.email || 'Yuklanmoqda...'}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Location */}
                    <div className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <MapPin size={18} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Manzil</p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {contactInfo?.location || 'Yuklanmoqda...'}
                        </p>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <Clock size={18} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Ish vaqti</p>
                        <p className="text-gray-300 text-sm font-medium">
                          {contactInfo?.open_from && contactInfo?.close_to
                            ? `${formatTime(contactInfo.open_from)} – ${formatTime(contactInfo.close_to)}`
                            : 'Yuklanmoqda...'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
