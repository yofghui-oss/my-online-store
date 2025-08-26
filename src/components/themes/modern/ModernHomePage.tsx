import React from 'react';
import { ArrowRight, Star, Truck, Shield, HeadphonesIcon } from 'lucide-react';
import { Product } from '../../../types';
import ModernProductCard from './ModernProductCard';

interface ModernHomePageProps {
  products: Product[];
  storeId: string;
  storeName?: string;
}

const ModernHomePage: React.FC<ModernHomePageProps> = ({
  products,
  storeId,
  storeName = "متجر عصري"
}) => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const newProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              مرحباً بك في {storeName}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-purple-100">
              اكتشف مجموعة رائعة من المنتجات العصرية والأنيقة
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors">
              تسوق الآن
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">شحن مجاني</h3>
              <p className="text-gray-600">شحن مجاني لجميع الطلبات أكثر من 200 ريال</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ضمان الجودة</h3>
              <p className="text-gray-600">ضمان استرداد الأموال خلال 30 يوم</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">دعم 24/7</h3>
              <p className="text-gray-600">خدمة عملاء متاحة على مدار الساعة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">منتجات مميزة</h2>
            <p className="text-lg text-gray-600">اكتشف أفضل منتجاتنا المختارة خصيصاً لك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ModernProductCard
                key={product.id}
                product={product}
                storeId={storeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">وصل حديثاً</h2>
            <p className="text-lg text-gray-600">آخر المنتجات الجديدة في متجرنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ModernProductCard
                key={product.id}
                product={product}
                storeId={storeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">اشترك في النشرة الإخبارية</h2>
          <p className="text-xl mb-8 text-purple-100">
            احصل على آخر العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              اشترك
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernHomePage;
