import React from 'react';
import { ArrowRight, Star, Zap, Music, Gamepad2, Rocket } from 'lucide-react';
import { Product } from '../../../types';
import VibrantProductCard from './VibrantProductCard';

interface VibrantHomePageProps {
  products: Product[];
  storeId: string;
  storeName?: string;
}

const VibrantHomePage: React.FC<VibrantHomePageProps> = ({
  products,
  storeId,
  storeName = "متجر الألوان"
}) => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const trendingProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Dynamic Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-70 animate-bounce"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400 rounded-full opacity-50 animate-bounce delay-300"></div>
          <div className="absolute bottom-10 right-10 w-18 h-18 bg-green-400 rounded-full opacity-60 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-12 h-12 text-yellow-400 ml-4 animate-pulse" />
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                {storeName}
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 text-purple-100">
              عالم مليء بالألوان والطاقة الإيجابية - اكتشف منتجات تضفي البهجة على حياتك
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all transform shadow-xl animate-pulse">
              ابدأ المغامرة الملونة
              <Rocket className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Energetic Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl border-4 border-pink-200 transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Music className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-800">تجربة ممتعة</h3>
              <p className="text-purple-700 leading-relaxed">تسوق مليء بالمرح والإثارة مع تجربة تفاعلية مميزة</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl border-4 border-blue-200 transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Gamepad2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-800">منتجات عصرية</h3>
              <p className="text-blue-700 leading-relaxed">أحدث الصيحات والترندات الشبابية العالمية</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl border-4 border-yellow-200 transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce delay-200">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-800">توصيل سريع</h3>
              <p className="text-orange-700 leading-relaxed">توصيل فائق السرعة لتحصل على منتجاتك بأسرع وقت</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-500 ml-2 animate-spin" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">المنتجات الرائجة</h2>
            </div>
            <p className="text-xl text-purple-700">أكثر المنتجات طلباً وإعجاباً من عملائنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <VibrantProductCard
                key={product.id}
                product={product}
                storeId={storeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Energetic Arrivals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">وصل حديثاً</h2>
            <p className="text-xl text-gray-700">أحدث المنتجات الملونة والعصرية</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <VibrantProductCard
                key={product.id}
                product={product}
                storeId={storeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Colorful Newsletter */}
      <section className="py-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-blue-400/20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Zap className="w-12 h-12 text-yellow-400 ml-4 animate-bounce" />
            <h2 className="text-4xl font-bold">انضم لعائلة الألوان</h2>
          </div>
          <p className="text-xl mb-8 text-purple-100">
            احصل على أحدث العروض والمنتجات الملونة مباشرة في بريدك الإلكتروني
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 border-4 border-yellow-400"
            />
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all transform shadow-xl">
              انضم الآن
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VibrantHomePage;
