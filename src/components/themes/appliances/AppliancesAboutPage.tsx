import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, Home, Shield, Award, Users, Target, Wrench, Heart } from 'lucide-react';

interface AppliancesAboutPageProps {
  storeName?: string;
}

const AppliancesAboutPage: React.FC<AppliancesAboutPageProps> = ({ 
  storeName = "الأجهزة المنزلية الذكية" 
}) => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Home className="w-10 h-10 text-blue-600" />,
      title: "منازل ذكية",
      description: "نساعدكم في تحويل منازلكم إلى منازل ذكية بأحدث التقنيات والأجهزة المتطورة"
    },
    {
      icon: <Shield className="w-10 h-10 text-green-600" />,
      title: "الجودة والأمان",
      description: "نختار أجهزة عالية الجودة من أفضل الماركات العالمية مع ضمانات شاملة"
    },
    {
      icon: <Zap className="w-10 h-10 text-yellow-600" />,
      title: "كفاءة الطاقة",
      description: "جميع أجهزتنا موفرة للطاقة وصديقة للبيئة لتوفير فواتير الكهرباء"
    },
    {
      icon: <Wrench className="w-10 h-10 text-orange-600" />,
      title: "خدمة ما بعد البيع",
      description: "نقدم خدمة تركيب وصيانة متميزة مع فريق فنيين متخصصين"
    }
  ];

  const stats = [
    { number: "15K+", label: "عائلة سعيدة", color: "text-blue-600" },
    { number: "2000+", label: "جهاز ذكي", color: "text-green-600" },
    { number: "7", label: "سنوات خبرة", color: "text-yellow-600" },
    { number: "50+", label: "ماركة عالمية", color: "text-orange-600" }
  ];

  const team = [
    {
      name: "أحمد السالم",
      role: "مدير تقني",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      description: "خبير في تقنيات المنزل الذكي والأتمتة"
    },
    {
      name: "فاطمة محمد",
      role: "أخصائية منتجات",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      description: "متخصصة في اختيار وتقييم الأجهزة المنزلية"
    },
    {
      name: "محمد العتيبي",
      role: "مدير خدمة العملاء",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      description: "يضمن رضا العملاء وجودة الخدمة"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-24 h-24 border-2 border-blue-300 rounded-lg opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-20 h-20 border-2 border-indigo-300 rounded-lg opacity-40 animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-gray-300 rounded-lg opacity-25 animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Home className="w-16 h-16 text-blue-200" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-gray-200 bg-clip-text text-transparent">
            من نحن
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-blue-100">
            {storeName} - رائدون في تحويل المنازل العربية إلى منازل ذكية ومتطورة
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 ml-3" />
                <h2 className="text-4xl font-bold text-gray-900">
                  رحلتنا التقنية
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  بدأت قصتنا في 2017 عندما أدركنا أن المنازل العربية تحتاج إلى نقلة نوعية في عالم التكنولوجيا المنزلية. 
                  كانت رؤيتنا واضحة: جعل التقنية الذكية متاحة وسهلة الاستخدام لكل عائلة عربية.
                </p>
                <p>
                  من خلال شراكاتنا مع أكبر الشركات العالمية مثل Samsung وLG وBosch، تمكنا من توفير 
                  أحدث الأجهزة المنزلية الذكية بأفضل الأسعار وأعلى معايير الجودة والأمان.
                </p>
                <p>
                  اليوم، نفتخر بخدمة أكثر من 15 ألف عائلة في جميع أنحاء المملكة، ونواصل مهمتنا في 
                  جعل الحياة أكثر راحة وذكاءً من خلال التكنولوجيا المتقدمة.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <img 
                    src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=300&h=400&fit=crop" 
                    alt="أجهزة ذكية" 
                    className="rounded-lg shadow-lg border-4 border-blue-200"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop" 
                    alt="مطبخ ذكي" 
                    className="rounded-lg shadow-lg border-4 border-indigo-200"
                  />
                </div>
                <div className="space-y-6 mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop" 
                    alt="منزل ذكي" 
                    className="rounded-lg shadow-lg border-4 border-blue-200"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop" 
                    alt="غسالة ذكية" 
                    className="rounded-lg shadow-lg border-4 border-indigo-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Award className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              قيمنا الأساسية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              المبادئ التي تحركنا في رحلتنا لتطوير المنازل الذكية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-blue-200">
                <div className="flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              إنجازاتنا بالأرقام
            </h2>
            <p className="text-xl text-gray-600">
              أرقام تعكس ثقة عملائنا وتميزنا في السوق
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow">
                  <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Users className="w-12 h-12 text-indigo-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              فريق الخبراء
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              المتخصصون الذين يضمنون لكم أفضل تجربة في المنزل الذكي
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-indigo-200 text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-blue-200 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-gray-700 rounded-2xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 border border-blue-300 rounded-lg opacity-20 animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border border-indigo-300 rounded-lg opacity-30 animate-pulse delay-300"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <Heart className="w-16 h-16 text-blue-200" />
              </div>
              <h2 className="text-4xl font-bold mb-6">
                رسالتنا
              </h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto text-blue-100 mb-8">
                نسعى لجعل كل منزل عربي منزلاً ذكياً يوفر الراحة والأمان والكفاءة لأفراد الأسرة. 
                هدفنا هو تبسيط التكنولوجيا المتقدمة وجعلها في متناول الجميع، مع ضمان أعلى معايير 
                الجودة والخدمة المتميزة. نؤمن بأن التكنولوجيا يجب أن تخدم الإنسان وتحسن من جودة حياته اليومية.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
                اكتشف منتجاتنا الذكية
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppliancesAboutPage;