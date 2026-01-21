import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Award, Camera, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import { PHOTOS, SERVICES, TESTIMONIALS } from '../constants';

// "Heavy" physical physics. Slow entrance, settles firmly.
const heavySpring = {
  type: "spring",
  stiffness: 50,
  damping: 20,
  mass: 1.5
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: heavySpring
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredPhotos = PHOTOS.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }} // Custom bezier for very smooth, slow easing
            className="w-full h-full"
          >
            <img 
              src="https://picsum.photos/1920/1080?grayscale" 
              alt="Cinematic Photography" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Subtle Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" /> 
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
                <span className="inline-block px-3 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-md text-white/90 uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium mb-8">
                Fine Art Photography
                </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-9xl font-serif font-medium mb-8 leading-[1] tracking-tight text-white drop-shadow-sm"
            >
              Simplicity in <br /> <span className="italic text-white/90">Detail</span>.
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Capturing life's most beautiful moments with a natural, timeless aesthetic.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button onClick={() => navigate('/portfolio')} className="w-full sm:w-auto bg-white text-primary hover:bg-surface hover:text-primary border-none shadow-xl shadow-black/10">
                View Portfolio
              </Button>
              <Button variant="outline" onClick={() => navigate('/contact')} className="border-white/40 text-white hover:bg-white hover:text-primary w-full sm:w-auto backdrop-blur-sm">
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-b border-primary/5">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 hover:opacity-100"
          >
             <span className="text-xl font-serif font-bold text-primary tracking-widest">VOGUE</span>
             <span className="text-xl font-serif font-bold text-primary tracking-widest">BRIDES</span>
             <span className="text-xl font-serif font-bold text-primary tracking-widest">GQ</span>
             <span className="text-xl font-serif font-bold text-primary tracking-widest">ARCHITECTURAL</span>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Why Choose Us" title="The Lumina Experience" />
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {[
              { icon: Camera, title: "Natural Aesthetic", desc: "We focus on natural light and candid moments, avoiding heavy filters to let the true beauty of the scene shine." },
              { icon: Clock, title: "Effortless Process", desc: "From booking to delivery, our workflow is designed to be simple, transparent, and relaxing for you." },
              { icon: Award, title: "Heirloom Quality", desc: "We deliver high-resolution imagery designed to be printed, framed, and cherished for generations." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="text-center p-10 rounded-sm bg-surface hover:bg-white transition-colors duration-700 border border-transparent hover:border-primary/5 group"
              >
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-8 text-primary/40 group-hover:text-primary transition-colors duration-500">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-primary tracking-wide">{feature.title}</h3>
                <p className="text-muted leading-relaxed font-light text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-20">
            <SectionTitle subtitle="Portfolio" title="Selected Works" alignment="left" className="mb-0" />
            <Button variant="text" withArrow onClick={() => navigate('/portfolio')} className="hidden md:inline-flex mb-2">
              View Full Gallery
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPhotos.map((photo, i) => (
              <motion.div 
                key={photo.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                    type: "spring", 
                    stiffness: 40, 
                    damping: 20, 
                    delay: i * 0.15 
                }}
                className="group relative aspect-[3/4] overflow-hidden bg-surface cursor-pointer"
                onClick={() => navigate('/portfolio')}
              >
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-3 opacity-80">{photo.category}</p>
                  <h3 className="text-2xl font-serif italic">{photo.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center md:hidden">
            <Button variant="outline" fullWidth onClick={() => navigate('/portfolio')}>View All Projects</Button>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-32 bg-surface relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="md:w-1/2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.span variants={fadeInUp} className="text-muted uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Services</motion.span>
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif mb-8 leading-tight text-primary">Invest in <br/><span className="italic text-muted">Memories</span></motion.h2>
                <motion.p variants={fadeInUp} className="text-muted text-lg mb-10 leading-relaxed font-light">
                  We offer bespoke photography packages tailored to your specific needs. Whether it's an intimate elopement or a personal portrait session, we deliver excellence.
                </motion.p>
                <motion.ul variants={fadeInUp} className="space-y-6 mb-12">
                  {SERVICES.map(s => (
                    <li 
                      key={s.id} 
                      className="flex items-center text-primary border-b border-primary/5 pb-4 last:border-0"
                    >
                      <ArrowRight className="w-4 h-4 text-secondary mr-4" />
                      <span className="flex-grow font-medium tracking-wide text-sm">{s.title}</span>
                      <span className="text-xs opacity-50 font-mono uppercase">{s.price}</span>
                    </li>
                  ))}
                </motion.ul>
                <motion.div variants={fadeInUp}>
                    <Button variant="primary" onClick={() => navigate('/services')}>
                    See Detailed Pricing
                    </Button>
                </motion.div>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="md:w-1/2 w-full h-[700px] relative"
            >
               <img 
                 src="https://picsum.photos/800/1000?random=10" 
                 alt="Photographer at work" 
                 className="w-full h-full object-cover relative z-10 shadow-2xl shadow-primary/5 grayscale hover:grayscale-0 transition-all duration-[1.5s]"
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <SectionTitle subtitle="Testimonials" title="Kind Words" />
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={heavySpring}
              className="bg-white p-12 md:p-20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-primary/5"
            >
              <p className="text-xl md:text-2xl font-serif text-primary leading-relaxed mb-10">
                "{TESTIMONIALS[0].text}"
              </p>
              <div className="flex items-center justify-center space-x-1 mb-8">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-secondary fill-current" />)}
              </div>
              <div className="flex flex-col items-center">
                 <h4 className="font-bold text-primary text-sm uppercase tracking-widest">{TESTIMONIALS[0].name}</h4>
                 <p className="text-[10px] text-muted font-medium uppercase tracking-wide mt-2">{TESTIMONIALS[0].role}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white border-t border-primary/5">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={heavySpring}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-primary">Ready to tell your story?</h2>
            <p className="text-muted mb-12 text-lg font-light">
              Dates book up fast. Secure your session today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button onClick={() => navigate('/contact')} className="">Start Conversation</Button>
              <Button variant="outline" onClick={() => navigate('/portfolio')}>View More Work</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;