import React from 'react';
import TechHeader from './TechHeader';
import TechFooter from './TechFooter';
import TechHero from './TechHero';
import TechProductCard from './TechProductCard';
import TechHomePage from './TechHomePage';
import TechProductsPage from './TechProductsPage';
import TechCartPage from './TechCartPage';
import TechCheckoutPage from './TechCheckoutPage';
import TechAccountPage from './TechAccountPage';
import TechCustomerServicePage from './TechCustomerServicePage';
import TechTrustSection from './TechTrustSection';
import TechAboutPage from './TechAboutPage';
import TechContactPage from './TechContactPage';
import TechProductDetailPage from './TechProductDetailPage';
import TechLoginPage from './TechLoginPage';
import TechSignupPage from './TechSignupPage';

interface TechThemeProps {
  children?: React.ReactNode;
  storeName?: string;
}

// Legacy wrapper component - now used only for backward compatibility
// New routing system uses DynamicThemeRoutes instead
const TechTheme: React.FC<TechThemeProps> = ({ 
  children, 
  storeName = "TechStore" 
}) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TechHeader storeName={storeName} />
      <div className="min-h-screen">
        {children}
      </div>
      <TechFooter storeName={storeName} />
    </div>
  );
};

export { 
  TechHeader, 
  TechFooter, 
  TechHero, 
  TechProductCard, 
  TechHomePage, 
  TechProductsPage, 
  TechCartPage,
  TechCheckoutPage,
  TechAccountPage,
  TechAboutPage, 
  TechContactPage, 
  TechProductDetailPage, 
  TechLoginPage, 
  TechSignupPage 
};
export default TechTheme;
