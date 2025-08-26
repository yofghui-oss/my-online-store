import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  Heart, Star, ShoppingCart, Truck, Shield, Award, 
  ChevronLeft, ChevronRight, Zap, Sparkles, Gift,
  Check, Plus, Minus, Share2, MessageCircle
} from 'lucide-react';

const VibrantProductPage: React.FC = () => {
  const { storeId, productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('pink');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    'https://via.placeholder.com/600x800/FF69B4/FFFFFF?text=🌈+فستان+ملون+1',
    'https://via.placeholder.com/600x800/9F7AEA/FFFFFF?text=💜+فستان+ملون+2',
    'https://via.placeholder.com/600x800/4FD1C7/FFFFFF?text=💙+فستان+ملون+3',
    'https://via.placeholder.com/600x800/F093FB/FFFFFF?text=🌸+فستان+ملون+4'
  ];

  const colors = [
    { name: 'وردي', value: 'pink', bg: 'bg-pink-400', emoji: '🌸' },
    { name: 'بنفسجي', value: 'purple', bg: 'bg-purple-400', emoji: '💜' },
    { name: 'أزرق', value: 'blue', bg: 'bg-blue-400', emoji: '💙' },
    { name: 'أخضر', value: 'green', bg: 'bg-green-400', emoji: '💚' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const features = [
    { icon: '✨', title: 'جودة عالية', desc: 'خامات فاخرة ومريحة' },
    { icon: '🌈', title: 'ألوان زاهية', desc: 'ألوان ثابتة لا تبهت' },
    { icon: '🎨', title: 'تصميم عصري', desc: 'يناسب جميع المناسبات' },
    { icon: '🌟', title: 'راحة فائقة', desc: 'مريح طوال اليوم' }
  ];

  const relatedProducts = [
    { id: 1, name: 'فستان كاجوال', price: 199, emoji: '👗', color: 'from-pink-400 to-rose-400' },
    { id: 2, name: 'بلوزة أنيقة', price: 149, emoji: '👚', color: 'from-purple-400 to-indigo-400' },
    { id: 3, name: 'تنورة قصيرة', price: 129, emoji: '🩱', color: 'from-blue-400 to-cyan-400' },
    { id: 4, name: 'جاكيت عصري', price: 299, emoji: '🧥', color: 'from-green-400 to-emerald-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-cyan-50 py-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, #FF69B4, #9F7AEA, #4FD1C7)`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              rotate: [0, 360, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-xl overflow-hidden">
              <motion.div
                className="absolute top-4 right-4 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-full transition-all ${
                    isFavorite 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </motion.div>

              <div className="relative aspect-square">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt="Product"
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                
                {/* Image Navigation */}
                <button
                  onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Special Badge */}
              <motion.div
                className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="mr-1">🔥</span>
                الأكثر مبيعاً
              </motion.div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-pink-400 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  {selectedImage === index && (
                    <motion.div
                      className="absolute inset-0 bg-pink-400/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 flex items-center">
                <span className="mr-3 text-4xl">👗</span>
                فستان صيفي ملون وحيوي
              </h1>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-gray-600 font-medium">4.9 (247 تقييم) ⭐</span>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-3xl font-black text-pink-600">299 ر.س</span>
                <span className="text-xl text-gray-500 line-through">399 ر.س</span>
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  🎉 خصم 25%
                </span>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-6 border border-pink-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">✨</span>
                وصف المنتج
              </h3>
              <p className="text-gray-700 leading-relaxed">
                فستان صيفي رائع بألوان زاهية ونابضة بالحياة، مصنوع من أجود الخامات المريحة والقابلة للتنفس. 
                يتميز بتصميم عصري يناسب جميع المناسبات اليومية والخاصة. متوفر بألوان متعددة وأحجام مختلفة.
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🎨</span>
                اختر اللون
              </h3>
              <div className="flex space-x-4 rtl:space-x-reverse">
                {colors.map((color) => (
                  <motion.button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-gray-800 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-8 h-8 ${color.bg} rounded-full mb-2 shadow-md`} />
                    <span className="text-2xl">{color.emoji}</span>
                    <span className="text-xs font-medium text-gray-700">{color.name}</span>
                    {selectedColor === color.value && (
                      <motion.div
                        className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check size={12} className="text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📏</span>
                اختر المقاس
              </h3>
              <div className="flex space-x-3 rtl:space-x-reverse">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl border-2 font-bold transition-all ${
                      selectedSize === size
                        ? 'border-purple-500 bg-purple-500 text-white shadow-lg'
                        : 'border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="text-lg font-bold text-gray-800">الكمية:</span>
                  <div className="flex items-center bg-gray-100 rounded-2xl">
                    <motion.button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus size={20} />
                    </motion.button>
                    <span className="px-4 py-2 font-bold text-lg">{quantity}</span>
                    <motion.button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus size={20} />
                    </motion.button>
                  </div>
                </div>

                <div className="flex space-x-3 rtl:space-x-reverse">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-blue-100 text-blue-600 rounded-2xl hover:bg-blue-200 transition-colors"
                  >
                    <Share2 size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-green-100 text-green-600 rounded-2xl hover:bg-green-200 transition-colors"
                  >
                    <MessageCircle size={20} />
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-3 rtl:space-x-reverse"
              >
                <ShoppingCart size={24} />
                <span className="text-lg">إضافة للسلة</span>
                <span className="text-2xl">🛍️</span>
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{feature.icon}</span>
                    <h4 className="font-bold text-gray-800">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Shipping & Returns */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-6 border border-blue-200">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: Truck, title: 'شحن مجاني', desc: 'للطلبات فوق 200 ر.س', emoji: '🚚' },
                  { icon: Shield, title: 'ضمان الجودة', desc: '30 يوم لإرجاع المنتج', emoji: '🛡️' },
                  { icon: Award, title: 'خدمة مميزة', desc: 'دعم على مدار الساعة', emoji: '🏆' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                  >
                    <div className="p-2 bg-white rounded-xl shadow-md">
                      <item.icon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-sm flex items-center">
                        <span className="mr-1">{item.emoji}</span>
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-600">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-black text-center bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-12 flex items-center justify-center">
            <span className="mr-3 text-3xl">✨</span>
            منتجات مشابهة
            <span className="ml-3 text-3xl">🌟</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-3xl p-6 border-2 border-gray-200 hover:border-pink-300 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className={`aspect-square bg-gradient-to-br ${product.color} rounded-2xl mb-4 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform`}>
                  {product.emoji}
                </div>
                <h3 className="font-bold text-gray-800 text-center mb-2">{product.name}</h3>
                <p className={`text-2xl font-bold text-center bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
                  {product.price} ر.س
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VibrantProductPage;