import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, 
  Star, Heart, Zap, Flame, Rocket, Music, Gamepad2, 
  CreditCard, Truck, Shield, Award, Users
} from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

const VibrantFooter: React.FC = () => {
  const { storeId } = useParams();
  const { currentStore } = useStore();

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500" style={{ backgroundSize: '400% 400%', animation: 'gradient-diagonal 8s ease infinite' }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2, 1],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${
              i % 3 === 0 ? 'w-8 h-8 bg-yellow-400/30 rounded-full' :
              i % 3 === 1 ? 'w-6 h-6 bg-pink-400/30 rotate-45' :
              'w-10 h-2 bg-blue-400/30 rounded-full'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50, rotateY: -90 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-white rounded-full blur-xl opacity-50"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                    <Zap className="text-white animate-pulse" size={32} />
                  </div>
                </motion.div>
                <div className="ltr:ml-4 rtl:mr-4">
                  <h3 className="text-2xl font-black bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-lg">
                    {currentStore?.name}
                  </h3>
                  <div className="flex items-center text-white/90 text-sm font-bold">
                    <Flame size={12} className="ltr:mr-1 rtl:ml-1 animate-bounce" />
                    <span>متجر الأزياء الحيوي</span>
                    <Rocket size={12} className="ltr:ml-1 rtl:mr-1 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
              
              <p className="text-white/90 font-medium leading-relaxed">
                اكتشف عالم الأزياء الحيوي معنا! نقدم أحدث صيحات الموضة بألوان نابضة بالحياة وتصاميم عصرية تعكس شخصيتك المتميزة.
              </p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.3, rotate: 360 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-white/90 font-bold">4.9/5</span>
                <span className="text-white/70">(2,847 تقييم)</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center">
                <Music className="text-yellow-400 ltr:mr-3 rtl:ml-3 animate-bounce" size={24} />
                <h4 className="text-xl font-black text-white">روابط سريعة</h4>
              </div>
              <nav className="space-y-3">
                {[
                  { name: 'الرئيسية', path: '', icon: Zap },
                  { name: 'المنتجات الحيوية', path: '/products', icon: Flame },
                  { name: 'العروض النارية', path: '/offers', icon: Rocket },
                  { name: 'من نحن', path: '/about', icon: Users },
                  { name: 'تواصل معنا', path: '/contact', icon: Mail },
                  { name: 'المدونة الحيوية', path: '/blog', icon: Gamepad2 }
                ].map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.05 }}
                  >
                    <Link 
                      to={`/store/${storeId}${link.path}`} 
                      className="group flex items-center text-white/80 hover:text-white transition-all duration-300 font-medium"
                    >
                      <link.icon size={16} className="ltr:mr-3 rtl:ml-3 group-hover:animate-spin transition-all" />
                      <span className="group-hover:font-bold transition-all">{link.name}</span>
                      <motion.span 
                        className="ltr:ml-auto rtl:mr-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotateX: 90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center">
                <Phone className="text-green-400 ltr:mr-3 rtl:ml-3 animate-bounce" size={24} />
                <h4 className="text-xl font-black text-white">تواصل معنا</h4>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Phone, text: '+966 50 123 4567', color: 'text-green-400' },
                  { icon: Mail, text: 'info@vibrantstore.com', color: 'text-blue-400' },
                  { icon: MapPin, text: 'الرياض، المملكة العربية السعودية', color: 'text-red-400' }
                ].map((contact, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center group cursor-pointer"
                  >
                    <div className={`p-2 rounded-xl ${contact.color} bg-white/10 ltr:mr-3 rtl:ml-3 group-hover:bg-white/20 transition-all group-hover:scale-110`}>
                      <contact.icon size={18} />
                    </div>
                    <span className="text-white/90 font-medium group-hover:text-white group-hover:font-bold transition-all">
                      {contact.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features & Newsletter */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotateY: 90 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center">
                <Heart className="text-pink-400 ltr:mr-3 rtl:ml-3 animate-bounce" size={24} />
                <h4 className="text-xl font-black text-white">مميزاتنا الحيوية</h4>
              </div>
              
              {/* Features */}
              <div className="space-y-3">
                {[
                  { icon: Truck, text: 'شحن مجاني', color: 'from-blue-400 to-cyan-400' },
                  { icon: Shield, text: 'ضمان الجودة', color: 'from-green-400 to-emerald-400' },
                  { icon: CreditCard, text: 'دفع آمن', color: 'from-purple-400 to-pink-400' },
                  { icon: Award, text: 'خدمة مميزة', color: 'from-yellow-400 to-orange-400' }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center group"
                  >
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${feature.color} ltr:mr-3 rtl:ml-3 group-hover:scale-110 transition-transform shadow-lg`}>
                      <feature.icon size={16} className="text-white" />
                    </div>
                    <span className="text-white/90 font-medium group-hover:text-white group-hover:font-bold transition-all">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Newsletter */}
              <div className="mt-8">
                <h5 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Mail className="ltr:mr-2 rtl:ml-2 text-yellow-400 animate-pulse" size={20} />
                  النشرة الحيوية
                </h5>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="بريدك الإلكتروني..."
                    className="flex-1 px-4 py-3 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:ring-4 focus:ring-white/50 focus:border-white/50 transition-all font-medium"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-white/50"
                  >
                    اشتراك
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              
              {/* Social Media */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center space-x-6 rtl:space-x-reverse"
              >
                <span className="text-white font-bold flex items-center">
                  <Users className="ltr:mr-2 rtl:ml-2 text-blue-400" size={20} />
                  تابعنا:
                </span>
                {[
                  { icon: Facebook, color: 'from-blue-600 to-blue-400', hover: 'hover:from-blue-500 hover:to-blue-300' },
                  { icon: Twitter, color: 'from-sky-500 to-sky-300', hover: 'hover:from-sky-400 hover:to-sky-200' },
                  { icon: Instagram, color: 'from-pink-600 via-purple-500 to-orange-400', hover: 'hover:from-pink-500 hover:via-purple-400 hover:to-orange-300' },
                  { icon: Youtube, color: 'from-red-600 to-red-400', hover: 'hover:from-red-500 hover:to-red-300' }
                ].map((social, index) => (
                  <motion.button 
                    key={index}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.3, 
                      rotate: 360,
                      y: -5
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-2xl bg-gradient-to-r ${social.color} ${social.hover} text-white shadow-lg hover:shadow-2xl transition-all border border-white/30`}
                  >
                    <social.icon size={24} />
                  </motion.button>
                ))}
              </motion.div>

              {/* Copyright */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center md:text-right rtl:md:text-left"
              >
                <p className="text-white/90 font-bold flex items-center justify-center md:justify-end rtl:md:justify-start">
                  <motion.span 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="ltr:mr-2 rtl:ml-2"
                  >
                    ©
                  </motion.span>
                  2025 {currentStore?.name} - جميع الحقوق محفوظة
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ltr:ml-2 rtl:mr-2"
                  >
                    <Heart className="text-red-400 fill-current" size={16} />
                  </motion.div>
                </p>
                <div className="flex items-center justify-center md:justify-end rtl:md:justify-start space-x-4 rtl:space-x-reverse mt-2">
                  {[
                    'سياسة الخصوصية',
                    'الشروط والأحكام',
                    'سياسة الإرجاع'
                  ].map((policy, index) => (
                    <motion.a 
                      key={policy}
                      href="#"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, color: '#ffffff' }}
                      className="text-white/70 hover:text-white text-sm font-medium transition-all"
                    >
                      {policy}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for gradient animation */}
      <style>{`
        @keyframes gradient-diagonal {
          0% {
            background-position: 0% 0%;
          }
          25% {
            background-position: 100% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        .animate-gradient-diagonal {
          animation: gradient-diagonal 8s ease infinite;
        }
      `}</style>
    </motion.footer>
  );
};

export default VibrantFooter;
