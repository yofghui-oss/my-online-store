import React from 'react';
import { ArrowRight, Download, Star, Users } from 'lucide-react';

interface SoftwareHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const SoftwareHero: React.FC<SoftwareHeroProps> = ({
  title = "حلول البرمجيات المتقدمة",
  subtitle = "اكتشف أحدث البرامج والتطبيقات التي تساعدك على تحقيق أهدافك",
  ctaText = "استكشف المنتجات",
  onCtaClick
}) => {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {subtitle}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-8 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">4.9</span>
                </div>
                <div className="text-sm text-gray-400">تقييم المستخدمين</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                  <Users className="w-5 h-5" />
                  <span className="font-bold">50K+</span>
                </div>
                <div className="text-sm text-gray-400">مستخدم نشط</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                  <Download className="w-5 h-5" />
                  <span className="font-bold">1M+</span>
                </div>
                <div className="text-sm text-gray-400">تحميل</div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              {/* Code Editor Mockup */}
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 bg-gray-700 px-4 py-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm mr-4">main.js</span>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="text-purple-400">function</div>
                  <div className="text-blue-400 mr-2">createApp</div>
                  <div className="text-gray-300">() {'{'}</div>
                  <div className="text-green-400 mr-4">// بناء التطبيق</div>
                  <div className="text-yellow-400 mr-4">return app;</div>
                  <div className="text-gray-300">{'}'}</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
                <Download className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-lg shadow-lg animate-pulse">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareHero;
