import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Store, 
  ShoppingCart, 
  CreditCard, 
  BarChart3, 
  Palette, 
  Globe, 
  Shield, 
  Smartphone,
  Users,
  Package,
  Truck,
  MessageCircle
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Store,
      title: 'Store Builder',
      description: 'Create beautiful online stores with our drag-and-drop builder. No coding required.',
      color: 'text-blue-500'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Platform',
      description: 'Full-featured e-commerce with inventory management, order tracking, and more.',
      color: 'text-green-500'
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Accept payments worldwide with integrated payment gateways and secure transactions.',
      color: 'text-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Track sales, monitor performance, and make data-driven decisions with detailed analytics.',
      color: 'text-orange-500'
    },
    {
      icon: Palette,
      title: 'Custom Themes',
      description: 'Choose from beautiful themes or create your own with our advanced theme builder.',
      color: 'text-pink-500'
    },
    {
      icon: Globe,
      title: 'Multi-language',
      description: 'Reach global customers with built-in multi-language support and RTL layouts.',
      color: 'text-indigo-500'
    },
    {
      icon: Shield,
      title: 'Security & SSL',
      description: 'Enterprise-grade security with SSL certificates and PCI compliance included.',
      color: 'text-red-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'All stores are fully responsive and optimized for mobile shopping experiences.',
      color: 'text-cyan-500'
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Manage customers, track orders, and build lasting relationships with CRM tools.',
      color: 'text-emerald-500'
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track stock levels, manage variants, and automate inventory updates.',
      color: 'text-amber-500'
    },
    {
      icon: Truck,
      title: 'Shipping Integration',
      description: 'Connect with major shipping providers for real-time rates and tracking.',
      color: 'text-teal-500'
    },
    {
      icon: MessageCircle,
      title: '24/7 Support',
      description: 'Get help when you need it with our dedicated support team and knowledge base.',
      color: 'text-violet-500'
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
              {t('features.title', 'Powerful Features for Your Online Store')}
            </h1>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-12 max-w-3xl mx-auto">
              {t('features.subtitle', 'Everything you need to build, manage, and grow your online business. From store creation to advanced analytics, we\'ve got you covered.')}
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow duration-300">
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-6`} />
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary-600 dark:bg-primary-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('features.cta.title', 'Ready to Build Your Store?')}
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              {t('features.cta.subtitle', 'Join thousands of merchants who trust our platform to power their online stores.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-primary-50">
                {t('features.cta.startFree', 'Start Free Trial')}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                {t('features.cta.viewDemo', 'View Demo')}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
