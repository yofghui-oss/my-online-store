import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Star, Users, Shield } from 'lucide-react';

interface MinimalAboutPageProps {
  storeName?: string;
}

const MinimalAboutPage: React.FC<MinimalAboutPageProps> = ({ 
  storeName = "بساطة للملابس" 
}) => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-gray-700" />,
      title: "البساطة",
      description: "نؤمن بأن الجمال في البساطة، وأن الأناقة الحقيقية تكمن في التصاميم البسيطة والعملية"
    },
    {
      icon: <Star className="w-8 h-8 text-gray-700" />,
      title: "الجودة",
      description: "نختار أفضل الخامات والمواد لضمان الراحة والمتانة في جميع منتجاتنا"
    },
    {
      icon: <Users className="w-8 h-8 text-gray-700" />,
      title: "العملاء",
      description: "رضا عملائنا هو أولويتنا، ونسعى دائماً لتقديم تجربة تسوق مميزة ومريحة"
    },
    {
      icon: <Shield className="w-8 h-8 text-gray-700" />,
      title: "الثقة",
      description: "نبني علاقات طويلة الأمد مع عملائنا قائمة على الثقة والشفافية"
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            من نحن
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {storeName} - حيث تلتقي البساطة بالأناقة
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                قصتنا
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  بدأت رحلتنا من إيمان عميق بأن الأناقة الحقيقية تكمن في البساطة. 
                  في عالم مليء بالتعقيدات والزخارف، اخترنا طريقاً مختلفاً - طريق البساطة المدروسة.
                </p>
                <p>
                  نحن نؤمن بأن الملابس يجب أن تعكس شخصيتك الحقيقية دون إفراط أو تكلف. 
                  كل قطعة في مجموعتنا مصممة بعناية لتكون عملية وأنيقة في نفس الوقت.
                </p>
                <p>
                  اليوم، نفتخر بأننا نقدم مجموعة متميزة من الملابس التي تجمع بين الراحة والأناقة، 
                  مصنوعة من أجود الخامات ومصممة لتدوم طويلاً.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop" 
                  alt="متجر الملابس" 
                  className="rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=400&fit=crop" 
                  alt="ملابس بسيطة" 
                  className="rounded-lg mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              قيمنا
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              المبادئ التي نؤمن بها وتوجه عملنا كل يوم
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            فلسفتنا
          </h2>
          <div className="space-y-8 text-gray-600 leading-relaxed">
            <p className="text-lg">
              "الأناقة هي الجمال الذي لا يتلاشى أبداً. إنها ليست في كثرة الملابس أو تعقيد التصاميم، 
              بل في اختيار القطع المناسبة التي تعبر عن شخصيتك بصدق."
            </p>
            <p>
              نحن نصمم ملابسنا لتكون رفيقاً دائماً في رحلة حياتك. قطع تتماشى مع أسلوب حياتك العملي، 
              وتضيف لمسة من الأناقة لإطلالاتك اليومية دون تكلف أو مبالغة.
            </p>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-8">التزامنا</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">الاستدامة</h3>
                  <p className="text-gray-300">
                    نلتزم بالممارسات المستدامة في إنتاج ملابسنا، من اختيار المواد الصديقة للبيئة 
                    إلى التعامل مع الموردين الذين يشاركوننا نفس القيم.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">الشفافية</h3>
                  <p className="text-gray-300">
                    نؤمن بالشفافية الكاملة مع عملائنا، من طريقة إنتاج ملابسنا إلى مصادر المواد 
                    وظروف العمل في مصانعنا.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">الابتكار</h3>
                  <p className="text-gray-300">
                    نسعى باستمرار للابتكار في التصميم والمواد، مع الحفاظ على هويتنا المميزة 
                    القائمة على البساطة والأناقة.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500&h=600&fit=crop" 
                alt="التزامنا" 
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            انضم إلى رحلتنا
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            اكتشف مجموعتنا من الملابس البسيطة والأنيقة، واجعل البساطة جزءاً من أسلوبك اليومي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 text-white px-8 py-3 rounded font-medium hover:bg-gray-800 transition-colors">
              تسوق الآن
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded font-medium hover:bg-gray-50 transition-colors">
              تواصل معنا
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinimalAboutPage;