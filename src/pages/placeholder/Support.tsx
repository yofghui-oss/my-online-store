import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Phone, Mail, Clock, Search, BookOpen, Users, Headphones } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Support: React.FC = () => {
  const { t } = useTranslation();

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7 Available',
      color: 'text-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: 'Mon-Fri 9AM-6PM',
      color: 'text-green-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed questions',
      availability: 'Response within 24h',
      color: 'text-purple-500'
    },
    {
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'Browse our comprehensive guides',
      availability: 'Always Available',
      color: 'text-orange-500'
    }
  ];

  const quickLinks = [
    'Getting Started Guide',
    'Payment & Billing',
    'Store Customization',
    'Domain Setup',
    'SEO Optimization',
    'Mobile App Setup'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-secondary-50 dark:bg-secondary-900">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-secondary-900 dark:text-white mb-6">
                {t('support.title', 'How can we help you?')}
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8 max-w-3xl mx-auto">
                {t('support.subtitle', 'Get the support you need to succeed with your online store.')}
              </p>
              
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full pl-10 pr-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {supportOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <IconComponent className={`h-12 w-12 ${option.color} mx-auto mb-4`} />
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-300 mb-3">
                      {option.description}
                    </p>
                    <div className="flex items-center justify-center text-sm text-secondary-500 dark:text-secondary-400 mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      {option.availability}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Get Help
                    </Button>
                  </Card>
                );
              })}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                  Quick Links
                </h2>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block p-3 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </Card>
              
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary-500 mr-3" />
                    <span className="text-secondary-700 dark:text-secondary-300">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary-500 mr-3" />
                    <span className="text-secondary-700 dark:text-secondary-300">support@storebuilder.com</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary-500 mr-3" />
                    <span className="text-secondary-700 dark:text-secondary-300">Join our community forum</span>
                  </div>
                  <div className="flex items-center">
                    <Headphones className="h-5 w-5 text-primary-500 mr-3" />
                    <span className="text-secondary-700 dark:text-secondary-300">24/7 Live Chat Available</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="text-center mt-16">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
                Still need help?
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8">
                Our support team is here to help you succeed.
              </p>
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
