import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Haqida bo‘limi */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-amber-500">Luxury Venue</h3>
            <p className="text-gray-300 mb-4">
              Maxsus kunlaringiz uchun unutilmas lahzalarni yaratamiz. Bizning majmua to‘ylar, bayramlar va korporativ tadbirlar uchun ideal muhitni taklif etadi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Tez havolalar */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-amber-500">Tez havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-500 transition-colors">Bosh sahifa</Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-amber-500 transition-colors">Biz haqimizda</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-amber-500 transition-colors">Galereya</Link>
              </li>
              <li>
                <Link to="/#prices" className="text-gray-300 hover:text-amber-500 transition-colors">Narxlar</Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-300 hover:text-amber-500 transition-colors">Kalendar</Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-amber-500 transition-colors">Bogʻlanish</Link>
              </li>
            </ul>
          </div>

          {/* Xizmatlar */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-amber-500">Xizmatlarimiz</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">To‘y marosimlari</li>
              <li className="text-gray-300">Tug‘ilgan kun bayramlari</li>
              <li className="text-gray-300">An’anaviy bazmlar</li>
              <li className="text-gray-300">Korporativ tadbirlar</li>
              <li className="text-gray-300">Katering xizmatlari</li>
              <li className="text-gray-300">Bezash xizmatlari</li>
            </ul>
          </div>

          {/* Bogʻlanish maʼlumotlari */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-amber-500">Biz bilan bogʻlaning</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 text-amber-500" />
                <span className="text-gray-300">+998 90 123 45 67</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-amber-500" />
                <span className="text-gray-300">info@luxuryvenue.uz</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-amber-500" />
                <span className="text-gray-300">123 Venue ko‘chasi, Toshkent, O‘zbekiston</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 text-amber-500" />
                <span className="text-gray-300">Har kuni ochiq: 10:00 - 22:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Luxury Venue. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
