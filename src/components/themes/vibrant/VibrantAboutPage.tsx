import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, Heart, Users, Target, Star, Rocket, Palette, Music, Camera, Gamepad2 } from 'lucide-react';

interface VibrantAboutPageProps {
  storeName?: string;
}

const VibrantAboutPage: React.FC<VibrantAboutPageProps> = ({ 
  storeName = "ألوان الشباب" 
}) => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Zap className="w-10 h-10 text-yellow-500" />,
      title: "الطاقة الشبابية",
      description: "نحتفي بروح الشباب والحيوية في كل ما نقدمه من منتجات وخدمات",
      bgColor: "from-yellow-400 to-orange-400"
    },
    {
      icon: <Heart className="w-10 h-10 text-pink-500" />,
      title: "الشغف والحب",
      description: "نعمل بشغف وحب لتقديم أفضل تجربة تسوق ممتعة ومليئة بالألوان",
      bgColor: "from-pink-400 to-rose-400"
    },
    {
      icon: <Palette className="w-10 h-10 text-purple-500" />,
      title: "الإبداع والتميز",
      description: "نبتكر ونبدع في كل شيء، من التصاميم إلى طريقة تقديم المنتجات",
      bgColor: "from-purple-400 to-indigo-400"
    },
    {
      icon: <Users className="w-10 h-10 text-green-500" />,
      title: "المجتمع الشبابي",
      description: "نبني مجتمعاً شبابياً متفاعلاً يشارك الاهتمامات والأحلام",
      bgColor: "from-green-400 to-emerald-400"
    }
  ];

  const stats = [
    { number: "25K+", label: "شاب وشابة", color: "text-yellow-600" },
    { number: "500+", label: "منتج ملون", color: "text-pink-600" },
    { number: "3", label: "سنوات إبداع", color: "text-purple-600" },
    { number: "100%", label: "طاقة إيجابية", color: "text-green-600" }
  ];

  const team = [
    {
      name: "ليلى أحمد",
      role: "مديرة الإبداع",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      description: "خبيرة في الألوان والتصاميم الشبابية",
      color: "from-pink-500 to-rose-500"
    },
    {
      name: "كريم محمد",
      role: "مدير المجتمع",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      description: "متخصص في بناء المجتمعات الشبابية",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "سارة علي",
      role: "مصممة المنتجات",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      description: "مبدعة في تصميم المنتجات العصرية",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const interests = [
    { icon: <Music className="w-8 h-8" />, label: "الموسيقى", color: "text-yellow-500" },
    { icon: <Camera className="w-8 h-8" />, label: "التصوير", color: "text-pink-500" },
    { icon: <Gamepad2 className="w-8 h-8" />, label: "الألعاب", color: "text-blue-500" },
    { icon: <Palette className="w-8 h-8" />, label: "الفن", color: "text-purple-500" },
    { icon: <Rocket className="w-8 h-8" />, label: "التكنولوجيا", color: "text-green-500" },
    { icon: <Heart className="w-8 h-8" />, label: "الموضة", color: "text-rose-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-25 animate-spin"></div>
          <div className="absolute top-20 right-40 w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-20 animate-ping"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Zap className="w-20 h-20 text-yellow-300" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
            من نحن
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-pink-100">
            {storeName} - عالم الألوان والطاقة الشبابية، حيث نجعل كل يوم مليئاً بالبهجة والإبداع
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Rocket className="w-10 h-10 text-pink-600 ml-3" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  رحلتنا الملونة
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  بدأت قصتنا في 2021 بحلم بسيط: أن نضفي الألوان والبهجة على حياة الشباب. 
                  كنا مجموعة من الأصدقاء الذين يؤمنون بأن الحياة يجب أن تكون مليئة بالألوان والطاقة الإيجابية.
                </p>
                <p>
                  من فكرة صغيرة في غرفة النوم إلى منصة تجمع آلاف الشباب والشابات من جميع أنحاء المملكة، 
                  تطورنا لنصبح الوجهة المفضلة لكل من يبحث عن المنتجات الملونة والعصرية التي تعكس شخصيته الفريدة.
                </p>
                <p>
                  اليوم، نفتخر بمجتمعنا الشبابي المتنامي، ونواصل السعي لإضافة المزيد من الألوان والبهجة 
                  إلى حياة عملائنا من خلال منتجاتنا المبتكرة وخدماتنا المميزة.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-4 rounded-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop" 
                      alt="شباب ملون" 
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-4 rounded-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop" 
                      alt="منتجات ملونة" 
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6 mt-8">
                  <div className="bg-gradient-to-r from-purple-400 to-indigo-400 p-4 rounded-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop" 
                      alt="أزياء شبابية" 
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-4 rounded-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=300&fit=crop" 
                      alt="موضة عصرية" 
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-spin slow-spin"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Heart className="w-12 h-12 text-pink-600" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              قيمنا الأساسية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              القيم التي تحرك عجلة إبداعنا وتلون رؤيتنا للمستقبل
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-r ${value.bgColor} p-8 rounded-xl text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-rotate-2`}>
                  <div className="flex justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">
                    {value.title}
                  </h3>
                  <p className="text-center leading-relaxed opacity-90">
                    {value.description}
                  </p>
                </div>
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
              إنجازاتنا الملونة
            </h2>
            <p className="text-xl text-gray-600">
              أرقام تعكس تأثيرنا الإيجابي في المجتمع الشبابي
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

      {/* Interests Section */}
      <section className="py-20 bg-gradient-to-r from-purple-100 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              اهتماماتنا
            </h2>
            <p className="text-xl text-gray-600">
              المجالات التي نحبها ونقدم لها منتجات مميزة
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {interests.map((interest, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover:-rotate-3 text-center">
                <div className={`flex justify-center mb-4 ${interest.color}`}>
                  {interest.icon}
                </div>
                <span className="font-semibold text-gray-700">{interest.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Users className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              فريقنا المبدع
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              الأشخاص الملهمون الذين يضيفون الألوان إلى كل ما نعمل عليه
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform group-hover:scale-105 group-hover:-rotate-2 text-center">
                  <div className="relative mb-6">
                    <div className={`w-32 h-32 bg-gradient-to-r ${member.color} rounded-full p-1 mx-auto`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${member.color} text-white p-2 rounded-full`}>
                      <Star className="w-4 h-4" />
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-400 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-400 rounded-full opacity-25 animate-spin"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <Target className="w-16 h-16 text-yellow-300" />
              </div>
              <h2 className="text-4xl font-bold mb-6">
                رسالتنا الملونة
              </h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto text-pink-100 mb-8">
                نسعى لأن نكون مصدر إلهام للشباب العربي، ونعمل على إضافة الألوان والبهجة إلى حياتهم اليومية. 
                هدفنا هو بناء مجتمع شبابي إيجابي يحتفي بالتنوع والإبداع، ويشجع على التعبير عن الذات بطرق 
                ملونة ومبتكرة. نؤمن بأن كل شاب وشابة يستحق أن يعيش حياة مليئة بالألوان والطاقة الإيجابية.
              </p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-50 transition-colors transform hover:scale-105">
                انضم إلى مجتمعنا الملون
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VibrantAboutPage;