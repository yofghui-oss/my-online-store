import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ModernFooter: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center mb-6">
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="text-white" size={24} />
                </div>
              </div>
              <div className="ltr:ml-4 rtl:mr-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  متجر الأزياء الحصري
                </h3>
                <p className="text-gray-400 text-sm flex items-center">
                  <Heart size={12} className="ltr:mr-1 rtl:ml-1" />
                  وجهتك الأولى للأناقة والجمال
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              نقدم لك أجمل وأحدث صيحات الموضة العالمية بجودة عالية وأسعار منافسة. 
              اكتشف مجموعتنا الحصرية من الملابس والإكسسوارات التي تناسب جميع الأذواق والمناسبات.
            </p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-300 text-sm">تقييم 4.9 من أكثر من 10,000 عميل</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full ltr:mr-3 rtl:ml-3"></span>
              روابط سريعة
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'من نحن', icon: '🏢' },
                { name: 'المنتجات', icon: '👕' },
                { name: 'العروض الخاصة', icon: '🔥' },
                { name: 'تواصل معنا', icon: '📞' },
                { name: 'الأسئلة الشائعة', icon: '❓' },
                { name: 'سياسة الإرجاع', icon: '↩️' }
              ].map((item, index) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="#" 
                    className="group flex items-center text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    <span className="ltr:mr-3 rtl:ml-3 group-hover:scale-110 transition-transform">{item.icon}</span>
                    {item.name}
                    <motion.div 
                      className="ltr:ml-2 rtl:mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full ltr:mr-3 rtl:ml-3"></span>
              تواصل معنا
            </h3>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
              >
                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg ltr:mr-3 rtl:ml-3">
                  <Phone size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">اتصل بنا</p>
                  <p className="text-white font-medium">+966 50 123 4567</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
              >
                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg ltr:mr-3 rtl:ml-3">
                  <Mail size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">راسلنا</p>
                  <p className="text-white font-medium">info@fashionstore.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
              >
                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg ltr:mr-3 rtl:ml-3">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">موقعنا</p>
                  <p className="text-white font-medium">الرياض، المملكة العربية السعودية</p>
                </div>
              </motion.div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-300">تابعنا على</h4>
              <div className="flex space-x-4 rtl:space-x-reverse">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-600', label: 'فيسبوك' },
                  { icon: Twitter, color: 'hover:bg-blue-400', label: 'تويتر' },
                  { icon: Instagram, color: 'hover:bg-pink-600', label: 'إنستغرام' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-gray-800 rounded-xl text-gray-400 ${social.color} hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group`}
                    title={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-2xl p-8 mb-12 border border-pink-500/20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              اشترك في نشرتنا الإخبارية
            </h3>
            <p className="text-gray-300 mb-6">احصل على أحدث العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                اشتراك
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-center md:text-right mb-4 md:mb-0">
            © 2025 متجر الأزياء الحصري. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-gray-400 text-sm">
            <Link to="#" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link to="#" className="hover:text-white transition-colors">الشروط والأحكام</Link>
            <Link to="#" className="hover:text-white transition-colors">ملفات تعريف الارتباط</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default ModernFooter;
