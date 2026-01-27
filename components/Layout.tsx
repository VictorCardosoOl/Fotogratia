import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, CONTACT_INFO, SOCIAL_LINKS } from '../constants';
import Button from './Button';

const NAV_LINK_CLASS = 'text-secondary/80 hover:text-primary transition-colors duration-300 tracking-[0.2em] text-[11px] uppercase font-medium relative';
const ACTIVE_LINK_CLASS = 'text-primary font-bold';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parallax Footer Animations
  const { scrollYProgress } = useScroll();
  const footerOpacity = useTransform(scrollYProgress, [0.9, 1], [0.5, 1]);
  const footerScale = useTransform(scrollYProgress, [0.95, 1], [0.98, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header 
        className={`fixed top-0 left-0 right-0 z-header transition-all duration-500 ease-[0.22,1,0.36,1] ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md py-4 border-b border-muted/50' 
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="container flex items-center justify-between">
          <RouterNavLink to="/" className="group relative z-50">
             <span className={`text-2xl md:text-3xl font-serif italic font-medium tracking-tight transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? 'text-primary' : 'text-white md:text-primary'}`}>
                LUMINA
             </span>
          </RouterNavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-12">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group py-2 ${isActive ? ACTIVE_LINK_CLASS : NAV_LINK_CLASS} ${!isScrolled && location.pathname === '/' ? 'text-primary' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-primary transition-all duration-500 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full opacity-40'}`} />
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
                Contato
              </Button>
            </div>
            
            <button 
              className={`md:hidden z-50 p-2 focus:outline-none transition-colors duration-300 ${isMobileMenuOpen ? 'text-primary' : (isScrolled ? 'text-primary' : 'text-white')}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 bg-background z-modal md:hidden flex flex-col justify-center items-center"
            >
                <div className="flex flex-col items-center space-y-8">
                    {NAV_LINKS.map((link, i) => (
                    <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                    >
                        <RouterNavLink
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-4xl font-serif italic text-primary hover:text-accent transition-colors duration-300"
                        >
                            {link.label}
                        </RouterNavLink>
                    </motion.div>
                    ))}
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <Button variant="outline" onClick={() => { setIsMobileMenuOpen(false); navigate('/contact'); }} className="border-primary text-primary">
                        Iniciar Projeto
                    </Button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 w-full bg-background shadow-2xl min-h-screen">
        {children}
      </main>

      {/* Sticky Footer */}
      <footer 
        className="sticky bottom-0 left-0 right-0 z-0 bg-surface text-secondary flex items-center min-h-[50vh] md:min-h-[60vh]"
      >
        <motion.div 
          style={{ opacity: footerOpacity, scale: footerScale }}
          className="w-full h-full flex flex-col justify-between py-12 md:py-20"
        >
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 h-full flex-grow">
            <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between">
              <div>
                  <h3 className="text-5xl md:text-9xl font-serif italic font-light mb-8 text-primary/5 select-none tracking-tighter">LUMINA</h3>
                  <p className="text-secondary text-sm leading-relaxed max-w-sm font-light tracking-wide border-l border-accent/30 pl-6">
                  Um estúdio de narrativa visual. Baseado na luz, enraizado na emoção. Documentamos o não roteirizado e o profundo.
                  </p>
              </div>
            </div>
            
            <div className="md:col-span-3 lg:col-span-3 md:col-start-8 lg:col-start-8 flex flex-col justify-center">
              <h4 className="text-micro font-bold uppercase mb-8 text-primary/40 tracking-widest">Estúdio</h4>
              <div className="space-y-4 text-sm font-light tracking-wide flex flex-col items-start">
                <p className="text-primary">{CONTACT_INFO.location}</p>
                <a href={`mailto:${CONTACT_INFO.email}`} className="block text-secondary hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5">{CONTACT_INFO.email}</a>
                <a href={`tel:${CONTACT_INFO.phone}`} className="block text-secondary hover:text-primary transition-colors">{CONTACT_INFO.phone}</a>
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-2 flex flex-col justify-center">
              <h4 className="text-micro font-bold uppercase mb-8 text-primary/40 tracking-widest">Social</h4>
              <div className="flex flex-col space-y-4 items-start">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-secondary opacity-70 hover:opacity-100 text-sm block hover:translate-x-2 transition-transform duration-300"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="container mt-12 pt-8 border-t border-muted/50 flex flex-col md:flex-row justify-between items-center relative z-10 gap-4 opacity-50 hover:opacity-100 transition-opacity duration-500">
            <p className="text-micro uppercase text-secondary tracking-widest">&copy; {new Date().getFullYear()} Lumina. Est. 2024</p>
            <div className="flex space-x-8 text-micro uppercase text-secondary tracking-widest">
              <button className="hover:text-primary transition-colors">Privacidade</button>
              <button className="hover:text-primary transition-colors">Termos</button>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Layout;