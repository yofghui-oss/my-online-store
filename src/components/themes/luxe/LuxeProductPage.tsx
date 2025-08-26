import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  Heart, Star, ShoppingCart, Truck, Shield, Award, 
  ChevronLeft, ChevronRight, Crown, Diamond, Sparkles,
  Check, Plus, Minus, Share2, MessageCircle
} from 'lucide-react';

const LuxeProductPage: React.FC = () => {
  const { storeId, productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1549062572-544a64fb0c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const luxuryFeatures = [
    { icon: Crown, title: 'حصرية مطلقة', desc: 'قطعة محدودة الإصدار' },
    { icon: Diamond, title: 'جودة استثنائية', desc: 'خامات فاخرة مختارة بعناية' },
    { icon: Award, title: 'ضمان الأصالة', desc: 'شهادة أصالة مع كل قطعة' },
    { icon: Sparkles, title: 'خدمة شخصية', desc: 'استشارة أسلوب مجانية' }
  ];

  const relatedProducts = [
    { id: 1, name: 'فستان حرير فاخر', price: 1899, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'جاكيت كشمير', price: 2299, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'حقيبة جلد طبيعي', price: 1599, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: 4, name: 'عقد لؤلؤ طبيعي', price: 3499, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative bg-white border border-neutral-200 overflow-hidden">
              <motion.div
                className="absolute top-4 right-4 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-sm transition-all ${
                    isFavorite 
                      ? 'bg-neutral-900 text-white' 
                      : 'bg-white text-neutral-600 hover:bg-neutral-900 hover:text-white border border-neutral-200'
                  }`}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </motion.div>

              <div className="relative aspect-square">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt="Luxury Product"
                  className="w-full h-full object-cover filter sepia-[0.1] contrast-110"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                
                {/* Image Navigation */}
                <button
                  onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 border border-neutral-200 hover:bg-white transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 border border-neutral-200 hover:bg-white transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Luxury Badge */}
              <motion.div
                className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 font-serif font-medium text-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                مجموعة حصرية
              </motion.div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 border-2 transition-all ${
                    selectedImage === index
                      ? 'border-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover filter sepia-[0.1]" />
                  {selectedImage === index && (
                    <motion.div
                      className="absolute inset-0 bg-neutral-900/10"
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
              <div className="flex items-center mb-4">
                <Crown size={20} className="text-yellow-600 mr-2" />
                <span className="text-sm font-serif text-neutral-600">مجموعة الفخامة الحصرية</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-neutral-900 mb-4 leading-tight">
                فستان حرير إيطالي فاخر
              </h1>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-600 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-neutral-600 font-serif">5.0 (47 تقييم)</span>
              </div>

              <div className="flex items-baseline space-x-4 rtl:space-x-reverse">
                <span className="text-4xl font-serif font-bold text-neutral-900">1,899 ر.س</span>
                <span className="text-xl text-neutral-500 line-through font-serif">2,399 ر.س</span>
                <span className="bg-neutral-900 text-white px-3 py-1 text-sm font-serif">
                  خصم 21%
                </span>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white border border-neutral-200 p-6">
              <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-3 flex items-center">
                <Diamond size={18} className="mr-2 text-yellow-600" />
                وصف المنتج
              </h3>
              <p className="text-neutral-700 leading-relaxed font-serif">
                فستان من الحرير الإيطالي الخالص، مصمم خصيصاً للمرأة التي تقدر الفخامة والأناقة. 
                يتميز بقصة كلاسيكية خالدة وتفاصيل رقيقة تعكس الحرفية العالية والذوق الرفيع.
                مناسب للمناسبات الخاصة والسهرات الراقية.
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-4 flex items-center">
                <span className="mr-2">📏</span>
                اختر المقاس
              </h3>
              <div className="flex space-x-3 rtl:space-x-reverse">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 border-2 font-serif font-medium transition-all ${
                      selectedSize === size
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-500'
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
            <div className="bg-white border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="text-lg font-serif font-semibold text-neutral-900">الكمية:</span>
                  <div className="flex items-center border border-neutral-300">
                    <motion.button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus size={18} />
                    </motion.button>
                    <span className="px-6 py-3 font-serif font-semibold text-lg min-w-[4rem] text-center">{quantity}</span>
                    <motion.button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus size={18} />
                    </motion.button>
                  </div>
                </div>

                <div className="flex space-x-3 rtl:space-x-reverse">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 border border-neutral-300 text-neutral-600 hover:border-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    <Share2 size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 border border-neutral-300 text-neutral-600 hover:border-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    <MessageCircle size={20} />
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-neutral-900 text-white font-serif font-semibold py-4 hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl text-lg flex items-center justify-center space-x-3 rtl:space-x-reverse"
              >
                <ShoppingCart size={20} />
                <span>إضافة للسلة</span>
              </motion.button>
            </div>

            {/* Luxury Features */}
            <div className="grid grid-cols-2 gap-4">
              {luxuryFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-neutral-200 p-4 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                      <feature.icon size={20} className="text-black" />
                    </div>
                  </div>
                  <h4 className="font-serif font-semibold text-neutral-900 mb-1 text-sm">{feature.title}</h4>
                  <p className="text-xs text-neutral-600 font-serif">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Services */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 p-6">
              <h3 className="font-serif font-semibold text-neutral-900 mb-4 flex items-center">
                <Crown size={18} className="mr-2 text-yellow-600" />
                خدمات VIP
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: Truck, title: 'توصيل فوري', desc: 'خلال 24 ساعة' },
                  { icon: Shield, title: 'ضمان مدى الحياة', desc: 'على جميع المنتجات' },
                  { icon: Award, title: 'خدمة عملاء مخصصة', desc: '24/7 دعم فوري' }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                  >
                    <div className="p-2 bg-white border border-yellow-300">
                      <service.icon size={16} className="text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-serif font-semibold text-neutral-900 text-sm">{service.title}</div>
                      <div className="text-xs text-neutral-600 font-serif">{service.desc}</div>
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
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-neutral-900 mb-4">
              منتجات ذات صلة
            </h2>
            <p className="text-neutral-600 font-serif">اكتشف المزيد من مجموعتنا الحصرية</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-neutral-200 overflow-hidden group cursor-pointer transition-all hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover filter sepia-[0.1] group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-serif font-semibold text-neutral-900 mb-2 text-sm">{product.name}</h3>
                  <p className="text-lg font-serif font-bold text-neutral-900">{product.price} ر.س</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LuxeProductPage;