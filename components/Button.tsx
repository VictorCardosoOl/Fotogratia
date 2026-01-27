import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  fullWidth?: boolean;
  withArrow?: boolean;
  className?: string;
}

const BASE_STYLES = "relative inline-flex items-center justify-center px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-colors duration-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";

const VARIANTS_STYLES = {
  primary: "bg-primary text-white border border-primary hover:bg-transparent hover:text-primary rounded-none",
  outline: "border border-primary/20 text-primary bg-transparent hover:border-primary hover:bg-primary hover:text-white rounded-none",
  text: "text-primary p-0 font-serif italic text-base tracking-normal capitalize bg-transparent hover:text-accent"
} as const;

const TEXT_SLIDE_VARIANTS: Variants = {
  initial: { y: 0 },
  hover: { y: "-150%" }
};

const TEXT_REVEAL_VARIANTS: Variants = {
  initial: { y: "150%" },
  hover: { y: 0 }
};

const FILL_VARIANTS: Variants = {
  initial: { scaleY: 0 },
  hover: { scaleY: 1 }
};

const TRANSITION_CONFIG = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  withArrow = false,
  className = '',
  ...props 
}) => {
  const buttonClass = useMemo(() => 
    `${BASE_STYLES} ${VARIANTS_STYLES[variant]} ${fullWidth ? "w-full" : ""} ${className}`, 
  [variant, fullWidth, className]);

  if (variant === 'text') {
    return (
      <motion.button 
        whileTap={{ scale: 0.98 }}
        className={buttonClass} 
        {...props}
      >
        <span className="flex items-center gap-2">
            <span className="relative">
              {children}
              <span className="absolute left-0 bottom-0 w-full h-px bg-accent origin-left scale-x-0 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
            </span>
            {withArrow && (
              <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-1 font-light" />
            )}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      initial="initial"
      whileHover="hover"
      className={buttonClass} 
      {...props}
    >
      {/* Background Fill Animation */}
      {variant === 'outline' && (
         <motion.div 
            variants={FILL_VARIANTS}
            transition={TRANSITION_CONFIG}
            className="absolute inset-0 bg-primary origin-bottom z-0"
         />
      )}
      
      {variant === 'primary' && (
         <motion.div 
            variants={FILL_VARIANTS}
            transition={TRANSITION_CONFIG}
            className="absolute inset-0 bg-white origin-top z-0"
         />
      )}
      
      {/* Content wrapper */}
      <span className={`relative z-10 flex items-center gap-4 ${variant === 'outline' ? 'mix-blend-normal' : 'mix-blend-difference'}`}>
        <div className="relative overflow-hidden h-4 flex items-center">
            <motion.div variants={TEXT_SLIDE_VARIANTS} transition={TRANSITION_CONFIG}>
                {children}
            </motion.div>
            <motion.div
                className="absolute inset-0 top-0 left-0 flex items-center justify-center"
                variants={TEXT_REVEAL_VARIANTS}
                transition={TRANSITION_CONFIG}
            >
                 <span className={variant === 'primary' ? "text-white group-hover:text-primary" : "text-white"}>
                   {children}
                 </span>
            </motion.div>
        </div>
        
        {withArrow && (
            <ArrowRight className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
        )}
      </span>
    </motion.button>
  );
};

export default React.memo(Button);