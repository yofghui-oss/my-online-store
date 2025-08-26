import React from 'react';
import { Shield, Lock, Truck, RotateCcw, Award, Users, CheckCircle, Star, Zap, Cpu, Monitor } from 'lucide-react';

interface TechTrustSectionProps {
  storeName?: string;
}

const TechTrustSection: React.FC<TechTrustSectionProps> = ({ 
  storeName = "TechStore" 
}) => {
  const trustFeatures = [
    {
      icon: Shield,
      title: 'حماية متقدمة',
      description: 'تشفير عسكري وحماية بيانات متطورة',
      color: 'from-green-600 to-emerald-600'
    },
    {
      icon: Lock,
      title: 'دفع آمن 100%',
      description: 'معاملات مشفرة ومحمية بأحدث التقنيات',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Truck,
      title: 'توصيل وتركيب',
      description: 'توصيل سريع مع تركيب مجاني متخصص',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: RotateCcw,
      title: 'ضمان شامل',
      description: 'إرجاع مجاني وضمان يصل إلى 3 سنوات',
      color: 'from-orange-600 to-red-600'
    }
  ];

  const paymentMethods = [
    { name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
    { name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
    { name: 'مدى', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Mada_Logo.svg/200px-Mada_Logo.svg.png' },
    { name: 'Apple Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg' },
    { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' }
  ];

  const certifications = [
    {
      icon: Award,
      title: 'شريك معتمد',
      description: 'وكيل معتمد لأكبر الشركات التقنية العالمية'
    },
    {
      icon: Users,
      title: '+50,000 عميل تقني',
      description: 'ثقة آلاف المطورين والمهندسين'
    },
    {
      icon: Star,
      title: 'تقييم 4.9/5',
      description: 'أعلى تقييم في مجال التقنية'
    }
  ];

  const techTestimonials = [
    {
      name: 'م. خالد السعيد',
      rating: 5,
      comment: 'أفضل متجر تقني! خدمة الدعم الفني ممتازة والمنتجات أصلية 100%',
      location: 'الرياض',
      profession: 'مهندس برمجيات'
    },
    {
      name: 'د. فاطمة أحمد',
      rating: 5,
      comment: 'تركيب احترافي وضمان شامل. أنصح به لكل المهتمين بالتقنية',
      location: 'جدة',
      profession: 'أستاذة علوم حاسوب'
    },
    {
      name: 'أحمد التقني',
      rating: 5,
      comment: 'أسعار منافسة وجودة عالية. الدعم الفني متاح 24/7',
      location: 'الدمام',
      profession: 'مطور تطبيقات'
    }
  ];

  const techPartners = [
    { name: 'Intel', logo: 'Intel' },
    { name: 'AMD', logo: 'AMD' },
    { name: 'NVIDIA', logo: 'NVIDIA' },
    { name: 'Apple', logo: 'Apple' },
    { name: 'Samsung', logo: 'Samsung' },
    { name: 'Dell', logo: 'Dell' }
  ];

  return (
    <div className="bg-gray-900 py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Features */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Zap className="h-8 w-8 text-blue-400" />
            لماذا نحن الأفضل تقنياً؟
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            نحن ملتزمون بتقديم أفضل تجربة تقنية آمنة وموثوقة مع أحدث المعايير العالمية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${feature.color}`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Tech Partners */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 text-center flex items-center justify-center gap-2">
            <Cpu className="h-6 w-6 text-blue-400" />
            شركاؤنا التقنيون
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techPartners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <span className="text-white font-semibold text-sm">{partner.logo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">طرق الدفع الآمنة</h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-gray-700 rounded-lg min-w-[120px] h-16 hover:bg-gray-600 transition-colors">
                <span className="text-white font-medium">{method.name}</span>
              </div>
            ))}
            <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg min-w-[120px] h-16">
              <span className="text-white font-medium">الدفع عند الاستلام</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-center hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{cert.title}</h3>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </div>
            );
          })}
        </div>

        {/* Customer Testimonials */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-16">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">آراء خبراء التقنية</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techTestimonials.map((testimonial, index) => (
              <div key={index} className="text-center bg-gray-700 rounded-lg p-6 border border-gray-600">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-blue-400">{testimonial.profession}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Guarantees */}
        <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-lg border border-blue-500/30 p-8 mb-16">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center flex items-center justify-center gap-2">
            <Monitor className="h-6 w-6 text-blue-400" />
            ضماناتنا التقنية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">3 سنوات</div>
              <div className="text-sm text-blue-300">ضمان شامل</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-blue-300">دعم فني</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">مجاني</div>
              <div className="text-sm text-blue-300">تركيب وإعداد</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-sm text-blue-300">منتجات أصلية</div>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-green-400">
              <Shield className="h-6 w-6" />
              <span className="font-medium">SSL 256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Lock className="h-6 w-6" />
              <span className="font-medium">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <CheckCircle className="h-6 w-6" />
              <span className="font-medium">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Zap className="h-6 w-6" />
              <span className="font-medium">Tech Verified Store</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechTrustSection;
