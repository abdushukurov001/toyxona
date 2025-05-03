import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = true,
  light = false,
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className={`text-3xl md:text-4xl font-serif mb-3 ${light ? 'text-white' : 'text-gray-800'}`}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-lg ${light ? 'text-gray-200' : 'text-gray-600'} max-w-2xl ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: centered ? 120 : 100 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`h-1 bg-amber-500 mt-4 ${centered ? 'mx-auto' : ''}`}
      />
    </div>
  );
};

export default SectionHeading;