import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Heart,
  Sparkles,
  Zap,
  ChevronDown,
  Grid3X3,
  Layers,
  Cpu,
  Languages
} from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';
import { useTheme } from '../../../contexts/ThemeContext';

const ModernHeader: React.FC = () => {
  const { storeId } = useParams();
  const { theme, toggleTheme } = useTheme();
  const { cart, currentStore } = useStore();
  const { i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      {/* Main Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-white via-gray-50 to-white dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 shadow-xl border-b border-gray-200/50 dark:border-secondary-700/50 sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-secondary-900/95"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to={`/store/${storeId}`} className="flex items-center group">
                <div className="relative">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <img 
                    src={currentStore?.logo} 
                    alt={currentStore?.name} 
                    className="relative h-14 w-14 rounded-full border-2 border-white shadow-lg ltr:mr-4 rtl:ml-4" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {currentStore?.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Sparkles size={12} className="ltr:mr-1 rtl:ml-1" />
                    متجر الأزياء الحصري
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
              {[
                { name: 'الرئيسية', path: '', icon: '🏠' },
                { name: 'المنتجات', path: '/products', icon: '👕' },
                { name: 'العروض', path: '/offers', icon: '🔥' },
                { name: 'من نحن', path: '/about', icon: '💎' }
              ].map((item) => (
                <motion.div key={item.name} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link 
                    to={`/store/${storeId}${item.path}`} 
                    className="group relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:bg-clip-text font-medium transition-all duration-300 flex items-center"
                  >
                    <span className="ltr:mr-2 rtl:ml-2">{item.icon}</span>
                    {item.name}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex p-3 rounded-xl bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Search size={20} />
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex p-3 rounded-xl bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Heart size={20} />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLanguageChange}
                className="p-3 rounded-xl bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Languages size={20} />
              </motion.button>

              {/* Login/Signup */}
              <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse">
                <Link to="/login">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    تسجيل الدخول
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    إنشاء حساب
                  </motion.button>
                </Link>
              </div>

              {/* Cart */}
              <Link to={`/store/${storeId}/cart`}>
                <motion.div
                  className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemsCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </div>
                  )}
                </motion.div>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-md"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-secondary-700 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-md"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="ابحث عن المنتجات..."
                    className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 rounded-xl border border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 rtl:left-0 rtl:right-auto z-50 w-80 bg-white dark:bg-secondary-900 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-secondary-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">القائمة</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-secondary-800"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-6 py-6 space-y-4">
                {[
                  { name: 'الرئيسية', path: '', icon: '🏠' },
                  { name: 'المنتجات', path: '/products', icon: '👕' },
                  { name: 'العروض', path: '/offers', icon: '🔥' },
                  { name: 'من نحن', path: '/about', icon: '💎' },
                  { name: 'المفضلة', path: '/wishlist', icon: '❤️' },
                  { name: 'الملف الشخصي', path: '/profile', icon: '👤' }
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/store/${storeId}${item.path}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center p-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 group"
                    >
                      <span className="text-2xl ltr:mr-4 rtl:ml-4 group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-secondary-700">
                <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-3 rounded-xl bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-300"
                  >
                    <Search size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-300"
                  >
                    <Heart size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernHeader;
