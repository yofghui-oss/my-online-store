import React from 'react';
import { motion } from 'framer-motion';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md'
}) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-7xl';
      case '2xl': return 'max-w-screen-2xl';
      case 'full': return 'max-w-full';
      default: return 'max-w-7xl';
    }
  };

  const getPaddingClass = () => {
    switch (padding) {
      case 'none': return '';
      case 'sm': return 'px-2 sm:px-4';
      case 'md': return 'px-4 sm:px-6 lg:px-8';
      case 'lg': return 'px-6 sm:px-8 lg:px-12';
      default: return 'px-4 sm:px-6 lg:px-8';
    }
  };

  return (
    <div className={`w-full ${getMaxWidthClass()} mx-auto ${getPaddingClass()} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveLayout;
