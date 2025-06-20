import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -80; // Adjust for navbar height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    console.log(`Scrolled to section: ${id}`); // Debugging
  } else {
    console.warn(`Section not found: ${id}`); // Debugging
  }
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setScrolled(window.scrollY > 10);
      } else {
        setScrolled(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    console.log('Location:', { pathname: location.pathname, hash: location.hash }); // Debugging
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => scrollToSection(sectionId), 500); // Align with HomePage delay
    }
  }, [location]);

  const handleNavClick = (id: string) => {
    console.log(`Navigating to section: ${id}`); // Debugging
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white text-gray-800 shadow-md'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-20">
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="text-xl md:text-2xl font-serif tracking-wider flex items-center"
        >
          <span className="text-amber-500 mr-1">Luxury</span>
          <span>Venue</span>
        </Link>

        <nav className="hidden lg:flex space-x-8 list-none">
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={getLinkClass('/', scrolled)}
          >
            Bosh sahifa
          </Link>
          <li onClick={() => handleNavClick('about')} className={getLinkClass('#about', scrolled)}>
            Biz haqimizda
          </li>
          <li>
            <Link
              to="/gallery"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={getLinkClass('/gallery', scrolled)}
            >
              Galereya
            </Link>
          </li>
          <li onClick={() => handleNavClick('prices')} className={getLinkClass('#prices', scrolled)}>
            Narxlar
          </li>
          <li>
            <Link
              to="/calendar"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={getLinkClass('/calendar', scrolled)}
            >
              Kalendar
            </Link>
          </li>
          <li onClick={() => handleNavClick('contact')} className={getLinkClass('#contact', scrolled)}>
            Bogʻlanish
          </li>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
          aria-label={isOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
        >
          {isOpen ? (
            <X size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <Menu size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-end"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="w-[60%] h-screen bg-white text-gray-800 shadow-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-4">
                <MobileNavLink to="/" label="Bosh sahifa" />
                <MobileNavLink to="/#about" label="Biz haqimizda" />
                <MobileNavLink to="/gallery" label="Galereya" />
                <MobileNavLink to="/#prices" label="Narxlar" />
                <MobileNavLink to="/calendar" label="Kalendar" />
                <MobileNavLink to="/#contact" label="Bogʻlanish" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const getLinkClass = (path: string, scrolled: boolean) => {
  return `text-[16px] cursor-pointer uppercase transition-colors font-medium relative ${
    scrolled ? 'text-gray-800 hover:text-amber-500' : 'text-white hover:text-amber-300'
  }`;
};

interface MobileNavLinkProps {
  to: string;
  label: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/');
    } else if (to.includes('#')) {
      const id = to.split('#')[1];
      navigate(`/#${id}`);
      setTimeout(() => scrollToSection(id), 500); // Align with HomePage delay
    } else {
      navigate(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="block py-2 text-lg font-medium text-gray-800 hover:text-amber-500 transition-colors duration-200"
    >
      {label}
    </button>
  );
};

export default Navbar;