import React from 'react';
import LuxeHeader from './LuxeHeader';
import LuxeFooter from './LuxeFooter';
import LuxeHomeBanner from './LuxeHomeBanner';
import LuxeHeroSlider from './LuxeHeroSlider';
import LuxeCollections from './LuxeCollections';
import LuxeVipPortal from './LuxeVipPortal';
import LuxeProductCard from './LuxeProductCard';
import LuxeCartPage from './LuxeCartPage';
import LuxeCheckoutPage from './LuxeCheckoutPage';
import LuxeProductPage from './LuxeProductPage';
import LuxeHomePage from './LuxeHomePage';
import LuxeProductsPage from './LuxeProductsPage';
import LuxeAboutPage from './LuxeAboutPage';
import LuxeContactPage from './LuxeContactPage';
import LuxeProductDetailPage from './LuxeProductDetailPage';
import LuxeLoginPage from './LuxeLoginPage';
import LuxeSignupPage from './LuxeSignupPage';

interface LuxeThemeProps {
  storeName?: string;
  children?: React.ReactNode;
}

// Legacy wrapper component - now used only for backward compatibility
// New routing system uses DynamicThemeRoutes instead
const LuxeTheme: React.FC<LuxeThemeProps> = ({ 
  storeName = "بوتيك فاخر",
  children 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <LuxeHeader />
      <div className="min-h-screen">
        {children}
      </div>
      <LuxeFooter />
    </div>
  );
};

export { 
  LuxeHeader,
  LuxeFooter,
  LuxeHeroSlider,
  LuxeProductCard,
  LuxeHomePage,
  LuxeProductsPage,
  LuxeAboutPage,
  LuxeContactPage,
  LuxeProductDetailPage,
  LuxeLoginPage,
  LuxeSignupPage,
  LuxeCartPage,
  LuxeCheckoutPage,
  LuxeCollections,
  LuxeVipPortal
};
export default LuxeTheme;
