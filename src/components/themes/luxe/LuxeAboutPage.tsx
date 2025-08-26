import React from 'react';
import { useTranslation } from 'react-i18next';
import { Crown, Star, Diamond, Award, Shield, Heart } from 'lucide-react';

interface LuxeAboutPageProps {
  storeName?: string;
}

const LuxeAboutPage: React.FC<LuxeAboutPageProps> = ({ 
  storeName = "فاخر للمجوهرات" 
}) => {
  const { t } = useTranslation();

  const luxuryValues = [
    {
      icon: <Crown className="w-10 h-10 text-yellow-600" />,
      title: "التميز الملكي",
      description: "نقدم مجوهرات بمستوى ملكي، مصنوعة من أجود المواد الخام والأحجار الكريمة الطبيعية"
    },
    {
      icon: <Diamond className="w-10 h-10 text-purple-600" />,
      title: "الأحجار الكريمة الأصلية",
      description: "جميع أحجارنا الكريمة أصلية ومعتمدة، مع شهادات الجودة والأصالة المعترف بها دولياً"
    },
    {
      icon: <Award className="w-10 h-10 text-amber-600" />,
      title: "الحرفية المتقنة",
      description: "صياغة يدوية متقنة من أمهر الحرفيين، تجمع بين التراث العريق والتصاميم العصرية"
    },
    {
      icon: <Shield className="w-10 h-10 text-emerald-600" />,
      title: "الضمان مدى الحياة",
      description: "نقدم ضماناً مدى الحياة على جميع قطعنا، مع خدمات الصيانة والتلميع المجانية"
    }
  ];

  const milestones = [
    { year: "1985", title: "التأسيس", description: "بدأت رحلتنا كمتجر صغير للمجوهرات التراثية" },
    { year: "1995", title: "التوسع", description: "افتتاح أول فرع كبير في قلب العاصمة" },
    { year: "2005", title: "الريادة", description: "أصبحنا الوجهة الأولى للمجوهرات الفاخرة في المنطقة" },
    { year: "2015", title: "التطوير", description: "إطلاق مجموعات حصرية مع مصممين عالميين" },
    { year: "2025", title: "المستقبل", description: "نواصل الابتكار في عالم المجوهرات الفاخرة" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-yellow-600/20"></div>
          <div className="absolute top-10 left-10 w-20 h-20 border border-yellow-400/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 border border-amber-400/40 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 border border-yellow-300/25 rounded-full animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Crown className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent">
            من نحن
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-amber-100">
            {storeName} - حيث تلتقي الفخامة بالتراث العريق في عالم المجوهرات والأحجار الكريمة
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Diamond className="w-8 h-8 text-purple-600 ml-3" />
                <h2 className="text-4xl font-bold text-gray-900">
                  قصة التميز
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  منذ أربعة عقود، بدأت رحلتنا بحلم بسيط: أن نجعل الجمال والفخامة في متناول كل من يقدر الأناقة الحقيقية. 
                  ما بدأ كمتجر صغير للمجوهرات التراثية، تطور ليصبح واحداً من أرقى وجهات المجوهرات في المنطقة.
                </p>
                <p>
                  نحن نؤمن بأن كل قطعة مجوهرات تحكي قصة، وأن كل حجر كريم يحمل في طياته سحراً خاصاً. 
                  لذلك نختار بعناية فائقة كل قطعة في مجموعتنا، ونضمن أن تكون على أعلى مستوى من الجودة والأصالة.
                </p>
                <p>
                  اليوم، نفتخر بثقة آلاف العملاء الذين اختاروا قطعهم المميزة من مجموعتنا الفاخرة، 
                  ونواصل السعي لتقديم أجمل وأرقى المجوهرات التي تليق بمناسباتكم الخاصة.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <img 
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=400&fit=crop" 
                    alt="مجوهرات فاخرة" 
                    className="rounded-lg shadow-lg border-4 border-yellow-200"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop" 
                    alt="خواتم ذهبية" 
                    className="rounded-lg shadow-lg border-4 border-amber-200"
                  />
                </div>
                <div className="space-y-6 mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop" 
                    alt="أساور أنيقة" 
                    className="rounded-lg shadow-lg border-4 border-yellow-200"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=400&fit=crop" 
                    alt="أقراط فاخرة" 
                    className="rounded-lg shadow-lg border-4 border-amber-200"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-yellow-400 rounded-full opacity-30"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-amber-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-amber-100 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Star className="w-12 h-12 text-amber-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              قيمنا الأساسية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              المبادئ التي ترشدنا في رحلتنا لتقديم أرقى المجوهرات
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {luxuryValues.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-amber-200">
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

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              رحلة التميز
            </h2>
            <p className="text-xl text-gray-600">
              محطات مهمة في تاريخنا العريق
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute right-1/2 transform translate-x-1/2 w-1 bg-gradient-to-b from-amber-400 to-yellow-500 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <div className={`bg-white p-6 rounded-lg shadow-lg border-2 border-amber-200 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-2xl font-bold text-amber-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-yellow-400 ml-3" />
                <h2 className="text-4xl font-bold">الحرفية المتقنة</h2>
              </div>
              <div className="space-y-6 text-amber-100 leading-relaxed text-lg">
                <p>
                  كل قطعة في مجموعتنا هي عمل فني يعكس مهارة وخبرة حرفيين متخصصين، 
                  يجمعون بين التقنيات التراثية العريقة والأساليب الحديثة المتطورة.
                </p>
                <p>
                  نستخدم أجود أنواع الذهب والفضة والبلاتين، ونختار أحجارنا الكريمة 
                  من أفضل المناجم في العالم، مع ضمان الجودة والأصالة.
                </p>
                <p>
                  من التصميم الأولي وحتى اللمسة الأخيرة، تمر كل قطعة بمراحل دقيقة 
                  من الفحص والتدقيق لضمان الوصول إلى أعلى معايير الجودة.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop" 
                alt="حرفية المجوهرات" 
                className="rounded-lg shadow-2xl border-4 border-yellow-400"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            اكتشف مجموعتنا الفاخرة
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            دع مجوهراتنا تحكي قصتك الخاصة، واختر القطعة التي تعبر عن شخصيتك المميزة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-700 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg">
              تسوق المجموعة الفاخرة
            </button>
            <button className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-all">
              احجز استشارة خاصة
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LuxeAboutPage;