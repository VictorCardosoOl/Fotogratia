import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  fullWidth?: boolean;
  withArrow?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  withArrow = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Updated variants for "Organic Modernism" palette
  const variants = {
    // Primary: Warm Stone Dark background.
    primary: "bg-primary text-white hover:bg-secondary border border-transparent rounded-sm",
    // Outline: Stone border.
    outline: "border border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary rounded-sm",
    // Text: Stone text.
    text: "text-primary hover:text-secondary p-0 hover:underline decoration-1 underline-offset-4 decoration-secondary bg-transparent"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <motion.button 
      // Physics: A button with "weight" feels stiff and responds fast but settles firmly.
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
      {withArrow && (
        <motion.span
          className="ml-2 inline-block"
          variants={{
            hover: { x: 5 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      )}
    </motion.button>
  );
};

export default Button;