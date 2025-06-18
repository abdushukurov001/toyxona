
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import client from '../../services';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    message: '',
  });

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove spaces and ensure +998 prefix
    const cleanedPhone = phone.replace(/\s/g, '');
    return /^\+998\d{9}$/.test(cleanedPhone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, ''); // Remove spaces
    // Ensure +998 prefix
    if (!value.startsWith('+998')) {
      if (value.startsWith('+')) {
        value = '+998' + value.slice(1);
      } else if (value.startsWith('998')) {
        value = '+998' + value.slice(3);
      } else {
        value = '+998' + value;
      }
    }
    // Limit to 13 characters
    value = value.slice(0, 13);
    setFormData({ ...formData, phone_number: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(formData.phone_number)) {
      toast.error('Telefon raqam +998 bilan boshlanishi va probelsiz 13 ta belgidan iborat bo‘lishi kerak!');
      return;
    }

    try {
      await client.post('/api/v1/web/contact_us/', formData);
      toast.success('Xabaringiz muvaffaqiyatli yuborildi!');
      setFormData({ first_name: '', last_name: '', phone_number: '', message: '' });
    } catch {
      toast.error('Xabar yuborishda xatolik yuz berdi!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              Ismingiz
            </label>
            <input
              type="text"
              id="first_name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="border p-3 rounded w-full focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Familiyangiz
            </label>
            <input
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="border p-3 rounded w-full focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
            Telefon raqamingiz
          </label>
          <input
            type="tel"
            id="phone_number"
            value={formData.phone_number}
            onChange={handlePhoneChange}
            className="border p-3 rounded w-full focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Xabaringiz
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="border p-3 rounded w-full h-32 focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded w-full transition-colors duration-300"
        >
          Yuborish
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
