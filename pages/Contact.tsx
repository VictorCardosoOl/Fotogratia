import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  type: string;
  message: string;
};

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form Data:', data);
    alert('Thank you! Your message has been sent.');
    reset();
  };

  return (
    <Layout>
      <div className="pt-40 pb-20 bg-background text-primary relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Get in Touch</h1>
          <p className="text-muted max-w-xl mx-auto font-light text-lg">
            We are currently accepting bookings for the 2024-2025 season.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-20 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-10">
            <div>
                <h3 className="text-2xl font-serif mb-4 text-primary">Studio</h3>
                <p className="text-muted leading-relaxed font-light text-sm">
                We reply to all inquiries within 24 hours.
                </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-8">
                    <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h5 className="font-bold text-primary text-xs uppercase tracking-widest mb-1">Location</h5>
                  <p className="text-muted text-sm font-light">{CONTACT_INFO.location}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8">
                    <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h5 className="font-bold text-primary text-xs uppercase tracking-widest mb-1">Email</h5>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-muted text-sm font-light hover:text-primary transition-colors">{CONTACT_INFO.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3 bg-surface p-10 md:p-14 border border-primary/5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Full Name</label>
                  <input 
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-0 py-3 bg-transparent border-b border-primary/20 focus:border-primary outline-none transition-colors placeholder-primary/30 text-primary"
                    placeholder="Jane Doe"
                  />
                  {errors.name && <span className="text-red-900 text-[10px] mt-1 uppercase tracking-wide">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Email Address</label>
                  <input 
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-0 py-3 bg-transparent border-b border-primary/20 focus:border-primary outline-none transition-colors placeholder-primary/30 text-primary"
                    placeholder="jane@example.com"
                  />
                  {errors.email && <span className="text-red-900 text-[10px] mt-1 uppercase tracking-wide">{errors.email.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Phone</label>
                  <input 
                    type="tel"
                    {...register('phone')}
                    className="w-full px-0 py-3 bg-transparent border-b border-primary/20 focus:border-primary outline-none transition-colors placeholder-primary/30 text-primary"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Service</label>
                  <select 
                    {...register('type')}
                    className="w-full px-0 py-3 bg-transparent border-b border-primary/20 focus:border-primary outline-none transition-colors text-primary"
                  >
                    <option value="wedding">Wedding / Elopement</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="commercial">Commercial / Brand</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">Your Vision</label>
                <textarea 
                  {...register('message', { required: 'Message is required' })}
                  rows={4}
                  className="w-full px-0 py-3 bg-transparent border-b border-primary/20 focus:border-primary outline-none transition-colors resize-none placeholder-primary/30 text-primary"
                  placeholder="Tell us about your plans..."
                />
              </div>

              <Button type="submit" fullWidth disabled={isSubmitting} className="mt-4">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;