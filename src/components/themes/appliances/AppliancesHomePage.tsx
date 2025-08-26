import React from 'react';
import AppliancesHero from './AppliancesHero';
import AppliancesTrustSection from './AppliancesTrustSection';
import { useStore } from '../../../contexts/StoreContext';
import AppliancesProductCard from './AppliancesProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AppliancesHomePage: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  return (
    <div className="min-h-screen">
      <AppliancesHero />
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Appliances</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our premium collection of energy-efficient home appliances
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <AppliancesProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <AppliancesTrustSection />
    </div>
  );
};

export default AppliancesHomePage;