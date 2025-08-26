import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Crown, Diamond, Sparkles } from 'lucide-react';

const LuxeHomeBanner: React.FC = () => {
  const { storeId } = useParams();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23000000" fill-opacity="0.1" fill-rule="evenodd"%3E%3Cpath d="M20 20c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm20-18c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18z"/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Luxury Badge */}
            <motion.div 
              className="inline-flex items-center bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-400/30 rounded-full px-6 py-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Crown size={18} className="text-yellow-600 ml-2" />
              <span className="text-sm font-serif font-medium text-neutral-800">
                مجموعة حصرية ومحدودة
              </span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-neutral-900 mb-8 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="block">الفخامة</span>
              <span className="block text-yellow-600">الحقيقية</span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-normal text-neutral-700 mt-2">
                تبدأ من هنا
              </span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              اكتشف عالماً من الأناقة والرقي مع مجموعتنا الحصرية من الأزياء والإكسسوارات الفاخرة. 
              كل قطعة مصممة خصيصاً لتعكس ذوقك الرفيع وتميزك الاستثنائي.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Link 
                to={`/store/${storeId}/collections/exclusive`}
                className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-serif font-medium hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                تسوق المجموعة الحصرية
                <ArrowRight size={18} className="mr-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to={`/store/${storeId}/about-luxury`}
                className="px-8 py-4 border-2 border-neutral-800 text-neutral-800 font-serif font-medium hover:bg-neutral-800 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                قصة العلامة التجارية
              </Link>
            </motion.div>
            
            {/* Luxury Features */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center lg:text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm flex items-center justify-center mb-3">
                  <Crown size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-neutral-900 mb-1">حصرية مطلقة</h3>
                  <p className="text-sm text-neutral-600 font-serif">قطع محدودة العدد</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm flex items-center justify-center mb-3">
                  <Diamond size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-neutral-900 mb-1">جودة استثنائية</h3>
                  <p className="text-sm text-neutral-600 font-serif">خامات فاخرة</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm flex items-center justify-center mb-3">
                  <Sparkles size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-neutral-900 mb-1">خدمة مميزة</h3>
                  <p className="text-sm text-neutral-600 font-serif">تجربة شخصية</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Fashion Collection"
                  className="w-full h-auto object-cover filter sepia-[0.2] contrast-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Price Tags */}
              <motion.div 
                className="absolute -top-6 -left-6 bg-white border-2 border-yellow-400 rounded-sm p-4 shadow-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-sm text-neutral-600 font-serif mb-1">بداية من</div>
                  <div className="text-2xl font-bold text-yellow-600 font-serif">1,299 ر.س</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-black text-white rounded-sm p-4 shadow-xl"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-xs text-yellow-400 font-serif mb-1">مجموعة حديثة</div>
                  <div className="text-sm font-bold text-white font-serif">صيف 2025</div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <motion.div
              className="absolute -z-10 top-10 left-10 w-32 h-32 border border-yellow-400/30 rounded-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -z-10 bottom-10 right-10 w-24 h-24 border border-yellow-400/30 rounded-sm"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LuxeHomeBanner;