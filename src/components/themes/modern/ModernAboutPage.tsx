import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Target, Users, Award, Zap, Heart, TrendingUp, Globe } from 'lucide-react';

interface ModernAboutPageProps {
  storeName?: string;
}

const ModernAboutPage: React.FC<ModernAboutPageProps> = ({ 
  storeName = "متجر عصري" 
}) => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Sparkles className="w-8 h-8 text-purple-600" />,
      title: "الابتكار المستمر",
      description: "نواكب أحدث التطورات والتقنيات لنقدم لك تجربة تسوق عصرية ومميزة"
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      title: "العناية بالعملاء",
      description: "رضاك هو أولويتنا، ونسعى دائماً لتقديم أفضل خدمة وتجربة شخصية"
    },
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      title: "الجودة العالية",
      description: "نختار بعناية أفضل المنتجات لضمان حصولك على أعلى مستويات الجودة"
    },
    {
      icon: <Globe className="w-8 h-8 text-emerald-600" />,
      title: "الاستدامة",
      description: "نهتم بالبيئة ونختار العلامات التجارية المهتمة بالممارسات المستدامة"
    }
  ];

  const stats = [
    { number: "50K+", label: "عميل سعيد" },
    { number: "1000+", label: "منتج عصري" },
    { number: "5", label: "سنوات خبرة" },
    { number: "24/7", label: "دعم العملاء" }
  ];

  const team = [
    {
      name: "سارة الأحمد",
      role: "مديرة التسويق الرقمي",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      description: "خبيرة في التسويق الرقمي والعلامات التجارية"
    },
    {
      name: "أحمد محمد",
      role: "مدير تجربة العملاء",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      description: "متخصص في تحسين تجربة العملاء والخدمات"
    },
    {
      name: "نور العلي",
      role: "مصممة المنتجات",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      description: "مصممة مبدعة مع شغف بالتصاميم العصرية"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 border border-white/30 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/25 rounded-full animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-purple-200" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
            من نحن
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-purple-100">
            {storeName} - وجهتك العصرية للموضة والأناقة، حيث نجمع بين التصاميم المعاصرة والجودة العالية
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-purple-600 ml-3" />
                <h2 className="text-4xl font-bold text-gray-900">
                  قصتنا
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  بدأت رحلتنا في عام 2019 برؤية واضحة: أن نجعل الموضة العصرية والأناقة المعاصرة في متناول الجميع. 
                  ما بدأ كفكرة بسيطة تطور ليصبح منصة متكاملة تجمع أفضل العلامات التجارية والتصاميم الحديثة.
                </p>
                <p>
                  نحن نؤمن بأن الموضة ليست مجرد ملابس، بل هي وسيلة للتعبير عن الذات والثقة. 
                  لذلك نحرص على انتقاء كل قطعة بعناية فائقة، ونتأكد من أنها تواكب أحدث الاتجاهات العالمية.
                </p>
                <p>
                  اليوم، نفتخر بثقة آلاف العملاء الذين اختاروا {storeName} كوجهتهم المفضلة للتسوق، 
                  ونواصل العمل على تطوير خدماتنا وتوسيع مجموعتنا لنلبي جميع احتياجاتكم.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop" 
                    alt="متجر عصري" 
                    className="rounded-lg shadow-lg border-4 border-purple-200"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop" 
                    alt="موضة عصرية" 
                    className="rounded-lg shadow-lg border-4 border-indigo-200"
                  />
                </div>
                <div className="space-y-6 mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=300&fit=crop" 
                    alt="تصاميم حديثة" 
                    className="rounded-lg shadow-lg border-4 border-purple-200"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=400&fit=crop" 
                    alt="أزياء عصرية" 
                    className="rounded-lg shadow-lg border-4 border-indigo-200"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-purple-400 rounded-full opacity-30"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-indigo-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-purple-100 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <TrendingUp className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              قيمنا الأساسية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              المبادئ التي تقودنا في رحلتنا لتقديم أفضل تجربة تسوق عصرية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-purple-200">
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
              أرقام تعكس التزامنا بالتميز
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg mb-4">
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-purple-100">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Users className="w-12 h-12 text-indigo-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              فريق العمل
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              الأشخاص المبدعون وراء نجاح متجرنا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-indigo-200 text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-purple-200 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-full">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-semibold mb-3">
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
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border border-white/30 rounded-full animate-pulse delay-300"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <Target className="w-16 h-16 text-purple-200" />
              </div>
              <h2 className="text-4xl font-bold mb-6">
                مهمتنا
              </h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto text-purple-100 mb-8">
                نسعى لأن نكون الوجهة الأولى للموضة العصرية في المنطقة، ونعمل على تقديم تجربة تسوق استثنائية 
                تجمع بين الجودة العالية والخدمة المتميزة والأسعار المناسبة. هدفنا هو مساعدة عملائنا على التعبير 
                عن أنفسهم من خلال الأزياء العصرية والتصاميم المبتكرة.
              </p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors">
                اكتشف مجموعتنا
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernAboutPage;