import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { useTheme } from '../contexts/ThemeContext';
import DynamicThemeRoutes from '../utils/themeRouting';

// Import theme headers and footers for new themes
import { AppliancesHeader, AppliancesFooter } from '../components/themes/appliances';
import { ToysHeader, ToysFooter } from '../components/themes/toys';
import { SoftwareHeader, SoftwareFooter } from '../components/themes/software';

// Import legacy theme components for themes that use full wrappers
import MinimalTheme from '../components/themes/minimal';
import TechTheme from '../components/themes/tech';
import ModernTheme from '../components/themes/modern';
import LuxeTheme from '../components/themes/luxe';
import VibrantTheme from '../components/themes/vibrant';

// Legacy themes that still use full theme wrappers (will be migrated to new routing system)
const legacyThemeComponents = {
  // These will be gradually migrated to use DynamicThemeRoutes
};

// Themes that use the new unified routing system
const unifiedThemes = ['minimal', 'tech', 'modern', 'luxe', 'vibrant', 'appliances', 'toys', 'software'];

const themeHeaders = {
  appliances: AppliancesHeader,
  toys: ToysHeader,
  software: SoftwareHeader,
};

const themeFooters = {
  appliances: AppliancesFooter,
  toys: ToysFooter,
  software: SoftwareFooter,
};

const StorefrontLayout: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const { stores, setCurrentStore, currentStore } = useStore();
  const { setThemeId, currentTheme } = useTheme();

  useEffect(() => {
    const store = stores.find(s => s.id === storeId);
    if (store) {
      // Check for store-specific theme in localStorage first
      const persistedThemeId = localStorage.getItem(`store-${store.id}-theme`);
      const globalThemeId = localStorage.getItem('storeThemeId');
      
      let themeToUse = store.themeId;
      
      // Priority: store-specific theme > global theme > store default theme
      if (persistedThemeId) {
        themeToUse = persistedThemeId as any;
      } else if (globalThemeId) {
        themeToUse = globalThemeId as any;
      }
      
      // Update store and theme contexts
      const updatedStore = { ...store, themeId: themeToUse };
      setCurrentStore(updatedStore);
      setThemeId(themeToUse);
      
      // Ensure both localStorage keys are synchronized
      localStorage.setItem('storeThemeId', themeToUse);
      localStorage.setItem(`store-${store.id}-theme`, themeToUse);
    }
  }, [storeId, stores, setCurrentStore, setThemeId]);

  if (!currentStore || currentStore.id !== storeId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading store...</h2>
          <p className="text-gray-500">Please wait while we prepare your shopping experience</p>
        </div>
      </div>
    );
  }

  const themeId = currentStore.themeId || 'minimal';
  
  // Check if theme uses the new unified routing system
  if (unifiedThemes.includes(themeId)) {
    // For themes using header/footer pattern (appliances, toys, software)
    const HeaderComponent = themeHeaders[themeId as keyof typeof themeHeaders];
    const FooterComponent = themeFooters[themeId as keyof typeof themeFooters];
    
    if (HeaderComponent && FooterComponent) {
      return (
        <div className={`theme-${themeId} min-h-screen bg-gray-50`}>
          <HeaderComponent />
          <main className="min-h-screen">
            <DynamicThemeRoutes 
              themeId={themeId}
              storeName={currentStore.name}
              storeId={currentStore.id}
            />
          </main>
          <FooterComponent />
        </div>
      );
    }
    
    // For themes using integrated header/footer (minimal, tech, modern, luxe, vibrant)
    return (
      <div className={`theme-${themeId} min-h-screen`}>
        <DynamicThemeRoutes 
          themeId={themeId}
          storeName={currentStore.name}
          storeId={currentStore.id}
        />
      </div>
    );
  }

  // Fallback for unknown themes
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-red-600 mb-2">Theme Error</h2>
        <p className="text-gray-600 mb-4">Theme not found: {themeId}</p>
        <p className="text-sm text-gray-500">Please contact the store owner to resolve this issue</p>
      </div>
    </div>
  );
};

export default StorefrontLayout;
