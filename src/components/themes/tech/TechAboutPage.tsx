import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, Shield, Headphones, Star, Users, Award } from 'lucide-react';

interface TechAboutPageProps {
  storeName?: string;
}

const TechAboutPage: React.FC<TechAboutPageProps> = ({ 
  storeName = "تك زون للإلكترونيات" 
}) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: "أحدث التقنيات",
      description: "نقدم أحدث المنتجات التقنية والإلكترونية من أفضل الشركات العالمية"
    },
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      title: "ضمان شامل",
      description: "جميع منتجاتنا تأتي مع ضمان شامل وخدمة ما بعد البيع المتميزة"
    },
    {
      icon: <Headphones className="w-12 h-12 text-purple-600" />,
      title: "دعم فني 24/7",
      description: "فريق الدعم الفني متاح على مدار الساعة لمساعدتك في أي استفسار"
    }
  ];

  const stats = [
    { number: "10,000+", label: "عميل راضٍ" },
    { number: "5,000+", label: "منتج متوفر" },
    { number: "99%", label: "رضا العملاء" },
    { number: "24/7", label: "دعم فني" }
  ];

  const teamMembers = [
    {
      name: "أحمد محمد",
      role: "مدير تقني",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      description: "خبير في التقنيات الحديثة مع أكثر من 10 سنوات من الخبرة"
    },
    {
      name: "فاطمة أحمد",
      role: "مختصة في خدمة العملاء",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      description: "متخصصة في تقديم أفضل خدمة للعملاء وحل مشاكلهم التقنية"
    },
    {
      name: "سالم العلي",
      role: "مهندس بيانات",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: "مختص في حلول البيانات والذكاء الاصطناعي"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            من نحن
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            نحن {storeName}، وجهتك الأولى للحصول على أحدث التقنيات والأجهزة الإلكترونية 
            بأفضل الأسعار وأعلى جودة في الخدمة
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  بدأت رحلتنا في عام 2015 برؤية واضحة: جعل أحدث التقنيات متاحة للجميع 
                  بأسعار معقولة وجودة عالية. منذ ذلك الحين، نمت شركتنا لتصبح واحدة من 
                  أكبر متاجر الإلكترونيات في المنطقة.
                </p>
                <p>
                  نحن نؤمن بأن التكنولوجيا يجب أن تجعل الحياة أسهل وأكثر إنتاجية. 
                  لذلك نختار منتجاتنا بعناية فائقة ونقدم النصح والإرشاد لعملائنا 
                  لاختيار ما يناسب احتياجاتهم.
                </p>
                <p>
                  اليوم، نخدم آلاف العملاء الراضين ونواصل الابتكار والتطوير لنبقى 
                  في المقدمة ونقدم أفضل تجربة تسوق تقنية.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop" 
                alt="متجر الإلكترونيات" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop" 
                alt="أحدث التقنيات" 
                className="rounded-lg shadow-lg mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=200&fit=crop" 
                alt="خدمة العملاء" 
                className="rounded-lg shadow-lg -mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=300&h=200&fit=crop" 
                alt="فريق العمل" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختارنا؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نقدم تجربة تسوق متميزة تجمع بين أحدث التقنيات وأفضل خدمة عملاء
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              إنجازاتنا بالأرقام
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              فريق العمل
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نفتخر بفريق عمل متخصص ومتفانٍ في تقديم أفضل خدمة لعملائنا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Star className="w-8 h-8 text-blue-600 ml-3" />
                <h3 className="text-2xl font-bold text-gray-900">رسالتنا</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                نهدف إلى تمكين عملائنا من خلال توفير أحدث التقنيات والحلول الإلكترونية 
                المبتكرة التي تلبي احتياجاتهم وتحسن من جودة حياتهم اليومية، مع تقديم 
                خدمة عملاء استثنائية وقيمة حقيقية.
              </p>
            </div>
            
            <div className="bg-purple-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-purple-600 ml-3" />
                <h3 className="text-2xl font-bold text-gray-900">رؤيتنا</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                أن نكون الوجهة الأولى والأكثر ثقة للتقنيات والإلكترونيات في المنطقة، 
                ونساهم في بناء مجتمع تقني متقدم من خلال الابتكار والتميز في الخدمة 
                والشراكة طويلة المدى مع عملائنا.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechAboutPage;