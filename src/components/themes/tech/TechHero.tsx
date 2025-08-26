import React from 'react';
import { ArrowLeft, Zap, Shield, Truck } from 'lucide-react';

interface TechHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const TechHero: React.FC<TechHeroProps> = ({
  title = "أحدث التقنيات في متناول يدك",
  subtitle = "اكتشف مجموعة واسعة من المنتجات التقنية المتطورة بأفضل الأسعار",
  ctaText = "تسوق الآن",
  onCtaClick
}) => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 lg:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {subtitle}
            </p>
            <button
              onClick={onCtaClick}
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors duration-200 gap-2"
            >
              {ctaText}
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-2">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-sm text-slate-300">أداء سريع</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-2">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-sm text-slate-300">ضمان شامل</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-2">
                  <Truck className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-sm text-slate-300">شحن سريع</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden border border-slate-600">
              <img
                src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Tech Products"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-slate-800 border border-slate-600 rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="text-sm text-slate-300">خصم حتى</div>
              <div className="text-2xl font-bold text-blue-400">40%</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-slate-800 border border-slate-600 rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="text-sm text-slate-300">شحن مجاني</div>
              <div className="text-lg font-semibold text-white">للطلبات +500 ر.س</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechHero;
