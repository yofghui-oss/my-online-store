import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Heart, Star, Zap, Gift, Sparkles, Rainbow, Sun } from 'lucide-react';

const ToysFunSection: React.FC = () => {
  const funFeatures = [
    {
      icon: Smile,
      title: 'متعة لا تنتهي',
      description: 'ألعاب تجلب السعادة والضحك',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Heart,
      title: 'آمنة ومحبوبة',
      description: 'مصنوعة بعناية فائقة وحب',
      color: 'from-pink-400 to-red-500'
    },
    {
      icon: Star,
      title: 'جودة ممتازة',
      description: 'ألعاب عالية الجودة ومتينة',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Zap,
      title: 'تطوير المهارات',
      description: 'تنمي الذكاء والإبداع',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Gift,
      title: 'هدايا مثالية',
      description: 'الخيار الأمثل للمناسبات',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Sparkles,
      title: 'تصاميم ساحرة',
      description: 'ألوان زاهية وتصاميم جذابة',
      color: 'from-indigo-400 to-purple-500'
    }
  ];

  const ageGroups = [
    { age: '0-2 سنة', title: 'الرضع والأطفال الصغار', toys: ['خشخيشات', 'ألعاب طرية', 'مكعبات آمنة'] },
    { age: '3-5 سنوات', title: 'مرحلة ما قبل المدرسة', toys: ['ألعاب البناء', 'الألغاز', 'ألعاب التلوين'] },
    { age: '6-8 سنوات', title: 'المرحلة الابتدائية', toys: ['ألعاب العلوم', 'الدراجات', 'ألعاب الطاولة'] },
    { age: '9+ سنوات', title: 'الأطفال الأكبر', toys: ['ألعاب إلكترونية', 'مجموعات البناء المعقدة', 'ألعاب رياضية'] }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg">
              <Rainbow className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              عالم من المرح والتعلم
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-purple-600 max-w-3xl mx-auto"
          >
            اكتشف مجموعة رائعة من الألعاب التي تجمع بين المتعة والتعلم، مصممة خصيصاً لإسعاد الأطفال وتنمية مهاراتهم
          </motion.p>
        </motion.div>

        {/* Fun Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {funFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                hover: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-lg border-2 border-pink-100 hover:border-pink-300 transition-all duration-300">
                {/* Floating decorations */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-70 group-hover:animate-bounce"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-pink-400 rounded-full opacity-70 group-hover:animate-pulse"></div>
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Age Groups Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <Sun className="h-8 w-8 text-yellow-500" />
              <h3 className="text-3xl font-bold text-gray-800">ألعاب لكل الأعمار</h3>
            </motion.div>
            <p className="text-purple-600">اختر الألعاب المناسبة لعمر طفلك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ageGroups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all"
              >
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full text-white font-bold text-lg mb-3">
                    {group.age}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{group.title}</h4>
                </div>
                <div className="space-y-2">
                  {group.toys.map((toy, toyIndex) => (
                    <div key={toyIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span>{toy}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-70 animate-bounce"></div>
            <div className="absolute top-8 right-8 w-6 h-6 bg-white rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute bottom-6 left-12 w-4 h-4 bg-pink-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-purple-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <Sparkles className="h-12 w-12 text-yellow-300" />
                <h3 className="text-4xl font-bold">ابدأ رحلة المرح الآن!</h3>
                <Sparkles className="h-12 w-12 text-yellow-300" />
              </motion.div>
              <p className="text-xl mb-8 opacity-90">
                اكتشف آلاف الألعاب الرائعة واجعل طفلك سعيداً
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <Gift className="h-6 w-6" />
                تسوق الآن
                <Heart className="h-6 w-6 text-pink-500" />
              </motion.button>
              <p className="text-sm mt-4 opacity-75">
                🎁 شحن مجاني للطلبات أكثر من 200 ر.س • ضمان الجودة 100%
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { number: '10K+', label: 'طفل سعيد', icon: Smile },
            { number: '500+', label: 'لعبة متنوعة', icon: Gift },
            { number: '99%', label: 'رضا العملاء', icon: Heart },
            { number: '24/7', label: 'دعم العملاء', icon: Star }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100"
            >
              <stat.icon className="h-8 w-8 text-pink-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToysFunSection;
