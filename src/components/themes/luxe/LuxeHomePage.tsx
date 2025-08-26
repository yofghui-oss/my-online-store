import React from 'react';
import { ArrowRight, Star, Crown, Shield, Gem } from 'lucide-react';
import { Product } from '../../../types';
import LuxeProductCard from './LuxeProductCard';

interface LuxeHomePageProps {
  products: Product[];
  storeId: string;
  storeName?: string;
}

const LuxeHomePage: React.FC<LuxeHomePageProps> = ({
  products,
  storeId,
  storeName = "متجر الفخامة"
}) => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const premiumProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-900 via-yellow-800 to-orange-900 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Crown className="w-12 h-12 text-yellow-400 ml-4" />
              <h1 className="text-4xl lg:text-6xl font-bold">
                {storeName}
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 text-amber-100">
              تجربة تسوق فاخرة لا مثيل لها مع أرقى المنتجات المختارة بعناية
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-8 py-4 rounded-full font-semibold text-lg hover:from-yellow-300 hover:to-amber-400 transition-all transform hover:scale-105">
              استكشف المجموعة الفاخرة
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Luxury Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gem className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-amber-900">منتجات حصرية</h3>
              <p className="text-amber-700 leading-relaxed">مجموعة مختارة من أرقى المنتجات الفاخرة والحصرية</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-amber-900">ضمان مدى الحياة</h3>
              <p className="text-amber-700 leading-relaxed">ضمان شامل وخدمة عملاء مميزة لراحة بالك</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-amber-900">خدمة VIP</h3>
              <p className="text-amber-700 leading-relaxed">تجربة تسوق شخصية ومميزة مع استشارة مجانية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Premium Products */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-500 ml-2" />
              <h2 className="text-4xl font-bold text-amber-900">المجموعة المميزة</h2>
            </div>
            <p className="text-xl text-amber-700">منتجات فاخرة مختارة بعناية لتناسب ذوقك الرفيع</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <LuxeProductCard
                key={product.id}
                product={product}
                storeId={storeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Luxury Arrivals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">وصل حديثاً</h2>
            <p className="text-xl text-amber-700">آخر إضافاتنا من المنتجات الفاخرة والحصرية</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumProducts.map((product) => (
              <LuxeProductCard
                key={product.id}
                product={product}
                storeId={storeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* VIP Membership */}
      <section className="py-16 bg-gradient-to-r from-amber-900 via-yellow-800 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">انضم لعضوية VIP</h2>
          <p className="text-xl mb-8 text-amber-100 leading-relaxed">
            احصل على وصول حصري للمنتجات الجديدة، خصومات خاصة، وخدمة عملاء مخصصة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 border-2 border-yellow-400"
            />
            <button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-8 py-4 rounded-full font-bold hover:from-yellow-300 hover:to-amber-400 transition-all transform hover:scale-105">
              انضم الآن
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LuxeHomePage;
