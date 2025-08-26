import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, ShoppingBag, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  overlay: string;
  textColor: string;
  badge?: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  category: string;
}

interface ModernHeroSliderProps {
  storeId?: string;
}

const ModernHeroSlider: React.FC<ModernHeroSliderProps> = ({ storeId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: Slide[] = [
    {
      id: '1',
      title: 'مجموعة الربيع الجديدة',
      subtitle: 'أناقة لا تُقاوم',
      description: 'اكتشف أحدث صيحات الموضة لموسم الربيع مع تشكيلة حصرية من الأزياء العصرية',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      buttonText: 'تسوق الآن',
      buttonLink: `/store/${storeId}/collections/spring`,
      secondaryButtonText: 'شاهد الكتالوج',
      secondaryButtonLink: `/store/${storeId}/catalog`,
      overlay: 'bg-gradient-to-r from-black/60 via-black/30 to-transparent',
      textColor: 'text-white',
      badge: 'جديد',
      price: '299 ر.س',
      originalPrice: '399 ر.س',
      rating: 4.8,
      category: 'أزياء نسائية'
    },
    {
      id: '2',
      title: 'تخفيضات نهاية الموسم',
      subtitle: 'وفر حتى 70%',
      description: 'فرصة ذهبية للحصول على أفضل المنتجات بأسعار لا تُصدق لفترة محدودة',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      buttonText: 'اكتشف العروض',
      buttonLink: `/store/${storeId}/sale`,
      secondaryButtonText: 'كوبون خصم',
      secondaryButtonLink: `/store/${storeId}/coupons`,
      overlay: 'bg-gradient-to-l from-purple-900/70 via-purple-600/40 to-transparent',
      textColor: 'text-white',
      badge: 'عرض محدود',
      price: '199 ر.س',
      originalPrice: '599 ر.س',
      rating: 4.9,
      category: 'تخفيضات'
    },
    {
      id: '3',
      title: 'مجموعة الإكسسوارات',
      subtitle: 'أناقة في التفاصيل',
      description: 'إكسسوارات فاخرة تضفي لمسة من الأناقة والرقي على إطلالتك اليومية',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      buttonText: 'استكشف المجموعة',
      buttonLink: `/store/${storeId}/collections/accessories`,
      overlay: 'bg-gradient-to-r from-emerald-900/60 via-emerald-600/30 to-transparent',
      textColor: 'text-white',
      badge: 'حصري',
      price: '149 ر.س',
      originalPrice: '199 ر.س',
      rating: 4.7,
      category: 'إكسسوارات'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${slides[currentSlide].overlay}`} />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className={`${slides[currentSlide].textColor} space-y-6`}
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="inline-block"
                  >
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {slides[currentSlide].badge}
                    </span>
                  </motion.div>

                  {/* Category */}
                  <div className="text-sm font-medium opacity-80">
                    {slides[currentSlide].category}
                  </div>

                  {/* Title */}
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-4xl lg:text-6xl font-bold leading-tight"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl lg:text-2xl font-medium text-purple-300"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-lg opacity-90 max-w-lg leading-relaxed"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Price and Rating */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="flex items-center space-x-6 rtl:space-x-reverse"
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="text-2xl font-bold text-green-400">
                        {slides[currentSlide].price}
                      </span>
                      {slides[currentSlide].originalPrice && (
                        <span className="text-lg line-through opacity-60">
                          {slides[currentSlide].originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(slides[currentSlide].rating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm opacity-80">
                        ({slides[currentSlide].rating})
                      </span>
                    </div>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link
                      to={slides[currentSlide].buttonLink}
                      className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      <ShoppingBag size={20} className="ml-2" />
                      {slides[currentSlide].buttonText}
                    </Link>
                    
                    {slides[currentSlide].secondaryButtonText && (
                      <Link
                        to={slides[currentSlide].secondaryButtonLink!}
                        className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-all duration-300 flex items-center justify-center border border-white/30"
                      >
                        <Play size={20} className="ml-2" />
                        {slides[currentSlide].secondaryButtonText}
                      </Link>
                    )}
                  </motion.div>
                </motion.div>

                {/* Product Preview Card */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="hidden lg:block"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <img
                        src={slides[currentSlide].image}
                        alt="Product preview"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
                        <Heart size={20} className="text-white" />
                      </button>
                    </motion.div>
                    
                    <div className="mt-4 text-white">
                      <h3 className="font-bold text-lg">{slides[currentSlide].title}</h3>
                      <p className="text-sm opacity-80 mt-1">{slides[currentSlide].category}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-xl font-bold text-green-400">
                            {slides[currentSlide].price}
                          </span>
                          {slides[currentSlide].originalPrice && (
                            <span className="text-sm line-through opacity-60">
                              {slides[currentSlide].originalPrice}
                            </span>
                          )}
                        </div>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                          إضافة للسلة
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronLeft size={24} className="text-white group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronRight size={24} className="text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 rtl:space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Control */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        {isAutoPlaying ? (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-1 h-3 bg-white mr-1"></div>
            <div className="w-1 h-3 bg-white"></div>
          </div>
        ) : (
          <Play size={16} className="text-white ml-0.5" />
        )}
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          key={currentSlide}
        />
      </div>
    </div>
  );
};

export default ModernHeroSlider;