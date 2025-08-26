import React from 'react';
import { Shield, Truck, Headphones, Award, Zap, Wrench } from 'lucide-react';

const AppliancesTrustSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: '2 Year Warranty',
      description: 'Comprehensive warranty coverage on all appliances'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery and installation on orders over 500 SAR'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support and assistance'
    },
    {
      icon: Award,
      title: 'Quality Certified',
      description: 'All products are quality tested and certified'
    },
    {
      icon: Zap,
      title: 'Energy Efficient',
      description: 'High energy efficiency ratings to save on bills'
    },
    {
      icon: Wrench,
      title: 'Professional Installation',
      description: 'Expert installation and setup services available'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Products Available' },
    { number: '25+', label: 'Top Brands' },
    { number: '99%', label: 'Customer Satisfaction' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Trusted by thousands of customers across Saudi Arabia for quality appliances and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppliancesTrustSection;