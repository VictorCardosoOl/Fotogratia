import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  type: string;
  message: string;
};

const Contact: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    mode: 'onChange' 
  });

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In production, integrate actual API call here.
      setIsSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  const getInputClass = (hasError: boolean) => 
    `w-full py-4 bg-transparent border-b outline-none transition-all duration-300 placeholder-transparent text-primary text-lg font-light rounded-none focus:ring-0 ${
      hasError 
        ? 'border-red-500 focus:border-red-600' 
        : 'border-secondary/30 focus:border-primary'
    }`;

  const labelClass = "absolute left-0 top-4 text-secondary/60 text-sm transition-all duration-300 pointer-events-none origin-left uppercase tracking-widest text-[10px]";

  return (
    <Layout>
      <div className="pt-32 md:pt-40 pb-16 md:pb-20 bg-background text-primary relative">
        <div className="container text-center relative z-10">
          <h1 className="text-fluid-h2 font-serif mb-6 italic">Entre em Contato</h1>
          <p className="text-secondary max-w-xl mx-auto font-light text-base md:text-lg">
            Estamos aceitando agendamentos para a temporada 2024-2025.
          </p>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-12 order-2 lg:order-1 pt-4 border-t lg:border-t-0 border-muted">
            <div>
                <h3 className="text-2xl font-serif mb-6 text-primary italic">Estúdio</h3>
                <p className="text-secondary leading-relaxed font-light text-sm">
                Respondemos todas as solicitações em até 24 horas.
                </p>
            </div>
            
            <div className="space-y-10">
              <div className="flex items-start group">
                <div className="w-8 mt-1">
                    <MapPin className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h5 className="font-bold text-primary text-[10px] uppercase tracking-widest mb-2">Localização</h5>
                  <p className="text-secondary text-sm font-light">{CONTACT_INFO.location}</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-8 mt-1">
                    <Mail className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h5 className="font-bold text-primary text-[10px] uppercase tracking-widest mb-2">Email</h5>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-secondary text-sm font-light hover:text-primary transition-colors block decoration-transparent hover:underline">{CONTACT_INFO.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3 order-1 lg:order-2 relative">
             <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-16 left-0 right-0 z-20 bg-surface border border-accent/20 p-4 flex items-center justify-center text-primary"
                  >
                    <CheckCircle className="w-4 h-4 mr-3 text-accent" />
                    <span className="text-sm font-medium tracking-wide">Mensagem enviada com sucesso.</span>
                  </motion.div>
                )}
             </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input 
                    id="name"
                    {...register('name', { required: 'Nome é obrigatório' })}
                    className={`${getInputClass(!!errors.name)} peer`}
                    placeholder=" "
                  />
                  <label htmlFor="name" className={`${labelClass} peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]`}>
                    Nome Completo
                  </label>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-5 left-0 text-red-500 text-[10px] uppercase flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.name.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative group">
                  <input 
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: "Email inválido" } })}
                    className={`${getInputClass(!!errors.email)} peer`}
                    placeholder=" "
                  />
                   <label htmlFor="email" className={`${labelClass} peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]`}>
                    Email
                  </label>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-5 left-0 text-red-500 text-[10px] uppercase flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.email.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="relative group">
                  <input 
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={`${getInputClass(false)} peer`}
                    placeholder=" "
                  />
                   <label htmlFor="phone" className={`${labelClass} peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]`}>
                    Telefone
                  </label>
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Interesse</label>
                  <div className="relative">
                    <select 
                      {...register('type')}
                      className="w-full py-3 bg-transparent border-b border-secondary/30 focus:border-primary outline-none transition-colors text-primary appearance-none rounded-none text-lg font-light cursor-pointer hover:border-accent"
                    >
                      <option value="wedding">Casamento / Elopement</option>
                      <option value="portrait">Sessão de Retrato</option>
                      <option value="commercial">Comercial / Marca</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <textarea 
                  id="message"
                  {...register('message', { required: 'Mensagem é obrigatória' })}
                  rows={1}
                  className={`${getInputClass(!!errors.message)} peer resize-none min-h-[4rem]`}
                  placeholder=" "
                  style={{ overflow: 'hidden' }}
                  onInput={(e) => {
                      e.currentTarget.style.height = 'auto';
                      e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                  }}
                />
                 <label htmlFor="message" className={`${labelClass} peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]`}>
                    Conte sobre sua visão...
                  </label>
                 <AnimatePresence>
                    {errors.message && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-5 left-0 text-red-500 text-[10px] uppercase flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.message.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>

              <div className="pt-8">
                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;