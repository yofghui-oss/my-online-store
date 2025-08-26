import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all theme components
import {
  MinimalAboutPage,
  MinimalContactPage,
  MinimalLoginPage,
  MinimalSignupPage,
  MinimalProductsPage,
  MinimalCartPage,
  MinimalCheckoutPage,
  MinimalAccountPage,
  MinimalHomePage
} from '../components/themes/minimal';

import {
  TechAboutPage,
  TechContactPage,
  TechLoginPage,
  TechSignupPage,
  TechProductsPage,
  TechCartPage,
  TechCheckoutPage,
  TechAccountPage,
  TechHomePage,
  TechProductDetailPage
} from '../components/themes/tech';

import {
  ModernAboutPage,
  ModernContactPage,
  ModernLoginPage,
  ModernSignupPage,
  ModernProductsPage,
  ModernHomePage,
  ModernProductDetailPage
} from '../components/themes/modern';

import {
  LuxeAboutPage,
  LuxeContactPage,
  LuxeLoginPage,
  LuxeSignupPage,
  LuxeProductsPage,
  LuxeHomePage,
  LuxeProductDetailPage,
  LuxeCollections,
  LuxeVipPortal,
  LuxeCartPage,
  LuxeCheckoutPage
} from '../components/themes/luxe';

import {
  VibrantAboutPage,
  VibrantContactPage,
  VibrantLoginPage,
  VibrantSignupPage,
  VibrantProductsPage,
  VibrantHomePage,
  VibrantProductDetailPage,
  VibrantCartPage,
  VibrantCheckoutPage,
  VibrantGameHub,
  VibrantSocialTrending
} from '../components/themes/vibrant';

import {
  AppliancesAboutPage,
  AppliancesContactPage,
  AppliancesLoginPage,
  AppliancesSignupPage,
  AppliancesProductsPage,
  AppliancesHomePage,
  AppliancesCartPage,
  AppliancesCheckoutPage,
  AppliancesAccountPage
} from '../components/themes/appliances';

import {
  ToysAboutPage,
  ToysContactPage,
  ToysLoginPage,
  ToysSignupPage,
  ToysProductsPage,
  ToysHomePage,
  ToysCartPage,
  ToysCheckoutPage,
  ToysAccountPage
} from '../components/themes/toys';

import {
  SoftwareAboutPage,
  SoftwareContactPage,
  SoftwareLoginPage,
  SoftwareSignupPage,
  SoftwareProductsPage,
  SoftwareHomePage,
  SoftwareCartPage,
  SoftwareCheckoutPage,
  SoftwareAccountPage
} from '../components/themes/software';

// Fallback components for missing pages
import StorefrontProducts from '../pages/storefront/StorefrontProducts';
import StorefrontHome from '../pages/storefront/StorefrontHome';
import ProductDetails from '../pages/storefront/ProductDetails';
import Cart from '../pages/storefront/Cart';
import Checkout from '../pages/storefront/Checkout';

interface ThemeRoutes {
  home?: React.ComponentType<any>;
  products?: React.ComponentType<any>;
  productDetail?: React.ComponentType<any>;
  about?: React.ComponentType<any>;
  contact?: React.ComponentType<any>;
  login?: React.ComponentType<any>;
  signup?: React.ComponentType<any>;
  cart?: React.ComponentType<any>;
  checkout?: React.ComponentType<any>;
  account?: React.ComponentType<any>;
  // Special routes for specific themes
  collections?: React.ComponentType<any>;
  vip?: React.ComponentType<any>;
  gameHub?: React.ComponentType<any>;
  socialTrending?: React.ComponentType<any>;
}

// Define all theme routes
const themeRoutes: Record<string, ThemeRoutes> = {
  minimal: {
    home: MinimalHomePage,
    products: MinimalProductsPage,
    about: MinimalAboutPage,
    contact: MinimalContactPage,
    login: MinimalLoginPage,
    signup: MinimalSignupPage,
    cart: MinimalCartPage,
    checkout: MinimalCheckoutPage,
    account: MinimalAccountPage,
  },
  tech: {
    home: TechHomePage,
    products: TechProductsPage,
    productDetail: TechProductDetailPage,
    about: TechAboutPage,
    contact: TechContactPage,
    login: TechLoginPage,
    signup: TechSignupPage,
    cart: TechCartPage,
    checkout: TechCheckoutPage,
    account: TechAccountPage,
  },
  modern: {
    home: ModernHomePage,
    products: ModernProductsPage,
    productDetail: ModernProductDetailPage,
    about: ModernAboutPage,
    contact: ModernContactPage,
    login: ModernLoginPage,
    signup: ModernSignupPage,
  },
  luxe: {
    home: LuxeHomePage,
    products: LuxeProductsPage,
    productDetail: LuxeProductDetailPage,
    about: LuxeAboutPage,
    contact: LuxeContactPage,
    login: LuxeLoginPage,
    signup: LuxeSignupPage,
    cart: LuxeCartPage,
    checkout: LuxeCheckoutPage,
    collections: LuxeCollections,
    vip: LuxeVipPortal,
  },
  vibrant: {
    home: VibrantHomePage,
    products: VibrantProductsPage,
    productDetail: VibrantProductDetailPage,
    about: VibrantAboutPage,
    contact: VibrantContactPage,
    login: VibrantLoginPage,
    signup: VibrantSignupPage,
    cart: VibrantCartPage,
    checkout: VibrantCheckoutPage,
    gameHub: VibrantGameHub,
    socialTrending: VibrantSocialTrending,
  },
  appliances: {
    home: AppliancesHomePage,
    products: AppliancesProductsPage,
    about: AppliancesAboutPage,
    contact: AppliancesContactPage,
    login: AppliancesLoginPage,
    signup: AppliancesSignupPage,
    cart: AppliancesCartPage,
    checkout: AppliancesCheckoutPage,
    account: AppliancesAccountPage,
  },
  toys: {
    home: ToysHomePage,
    products: ToysProductsPage,
    about: ToysAboutPage,
    contact: ToysContactPage,
    login: ToysLoginPage,
    signup: ToysSignupPage,
    cart: ToysCartPage,
    checkout: ToysCheckoutPage,
    account: ToysAccountPage,
  },
  software: {
    home: SoftwareHomePage,
    products: SoftwareProductsPage,
    about: SoftwareAboutPage,
    contact: SoftwareContactPage,
    login: SoftwareLoginPage,
    signup: SoftwareSignupPage,
    cart: SoftwareCartPage,
    checkout: SoftwareCheckoutPage,
    account: SoftwareAccountPage,
  },
};

interface DynamicThemeRoutesProps {
  themeId: string;
  storeName?: string;
  storeId?: string;
}

const DynamicThemeRoutes: React.FC<DynamicThemeRoutesProps> = ({
  themeId,
  storeName,
  storeId
}) => {
  const routes = themeRoutes[themeId] || {};

  // Common props for all components
  const commonProps = {
    storeName,
    storeId,
  };

  return (
    <Routes>
      {/* Home Page */}
      <Route 
        index 
        element={
          routes.home ? 
            <routes.home {...commonProps} /> : 
            <StorefrontHome />
        } 
      />

      {/* Products Page */}
      <Route 
        path="products" 
        element={
          routes.products ? 
            <routes.products {...commonProps} /> : 
            <StorefrontProducts />
        } 
      />

      {/* Product Detail Page */}
      <Route 
        path="product/:productId" 
        element={
          routes.productDetail ? 
            <routes.productDetail {...commonProps} /> : 
            <ProductDetails />
        } 
      />

      {/* About Page */}
      <Route 
        path="about" 
        element={
          routes.about ? 
            <routes.about {...commonProps} /> : 
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">من نحن</h1>
                <p className="text-gray-600">صفحة من نحن لثيم {themeId} قيد التطوير</p>
              </div>
            </div>
        } 
      />

      {/* Contact Page */}
      <Route 
        path="contact" 
        element={
          routes.contact ? 
            <routes.contact {...commonProps} /> : 
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">تواصل معنا</h1>
                <p className="text-gray-600">صفحة التواصل لثيم {themeId} قيد التطوير</p>
              </div>
            </div>
        } 
      />

      {/* Login Page */}
      <Route 
        path="login" 
        element={
          routes.login ? 
            <routes.login {...commonProps} /> : 
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">تسجيل الدخول</h1>
                <p className="text-gray-600">صفحة تسجيل الدخول لثيم {themeId} قيد التطوير</p>
              </div>
            </div>
        } 
      />

      {/* Signup Page */}
      <Route 
        path="signup" 
        element={
          routes.signup ? 
            <routes.signup {...commonProps} /> : 
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">إنشاء حساب</h1>
                <p className="text-gray-600">صفحة إنشاء الحساب لثيم {themeId} قيد التطوير</p>
              </div>
            </div>
        } 
      />

      {/* Cart Page */}
      <Route 
        path="cart" 
        element={
          routes.cart ? 
            <routes.cart {...commonProps} /> : 
            <Cart />
        } 
      />

      {/* Checkout Page */}
      <Route 
        path="checkout" 
        element={
          routes.checkout ? 
            <routes.checkout {...commonProps} /> : 
            <Checkout />
        } 
      />

      {/* Account Page */}
      <Route 
        path="account" 
        element={
          routes.account ? 
            <routes.account {...commonProps} /> : 
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">حسابي</h1>
                <p className="text-gray-600">صفحة الحساب لثيم {themeId} قيد التطوير</p>
              </div>
            </div>
        } 
      />

      {/* Special Routes for Specific Themes */}
      
      {/* Luxe theme special routes */}
      {routes.collections && (
        <Route path="collections" element={<routes.collections {...commonProps} />} />
      )}
      {routes.collections && (
        <Route path="collections/:collectionId" element={<routes.collections {...commonProps} />} />
      )}
      {routes.vip && (
        <Route path="vip" element={<routes.vip {...commonProps} />} />
      )}
      {routes.vip && (
        <Route path="vip/*" element={<routes.vip {...commonProps} />} />
      )}

      {/* Vibrant theme special routes */}
      {routes.gameHub && (
        <Route path="gamehub" element={<routes.gameHub {...commonProps} />} />
      )}
      {routes.gameHub && (
        <Route path="challenges" element={<routes.gameHub {...commonProps} />} />
      )}
      {routes.gameHub && (
        <Route path="rewards" element={<routes.gameHub {...commonProps} />} />
      )}
      {routes.socialTrending && (
        <Route path="social" element={<routes.socialTrending {...commonProps} />} />
      )}
      {routes.socialTrending && (
        <Route path="trending" element={<routes.socialTrending {...commonProps} />} />
      )}

      {/* Fallback route */}
      <Route 
        path="*" 
        element={
          routes.home ? 
            <routes.home {...commonProps} /> : 
            <StorefrontHome />
        } 
      />
    </Routes>
  );
};

export default DynamicThemeRoutes;
export { themeRoutes };