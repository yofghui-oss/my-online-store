import React from 'react';
import { useTranslation } from 'react-i18next';
import { Code, Zap, Shield, Users, Target, Award, Settings, Cpu } from 'lucide-react';

interface SoftwareAboutPageProps {
  storeName?: string;
}

const SoftwareAboutPage: React.FC<SoftwareAboutPageProps> = ({ 
  storeName = "حلول البرمجيات" 
}) => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Code className="w-10 h-10 text-blue-500" />,
      title: "التقنية المتقدمة",
      description: "نستخدم أحدث التقنيات والأدوات البرمجية لتطوير حلول مبتكرة وفعالة"
    },
    {
      icon: <Shield className="w-10 h-10 text-green-500" />,
      title: "الأمان والحماية",
      description: "نضع الأمان كأولوية قصوى في جميع منتجاتنا مع أعلى معايير الحماية"
    },
    {
      icon: <Zap className="w-10 h-10 text-yellow-500" />,
      title: "الأداء العالي",
      description: "نطور حلول سريعة وموثوقة تلبي احتياجات الأعمال الحديثة"
    },
    {
      icon: <Users className="w-10 h-10 text-purple-500" />,
      title: "الدعم المتواصل",
      description: "فريق متخصص متاح دائماً لتقديم الدعم والصيانة والتطوير"
    }
  ];

  const stats = [
    { number: "200+", label: "مشروع ناجح", color: "text-blue-600" },
    { number: "50+", label: "عميل راضي", color: "text-green-600" },
    { number: "10", label: "سنوات خبرة", color: "text-yellow-600" },
    { number: "99.9%", label: "نسبة الجودة", color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-24 h-24 border-2 border-blue-400 opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-20 h-20 border-2 border-indigo-400 opacity-40 animate-pulse delay-300"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <Code className="w-16 h-16 text-blue-300 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
            من نحن
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-blue-100">
            {storeName} - شريكك التقني في التحول الرقمي وتطوير الحلول البرمجية المتطورة
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 ml-3" />
                <h2 className="text-4xl font-bold text-gray-900">رحلتنا التقنية</h2>
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  منذ تأسيسنا في 2014، كان هدفنا واضحاً: تمكين الشركات العربية من خلال التكنولوجيا المتقدمة والحلول البرمجية المبتكرة.
                </p>
                <p>
                  نجحنا في تطوير أكثر من 200 مشروع تقني متنوع، من تطبيقات الهاتف المحمول إلى أنظمة إدارة المؤسسات الكبرى، 
                  مما جعلنا واحدة من الشركات الرائدة في مجال تطوير البرمجيات.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=400&fit=crop" alt="تطوير برمجيات" className="rounded-lg shadow-lg border-4 border-blue-200" />
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop" alt="حلول تقنية" className="rounded-lg shadow-lg border-4 border-indigo-200" />
                </div>
                <div className="space-y-6 mt-8">
                  <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop" alt="فريق تقني" className="rounded-lg shadow-lg border-4 border-slate-200" />
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=400&fit=crop" alt="تقنيات حديثة" className="rounded-lg shadow-lg border-4 border-blue-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-slate-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">قيمنا الأساسية</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">المبادئ التي تقود رحلتنا في عالم التكنولوجيا</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-blue-200">
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">إنجازاتنا بالأرقام</h2>
            <p className="text-xl text-gray-600">أرقام تعكس خبرتنا ونجاحنا في السوق</p>
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

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 rounded-2xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 border border-blue-400 opacity-20 animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border border-indigo-400 opacity-30 animate-pulse delay-300"></div>
            </div>
            
            <div className="relative z-10">
              <Settings className="w-16 h-16 text-blue-300 mx-auto mb-8" />
              <h2 className="text-4xl font-bold mb-6">رسالتنا</h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto text-blue-100 mb-8">
                نسعى لتمكين الشركات والمؤسسات من تحقيق أهدافها من خلال الحلول التقنية المبتكرة والمتطورة. 
                هدفنا هو بناء جسر بين التكنولوجيا المتقدمة والاحتياجات الفعلية للأعمال، مع ضمان أعلى معايير 
                الجودة والأمان والموثوقية في جميع منتجاتنا وخدماتنا.
              </p>
              <button className="bg-white text-blue-800 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
                اكتشف حلولنا التقنية
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareAboutPage;