import React from 'react';
import { ArrowRight, Star, Heart, Gift } from 'lucide-react';

interface ToysHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const ToysHero: React.FC<ToysHeroProps> = ({
  title = "عالم الألعاب المثير",
  subtitle = "اكتشف أجمل الألعاب التي تجلب البهجة والمرح لأطفالك",
  ctaText = "تسوق الآن",
  onCtaClick
}) => {
  return (
    <div className="relative bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-pink-300 animate-bounce">
          <Star className="w-8 h-8" />
        </div>
        <div className="absolute top-20 right-20 text-yellow-300 animate-pulse">
          <Heart className="w-6 h-6" />
        </div>
        <div className="absolute bottom-20 left-20 text-blue-300 animate-bounce delay-300">
          <Gift className="w-10 h-10" />
        </div>
        <div className="absolute bottom-10 right-10 text-purple-300 animate-pulse delay-500">
          <Star className="w-7 h-7" />
        </div>
        
        {/* Fun Shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-yellow-200 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {subtitle}
            </p>
            
            {/* Fun Stats */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-8 mb-8">
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-center gap-1 text-pink-500 mb-1">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold text-2xl">4.9</span>
                </div>
                <div className="text-sm text-gray-600">تقييم الأطفال</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                  <Heart className="w-5 h-5 fill-current" />
                  <span className="font-bold text-2xl">1000+</span>
                </div>
                <div className="text-sm text-gray-600">لعبة مميزة</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-center gap-1 text-purple-500 mb-1">
                  <Gift className="w-5 h-5" />
                  <span className="font-bold text-2xl">50K+</span>
                </div>
                <div className="text-sm text-gray-600">طفل سعيد</div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative">
              {/* Main Toy Display */}
              <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {/* Toy Icons */}
                  <div className="bg-pink-100 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
                    <div className="text-4xl mb-2">🧸</div>
                    <div className="text-sm font-medium text-gray-700">دمى</div>
                  </div>
                  <div className="bg-blue-100 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
                    <div className="text-4xl mb-2">🚗</div>
                    <div className="text-sm font-medium text-gray-700">سيارات</div>
                  </div>
                  <div className="bg-yellow-100 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
                    <div className="text-4xl mb-2">🎨</div>
                    <div className="text-sm font-medium text-gray-700">فنون</div>
                  </div>
                  <div className="bg-green-100 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
                    <div className="text-4xl mb-2">🎲</div>
                    <div className="text-sm font-medium text-gray-700">ألعاب</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-pink-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute top-1/2 -left-6 bg-yellow-500 text-white p-2 rounded-full shadow-lg animate-bounce delay-200">
                <Gift className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToysHero;
