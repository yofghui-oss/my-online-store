import React from 'react';

// Import theme components
import MinimalTheme from '../themes/minimal';
import TechTheme from '../themes/tech';
import ModernTheme from '../themes/modern';
import LuxeTheme from '../themes/luxe';
import VibrantTheme from '../themes/vibrant';

interface PreviewProps {
  themeId: 'minimal' | 'tech' | 'modern' | 'luxe' | 'vibrant';
  storeName?: string;
}

const themeComponents = {
  minimal: MinimalTheme,
  tech: TechTheme,
  modern: ModernTheme,
  luxe: LuxeTheme,
  vibrant: VibrantTheme,
};

// Full theme preview component
export const ThemePreview: React.FC<PreviewProps> = ({ themeId, storeName = 'متجر تجريبي' }) => {
  const ThemeComponent = themeComponents[themeId];
  
  if (!ThemeComponent) {
    return <div>Theme not found</div>;
  }

  return (
    <div className="w-full h-full overflow-auto">
      <ThemeComponent storeName={storeName}>
        <div className="min-h-screen">
          {/* This will render the theme's home page */}
        </div>
      </ThemeComponent>
    </div>
  );
};

interface LegacyPreviewProps {
  themeSettings: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
  };
}

export const PreviewHeader: React.FC<LegacyPreviewProps> = ({ themeSettings }) => (
  <header style={{ backgroundColor: themeSettings.colors.secondary, color: themeSettings.colors.background }} className="p-4 flex justify-between items-center">
    <h1 className="font-bold text-lg">My Store</h1>
    <div className="flex gap-4">
      <span>Home</span>
      <span>Products</span>
      <span>About</span>
    </div>
  </header>
);

export const PreviewHero: React.FC<LegacyPreviewProps> = ({ themeSettings }) => (
  <section style={{ backgroundColor: themeSettings.colors.primary, color: themeSettings.colors.background }} className="p-10 text-center">
    <h2 className="text-4xl font-bold mb-4">Welcome to Our Store</h2>
    <p className="mb-6">Find the best products here</p>
    <button style={{ backgroundColor: themeSettings.colors.accent, color: themeSettings.colors.background }} className="px-6 py-2 rounded font-semibold">Shop Now</button>
  </section>
);

export const PreviewCategories: React.FC<LegacyPreviewProps> = ({ themeSettings }) => (
  <section style={{ backgroundColor: themeSettings.colors.background, color: themeSettings.colors.text }} className="p-8">
    <h3 className="text-2xl font-bold text-center mb-6">Categories</h3>
    <div className="grid grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ backgroundColor: themeSettings.colors.secondary }} className="h-24 rounded-lg opacity-20"></div>
      ))}
    </div>
  </section>
);

export const PreviewFeaturedProducts: React.FC<LegacyPreviewProps> = ({ themeSettings }) => (
  <section style={{ backgroundColor: themeSettings.colors.background, color: themeSettings.colors.text }} className="p-8">
    <h3 className="text-2xl font-bold text-center mb-6">Featured Products</h3>
    <div className="grid grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="border rounded-lg p-2" style={{ borderColor: themeSettings.colors.secondary }}>
          <div style={{ backgroundColor: themeSettings.colors.secondary }} className="h-24 rounded-lg mb-2 opacity-20"></div>
          <p className="font-semibold">Product {i + 1}</p>
          <p style={{ color: themeSettings.colors.primary }} className="font-bold">$99.99</p>
        </div>
      ))}
    </div>
  </section>
);

export const PreviewNewsletter: React.FC<LegacyPreviewProps> = ({ themeSettings }) => (
  <section style={{ backgroundColor: themeSettings.colors.secondary, color: themeSettings.colors.background }} className="p-10 text-center">
    <h3 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h3>
    <div className="flex justify-center">
      <input type="email" placeholder="Your email" className="p-2 rounded-l-md text-black" />
      <button style={{ backgroundColor: themeSettings.colors.primary }} className="px-4 py-2 rounded-r-md font-semibold">Subscribe</button>
    </div>
  </section>
);

export const PreviewFooter: React.FC<LegacyPreviewProps> = ({ themeSettings }) => (
  <footer style={{ backgroundColor: '#333', color: 'white' }} className="p-8 text-center">
    © 2025 My Store. All rights reserved.
  </footer>
);
