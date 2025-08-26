import React from 'react';
import { Shield, Lock, Truck, RotateCcw, Award, Users, CheckCircle, Star } from 'lucide-react';

interface MinimalTrustSectionProps {
  storeName?: string;
}

const MinimalTrustSection: React.FC<MinimalTrustSectionProps> = ({ 
  storeName = "متجر الأناقة" 
}) => {
  const trustFeatures = [
    {
      icon: Shield,
      title: 'حماية البيانات',
      description: 'معاملاتك محمية بتشفير SSL 256-bit',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Lock,
      title: 'دفع آمن',
      description: 'طرق دفع متعددة وآمنة 100%',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Truck,
      title: 'توصيل مضمون',
      description: 'توصيل سريع وآمن لجميع المناطق',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: RotateCcw,
      title: 'إرجاع مجاني',
      description: 'إرجاع واستبدال مجاني خلال 14 يوم',
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const paymentMethods = [
    { name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
    { name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
    { name: 'مدى', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Mada_Logo.svg/200px-Mada_Logo.svg.png' },
    { name: 'Apple Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg' }
  ];

  const certifications = [
    {
      icon: Award,
      title: 'شهادة الجودة',
      description: 'معتمد من هيئة التجارة السعودية'
    },
    {
      icon: Users,
      title: '+10,000 عميل راضي',
      description: 'ثقة آلاف العملاء في جودة خدماتنا'
    },
    {
      icon: Star,
      title: 'تقييم 4.8/5',
      description: 'تقييم ممتاز من عملائنا الكرام'
    }
  ];

  const testimonials = [
    {
      name: 'سارة أحمد',
      rating: 5,
      comment: 'خدمة ممتازة وتوصيل سريع. أنصح بالتسوق من هنا',
      location: 'الرياض'
    },
    {
      name: 'محمد علي',
      rating: 5,
      comment: 'جودة المنتجات عالية والأسعار مناسبة جداً',
      location: 'جدة'
    },
    {
      name: 'فاطمة خالد',
      rating: 5,
      comment: 'تعامل راقي وخدمة عملاء ممتازة',
      location: 'الدمام'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Features */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا تثق بنا؟</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نحن ملتزمون بتقديم أفضل تجربة تسوق آمنة وموثوقة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${feature.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg p-8 mb-16 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">طرق الدفع المتاحة</h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg min-w-[120px] h-16">
                <img
                  src={method.logo}
                  alt={method.name}
                  className="max-h-8 max-w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.textContent = method.name;
                  }}
                />
                <span className="hidden text-gray-700 font-medium"></span>
              </div>
            ))}
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg min-w-[120px] h-16">
              <span className="text-gray-700 font-medium">الدفع عند الاستلام</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            );
          })}
        </div>

        {/* Customer Testimonials */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">آراء عملائنا</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-green-600">
              <Shield className="h-6 w-6" />
              <span className="font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Lock className="h-6 w-6" />
              <span className="font-medium">256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <CheckCircle className="h-6 w-6" />
              <span className="font-medium">Verified Store</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalTrustSection;
