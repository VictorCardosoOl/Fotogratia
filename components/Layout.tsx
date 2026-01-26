import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import Button from './Button';

const NAV_LINK_CLASS = 'text-secondary hover:text-primary transition-colors duration-500 tracking-widest text-[10px] uppercase font-semibold';
const ACTIVE_LINK_CLASS = 'text-primary font-bold';
const UNDERLINE_CLASS = 'bg-accent';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  // Refined Cinematic Reveal: Smoother transition ranges
  const footerOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const footerScale = useTransform(scrollYProgress, [0.8, 1], [0.95, 1]);
  const footerY = useTransform(scrollYProgress, [0.8, 1], [-30, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary selection:bg-primary selection:text-white font-sans">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled ? 'bg-background/80 backdrop-blur-lg py-4 border-b border-muted shadow-sm' : 'bg-transparent py-8'
        }`}
      >
        <div className="container flex items-center justify-between">
          <RouterNavLink to="/" className={`text-2xl md:text-3xl font-serif italic font-medium tracking-tight z-50 transition-colors duration-500 ${isScrolled ? 'text-primary' : 'text-white md:text-primary'}`}>
            LUMINA
          </RouterNavLink>

          <nav className="hidden md:flex items-center space-x-12">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative group py-2 ${isActive ? ACTIVE_LINK_CLASS : NAV_LINK_CLASS} ${!isScrolled && 'md:text-primary'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-500 ease-out ${UNDERLINE_CLASS} ${isActive ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`} />
                  </>
                )}
              </RouterNavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <Button 
                variant="text" 
                onClick={() => navigate('/contact')}
                className={`${isScrolled ? 'text-primary' : 'text-primary'} hover:text-accent font-serif italic text-base capitalize`}
              >
                Inquire
              </Button>
            </div>
            
            <button 
              className={`md:hidden z-50 p-2 focus:outline-none transition-colors ${isMobileMenuOpen ? 'text-white' : (isScrolled ? 'text-primary' : 'text-white')}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-dark z-40 transition-transform duration-[0.8s] ease-[0.16,1,0.3,1] transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col justify-center items-center space-y-10 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {NAV_LINKS.map((link) => (
          <RouterNavLink
            key={link.path}
            to={link.path}
            onClick={handleMobileNavClick}
            className="text-4xl font-serif italic text-white hover:text-accent transition-colors duration-300"
          >
            {link.label}
          </RouterNavLink>
        ))}
        <Button variant="outline" onClick={() => { handleMobileNavClick(); navigate('/contact'); }} className="mt-8 border-white text-white">
            Start Project
        </Button>
      </div>

      <main className="relative z-10 bg-background w-full shadow-xl mb-[80vh] md:mb-[60vh]">
        {children}
      </main>

      <footer 
        className="fixed bottom-0 left-0 right-0 h-[80vh] md:h-[60vh] bg-surface text-secondary flex items-center z-0"
      >
        <motion.div 
          style={{ opacity: footerOpacity, scale: footerScale, y: footerY }}
          className="w-full h-full flex flex-col justify-between py-12 md:py-24 border-t border-muted"
        >
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 h-full">
            <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                  <h3 className="text-5xl md:text-9xl font-serif italic font-light mb-8 text-primary/10 select-none">LUMINA</h3>
                  <p className="text-secondary text-sm leading-relaxed max-w-sm font-light tracking-wide">
                  A visual storytelling studio. Based in light, rooted in emotion. We document the unscripted and the profound.
                  </p>
              </div>
            </div>
            
            <div className="md:col-span-3 lg:col-span-3 md:col-start-8 lg:col-start-8 flex flex-col justify-center">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] mb-8 text-primary/40">Studio</h4>
              <div className="space-y-6 text-sm font-light tracking-wide flex flex-col items-start">
                <p className="text-primary">{CONTACT_INFO.location}</p>
                <motion.a 
                  href={`mailto:${CONTACT_INFO.email}`} 
                  className="block text-primary origin-left"
                  whileHover={{ x: 5, scale: 1.02, color: '#475569' }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {CONTACT_INFO.email}
                </motion.a>
                <motion.a 
                  href={`tel:${CONTACT_INFO.phone}`} 
                  className="block text-primary origin-left"
                  whileHover={{ x: 5, scale: 1.02, color: '#475569' }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {CONTACT_INFO.phone}
                </motion.a>
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-2 flex flex-col justify-center">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] mb-8 text-primary/40">Social</h4>
              <div className="flex flex-col space-y-4 items-start">
                {['Instagram', 'Vimeo', 'Pinterest'].map((social) => (
                  <motion.a 
                    key={social}
                    href="#" 
                    className="text-secondary opacity-80 hover:opacity-100 text-sm block origin-left"
                    whileHover={{ x: 5, scale: 1.05, color: '#475569' }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="container pt-8 border-t border-muted/50 flex flex-col md:flex-row justify-between items-center relative z-10 gap-4 opacity-60 hover:opacity-100 transition-opacity duration-700">
            <p className="text-[10px] uppercase tracking-widest text-secondary">&copy; {new Date().getFullYear()} Lumina. Est. 2024</p>
            <div className="flex space-x-8 text-[10px] uppercase tracking-widest text-secondary">
              <motion.a 
                href="#" 
                className="inline-block"
                whileHover={{ scale: 1.05, color: '#1E293B' }}
                transition={{ duration: 0.2 }}
              >
                Privacy
              </motion.a>
              <motion.a 
                href="#" 
                className="inline-block"
                whileHover={{ scale: 1.05, color: '#1E293B' }}
                transition={{ duration: 0.2 }}
              >
                Imprint
              </motion.a>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Layout;