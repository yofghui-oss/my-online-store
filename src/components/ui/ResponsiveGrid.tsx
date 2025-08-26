import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md'
}) => {
  const getGridClass = () => {
    const { default: defaultCols = 1, sm = 2, md = 3, lg = 4, xl = lg } = cols;
    
    let gridClass = `grid grid-cols-${defaultCols}`;
    if (sm) gridClass += ` sm:grid-cols-${sm}`;
    if (md) gridClass += ` md:grid-cols-${md}`;
    if (lg) gridClass += ` lg:grid-cols-${lg}`;
    if (xl) gridClass += ` xl:grid-cols-${xl}`;
    
    return gridClass;
  };

  const getGapClass = () => {
    switch (gap) {
      case 'sm': return 'gap-2 sm:gap-3';
      case 'md': return 'gap-4 sm:gap-6';
      case 'lg': return 'gap-6 sm:gap-8';
      case 'xl': return 'gap-8 sm:gap-10';
      default: return 'gap-4 sm:gap-6';
    }
  };

  return (
    <div className={`${getGridClass()} ${getGapClass()} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;
