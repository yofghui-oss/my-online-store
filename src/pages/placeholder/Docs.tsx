import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book, Search, FileText, Video, Download, ExternalLink } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Docs: React.FC = () => {
  const { t } = useTranslation();

  const docCategories = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of setting up your online store',
      articles: ['Quick Start Guide', 'Account Setup', 'First Store Creation', 'Basic Configuration'],
      color: 'text-blue-500'
    },
    {
      icon: FileText,
      title: 'Store Management',
      description: 'Manage products, orders, and customers effectively',
      articles: ['Product Management', 'Order Processing', 'Customer Management', 'Inventory Tracking'],
      color: 'text-green-500'
    },
    {
      icon: Video,
      title: 'Theme Customization',
      description: 'Customize your store design and layout',
      articles: ['Theme Builder', 'Custom CSS', 'Mobile Optimization', 'Brand Customization'],
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-secondary-50 dark:bg-secondary-900">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              {t('docs.title', 'Documentation')}
            </h1>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-12 max-w-3xl mx-auto">
              {t('docs.subtitle', 'Everything you need to know to build and manage your online store successfully.')}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
              <input
                type="text"
                placeholder={t('docs.search', 'Search documentation...')}
                className="w-full pl-12 pr-4 py-4 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-secondary-800 dark:border-secondary-600 dark:text-white text-lg"
              />
            </div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {docCategories.map((category, index) => (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow duration-300">
                  <category.icon className={`h-12 w-12 ${category.color} mb-6`} />
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    {category.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex} className="flex items-center text-secondary-700 dark:text-secondary-300">
                        <FileText className="h-4 w-4 mr-2 text-secondary-400" />
                        <span className="hover:text-primary-600 cursor-pointer">{article}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    {t('docs.viewAll', 'View All Articles')}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-20 px-4 bg-white dark:bg-secondary-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-secondary-900 dark:text-white mb-12">
              {t('docs.quickLinks.title', 'Quick Links')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-6 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <Download className="h-6 w-6 text-primary-500" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white">
                      {t('docs.quickLinks.api', 'API Documentation')}
                    </h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-300">
                      {t('docs.quickLinks.apiDesc', 'Complete API reference and examples')}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-secondary-400" />
              </div>
              
              <div className="flex items-center justify-between p-6 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <Video className="h-6 w-6 text-primary-500" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white">
                      {t('docs.quickLinks.tutorials', 'Video Tutorials')}
                    </h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-300">
                      {t('docs.quickLinks.tutorialsDesc', 'Step-by-step video guides')}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-secondary-400" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Docs;
