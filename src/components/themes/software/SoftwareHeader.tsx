import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Code,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Laptop,
  Download,
  HelpCircle
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useStore } from '../../../contexts/StoreContext';

interface SoftwareHeaderProps {}

const SoftwareHeader: React.FC<SoftwareHeaderProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { store } = useStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/store/${store?.id}/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: t('development_tools'), icon: <Code className="mr-2" size={18} />, link: `/store/${store?.id}/category/development-tools` },
    { name: t('databases'), icon: <Database className="mr-2" size={18} />, link: `/store/${store?.id}/category/databases` },
    { name: t('cloud_services'), icon: <Cloud className="mr-2" size={18} />, link: `/store/${store?.id}/category/cloud-services` },
    { name: t('security_software'), icon: <Shield className="mr-2" size={18} />, link: `/store/${store?.id}/category/security` },
    { name: t('mobile_apps'), icon: <Smartphone className="mr-2" size={18} />, link: `/store/${store?.id}/category/mobile-apps` },
    { name: t('desktop_software'), icon: <Laptop className="mr-2" size={18} />, link: `/store/${store?.id}/category/desktop-software` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-indigo-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Link to={`/store/${store?.id}/downloads`} className="flex items-center hover:text-indigo-200 transition-colors">
              <Download size={14} className="mr-1" />
              {t('downloads')}
            </Link>
            <Link to={`/store/${store?.id}/support`} className="flex items-center hover:text-indigo-200 transition-colors">
              <HelpCircle size={14} className="mr-1" />
              {t('support')}
            </Link>
          </div>
          <div className="w-full md:w-auto text-center md:text-left">
            <span>{t('software_promo_message')}</span>
          </div>
          <div className="hidden md:block">
            <Link to={`/store/${store?.id}/login`} className="hover:text-indigo-200 transition-colors">
              {t('login')} / {t('register')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={`/store/${store?.id}`} className="flex items-center">
              <div className="flex items-center">
                <Code className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
                  {store?.name || t('software_store')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <Link to={`/store/${store?.id}`} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                {t('home')}
              </Link>
              <div className="relative">
                <button 
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  {t('categories')}
                  <ChevronDown size={16} className="ml-1" />
                </button>
                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50"
                      onMouseLeave={() => setIsCategoryOpen(false)}
                    >
                      {categories.map((category, index) => (
                        <Link
                          key={index}
                          to={category.link}
                          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {category.icon}
                          {category.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to={`/store/${store?.id}/products`} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                {t('all_products')}
              </Link>
              <Link to={`/store/${store?.id}/pricing`} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                {t('pricing')}
              </Link>
              <Link to={`/store/${store?.id}/about`} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                {t('about')}
              </Link>
              <Link to={`/store/${store?.id}/contact`} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                {t('contact')}
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                to={`/store/${store?.id}/cart`}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
              </Link>
              <Link
                to={`/store/${store?.id}/account`}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden md:block"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors md:hidden"
                aria-label="Menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 w-full max-w-2xl mx-4 rounded-lg shadow-xl overflow-hidden"
            >
              <div className="relative">
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search_placeholder')}
                    className="w-full py-4 px-4 text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none text-lg"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors mr-2"
                  >
                    {t('search')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-2"
                  >
                    <X size={24} />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 shadow-xl overflow-y-auto"
            >
              <div className="p-4 border-b dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Code className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <span className="ml-2 font-semibold text-gray-800 dark:text-white">
                      {store?.name || t('software_store')}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              <nav className="p-4">
                <ul className="space-y-4">
                  <li>
                    <Link
                      to={`/store/${store?.id}`}
                      className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('home')}
                    </Link>
                  </li>
                  <li>
                    <div className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <button 
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className="flex items-center w-full text-left"
                      >
                        {t('categories')}
                        <ChevronDown size={16} className="ml-1" />
                      </button>
                    </div>
                    <AnimatePresence>
                      {isCategoryOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-2 ml-4 space-y-2 overflow-hidden"
                        >
                          {categories.map((category, index) => (
                            <li key={index}>
                              <Link
                                to={category.link}
                                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {category.icon}
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                  <li>
                    <Link
                      to={`/store/${store?.id}/products`}
                      className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('all_products')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/store/${store?.id}/pricing`}
                      className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('pricing')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/store/${store?.id}/about`}
                      className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('about')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/store/${store?.id}/contact`}
                      className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('contact')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/store/${store?.id}/downloads`}
                      className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('downloads')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/store/${store?.id}/support`}
                      className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('support')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/store/${store?.id}/account`}
                      className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('account')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/store/${store?.id}/login`}
                      className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('login')} / {t('register')}
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SoftwareHeader;