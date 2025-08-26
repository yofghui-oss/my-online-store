import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center ltr:mr-3 rtl:ml-3">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold">{t('header.storeBuilder')}</span>
            </div>
            <p className="text-secondary-300 mb-4">
              {t('footer.subtitle')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-secondary-300 hover:text-white transition-colors duration-200">{t('footer.links.home')}</Link></li>
              <li><Link to="/features" className="text-secondary-300 hover:text-white transition-colors duration-200">{t('footer.links.features')}</Link></li>
              <li><Link to="/pricing" className="text-secondary-300 hover:text-white transition-colors duration-200">{t('footer.links.pricing')}</Link></li>
              <li><Link to="/support" className="text-secondary-300 hover:text-white transition-colors duration-200">{t('footer.links.support')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-secondary-300 hover:text-white transition-colors duration-200">{t('footer.links.docs')}</Link></li>
              <li><Link to="/tutorials" className="text-secondary-300 hover:text-white transition-colors duration-200">{t('footer.links.tutorials')}</Link></li>
              <li><Link to="/blog" className="text-secondary-300 hover:text-white transition-colors duration-200">{t('footer.links.blog')}</Link></li>
              <li><Link to="/community" className="text-secondary-300 hover:text-white transition-colors duration-200">{t('footer.links.community')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactUs')}</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={16} className="ltr:mr-2 rtl:ml-2 text-primary-400" />
                <span className="text-secondary-300">info@storebuilder.sa</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="ltr:mr-2 rtl:ml-2 text-primary-400" />
                <span className="text-secondary-300">+966 50 123 4567</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="ltr:mr-2 rtl:ml-2 text-primary-400" />
                <span className="text-secondary-300">{t('footer.address')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 text-center">
          <p className="text-secondary-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
