import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Star, Users, Target, Gamepad2, Smile, Gift, Zap } from 'lucide-react';

interface ToysAboutPageProps {
  storeName?: string;
}

const ToysAboutPage: React.FC<ToysAboutPageProps> = ({ 
  storeName = "عالم الألعاب المرح" 
}) => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Heart className="w-10 h-10 text-pink-500" />,
      title: "حب الطفولة",
      description: "نؤمن بأن كل طفل يستحق الفرح والمرح من خلال الألعاب الآمنة والممتعة"
    },
    {
      icon: <Zap className="w-10 h-10 text-yellow-500" />,
      title: "التعلم والمرح",
      description: "ألعابنا تجمع بين المتعة والتعليم لتنمية مهارات الأطفال بطريقة ممتعة"
    },
    {
      icon: <Smile className="w-10 h-10 text-green-500" />,
      title: "الأمان أولاً",
      description: "جميع ألعابنا آمنة ومعتمدة وتلتزم بأعلى معايير السلامة العالمية"
    },
    {
      icon: <Gift className="w-10 h-10 text-purple-500" />,
      title: "هدايا مميزة",
      description: "نقدم أجمل الهدايا التي تجعل الأطفال سعداء وتخلق ذكريات جميلة"
    }
  ];

  const stats = [
    { number: "50K+", label: "طفل سعيد", color: "text-pink-600" },
    { number: "1000+", label: "لعبة ممتعة", color: "text-yellow-600" },
    { number: "4", label: "سنوات من المرح", color: "text-green-600" },
    { number: "100%", label: "أمان مضمون", color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-white rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white rounded-full opacity-25 animate-spin"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Gamepad2 className="w-16 h-16 text-yellow-200" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
            من نحن
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-pink-100">
            {storeName} - نجعل الطفولة أجمل بألعاب آمنة وممتعة تنمي خيال الأطفال وإبداعهم 🎈
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-pink-600 ml-3" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  حكايتنا الجميلة
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  بدأت رحلتنا في 2020 بحلم بسيط: أن نرى البسمة على وجوه جميع الأطفال العرب. 
                  كنا نؤمن بأن اللعب حق أساسي لكل طفل، وأن الألعاب الجيدة تساهم في تنمية شخصية الطفل وإبداعه.
                </p>
                <p>
                  اليوم، نفتخر بأننا جعلنا أكثر من 50 ألف طفل سعيداً بألعابنا الآمنة والتعليمية الممتعة. 
                  نختار كل لعبة بعناية فائقة لضمان السلامة والفائدة والمتعة في آن واحد.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <img src="https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=300&h=400&fit=crop" alt="ألعاب ممتعة" className="rounded-lg shadow-lg border-4 border-pink-200" />
                  <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=300&fit=crop" alt="أطفال سعداء" className="rounded-lg shadow-lg border-4 border-yellow-200" />
                </div>
                <div className="space-y-6 mt-8">
                  <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop" alt="ألعاب تعليمية" className="rounded-lg shadow-lg border-4 border-purple-200" />
                  <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=400&fit=crop" alt="مرح وتعلم" className="rounded-lg shadow-lg border-4 border-green-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Star className="w-12 h-12 text-yellow-500" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              قيمنا الأساسية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              المبادئ التي تقودنا في رحلتنا لإسعاد الأطفال
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-rotate-2 border-4 border-pink-200">
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
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              أرقامنا المبهجة
            </h2>
            <p className="text-xl text-gray-600">
              إنجازات تعكس فرحة الأطفال وثقة الأهالي
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform group-hover:scale-105 border-4 border-transparent group-hover:border-pink-200">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 rounded-2xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full opacity-30 animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <Heart className="w-16 h-16 text-pink-200" />
              </div>
              <h2 className="text-4xl font-bold mb-6">
                رسالتنا
              </h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto text-pink-100 mb-8">
                نسعى لجعل كل طفل سعيداً من خلال الألعاب الآمنة والممتعة التي تنمي خياله وإبداعه. 
                هدفنا هو توفير أجود الألعاب التعليمية والترفيهية التي تساعد في نمو الطفل وتطوير مهاراته 
                بطريقة ممتعة وآمنة. نؤمن بأن اللعب هو أساس التعلم والنمو الصحي للأطفال. 🌈
              </p>
              <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-pink-50 transition-colors transform hover:scale-105">
                🎁 اكتشف عالم الألعاب
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToysAboutPage;