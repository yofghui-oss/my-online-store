import React from 'react';
import MinimalHeader from './MinimalHeader';
import MinimalFooter from './MinimalFooter';
import MinimalHero from './MinimalHero';
import MinimalProductCard from './MinimalProductCard';
import MinimalHomePage from './MinimalHomePage';
import MinimalProductsPage from './MinimalProductsPage';
import MinimalCartPage from './MinimalCartPage';
import MinimalCheckoutPage from './MinimalCheckoutPage';
import MinimalAccountPage from './MinimalAccountPage';
import MinimalCustomerServicePage from './MinimalCustomerServicePage';
import MinimalAboutPage from './MinimalAboutPage';
import MinimalContactPage from './MinimalContactPage';
import MinimalLoginPage from './MinimalLoginPage';
import MinimalSignupPage from './MinimalSignupPage';

interface MinimalThemeProps {
  children?: React.ReactNode;
  storeName?: string;
}

// Legacy wrapper component - now used only for backward compatibility
// New routing system uses DynamicThemeRoutes instead
const MinimalTheme: React.FC<MinimalThemeProps> = ({ 
  children, 
  storeName = "متجر الأناقة" 
}) => {
  return (
    <div className="min-h-screen bg-white">
      <MinimalHeader storeName={storeName} />
      <div className="min-h-screen">
        {children}
      </div>
      <MinimalFooter storeName={storeName} />
    </div>
  );
};

export { 
  MinimalHeader, 
  MinimalFooter, 
  MinimalHero, 
  MinimalProductCard, 
  MinimalHomePage,
  MinimalProductsPage,
  MinimalCartPage,
  MinimalCheckoutPage,
  MinimalAccountPage,
  MinimalAboutPage, 
  MinimalContactPage, 
  MinimalLoginPage, 
  MinimalSignupPage 
};
export default MinimalTheme;
