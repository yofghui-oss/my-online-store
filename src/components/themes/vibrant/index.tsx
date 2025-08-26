import React from 'react';
import VibrantHeader from './VibrantHeader';
import VibrantFooter from './VibrantFooter';
import VibrantHomeBanner from './VibrantHomeBanner';
import VibrantHeroSlider from './VibrantHeroSlider';
import VibrantSocialTrending from './VibrantSocialTrending';
import VibrantGameHub from './VibrantGameHub';
import VibrantProductCard from './VibrantProductCard';
import VibrantCartPage from './VibrantCartPage';
import VibrantCheckoutPage from './VibrantCheckoutPage';
import VibrantProductPage from './VibrantProductPage';
import VibrantHomePage from './VibrantHomePage';
import VibrantProductsPage from './VibrantProductsPage';
import VibrantAboutPage from './VibrantAboutPage';
import VibrantContactPage from './VibrantContactPage';
import VibrantProductDetailPage from './VibrantProductDetailPage';
import VibrantLoginPage from './VibrantLoginPage';
import VibrantSignupPage from './VibrantSignupPage';

interface VibrantThemeProps {
  storeName?: string;
  children?: React.ReactNode;
}

// Legacy wrapper component - now used only for backward compatibility
// New routing system uses DynamicThemeRoutes instead
const VibrantTheme: React.FC<VibrantThemeProps> = ({ 
  storeName = "متجر حيوي",
  children 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      <VibrantHeader />
      <div className="min-h-screen">
        {children}
      </div>
      <VibrantFooter />
    </div>
  );
};

export {
  VibrantHeader,
  VibrantFooter,
  VibrantHeroSlider,
  VibrantProductCard,
  VibrantHomePage,
  VibrantProductsPage,
  VibrantAboutPage,
  VibrantContactPage,
  VibrantProductDetailPage,
  VibrantLoginPage,
  VibrantSignupPage,
  VibrantCartPage,
  VibrantCheckoutPage,
  VibrantSocialTrending,
  VibrantGameHub
};
export default VibrantTheme;
