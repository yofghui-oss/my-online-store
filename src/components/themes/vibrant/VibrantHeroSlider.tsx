import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Play, Pause, Volume2, 
  Heart, Share2, MessageCircle, Zap, TrendingUp,
  ShoppingBag, Users, Flame, Star, Gift
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface VibrantSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  buttonText: string;
  buttonLink: string;
  socialText?: string;
  socialLink?: string;
  gradient: string;
  textColor: string;
  badge?: string;
  price?: string;
  discount?: number;
  trending: boolean;
  socialProof: {
    likes: number;
    shares: number;
    comments: number;
  };
  userGenerated?: {
    username: string;
    avatar: string;
    rating: number;
  };
}

interface VibrantHeroSliderProps {
  storeId?: string;
}

const VibrantHeroSlider: React.FC<VibrantHeroSliderProps> = ({ storeId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [userInteractions, setUserInteractions] = useState<Record<string, boolean>>({});

  const slides: VibrantSlide[] = [
    {
      id: '1',
      title: 'مجموعة الصيف النارية',
      subtitle: 'اشتعل بالألوان الجريئة',
      description: 'اكتشف أحدث صيحات الموضة الصيفية مع ألوان جريئة ونابضة بالحياة تعكس شخصيتك المميزة',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      video: 'https://player.vimeo.com/video/sample',
      buttonText: 'اشتري الآن',
      buttonLink: `/store/${storeId}/collections/summer-fire`,
      socialText: 'شاركها مع أصدقائك',
      socialLink: `/store/${storeId}/share/summer-collection`,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      textColor: 'text-white',
      badge: 'ترند #1',
      price: '199 ر.س',
      discount: 40,
      trending: true,
      socialProof: {
        likes: 1247,
        shares: 89,
        comments: 156
      },
      userGenerated: {
        username: '@sara_style',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b412?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
        rating: 5
      }
    },
    {
      id: '2',
      title: 'تحدي الألوان الجريئة',
      subtitle: 'كن جريئاً في اختياراتك',
      description: 'انضم إلى تحدي الألوان الجريئة واكتشف قوة التعبير عن نفسك من خلال الموضة الملونة والجذابة',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      buttonText: 'انضم للتحدي',
      buttonLink: `/store/${storeId}/challenges/bold-colors`,
      socialText: 'شارك تحديك',
      socialLink: `/store/${storeId}/challenges/share`,
      gradient: 'from-purple-500 via-blue-500 to-cyan-500',
      textColor: 'text-white',
      badge: 'تحدي جديد',
      price: '299 ر.س',
      discount: 25,
      trending: true,
      socialProof: {
        likes: 2156,
        shares: 342,
        comments: 89
      },
      userGenerated: {
        username: '@fashion_rebel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
        rating: 4.8
      }
    },
    {
      id: '3',
      title: 'مهرجان الألوان السعيدة',
      subtitle: 'احتفل بالفرح والمرح',
      description: 'مجموعة خاصة مستوحاة من مهرجان الألوان العالمي، حيث كل قطعة تحكي قصة فرح ومرح لا ينتهي',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      buttonText: 'انضم للمهرجان',
      buttonLink: `/store/${storeId}/festival/happy-colors`,
      socialText: 'شارك الفرحة',
      socialLink: `/store/${storeId}/festival/share`,
      gradient: 'from-yellow-400 via-green-400 to-blue-400',
      textColor: 'text-white',
      badge: 'مهرجان محدود',
      price: '149 ر.س',
      discount: 50,
      trending: false,
      socialProof: {
        likes: 3421,
        shares: 567,
        comments: 234
      },
      userGenerated: {
        username: '@color_festival',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
        rating: 4.9
      }
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying || isVideoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isVideoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setIsVideoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setIsVideoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setIsVideoPlaying(false);
  };

  const toggleUserInteraction = (slideId: string, type: 'like' | 'share' | 'comment') => {
    const key = `${slideId}-${type}`;
    setUserInteractions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative h-[650px] lg:h-[750px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Dynamic Background */}
          <div className="absolute inset-0">
            <img
              src={currentSlideData.image}
              alt={currentSlideData.title}
              className="w-full h-full object-cover"
            />
            {/* Animated Gradient Overlay */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient} opacity-80`}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight + 20,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  y: -20,
                  x: Math.random() * window.innerWidth
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2, 
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Text Content */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className={`${currentSlideData.textColor} space-y-8`}
                >
                  {/* Trending Badge */}
                  {currentSlideData.trending && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                        <Flame size={16} />
                        {currentSlideData.badge}
                      </div>
                      <TrendingUp className="text-green-400 w-6 h-6" />
                    </motion.div>
                  )}

                  {/* User Generated Content */}
                  {currentSlideData.userGenerated && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-3 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 w-fit"
                    >
                      <img
                        src={currentSlideData.userGenerated.avatar}
                        alt={currentSlideData.userGenerated.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium">{currentSlideData.userGenerated.username}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${
                              i < Math.floor(currentSlideData.userGenerated!.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Title with Animation */}
                  <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-4xl lg:text-6xl font-bold leading-tight"
                  >
                    <motion.span
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="bg-gradient-to-r from-white via-yellow-200 to-white bg-300% bg-clip-text text-transparent"
                    >
                      {currentSlideData.title}
                    </motion.span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl lg:text-2xl font-medium text-yellow-200"
                  >
                    {currentSlideData.subtitle}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-lg opacity-90 max-w-lg leading-relaxed"
                  >
                    {currentSlideData.description}
                  </motion.p>

                  {/* Price and Discount */}
                  {currentSlideData.price && (
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center gap-4"
                    >
                      <span className="text-3xl font-bold text-green-400">
                        {currentSlideData.price}
                      </span>
                      {currentSlideData.discount && (
                        <div className="flex items-center gap-2">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            -{currentSlideData.discount}%
                          </span>
                          <Zap className="text-yellow-400 w-5 h-5" />
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link
                      to={currentSlideData.buttonLink}
                      className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
                    >
                      <ShoppingBag size={20} className="ml-2" />
                      {currentSlideData.buttonText}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-xl"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                    
                    {currentSlideData.socialText && (
                      <Link
                        to={currentSlideData.socialLink!}
                        className="group border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                      >
                        <Share2 size={20} className="ml-2" />
                        {currentSlideData.socialText}
                      </Link>
                    )}
                  </motion.div>
                </motion.div>

                {/* Interactive Social Panel */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="lg:block hidden"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    {/* Social Proof */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white font-bold text-lg">تفاعل المجتمع</h3>
                      <Users className="text-yellow-400 w-6 h-6" />
                    </div>

                    <div className="space-y-4 mb-6">
                      {/* Likes */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => toggleUserInteraction(currentSlideData.id, 'like')}
                          className={`flex items-center gap-2 transition-colors ${
                            userInteractions[`${currentSlideData.id}-like`]
                              ? 'text-red-500'
                              : 'text-white hover:text-red-400'
                          }`}
                        >
                          <Heart 
                            size={20} 
                            className={userInteractions[`${currentSlideData.id}-like`] ? 'fill-current' : ''} 
                          />
                          إعجاب
                        </button>
                        <span className="text-white font-bold">
                          {currentSlideData.socialProof.likes.toLocaleString()}
                        </span>
                      </div>

                      {/* Shares */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => toggleUserInteraction(currentSlideData.id, 'share')}
                          className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                        >
                          <Share2 size={20} />
                          مشاركة
                        </button>
                        <span className="text-white font-bold">
                          {currentSlideData.socialProof.shares}
                        </span>
                      </div>

                      {/* Comments */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => toggleUserInteraction(currentSlideData.id, 'comment')}
                          className="flex items-center gap-2 text-white hover:text-green-400 transition-colors"
                        >
                          <MessageCircle size={20} />
                          تعليق
                        </button>
                        <span className="text-white font-bold">
                          {currentSlideData.socialProof.comments}
                        </span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                        <Gift size={16} className="inline ml-2" />
                        أرسل هدية
                      </button>
                      
                      <button className="w-full border border-white/30 text-white py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-300">
                        <MessageCircle size={16} className="inline ml-2" />
                        بدء محادثة
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-all duration-300 group border border-white/30"
      >
        <ChevronLeft size={24} className="text-white group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-all duration-300 group border border-white/30"
      >
        <ChevronRight size={24} className="text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 rtl:space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-500 ${
              index === currentSlide
                ? 'w-12 h-3 bg-white rounded-full'
                : 'w-3 h-3 bg-white/50 hover:bg-white/70 rounded-full'
            }`}
          >
            {index === currentSlide && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                style={{ transformOrigin: 'left' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Auto-play Control */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
      >
        {isAutoPlaying ? (
          <Pause size={16} className="text-white" />
        ) : (
          <Play size={16} className="text-white" />
        )}
      </button>

      {/* Volume Control (for video slides) */}
      <button
        className="absolute top-6 right-20 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
      >
        <Volume2 size={16} className="text-white" />
      </button>

      {/* Live Interaction Counter */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
      >
        <div className="flex items-center gap-2 text-white">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">
            {currentSlideData.socialProof.likes + currentSlideData.socialProof.shares + currentSlideData.socialProof.comments} متفاعل
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default VibrantHeroSlider;