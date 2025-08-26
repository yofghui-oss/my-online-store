import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Menu, X, Search, User, Crown, Diamond, Star, Languages, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../../contexts/StoreContext';
import { useTheme } from '../../../contexts/ThemeContext';

const LuxeHeader: React.FC = () => {
  const { storeId } = useParams();
  const { cart, currentStore } = useStore();
  const { theme, toggleTheme } = useTheme();
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
      {/* Luxe Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 via-white to-amber-50 dark:from-amber-900/20 dark:via-gray-900 dark:to-amber-900/20 backdrop-blur-xl border-b border-amber-200/30 dark:border-amber-700/30 shadow-2xl"
      >
        {/* Top Luxury Bar */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center text-sm font-medium">
              <Crown size={16} className="ltr:mr-2 rtl:ml-2" />
              <span className="flex items-center">
                توصيل مجاني للطلبات أكثر من 1000 ريال
                <Diamond size={14} className="ltr:ml-2 rtl:mr-2 animate-pulse" />
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center space-x-12 rtl:space-x-reverse">
              {[
                { name: 'الرئيسية', path: '', icon: Crown },
                { name: 'المجموعة الفاخرة', path: '/products', icon: Diamond },
                { name: 'العروض الحصرية', path: '/offers', icon: Star }
              ].map((item) => (
                <motion.div key={item.name} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link 
                    to={`/store/${storeId}${item.path}`} 
                    className="group relative flex items-center font-serif text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 font-medium"
                  >
                    <item.icon size={18} className="ltr:mr-2 rtl:ml-2 group-hover:scale-110 transition-transform" />
                    {item.name}
                    <motion.div 
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Center Logo */}
            <motion.div 
              className="flex-1 lg:flex-none text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to={`/store/${storeId}`} className="group inline-block">
                <div className="relative">
                  <motion.div 
                    className="absolute -inset-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative flex flex-col items-center">
                    <h1 className="text-3xl lg:text-4xl font-bold font-serif bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 dark:from-amber-300 dark:via-yellow-200 dark:to-amber-300 bg-clip-text text-transparent tracking-wider">
                      {currentStore?.name}
                    </h1>
                    <div className="flex items-center mt-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                      <Diamond size={10} className="ltr:mr-1 rtl:ml-1" />
                      <span>متجر الأزياء الفاخرة</span>
                      <Diamond size={10} className="ltr:ml-1 rtl:mr-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Search size={20} />
              </motion.button>

              {/* User Account */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <User size={20} />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Language */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLanguageChange}
                className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Languages size={20} />
              </motion.button>

              {/* Login/Signup */}
              <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse">
                <Link to="/login">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    تسجيل الدخول
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-200"
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
                  className="relative p-3 text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart size={20} />
                  {cartItemsCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </div>
                  )}
                </motion.div>
              </Link>

              {/* Mobile Menu */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-all duration-300 shadow-lg"
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
              className="border-t border-amber-200/30 dark:border-amber-700/30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="relative max-w-lg mx-auto">
                  <Search className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 transform -translate-y-1/2 text-amber-500" size={20} />
                  <input
                    type="text"
                    placeholder="ابحث في مجموعتنا الفاخرة..."
                    className="w-full pl-12 rtl:pr-12 rtl:pl-4 pr-4 py-4 rounded-2xl border-2 border-amber-200 dark:border-amber-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 font-serif"
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
            className="fixed inset-y-0 right-0 rtl:left-0 rtl:right-auto z-50 w-80 bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-900 backdrop-blur-xl shadow-2xl lg:hidden border-l border-amber-200/30 dark:border-amber-700/30"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-amber-200/30 dark:border-amber-700/30">
                <div className="flex items-center">
                  <Crown className="text-amber-600 ltr:mr-2 rtl:ml-2" size={24} />
                  <h2 className="text-xl font-bold font-serif text-amber-800 dark:text-amber-200">القائمة الفاخرة</h2>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-6 py-6 space-y-2">
                {[
                  { name: 'الرئيسية', path: '', icon: Crown },
                  { name: 'المجموعة الفاخرة', path: '/products', icon: Diamond },
                  { name: 'العروض الحصرية', path: '/offers', icon: Star },
                  { name: 'قصتنا', path: '/about', icon: User },
                  { name: 'تواصل معنا', path: '/contact', icon: Crown }
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
                      className="flex items-center p-4 rounded-2xl text-amber-800 dark:text-amber-200 hover:bg-gradient-to-r hover:from-amber-100 hover:to-yellow-50 dark:hover:from-amber-900/30 dark:hover:to-yellow-900/20 transition-all duration-300 group font-serif"
                    >
                      <item.icon size={20} className="ltr:mr-4 rtl:ml-4 group-hover:scale-110 transition-transform text-amber-600" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-amber-200/30 dark:border-amber-700/30">
                <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                  >
                    <Search size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                  >
                    <User size={20} />
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

export default LuxeHeader;
