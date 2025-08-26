import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Rocket, Star, Heart, Sparkles, ArrowRight, Play, Flame } from 'lucide-react';

interface VibrantHomeBannerProps {
  storeId: string;
}

const VibrantHomeBanner: React.FC<VibrantHomeBannerProps> = ({ storeId }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-400 via-purple-500 via-blue-500 via-green-400 to-yellow-400 min-h-screen flex items-center" style={{ backgroundSize: '400% 400%', animation: 'gradient-diagonal 8s ease infinite' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              i % 4 === 0 ? 'w-6 h-6 bg-white/30 rounded-full' :
              i % 4 === 1 ? 'w-4 h-4 bg-yellow-300/40 rotate-45' :
              i % 4 === 2 ? 'w-8 h-2 bg-pink-300/30 rounded-full' :
              'w-5 h-5 bg-blue-300/40 rounded-full'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-40, 40, -40],
              x: [-30, 30, -30],
              rotate: [0, 360, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}

        {/* Pulse Rings */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border-4 border-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.4, 0, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12 text-center lg:text-right"
            initial={{ opacity: 0, x: -100, rotateY: -90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            {/* Trending Badge */}
            <motion.div 
              className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/40 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, y: 30, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Flame size={20} className="text-white ml-3" />
              </motion.div>
              <span className="text-white font-bold text-sm">
                🔥 ترند المواسم - مجموعة جديدة ومثيرة
              </span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles size={16} className="text-yellow-300 mr-3" />
              </motion.div>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.span 
                className="block"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: "linear-gradient(45deg, #fff, #fbbf24, #f97316, #ec4899, #8b5cf6, #3b82f6, #10b981, #fff)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                أزياء
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                نابضة
              </motion.span>
              <motion.span 
                className="block text-white text-4xl md:text-5xl lg:text-6xl font-normal mt-2"
                animate={{ rotate: [0, 1, -1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                بالحياة! ✨
              </motion.span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              🌈 اكتشف عالماً مليئاً بالألوان والطاقة الإيجابية! 
              مجموعة من الأزياء العصرية التي تعكس شخصيتك المتفائلة وتجعلك تتألق في كل مكان! 
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block"
              >
                💫
              </motion.span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={`/store/${storeId}/products`}
                  className="group px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-yellow-300 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center transform hover:rotate-1 border-4 border-white/30"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="ml-3"
                  >
                    <Rocket size={24} />
                  </motion.div>
                  تسوق الآن - انطلق معنا!
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mr-3"
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={`/store/${storeId}/video-collection`}
                  className="group px-8 py-4 bg-transparent border-4 border-white text-white font-black rounded-2xl hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm flex items-center justify-center transform hover:-rotate-1"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-3"
                  >
                    <Play size={20} />
                  </motion.div>
                  شاهد المجموعة
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Trending Stats */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center lg:text-right"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              {[
                { icon: Heart, number: "15K+", text: "عميل سعيد", color: "text-red-300" },
                { icon: Star, number: "4.9", text: "تقييم عالي", color: "text-yellow-300" },
                { icon: Zap, number: "500+", text: "منتج حيوي", color: "text-blue-300" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center lg:items-start"
                >
                  <div className="flex items-center mb-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <stat.icon size={24} className={`${stat.color} ml-2`} />
                    </motion.div>
                    <span className="text-2xl font-black text-white">{stat.number}</span>
                  </div>
                  <span className="text-white/80 font-medium">{stat.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Image/Video */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 100 }}
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div 
                className="relative overflow-hidden rounded-3xl"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Vibrant Fashion Collection"
                  className="w-full h-auto object-cover filter brightness-110 contrast-110 saturate-125"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(255, 255, 255, 0.7)",
                        "0 0 0 20px rgba(255, 255, 255, 0)",
                        "0 0 0 0 rgba(255, 255, 255, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Play size={32} className="text-black ml-1" />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Floating Price Tags */}
              <motion.div 
                className="absolute -top-8 -left-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-2xl shadow-2xl font-black"
                initial={{ y: 30, opacity: 0, rotate: -15 }}
                animate={{ y: 0, opacity: 1, rotate: -10 }}
                transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <div className="text-center">
                  <div className="text-sm mb-1 flex items-center">
                    خصم حار 🔥
                  </div>
                  <div className="text-xl font-black">50% OFF</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-8 -right-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-black"
                initial={{ y: -30, opacity: 0, rotate: 15 }}
                animate={{ y: 0, opacity: 1, rotate: 10 }}
                transition={{ delay: 1.4, duration: 0.8, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="text-center">
                  <div className="text-sm mb-1 flex items-center">
                    جديد ✨
                  </div>
                  <div className="text-lg font-black">مجموعة 2025</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 -left-6 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-3 rounded-full shadow-2xl"
                initial={{ x: -30, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  x: { delay: 1.6, duration: 0.8 },
                  opacity: { delay: 1.6, duration: 0.8 },
                  y: { duration: 3, repeat: Infinity },
                  rotate: { duration: 3, repeat: Infinity }
                }}
                whileHover={{ scale: 1.1, x: 5 }}
              >
                <div className="text-center font-black">
                  <Heart size={24} className="text-white mx-auto mb-1" />
                  <div className="text-xs">أحبه ❤️</div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <motion.div
              className="absolute -z-10 top-20 left-20 w-40 h-40 border-4 border-white/30 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -z-10 bottom-20 right-20 w-32 h-32 border-4 border-yellow-300/40 rounded-full"
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for gradient animation */}
      <style>{`
        @keyframes gradient-diagonal {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
        .animate-gradient-diagonal {
          animation: gradient-diagonal 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default VibrantHomeBanner;