import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Crown, Diamond, Star, 
  Calendar, Phone, Award, Sparkles, Eye, ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface LuxurySlide {
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
  textAlign: 'left' | 'center' | 'right';
  price?: string;
  originalPrice?: string;
  exclusiveOffer?: string;
  personalShopper?: boolean;
  limitedEdition?: boolean;
  handcrafted?: boolean;
  category: string;
}

interface LuxeHeroSliderProps {
  storeId?: string;
}

const LuxeHeroSlider: React.FC<LuxeHeroSliderProps> = ({ storeId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: LuxurySlide[] = [
    {
      id: '1',
      title: 'مجموعة الماس الملكية',
      subtitle: 'تحفة فنية لا تُقدر بثمن',
      description: 'اكتشف مجموعة حصرية من المجوهرات الفاخرة المصنوعة يدوياً بأرقى المواد الخام وأجود الأحجار الكريمة',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      buttonText: 'حجز موعد خاص',
      buttonLink: `/store/${storeId}/vip/appointment`,
      secondaryButtonText: 'عرض المجموعة',
      secondaryButtonLink: `/store/${storeId}/collections/royal-diamonds`,
      overlay: 'bg-gradient-to-r from-black/80 via-black/60 to-black/40',
      textAlign: 'right',
      price: '50,000 ر.س',
      originalPrice: '75,000 ر.س',
      exclusiveOffer: 'عرض حصري لفترة محدودة',
      personalShopper: true,
      limitedEdition: true,
      handcrafted: true,
      category: 'مجوهرات فاخرة'
    },
    {
      id: '2',
      title: 'أزياء كوتور حصرية',
      subtitle: 'تصاميم لا تتكرر',
      description: 'قطع أزياء راقية مصممة خصيصاً لك من قبل أشهر المصممين العالميين، كل قطعة تحكي قصة من الأناقة والرقي',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      buttonText: 'استشارة مجانية',
      buttonLink: `/store/${storeId}/vip/consultation`,
      secondaryButtonText: 'أتيليه خاص',
      secondaryButtonLink: `/store/${storeId}/couture/atelier`,
      overlay: 'bg-gradient-to-l from-amber-900/70 via-amber-600/50 to-transparent',
      textAlign: 'left',
      price: '15,000 ر.س',
      originalPrice: '25,000 ر.س',
      exclusiveOffer: 'تفصيل حسب الطلب',
      personalShopper: true,
      limitedEdition: false,
      handcrafted: true,
      category: 'أزياء كوتور'
    },
    {
      id: '3',
      title: 'ساعات سويسرية نادرة',
      subtitle: 'إرث من الدقة والفخامة',
      description: 'مجموعة محدودة من الساعات السويسرية الفاخرة المصنوعة بحرفية عالية ودقة متناهية، كل ساعة قطعة فنية فريدة',
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      buttonText: 'معاينة خاصة',
      buttonLink: `/store/${storeId}/vip/preview`,
      secondaryButtonText: 'قائمة الانتظار',
      secondaryButtonLink: `/store/${storeId}/waitlist/swiss-watches`,
      overlay: 'bg-gradient-to-r from-slate-900/80 via-slate-700/60 to-transparent',
      textAlign: 'center',
      price: '85,000 ر.س',
      exclusiveOffer: 'قطع محدودة - 12 ساعة فقط',
      personalShopper: true,
      limitedEdition: true,
      handcrafted: true,
      category: 'ساعات فاخرة'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

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
    <div className="relative h-[700px] lg:h-[800px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Ken Burns Effect */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 7, ease: "linear" }}
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${slides[currentSlide].overlay}`} />
          </motion.div>

          {/* Luxury Elements */}
          <div className="absolute inset-0">
            {/* Golden Border Effect */}
            <div className="absolute inset-0 border border-amber-500/30 m-8" />
            <div className="absolute inset-0 border border-amber-400/20 m-12" />
            
            {/* Sparkle Effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="absolute top-20 right-20"
            >
              <Sparkles className="text-amber-400 w-6 h-6" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, delay: 1 }}
              className="absolute bottom-32 left-16"
            >
              <Diamond className="text-amber-300 w-5 h-5" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 w-full">
              <div className={`${
                slides[currentSlide].textAlign === 'center' ? 'text-center' :
                slides[currentSlide].textAlign === 'right' ? 'text-right' : 'text-left'
              } max-w-4xl ${
                slides[currentSlide].textAlign === 'center' ? 'mx-auto' :
                slides[currentSlide].textAlign === 'right' ? 'mr-0 ml-auto' : 'ml-0'
              }`}>
                
                {/* Luxury Badges */}
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="flex flex-wrap gap-3 mb-6 justify-center"
                >
                  {slides[currentSlide].limitedEdition && (
                    <span className="bg-gradient-to-r from-amber-600 to-amber-400 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Crown size={16} className="mr-2" />
                      إصدار محدود
                    </span>
                  )}
                  {slides[currentSlide].handcrafted && (
                    <span className="bg-gradient-to-r from-rose-600 to-rose-400 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Award size={16} className="mr-2" />
                      صناعة يدوية
                    </span>
                  )}
                  {slides[currentSlide].personalShopper && (
                    <span className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star size={16} className="mr-2" />
                      مستشار شخصي
                    </span>
                  )}
                </motion.div>

                {/* Category */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-amber-400 text-lg font-medium mb-4 tracking-wider"
                >
                  {slides[currentSlide].category}
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight"
                  style={{ fontFamily: 'serif' }}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-2xl lg:text-3xl text-amber-300 font-light mb-6 tracking-wide"
                  style={{ fontFamily: 'serif' }}
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-xl text-gray-200 mb-8 max-w-3xl leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* Price and Exclusive Offer */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="mb-8"
                >
                  {slides[currentSlide].price && (
                    <div className="flex items-center gap-4 mb-4 justify-center">
                      <span className="text-3xl font-bold text-amber-400">
                        {slides[currentSlide].price}
                      </span>
                      {slides[currentSlide].originalPrice && (
                        <span className="text-xl text-gray-400 line-through">
                          {slides[currentSlide].originalPrice}
                        </span>
                      )}
                    </div>
                  )}
                  {slides[currentSlide].exclusiveOffer && (
                    <div className="bg-gradient-to-r from-amber-600/20 to-amber-400/20 border border-amber-500/50 rounded-lg p-4 backdrop-blur-sm">
                      <p className="text-amber-300 text-center font-medium">
                        {slides[currentSlide].exclusiveOffer}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                  <Link
                    to={slides[currentSlide].buttonLink}
                    className="group relative bg-gradient-to-r from-amber-600 to-amber-500 text-black px-10 py-5 rounded-lg font-bold hover:from-amber-500 hover:to-amber-400 transition-all duration-500 flex items-center justify-center shadow-2xl transform hover:-translate-y-2 hover:shadow-amber-500/25"
                  >
                    <Calendar size={20} className="ml-3" />
                    {slides[currentSlide].buttonText}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/0 via-amber-200/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </Link>
                  
                  {slides[currentSlide].secondaryButtonText && (
                    <Link
                      to={slides[currentSlide].secondaryButtonLink!}
                      className="group border-2 border-amber-500 text-amber-400 px-10 py-5 rounded-lg font-bold hover:bg-amber-500 hover:text-black transition-all duration-500 flex items-center justify-center backdrop-blur-sm"
                    >
                      <Eye size={20} className="ml-3" />
                      {slides[currentSlide].secondaryButtonText}
                    </Link>
                  )}
                </motion.div>

                {/* VIP Services */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-300"
                >
                  <div className="flex items-center">
                    <Phone size={16} className="ml-2 text-amber-400" />
                    خدمة عملاء 24/7
                  </div>
                  <div className="flex items-center">
                    <ShoppingBag size={16} className="ml-2 text-amber-400" />
                    توصيل VIP مجاني
                  </div>
                  <div className="flex items-center">
                    <Award size={16} className="ml-2 text-amber-400" />
                    ضمان مدى الحياة
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Luxury Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-600/20 to-amber-400/20 backdrop-blur-md border border-amber-500/50 p-4 rounded-full hover:from-amber-600/40 hover:to-amber-400/40 transition-all duration-300 group"
      >
        <ChevronLeft size={24} className="text-amber-400 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-600/20 to-amber-400/20 backdrop-blur-md border border-amber-500/50 p-4 rounded-full hover:from-amber-600/40 hover:to-amber-400/40 transition-all duration-300 group"
      >
        <ChevronRight size={24} className="text-amber-400 group-hover:scale-110 transition-transform" />
      </button>

      {/* Elegant Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 rtl:space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-500 ${
              index === currentSlide
                ? 'w-16 h-2 bg-gradient-to-r from-amber-600 to-amber-400'
                : 'w-8 h-2 bg-amber-500/30 hover:bg-amber-500/50'
            } rounded-full`}
          >
            {index === currentSlide && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-200 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 7, ease: "linear" }}
                style={{ transformOrigin: 'left' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Auto-play Control */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-8 right-8 bg-gradient-to-r from-amber-600/20 to-amber-400/20 backdrop-blur-md border border-amber-500/50 p-3 rounded-full hover:from-amber-600/40 hover:to-amber-400/40 transition-all duration-300"
      >
        {isAutoPlaying ? (
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-1.5 h-4 bg-amber-400 mr-1 rounded-sm"></div>
            <div className="w-1.5 h-4 bg-amber-400 rounded-sm"></div>
          </div>
        ) : (
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[6px] border-l-amber-400 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1" />
          </div>
        )}
      </button>

      {/* Luxury Watermark */}
      <div className="absolute bottom-8 right-8 opacity-30">
        <Crown className="text-amber-400 w-8 h-8" />
      </div>
    </div>
  );
};

export default LuxeHeroSlider;