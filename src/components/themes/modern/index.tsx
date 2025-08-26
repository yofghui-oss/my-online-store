import React from 'react';
import ModernHeader from './ModernHeader';
import ModernFooter from './ModernFooter';
import ModernHeroSlider from './ModernHeroSlider';
import ModernProductCard from './ModernProductCard';
import ModernHomePage from './ModernHomePage';
import ModernProductsPage from './ModernProductsPage';
import ModernAboutPage from './ModernAboutPage';
import ModernContactPage from './ModernContactPage';
import ModernProductDetailPage from './ModernProductDetailPage';
import ModernLoginPage from './ModernLoginPage';
import ModernSignupPage from './ModernSignupPage';

interface ModernThemeProps {
  children?: React.ReactNode;
  storeName?: string;
}

// Legacy wrapper component - now used only for backward compatibility
// New routing system uses DynamicThemeRoutes instead
const ModernTheme: React.FC<ModernThemeProps> = ({ 
  children, 
  storeName = "متجر عصري" 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <ModernHeader />
      <div className="min-h-screen">
        {children}
      </div>
      <ModernFooter />
    </div>
  );
};

export { ModernHeader, ModernFooter, ModernHeroSlider, ModernProductCard, ModernHomePage, ModernProductsPage, ModernAboutPage, ModernContactPage, ModernProductDetailPage, ModernLoginPage, ModernSignupPage };
export default ModernTheme;