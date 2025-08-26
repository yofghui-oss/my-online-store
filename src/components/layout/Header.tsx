import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, ShoppingCart, User, Menu, Languages } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useStore } from '../../contexts/StoreContext';
import Button from '../ui/Button';
import { useDirectionUtils } from '../../utils/directionUtils';

interface HeaderProps {
  isStorefront?: boolean;
  storeId?: string;
}

const Header: React.FC<HeaderProps> = ({ isStorefront = false, storeId }) => {
  const { theme, toggleTheme } = useTheme();
  const { cart, currentStore } = useStore();
  const { t, i18n } = useTranslation();
  const directionUtils = useDirectionUtils();
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  if (isStorefront && currentStore) {
    return (
      <header className="bg-white dark:bg-secondary-900 shadow-md border-b border-secondary-200 dark:border-secondary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to={`/store/${storeId}`} className="flex items-center">
                <img
                  src={currentStore.logo}
                  alt={currentStore.name}
                  className={`h-10 w-10 rounded-full ${directionUtils.marginEnd('3')}`}
                />
                <span className="text-xl font-bold text-secondary-900 dark:text-white">
                  {currentStore.name}
                </span>
              </Link>
            </div>

            <nav className={`hidden md:flex space-x-8 ${directionUtils.isRTL ? 'space-x-reverse' : ''}`}>
              <Link to={`/store/${storeId}`} className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
                {t('header.main')}
              </Link>
              <Link to={`/store/${storeId}/products`} className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
                {t('header.store.products')}
              </Link>
              <Link to={`/store/${storeId}/about`} className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
                {t('header.store.about')}
              </Link>
              <Link to={`/store/${storeId}/contact`} className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
                {t('header.contact')}
              </Link>
            </nav>

            <div className={`flex items-center space-x-4 ${directionUtils.isRTL ? 'space-x-reverse' : ''}`}>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              
              <button
                onClick={handleLanguageChange}
                className="p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
              >
                <Languages size={20} />
              </button>

              <Link to={`/store/${storeId}/cart`} className="relative p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className={`absolute -top-1 ${directionUtils.isRTL ? '-right-1' : '-left-1'} bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}>
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              <button className="p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800">
                <User size={20} />
              </button>

              <button className="md:hidden p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white dark:bg-secondary-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center ltr:mr-3 rtl:ml-3">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-secondary-900 dark:text-white">
                {t('header.storeBuilder')}
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
              {t('header.main')}
            </Link>
            <Link to="/features" className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
              {t('header.features')}
            </Link>
            <Link to="/pricing" className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
              {t('header.pricing')}
            </Link>
            <Link to="/contact" className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
              {t('header.contact')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Button onClick={handleLanguageChange} variant="ghost" size="sm" className="flex items-center gap-2">
              <Languages size={16} />
              {i18n.language === 'ar' ? t('header.toggle_en') : t('header.toggle_ar')}
            </Button>
            
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                {t('header.login')}
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button size="sm">
                {t('header.getStarted')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
