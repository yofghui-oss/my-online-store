import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Flame, Heart, Share2, MessageCircle, 
  Play, Users, Star, Eye, ShoppingBag, Zap,
  Crown, Award, Clock, ThumbsUp, Bookmark,
  Send, Smile, Camera, Video, Gift
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrendingPost {
  id: string;
  type: 'product' | 'outfit' | 'challenge' | 'review';
  title: string;
  description: string;
  image: string;
  video?: string;
  user: {
    username: string;
    avatar: string;
    verified: boolean;
    followers: number;
  };
  product?: {
    name: string;
    price: number;
    originalPrice?: number;
    link: string;
  };
  metrics: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
  };
  timestamp: Date;
  trending: boolean;
  hashtags: string[];
  isVideo: boolean;
}

interface VibrantSocialTrendingProps {
  storeId?: string;
}

const VibrantSocialTrending: React.FC<VibrantSocialTrendingProps> = ({ storeId }) => {
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [userInteractions, setUserInteractions] = useState<Record<string, boolean>>({});
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const categories = [
    { id: 'trending', name: 'الترند', icon: TrendingUp, color: 'from-red-500 to-orange-500' },
    { id: 'products', name: 'المنتجات', icon: ShoppingBag, color: 'from-blue-500 to-cyan-500' },
    { id: 'challenges', name: 'التحديات', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { id: 'reviews', name: 'التقييمات', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { id: 'community', name: 'المجتمع', icon: Users, color: 'from-green-500 to-teal-500' }
  ];

  const trendingPosts: TrendingPost[] = [
    {
      id: '1',
      type: 'outfit',
      title: 'إطلالة الصيف المثالية',
      description: 'مزجت بين الألوان الزاهية والإكسسوارات الذهبية لإطلالة صيفية لا تُنسى! ما رأيكم؟',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      user: {
        username: 'سارة_الأناقة',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b412?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
        verified: true,
        followers: 12500
      },
      product: {
        name: 'فستان صيفي ملون',
        price: 299,
        originalPrice: 399,
        link: `/store/${storeId}/products/summer-dress-1`
      },
      metrics: {
        likes: 1247,
        shares: 89,
        comments: 156,
        views: 5420
      },
      timestamp: new Date('2024-01-20T10:30:00'),
      trending: true,
      hashtags: ['#صيف_2024', '#ألوان_زاهية', '#موضة_صيفية'],
      isVideo: false
    },
    {
      id: '2',
      type: 'challenge',
      title: 'تحدي الـ 7 ألوان',
      description: 'كل يوم لون جديد لمدة أسبوع! من يجرب معي؟ اليوم الثالث: الأزرق الكهربائي ⚡',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      video: 'https://player.vimeo.com/video/sample',
      user: {
        username: 'ملكة_الألوان',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
        verified: false,
        followers: 8900
      },
      metrics: {
        likes: 2156,
        shares: 342,
        comments: 89,
        views: 8750
      },
      timestamp: new Date('2024-01-19T15:45:00'),
      trending: true,
      hashtags: ['#تحدي_الألوان', '#أزرق_كهربائي', '#7_أيام_7_ألوان'],
      isVideo: true
    },
    {
      id: '3',
      type: 'product',
      title: 'الحقيبة الأكثر طلباً هذا الشهر',
      description: 'حقيبة بتصميم عصري وألوان متدرجة، مثالية لكل المناسبات! متوفرة الآن بخصم خاص',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      user: {
        username: 'متجرنا_الرسمي',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
        verified: true,
        followers: 45000
      },
      product: {
        name: 'حقيبة متدرجة الألوان',
        price: 199,
        originalPrice: 299,
        link: `/store/${storeId}/products/gradient-bag-1`
      },
      metrics: {
        likes: 3421,
        shares: 567,
        comments: 234,
        views: 12300
      },
      timestamp: new Date('2024-01-18T09:15:00'),
      trending: false,
      hashtags: ['#حقائب_عصرية', '#خصم_خاص', '#الأكثر_طلباً'],
      isVideo: false
    }
  ];

  const toggleInteraction = (postId: string, type: 'like' | 'share' | 'bookmark') => {
    const key = `${postId}-${type}`;
    setUserInteractions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleComment = (postId: string) => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
      setShowComments(null);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'منذ دقائق';
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    return timestamp.toLocaleDateString('ar-SA');
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Flame className="text-orange-400 w-12 h-12 mr-3" />
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              ما يحدث الآن
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp className="text-green-400 w-12 h-12 ml-3" />
            </motion.div>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            اكتشف آخر صيحات الموضة، شارك إطلالاتك، وتفاعل مع مجتمع الموضة النابض بالحياة
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * index, type: "spring" }}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative overflow-hidden px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={20} />
                  {category.name}
                </div>
                {selectedCategory === category.id && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {trendingPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
              >
                {/* Trending Badge */}
                {post.trending && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Flame size={12} />
                      ترند
                    </div>
                  </div>
                )}

                {/* User Info */}
                <div className="p-4 flex items-center gap-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold">{post.user.username}</h3>
                      {post.user.verified && (
                        <Crown className="text-yellow-400 w-4 h-4" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <span>{post.user.followers.toLocaleString()} متابع</span>
                      <span>•</span>
                      <span>{formatTimestamp(post.timestamp)}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Image/Video */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Video Play Button */}
                    {post.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30"
                        >
                          <Play size={24} className="text-white ml-1" />
                        </motion.button>
                      </div>
                    )}

                    {/* Views Counter */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center gap-1 text-white text-sm">
                        <Eye size={14} />
                        {post.metrics.views.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <h4 className="text-white font-bold text-lg mb-2">{post.title}</h4>
                    <p className="text-white/80 text-sm mb-3 line-clamp-2">{post.description}</p>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.hashtags.map((tag, i) => (
                        <span key={i} className="text-cyan-400 text-sm hover:text-cyan-300 cursor-pointer">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Product Info */}
                    {post.product && (
                      <div className="bg-white/10 rounded-xl p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-white font-medium">{post.product.name}</h5>
                            <div className="flex items-center gap-2">
                              <span className="text-green-400 font-bold">{post.product.price} ر.س</span>
                              {post.product.originalPrice && (
                                <span className="text-white/60 line-through text-sm">
                                  {post.product.originalPrice} ر.س
                                </span>
                              )}
                            </div>
                          </div>
                          <Link
                            to={post.product.link}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                          >
                            <ShoppingBag size={14} className="inline ml-1" />
                            شراء
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Interaction Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Like */}
                        <button
                          onClick={() => toggleInteraction(post.id, 'like')}
                          className={`flex items-center gap-1 transition-colors ${
                            userInteractions[`${post.id}-like`]
                              ? 'text-red-500'
                              : 'text-white/70 hover:text-red-400'
                          }`}
                        >
                          <Heart 
                            size={18} 
                            className={userInteractions[`${post.id}-like`] ? 'fill-current' : ''} 
                          />
                          <span className="text-sm">{post.metrics.likes.toLocaleString()}</span>
                        </button>

                        {/* Comment */}
                        <button
                          onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                          className="flex items-center gap-1 text-white/70 hover:text-blue-400 transition-colors"
                        >
                          <MessageCircle size={18} />
                          <span className="text-sm">{post.metrics.comments}</span>
                        </button>

                        {/* Share */}
                        <button
                          onClick={() => toggleInteraction(post.id, 'share')}
                          className="flex items-center gap-1 text-white/70 hover:text-green-400 transition-colors"
                        >
                          <Share2 size={18} />
                          <span className="text-sm">{post.metrics.shares}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => toggleInteraction(post.id, 'bookmark')}
                        className={`transition-colors ${
                          userInteractions[`${post.id}-bookmark`]
                            ? 'text-yellow-400'
                            : 'text-white/70 hover:text-yellow-400'
                        }`}
                      >
                        <Bookmark 
                          size={18} 
                          className={userInteractions[`${post.id}-bookmark`] ? 'fill-current' : ''} 
                        />
                      </button>
                    </div>

                    {/* Comments Section */}
                    <AnimatePresence>
                      {showComments === post.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 border-t border-white/20 pt-4"
                        >
                          {/* Sample Comments */}
                          <div className="space-y-3 mb-4 max-h-32 overflow-y-auto">
                            <div className="flex items-start gap-2">
                              <img
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&q=80"
                                alt="user"
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <span className="text-white text-sm font-medium">نورا_الموضة</span>
                                <p className="text-white/70 text-sm">رائع جداً! أين يمكنني الحصول على نفس القطعة؟</p>
                              </div>
                              <button className="text-white/50 hover:text-red-400">
                                <Heart size={12} />
                              </button>
                            </div>
                          </div>

                          {/* Add Comment */}
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="اكتب تعليقاً..."
                              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button className="text-white/70 hover:text-purple-400">
                              <Smile size={18} />
                            </button>
                            <button 
                              onClick={() => handleComment(post.id)}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                              <Send size={16} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Create Post Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="fixed bottom-8 right-8 z-50"
        >
          <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110">
            <div className="flex items-center gap-2">
              <Camera size={24} />
              <span className="hidden group-hover:block transition-all duration-300 font-medium">
                شارك إطلالتك
              </span>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default VibrantSocialTrending;