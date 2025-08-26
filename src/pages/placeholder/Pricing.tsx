import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Star, Zap, Crown } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      description: 'Perfect for small businesses just getting started',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        'Up to 100 products',
        '1 online store',
        'Basic templates',
        'SSL certificate',
        'Mobile responsive',
        'Basic analytics',
        'Email support',
        '2% transaction fee'
      ],
      popular: false,
      color: 'text-blue-500'
    },
    {
      name: 'Professional',
      icon: Star,
      description: 'Ideal for growing businesses with advanced needs',
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        'Up to 1,000 products',
        '3 online stores',
        'Premium templates',
        'Custom domain',
        'Advanced analytics',
        'Inventory management',
        'Priority support',
        '1.5% transaction fee',
        'Abandoned cart recovery',
        'SEO tools'
      ],
      popular: true,
      color: 'text-purple-500'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      description: 'For large businesses with complex requirements',
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        'Unlimited products',
        'Unlimited stores',
        'Custom themes',
        'White-label solution',
        'Advanced integrations',
        'Multi-language support',
        '24/7 phone support',
        '1% transaction fee',
        'Custom reporting',
        'API access',
        'Dedicated account manager'
      ],
      popular: false,
      color: 'text-gold-500'
    }
  ];

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - annual;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-secondary-50 dark:bg-secondary-900">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              {t('pricing.title', 'Simple, Transparent Pricing')}
            </h1>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-12 max-w-3xl mx-auto">
              {t('pricing.subtitle', 'Choose the perfect plan for your business. Start free, upgrade when you need to.')}
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span className={`text-lg ${!isAnnual ? 'text-primary-600 font-semibold' : 'text-secondary-500'}`}>
                {t('pricing.monthly', 'Monthly')}
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`mx-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-primary-600' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${isAnnual ? 'text-primary-600 font-semibold' : 'text-secondary-500'}`}>
                {t('pricing.annual', 'Annual')}
              </span>
              {isAnnual && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {t('pricing.save', 'Save up to 17%')}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => {
                const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
                const savings = calculateSavings(plan.monthlyPrice, plan.annualPrice);
                
                return (
                  <Card 
                    key={index} 
                    className={`relative p-8 ${
                      plan.popular 
                        ? 'ring-2 ring-primary-500 shadow-xl scale-105' 
                        : 'hover:shadow-lg'
                    } transition-all duration-300`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          {t('pricing.popular', 'Most Popular')}
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <plan.icon className={`h-12 w-12 ${plan.color} mx-auto mb-4`} />
                      <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                        {plan.description}
                      </p>
                      
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-secondary-900 dark:text-white">
                          ${price}
                        </span>
                        <span className="text-secondary-600 dark:text-secondary-300">
                          /{isAnnual ? t('pricing.year', 'year') : t('pricing.month', 'month')}
                        </span>
                      </div>
                      
                      {isAnnual && (
                        <p className="text-sm text-green-600 font-medium">
                          {t('pricing.saveAmount', `Save $${savings.savings} (${savings.percentage}%)`)}
                        </p>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-secondary-700 dark:text-secondary-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                          : 'bg-secondary-100 hover:bg-secondary-200 text-secondary-900'
                      }`}
                      size="lg"
                    >
                      {t('pricing.getStarted', 'Get Started')}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-white dark:bg-secondary-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-secondary-900 dark:text-white mb-12">
              {t('pricing.faq.title', 'Frequently Asked Questions')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {t('pricing.faq.trial.question', 'Is there a free trial?')}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  {t('pricing.faq.trial.answer', 'Yes! All plans come with a 14-day free trial. No credit card required.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {t('pricing.faq.cancel.question', 'Can I cancel anytime?')}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  {t('pricing.faq.cancel.answer', 'Absolutely. You can cancel your subscription at any time with no cancellation fees.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {t('pricing.faq.upgrade.question', 'Can I upgrade or downgrade?')}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  {t('pricing.faq.upgrade.answer', 'Yes, you can change your plan at any time. Changes take effect immediately.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {t('pricing.faq.support.question', 'What support is included?')}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  {t('pricing.faq.support.answer', 'All plans include support. Higher tiers get priority and phone support.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary-600 dark:bg-primary-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('pricing.cta.title', 'Ready to Start Selling?')}
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              {t('pricing.cta.subtitle', 'Join thousands of merchants already using our platform to grow their business.')}
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-primary-50">
              {t('pricing.cta.start', 'Start Your Free Trial')}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
