import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Download, Headphones, Cloud, Smartphone, Globe, Award } from 'lucide-react';

const SoftwareFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'أداء فائق',
      description: 'برامج محسّنة للسرعة والكفاءة',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'أمان متقدم',
      description: 'حماية شاملة ضد التهديدات',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Download,
      title: 'تحديثات تلقائية',
      description: 'احصل على أحدث الميزات تلقائياً',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Headphones,
      title: 'دعم فني 24/7',
      description: 'مساعدة فورية في أي وقت',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Cloud,
      title: 'التخزين السحابي',
      description: 'احفظ ملفاتك بأمان في السحابة',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: Smartphone,
      title: 'متوافق مع الجوال',
      description: 'استخدم البرامج على جميع الأجهزة',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Globe,
      title: 'دعم متعدد اللغات',
      description: 'واجهة بالعربية والإنجليزية',
      color: 'from-teal-500 to-green-600'
    },
    {
      icon: Award,
      title: 'جودة معتمدة',
      description: 'برامج حاصلة على شهادات دولية',
      color: 'from-amber-500 to-yellow-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4">
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
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              مميزات استثنائية
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-blue-200 max-w-3xl mx-auto"
          >
            اكتشف مجموعة شاملة من المميزات المتقدمة التي تجعل برامجنا الخيار الأمثل للمحترفين والشركات
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
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
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 h-full hover:border-blue-500/50 transition-all duration-300">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl" />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500 rounded-b-xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <Download className="h-6 w-6" />
            جرب البرامج مجاناً
          </motion.button>
          <p className="text-slate-400 mt-4 text-sm">
            نسخة تجريبية مجانية لمدة 30 يوم • لا حاجة لبطاقة ائتمان
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-slate-700"
        >
          {[
            { number: '500K+', label: 'مستخدم نشط' },
            { number: '99.9%', label: 'وقت التشغيل' },
            { number: '24/7', label: 'دعم فني' },
            { number: '150+', label: 'دولة' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SoftwareFeaturesSection;
