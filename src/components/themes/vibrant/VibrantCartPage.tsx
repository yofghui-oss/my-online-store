import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, 
  Gift, Star, Heart, Sparkles 
} from 'lucide-react';

const VibrantCartPage: React.FC = () => {
  const { storeId } = useParams();

  // Mock cart items for demo
  const items = [
    {
      id: '1',
      name: 'فستان صيفي ملون',
      price: 299,
      quantity: 2,
      image: 'https://via.placeholder.com/150x150/FF69B4/FFFFFF?text=👗',
      emoji: '👗',
      size: 'M',
      color: 'وردي'
    },
    {
      id: '2',
      name: 'حقيبة يد عصرية',
      price: 199,
      quantity: 1,
      image: 'https://via.placeholder.com/150x150/9F7AEA/FFFFFF?text=👜',
      emoji: '👜',
      color: 'بنفسجي'
    },
    {
      id: '3',
      name: 'إكسسوار لامع',
      price: 89,
      quantity: 3,
      image: 'https://via.placeholder.com/150x150/4FD1C7/FFFFFF?text=✨',
      emoji: '✨'
    }
  ];

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 via-blue-500 via-green-400 to-yellow-400 py-12" style={{ backgroundSize: '400% 400%', animation: 'gradient-diagonal 8s ease infinite' }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
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
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="flex justify-center mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/40 shadow-2xl">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ShoppingCart size={40} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">
            🛍️ سلة التسوق المتألقة ✨
          </h1>
          <motion.p 
            className="text-white/90 text-xl font-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {items.length} قطعة رائعة تنتظرك! 🎉
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50, rotateY: -90 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50 hover:shadow-3xl transition-all"
                >
                  <div className="flex items-center gap-6">
                    <motion.div 
                      className="relative group"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-2xl shadow-lg"
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                        {item.emoji}
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-black text-gray-900 mb-2 flex items-center">
                            {item.name}
                            <motion.span
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                              className="ml-2"
                            >
                              {item.emoji}
                            </motion.span>
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600 font-semibold">
                            {item.size && (
                              <div className="flex items-center">
                                📏 المقاس: {item.size}
                              </div>
                            )}
                            {item.color && (
                              <div className="flex items-center">
                                🎨 اللون: {item.color}
                              </div>
                            )}
                          </div>
                        </div>
                        <motion.button 
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 font-bold">الكمية:</span>
                          <div className="flex items-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl border-2 border-purple-200">
                            <motion.button 
                              className="p-3 hover:bg-purple-200 rounded-2xl transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus size={16} className="text-purple-600" />
                            </motion.button>
                            <span className="px-6 py-3 font-black text-lg text-purple-600 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <motion.button 
                              className="p-3 hover:bg-purple-200 rounded-2xl transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus size={16} className="text-purple-600" />
                            </motion.button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <motion.div 
                            className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                          >
                            {item.price * item.quantity} ر.س
                          </motion.div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-gray-500 font-semibold">
                              {item.price} ر.س للقطعة
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Link
                to={`/store/${storeId}/products`}
                className="inline-flex items-center text-white hover:text-yellow-300 font-black text-lg group"
              >
                <motion.div
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-3"
                >
                  <ArrowRight size={20} className="rotate-180" />
                </motion.div>
                🛍️ متابعة التسوق واكتشاف المزيد
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-2"
                >
                  ✨
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 sticky top-4"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <Gift size={40} className="text-pink-500" />
                </motion.div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  ملخص الطلب
                </h3>
                <p className="text-gray-600 font-medium">🎁 طلبك الرائع جاهز!</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">المجموع الفرعي:</span>
                  <span className="font-bold">{total} ر.س</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">الشحن:</span>
                  <span className="text-green-600 font-bold">مجاني 🎉</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">الضريبة:</span>
                  <span className="font-bold">{Math.round(total * 0.15)} ر.س</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-gray-900">المجموع الكلي:</span>
                  <motion.span 
                    className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {Math.round(total + (total * 0.15))} ر.س
                  </motion.span>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  كود الخصم 🎫
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="أدخل كود الخصم"
                    className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all bg-purple-50/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                  >
                    ✓
                  </motion.button>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-black py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center"
                style={{ backgroundSize: '200% 200%', animation: 'gradientShift 3s ease infinite' }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-3"
                >
                  🛒
                </motion.div>
                إتمام الطلب
                <Sparkles size={20} className="ml-3" />
              </motion.button>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: '🔒', text: 'دفع آمن' },
                    { icon: '🚚', text: 'شحن سريع' },
                    { icon: '↩️', text: 'إرجاع مجاني' }
                  ].map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="text-2xl mb-1"
                      >
                        {badge.icon}
                      </motion.div>
                      <span className="text-xs font-bold text-gray-600">{badge.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibrantCartPage;