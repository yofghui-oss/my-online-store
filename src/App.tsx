import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './contexts/ThemeContext';
import { StoreProvider } from './contexts/StoreContext';
import { LandingPageProvider } from './contexts/LandingPageContext';
import StorefrontLayout from './layouts/StorefrontLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SubscriberSignup from './pages/SubscriberSignup';
import Dashboard from './pages/Dashboard';
import SubscriberDashboard from './pages/SubscriberDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import POS from './pages/POS';
import StorefrontHome from './pages/storefront/StorefrontHome';
import ProductDetails from './pages/storefront/ProductDetails';
import Cart from './pages/storefront/Cart';
import Checkout from './pages/storefront/Checkout';

// Placeholder Pages
import Features from './pages/placeholder/Features';
import Pricing from './pages/placeholder/Pricing';
import Contact from './pages/placeholder/Contact';
import Docs from './pages/placeholder/Docs';
import Blog from './pages/placeholder/Blog';
import Community from './pages/placeholder/Community';
import Support from './pages/placeholder/Support';
import StorefrontProducts from './pages/storefront/StorefrontProducts';
import StorefrontAbout from './pages/storefront/StorefrontAbout';
import StorefrontContact from './pages/storefront/StorefrontContact';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const { t } = i18n;
    const dir = t('direction', { defaultValue: i18n.language === 'ar' ? 'rtl' : 'ltr' });
    const lang = i18n.language;
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.className = dir === 'rtl' ? 'font-arabic' : 'font-english';
  }, [i18n.language, i18n]);

  return (
    <ThemeProvider>
      <StoreProvider>
        <LandingPageProvider>
          <Router>
            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 transition-colors duration-300">
              <Routes>
                {/* Main Site Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/subscriber/signup" element={<SubscriberSignup />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/community" element={<Community />} />
                <Route path="/support" element={<Support />} />

                {/* Dashboard Routes */}
                <Route path="/dashboard/*" element={<Dashboard />} />
                
                {/* Subscriber Dashboard Routes */}
                <Route path="/subscriber/dashboard" element={<SubscriberDashboard />} />
                
                {/* POS Route */}
                <Route path="/pos/:storeId" element={<POS />} />

                {/* Super Admin Routes */}
                <Route path="/super-admin/*" element={<SuperAdminDashboard />} />

                {/* Storefront Routes */}
                <Route path="/store/:storeId" element={<StorefrontLayout />}>
                  <Route index element={<StorefrontHome />} />
                  <Route path="products" element={<StorefrontProducts />} />
                  <Route path="product/:productId" element={<ProductDetails />} />
                  <Route path="about" element={<StorefrontAbout />} />
                  <Route path="contact" element={<StorefrontContact />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                </Route>
              </Routes>
              <Toaster 
                position="top-center"
                toastOptions={{
                  duration: 3000,
                  style: {
                    fontFamily: i18n.language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
            </div>
          </Router>
        </LandingPageProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
