import React from 'react';
import { motion } from 'framer-motion';
import ResponsiveLayout from '../layout/ResponsiveLayout';
import ResponsiveGrid from '../ui/ResponsiveGrid';

interface ThemeResponsiveWrapperProps {
  children: React.ReactNode;
  themeId: string;
  className?: string;
}

const ThemeResponsiveWrapper: React.FC<ThemeResponsiveWrapperProps> = ({
  children,
  themeId,
  className = ''
}) => {
  const getThemeSpecificClasses = (themeId: string) => {
    switch (themeId) {
      case 'minimal':
        return 'bg-gray-50 dark:bg-gray-900';
      case 'tech':
        return 'bg-slate-900 dark:bg-slate-950';
      case 'modern':
        return 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950';
      case 'luxe':
        return 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950';
      case 'vibrant':
        return 'bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-pink-950 dark:via-purple-950 dark:to-cyan-950';
      default:
        return 'bg-gray-50 dark:bg-gray-900';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeSpecificClasses(themeId)} ${className}`}>
      <ResponsiveLayout>
        {children}
      </ResponsiveLayout>
    </div>
  );
};

export { ResponsiveGrid };
export default ThemeResponsiveWrapper;
