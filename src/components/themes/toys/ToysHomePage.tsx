import React from 'react';
import { ArrowRight, Star, Heart, Gift, Gamepad2, Palette } from 'lucide-react';
import { Product } from '../../../types';
import ToysProductCard from './ToysProductCard';

interface ToysHomePageProps {
  products: Product[];
  storeId: string;
  storeName?: string;
}

const ToysHomePage: React.FC<ToysHomePageProps> = ({
  products,
  storeId,
  storeName = "عالم الألعاب"
}) => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const funProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50">
      {/* Playful Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Fun Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-yellow-300 animate-bounce text-4xl">🎈</div>
          <div className="absolute top-20 right-20 text-pink-300 animate-pulse text-3xl">⭐</div>
          <div className="absolute bottom-20 left-20 text-blue-300 animate-bounce delay-300 text-5xl">🎁</div>
          <div className="absolute bottom-10 right-10 text-purple-300 animate-pulse delay-500 text-3xl">🎨</div>
          <div className="absolute top-1/2 left-1/4 text-green-300 animate-bounce delay-700 text-4xl">🚀</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Gift className="w-12 h-12 text-yellow-300 ml-4 animate-bounce" />
              <h1 className="text-4xl lg:text-6xl font-bold">
                {storeName}
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 text-purple-100">
              مكان السعادة والمرح - اكتشف أجمل الألعاب التي تجلب البهجة لأطفالك
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all transform shadow-xl">
              ابدأ المغامرة المرحة
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Fun Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl border-4 border-pink-200 transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-800">ألعاب آمنة</h3>
              <p className="text-purple-700 leading-relaxed">جميع ألعابنا مصنوعة من مواد آمنة ومعتمدة للأطفال</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl border-4 border-yellow-200 transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gamepad2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-800">تعليمية وممتعة</h3>
              <p className="text-orange-700 leading-relaxed">ألعاب تجمع بين المتعة والتعلم لتنمية مهارات طفلك</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl border-4 border-blue-200 transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-800">تنمية الإبداع</h3>
              <p className="text-blue-700 leading-relaxed">ألعاب تحفز الخيال والإبداع لدى الأطفال</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fun Products */}
      <section className="py-16 bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-500 ml-2 animate-spin" />
              <h2 className="text-4xl font-bold text-purple-800">الألعاب المفضلة</h2>
              <Gift className="w-8 h-8 text-pink-500 mr-2 animate-bounce" />
            </div>
            <p className="text-xl text-purple-700">أكثر الألعاب حباً وإعجاباً من الأطفال وأولياء الأمور</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ToysProductCard
                key={product.id}
                product={product}
                storeId={storeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Fun Arrivals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-800 mb-4">وصل حديثاً للمرح</h2>
            <p className="text-xl text-purple-700">أحدث الألعاب الممتعة والمثيرة لأطفالك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {funProducts.map((product) => (
              <ToysProductCard
                key={product.id}
                product={product}
                storeId={storeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fun Newsletter */}
      <section className="py-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white relative overflow-hidden">
        {/* Playful Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-blue-400/20 animate-pulse"></div>
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🎪</div>
          <div className="absolute bottom-10 right-10 text-5xl animate-pulse">🎠</div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Gift className="w-12 h-12 text-yellow-400 ml-4 animate-bounce" />
            <h2 className="text-4xl font-bold">انضم لنادي المرح</h2>
          </div>
          <p className="text-xl mb-8 text-purple-100">
            احصل على أحدث الألعاب والعروض الخاصة مباشرة في بريدك الإلكتروني
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 border-4 border-yellow-400"
            />
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all transform shadow-xl">
              انضم للمرح
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToysHomePage;
