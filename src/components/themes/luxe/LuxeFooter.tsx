import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Crown, Diamond, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const LuxeFooter: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-neutral-900 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"%3E%3Cpath d="M20 20c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm20-18c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18z"/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '40px 40px'
        }} />
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
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm blur-sm opacity-50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm flex items-center justify-center">
                  <Crown className="text-black" size={24} />
                </div>
              </div>
              <div className="ltr:ml-4 rtl:mr-4">
                <h3 className="text-2xl font-serif font-bold text-yellow-400">
                  بوتيك الأناقة الفاخرة
                </h3>
                <p className="text-neutral-400 text-sm flex items-center font-serif">
                  <Diamond size={12} className="ltr:mr-1 rtl:ml-1" />
                  حيث تلتقي الفخامة بالجمال
                </p>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed mb-6 font-serif">
              نقدم لعملائنا المميزين أرقى وأفخم المجموعات من الأزياء والإكسسوارات الحصرية. 
              كل قطعة في مجموعتنا مختارة بعناية فائقة لتعكس ذوقك الرفيع وشخصيتك المتميزة.
            </p>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <div className="flex items-center text-yellow-400">
                <Award size={16} className="ltr:mr-2 rtl:ml-2" />
                <span className="text-sm text-neutral-300 font-serif">جودة حصرية معتمدة</span>
              </div>
            </div>
          </motion.div>

          {/* Exclusive Collections */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-serif font-bold mb-6 flex items-center text-yellow-400">
              <span className="w-2 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full ltr:mr-3 rtl:ml-3"></span>
              المجموعات الحصرية
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'مجموعة الكوتور', icon: '👗' },
                { name: 'الإكسسوارات الفاخرة', icon: '💎' },
                { name: 'العطور النادرة', icon: '🌹' },
                { name: 'الحقائب المحدودة', icon: '👜' },
                { name: 'المجوهرات الحصرية', icon: '💍' },
                { name: 'الأوشحة الحريرية', icon: '🧣' }
              ].map((item, index) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="#" 
                    className="group flex items-center text-neutral-300 hover:text-yellow-400 transition-colors duration-300 font-serif"
                  >
                    <span className="ltr:mr-3 rtl:ml-3 group-hover:scale-110 transition-transform">{item.icon}</span>
                    {item.name}
                    <motion.div 
                      className="ltr:ml-2 rtl:mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400"
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

          {/* Contact & Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-serif font-bold mb-6 flex items-center text-yellow-400">
              <span className="w-2 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full ltr:mr-3 rtl:ml-3"></span>
              خدمات مميزة
            </h3>
            <div className="space-y-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-neutral-800/50 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm ltr:mr-3 rtl:ml-3">
                    <Phone size={14} className="text-black" />
                  </div>
                  <div>
                    <p className="text-neutral-400 text-xs font-serif">خدمة عملاء مميزة</p>
                    <p className="text-white font-medium font-serif">+966 50 999 8888</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-neutral-800/50 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm ltr:mr-3 rtl:ml-3">
                    <Mail size={14} className="text-black" />
                  </div>
                  <div>
                    <p className="text-neutral-400 text-xs font-serif">للاستفسارات الحصرية</p>
                    <p className="text-white font-medium font-serif">vip@luxeboutique.com</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-neutral-800/50 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm ltr:mr-3 rtl:ml-3">
                    <MapPin size={14} className="text-black" />
                  </div>
                  <div>
                    <p className="text-neutral-400 text-xs font-serif">صالة العرض الرئيسية</p>
                    <p className="text-white font-medium font-serif">برج المملكة، الرياض</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-lg font-serif font-semibold mb-4 text-neutral-300">تواصل معنا</h4>
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
                    className={`p-3 bg-neutral-800 rounded-sm text-neutral-400 ${social.color} hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-yellow-500/20 hover:border-yellow-500/40`}
                    title={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* VIP Club Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-lg p-8 mb-12 border border-yellow-500/30"
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full">
                <Crown size={32} className="text-black" />
              </div>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-yellow-400">
              انضم لنادي VIP الحصري
            </h3>
            <p className="text-neutral-300 mb-6 font-serif max-w-2xl mx-auto">
              احصل على وصول مبكر للمجموعات الجديدة، خصومات حصرية، ودعوات لأحداث الموضة الراقية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="عنوان بريدك الإلكتروني"
                className="flex-1 px-4 py-3 bg-neutral-800 border border-yellow-500/30 text-white placeholder-neutral-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all font-serif"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium font-serif hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                انضمام حصري
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-neutral-400 text-center md:text-right mb-4 md:mb-0 font-serif">
            © 2025 بوتيك الأناقة الفاخرة. جميع الحقوق محفوظة. صُنع بحرفية عالية.
          </p>
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-neutral-400 text-sm font-serif">
            <Link to="#" className="hover:text-yellow-400 transition-colors">سياسة الخصوصية</Link>
            <Link to="#" className="hover:text-yellow-400 transition-colors">الشروط والأحكام</Link>
            <Link to="#" className="hover:text-yellow-400 transition-colors">شهادة الأصالة</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default LuxeFooter;
