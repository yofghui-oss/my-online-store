import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

interface ModernHomeBannerProps {
  storeId: string;
}

const ModernHomeBanner: React.FC<ModernHomeBannerProps> = ({ storeId }) => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900 dark:to-secondary-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 md:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* New Collection Tag */}
            <motion.div 
              className="inline-flex items-center bg-white dark:bg-secondary-800 rounded-full px-4 py-1 mb-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles size={16} className="text-primary-500 mr-2" />
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                {t('new_collection')}
              </span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="block">{t('modern_banner_heading_1')}</span>
              <span className="block text-primary-600 dark:text-primary-400">
                {t('modern_banner_heading_2')}
              </span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-lg text-secondary-700 dark:text-secondary-300 mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {t('modern_banner_description')}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link 
                to={`/store/${storeId}/products`}
                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors shadow-md hover:shadow-lg flex items-center"
              >
                {t('shop_now')}
                <ArrowRight size={16} className="ml-2" />
              </Link>
              
              <Link 
                to={`/store/${storeId}/collections/new-arrivals`}
                className="px-8 py-3 bg-white dark:bg-secondary-800 hover:bg-gray-100 dark:hover:bg-secondary-700 text-secondary-900 dark:text-white font-medium rounded-md border border-gray-200 dark:border-secondary-700 transition-colors"
              >
                {t('new_arrivals')}
              </Link>
            </motion.div>
            
            {/* Trending Tag */}
            <motion.div 
              className="mt-8 flex items-center text-sm text-secondary-600 dark:text-secondary-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <TrendingUp size={16} className="mr-2 text-primary-500" />
              {t('trending_styles_2023')}
            </motion.div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Image */}
              <img 
                src="https://via.placeholder.com/600x800?text=Fashion+Model"
                alt="Fashion Collection"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              
              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-5 -left-5 bg-white dark:bg-secondary-800 rounded-full p-4 shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-600">30%</div>
                  <div className="text-xs text-secondary-600 dark:text-secondary-400">{t('off')}</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-5 -right-5 bg-white dark:bg-secondary-800 rounded-full p-4 shadow-lg"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-xs text-secondary-600 dark:text-secondary-400">{t('new')}</div>
                  <div className="text-sm font-bold text-secondary-900 dark:text-white">{t('arrivals')}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernHomeBanner;