import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Menu, X, Search, User, Zap, Flame, Rocket, Languages, Moon, Sun, Music, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../../contexts/StoreContext';
import { useTheme } from '../../../contexts/ThemeContext';

const VibrantHeader: React.FC = () => {
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
      {/* Vibrant Header */}
      <motion.header 
        initial={{ y: -100, rotateX: -90 }}
        animate={{ y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500 shadow-2xl" style={{ backgroundSize: '300% 100%', animation: 'gradient-x 6s ease infinite' }}
      >
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to={`/store/${storeId}`} className="group flex items-center">
                <div className="relative">
                  <motion.div 
                    className="absolute inset-0 bg-white rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                    <Zap className="text-white animate-pulse" size={28} />
                  </div>
                </div>
                <div className="ltr:ml-4 rtl:mr-4">
                  <h1 className="text-3xl font-black bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-lg">
                    {currentStore?.name}
                  </h1>
                  <div className="flex items-center text-white/90 text-sm font-bold">
                    <Flame size={14} className="ltr:mr-1 rtl:ml-1 animate-bounce" />
                    <span>متجر الأزياء الحيوي</span>
                    <Rocket size={14} className="ltr:ml-1 rtl:mr-1 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Center Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
              {[
                { name: 'الرئيسية', path: '', icon: Zap, color: 'from-yellow-400 to-orange-500' },
                { name: 'المنتجات', path: '/products', icon: Flame, color: 'from-pink-400 to-red-500' },
                { name: 'العروض النارية', path: '/offers', icon: Rocket, color: 'from-purple-400 to-blue-500' },
                { name: 'من نحن', path: '/about', icon: Music, color: 'from-green-400 to-teal-500' }
              ].map((item) => (
                <motion.div 
                  key={item.name} 
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    rotateZ: [0, -5, 5, 0]
                  }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link 
                    to={`/store/${storeId}${item.path}`} 
                    className="group relative flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl text-white font-bold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <item.icon size={18} className="relative ltr:mr-2 rtl:ml-2 group-hover:animate-spin" />
                    <span className="relative">{item.name}</span>
                    <motion.div 
                      className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl"
              >
                <Search size={20} />
              </motion.button>

              {/* User */}
              <motion.button
                whileHover={{ scale: 1.2, rotate: -360 }}
                whileTap={{ scale: 0.8 }}
                className="hidden md:flex p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl"
              >
                <User size={20} />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.2, rotateY: 180 }}
                whileTap={{ scale: 0.8 }}
                onClick={toggleTheme}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Language */}
              <motion.button
                whileHover={{ scale: 1.2, rotateX: 180 }}
                whileTap={{ scale: 0.8 }}
                onClick={handleLanguageChange}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl"
              >
                <Languages size={20} />
              </motion.button>

              {/* Login/Signup */}
              <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse">
                <Link to="/login">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium text-white hover:text-yellow-300 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    تسجيل الدخول
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200"
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
                  className="relative p-3 text-white hover:text-yellow-300 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart size={20} />
                  {cartItemsCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </div>
                  )}
                </motion.div>
              </Link>

              {/* Mobile Menu */}
              <motion.button
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
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
              initial={{ opacity: 0, height: 0, rotateX: -90 }}
              animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
              exit={{ opacity: 0, height: 0, rotateX: -90 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="border-t border-white/30 bg-white/10 backdrop-blur-md"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 transform -translate-y-1/2 text-white" size={24} />
                  <input
                    type="text"
                    placeholder="ابحث عن المنتجات الحيوية..."
                    className="w-full pl-14 rtl:pr-14 rtl:pl-6 pr-6 py-4 rounded-3xl border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:ring-4 focus:ring-white/50 focus:border-white/50 transition-all duration-300 font-bold text-lg"
                  />
                  <motion.div
                    className="absolute right-4 rtl:left-4 rtl:right-auto top-1/2 transform -translate-y-1/2"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    <Gamepad2 className="text-white/70" size={20} />
                  </motion.div>
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
            initial={{ opacity: 0, x: '100%', rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: '100%', rotateY: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 rtl:left-0 rtl:right-auto z-50 w-80 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 shadow-2xl lg:hidden backdrop-blur-xl border-l-4 border-white/30"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/30">
                <div className="flex items-center">
                  <Zap className="text-white ltr:mr-3 rtl:ml-3 animate-pulse" size={28} />
                  <h2 className="text-2xl font-black text-white">القائمة الحيوية</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full text-white hover:bg-white/20"
                >
                  <X size={28} />
                </motion.button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-6 py-6 space-y-3">
                {[
                  { name: 'الرئيسية', path: '', icon: Zap, color: 'from-yellow-400 to-orange-500' },
                  { name: 'المنتجات', path: '/products', icon: Flame, color: 'from-pink-400 to-red-500' },
                  { name: 'العروض النارية', path: '/offers', icon: Rocket, color: 'from-purple-400 to-blue-500' },
                  { name: 'من نحن', path: '/about', icon: Music, color: 'from-green-400 to-teal-500' },
                  { name: 'تواصل معنا', path: '/contact', icon: Gamepad2, color: 'from-indigo-400 to-purple-500' }
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 50, rotateY: 90 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Link
                      to={`/store/${storeId}${item.path}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center p-4 rounded-2xl text-white hover:bg-white/20 transition-all duration-300 font-bold text-lg border border-white/20 hover:border-white/40 backdrop-blur-sm"
                    >
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${item.color} ltr:mr-4 rtl:ml-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <item.icon size={24} className="text-white" />
                      </div>
                      <span className="group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform">{item.name}</span>
                      <motion.div 
                        className="ltr:ml-auto rtl:mr-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-white/30">
                <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm text-white border border-white/30"
                  >
                    <Search size={24} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: -360 }}
                    whileTap={{ scale: 0.8 }}
                    className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm text-white border border-white/30"
                  >
                    <User size={24} />
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

      {/* Custom CSS for gradient animation */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default VibrantHeader;
