import React from 'react';
import { motion } from 'framer-motion';
import { getThemeById } from '../../themes';
import { createMockProduct } from '../../utils/productUtils';

// Import all theme components
import MinimalProductCard from '../themes/minimal/MinimalProductCard';
import TechProductCard from '../themes/tech/TechProductCard';
import ModernProductCard from '../themes/modern/ModernProductCard';
import LuxeProductCard from '../themes/luxe/LuxeProductCard';
import VibrantProductCard from '../themes/vibrant/VibrantProductCard';
import { AppliancesProductCard } from '../themes/appliances';
import { ToysProductCard } from '../themes/toys';
import { SoftwareProductCard } from '../themes/software';

const themeComponents = {
  minimal: MinimalProductCard,
  tech: TechProductCard,
  modern: ModernProductCard,
  luxe: LuxeProductCard,
  vibrant: VibrantProductCard,
  appliances: AppliancesProductCard,
  toys: ToysProductCard,
  software: SoftwareProductCard,
};

interface ThemePreviewProps {
  themeId: string;
  storeName?: string;
  className?: string;
}

const mockProduct = createMockProduct();

const ThemePreview: React.FC<ThemePreviewProps> = ({ 
  themeId, 
  storeName = 'متجري', 
  className = '' 
}) => {
  const theme = getThemeById(themeId);
  const ProductCardComponent = themeComponents[themeId as keyof typeof themeComponents] || themeComponents.minimal;

  const getThemeColors = (themeId: string) => {
    switch (themeId) {
      case 'minimal':
        return {
          primary: '#6366f1',
          secondary: '#1f2937',
          accent: '#06b6d4',
          background: '#ffffff',
          text: '#1f2937',
          border: '#e5e7eb'
        };
      case 'tech':
        return {
          primary: '#1e293b',
          secondary: '#0f172a',
          accent: '#3b82f6',
          background: '#0f172a',
          text: '#f8fafc',
          border: '#334155'
        };
      case 'modern':
        return {
          primary: '#7c3aed',
          secondary: '#1e1b4b',
          accent: '#a855f7',
          background: '#ffffff',
          text: '#1f2937',
          border: '#e5e7eb'
        };
      case 'luxe':
        return {
          primary: '#d4af37',
          secondary: '#1c1917',
          accent: '#f59e0b',
          background: '#fefdf8',
          text: '#1c1917',
          border: '#d6d3d1'
        };
      case 'vibrant':
        return {
          primary: '#ec4899',
          secondary: '#7c2d12',
          accent: '#06b6d4',
          background: '#ffffff',
          text: '#1f2937',
          border: '#e5e7eb'
        };
      default:
        return {
          primary: '#6366f1',
          secondary: '#1f2937',
          accent: '#06b6d4',
          background: '#ffffff',
          text: '#1f2937',
          border: '#e5e7eb'
        };
    }
  };

  const colors = getThemeColors(themeId);

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-secondary-900 rounded-lg shadow-lg overflow-hidden"
        style={{ backgroundColor: colors.background }}
      >
        {/* Theme Header */}
        <div 
          className="p-4 text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{storeName}</h3>
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-white/20 rounded-full"></div>
              <div className="w-6 h-6 bg-white/20 rounded-full"></div>
            </div>
          </div>
          <p className="text-sm opacity-90 mt-1">{theme.description}</p>
        </div>

        {/* Theme Content */}
        <div className="p-4" style={{ color: colors.text }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="scale-90 origin-top-left">
              <ProductCardComponent product={mockProduct} storeId="preview" />
            </div>
            <div className="hidden sm:block scale-90 origin-top-left">
              <ProductCardComponent 
                product={{
                  ...mockProduct,
                  id: '2',
                  name: 'منتج آخر',
                  price: 199,
                  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
                  images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop']
                }} 
                storeId="preview" 
              />
            </div>
          </div>

          {/* Theme Info */}
          <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{theme.name}</span>
              <span 
                className="px-2 py-1 rounded text-xs"
                style={{ 
                  backgroundColor: colors.accent + '20',
                  color: colors.accent 
                }}
              >
                {theme.category}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemePreview;
