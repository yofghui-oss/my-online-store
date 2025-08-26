import React, { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  variant?: 'default' | 'stat' | 'chart';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  variant = 'default',
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-secondary-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-secondary-200/50 dark:border-secondary-700/50';
  
  const variantClasses = {
    default: 'p-6',
    stat: 'p-5',
    chart: 'p-6',
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:border-primary-400/50 transition-all duration-300' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;

  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
