import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface MinimalHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  storeName?: string;
}

const MinimalHero: React.FC<MinimalHeroProps> = ({
  title = "أزياء عصرية وأنيقة",
  subtitle = "اكتشف مجموعتنا الجديدة من الأزياء العصرية والمريحة",
  ctaText = "تسوق الآن",
  onCtaClick
}) => {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {subtitle}
            </p>
            <button
              onClick={onCtaClick}
              className="inline-flex items-center bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 gap-2"
            >
              {ctaText}
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Fashion Collection"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-sm p-4 hidden lg:block">
              <div className="text-sm text-gray-600">تخفيضات تصل إلى</div>
              <div className="text-2xl font-bold text-gray-900">50%</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-sm p-4 hidden lg:block">
              <div className="text-sm text-gray-600">شحن مجاني</div>
              <div className="text-lg font-semibold text-gray-900">للطلبات +200 ر.س</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalHero;
