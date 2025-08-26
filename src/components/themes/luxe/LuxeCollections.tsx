import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Diamond, Star, Eye, Calendar, Phone, 
  Shield, Award, Sparkles, ChevronRight, Filter,
  Grid, List, Search, Heart, ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface LuxuryProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  designer: string;
  rating: number;
  reviews: number;
  description: string;
  isExclusive: boolean;
  isLimitedEdition: boolean;
  isHandcrafted: boolean;
  availableQuantity: number;
  vipOnly: boolean;
  personalShopperRequired: boolean;
  appointmentOnly: boolean;
  origin: string;
  materials: string[];
  certifications: string[];
  warranty: string;
}

interface LuxeCollectionsProps {
  storeId?: string;
}

const LuxeCollections: React.FC<LuxeCollectionsProps> = ({ storeId }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('exclusivity');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showVipOnly, setShowVipOnly] = useState(false);

  const categories = [
    { id: 'all', name: 'جميع المجموعات', icon: Crown },
    { id: 'jewelry', name: 'المجوهرات الفاخرة', icon: Diamond },
    { id: 'watches', name: 'الساعات السويسرية', icon: Star },
    { id: 'couture', name: 'أزياء كوتور', icon: Award },
    { id: 'accessories', name: 'إكسسوارات نادرة', icon: Sparkles },
    { id: 'art', name: 'قطع فنية', icon: Eye }
  ];

  const luxuryProducts: LuxuryProduct[] = [
    {
      id: '1',
      name: 'عقد الياقوت الملكي',
      price: 125000,
      originalPrice: 175000,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      ],
      category: 'jewelry',
      designer: 'ماريا الزهراني',
      rating: 5.0,
      reviews: 12,
      description: 'عقد فاخر مصنوع من الياقوت الأزرق النادر والألماس الخالص، تحفة فنية حقيقية',
      isExclusive: true,
      isLimitedEdition: true,
      isHandcrafted: true,
      availableQuantity: 1,
      vipOnly: true,
      personalShopperRequired: true,
      appointmentOnly: true,
      origin: 'سويسرا',
      materials: ['ياقوت أزرق', 'ألماس', 'ذهب أبيض 18 قيراط'],
      certifications: ['GIA', 'Gübelin'],
      warranty: 'مدى الحياة'
    },
    {
      id: '2',
      name: 'ساعة باتيك فيليب النادرة',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      images: [
        'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      ],
      category: 'watches',
      designer: 'Patek Philippe',
      rating: 4.9,
      reviews: 8,
      description: 'ساعة سويسرية نادرة من الذهب الخالص مع حركة معقدة، إصدار محدود',
      isExclusive: true,
      isLimitedEdition: true,
      isHandcrafted: true,
      availableQuantity: 3,
      vipOnly: false,
      personalShopperRequired: true,
      appointmentOnly: true,
      origin: 'سويسرا',
      materials: ['ذهب أصفر 18 قيراط', 'جلد تمساح أصلي'],
      certifications: ['Swiss Made', 'COSC'],
      warranty: '10 سنوات'
    },
    {
      id: '3',
      name: 'فستان كوتور حصري',
      price: 45000,
      originalPrice: 65000,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      ],
      category: 'couture',
      designer: 'أتيليه نورا',
      rating: 4.8,
      reviews: 15,
      description: 'فستان كوتور مصمم خصيصاً بأجود الأقمشة والتطريز اليدوي',
      isExclusive: true,
      isLimitedEdition: false,
      isHandcrafted: true,
      availableQuantity: 1,
      vipOnly: false,
      personalShopperRequired: true,
      appointmentOnly: false,
      origin: 'فرنسا',
      materials: ['حرير طبيعي', 'تطريز ذهبي', 'لؤلؤ طبيعي'],
      certifications: ['Haute Couture'],
      warranty: 'سنة واحدة'
    }
  ];

  const filteredProducts = luxuryProducts
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.designer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVip = !showVipOnly || product.vipOnly;
      return matchesCategory && matchesSearch && matchesVip;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'exclusivity':
          return (b.isExclusive ? 1 : 0) - (a.isExclusive ? 1 : 0);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const requestAppointment = (productId: string) => {
    // Navigate to appointment booking
    console.log('Requesting appointment for product:', productId);
  };

  const contactPersonalShopper = (productId: string) => {
    // Contact personal shopper
    console.log('Contacting personal shopper for product:', productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Crown className="text-amber-400 w-12 h-12 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              المجموعات الفاخرة
            </h1>
            <Crown className="text-amber-400 w-12 h-12 ml-4" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            اكتشف مجموعة منتقاة بعناية من القطع الفاخرة والنادرة، كل قطعة تحكي قصة من الجمال والرقي
          </p>
          <div className="flex items-center justify-center mt-6 space-x-8 rtl:space-x-reverse text-amber-400">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>أصالة مضمونة</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              <span>خدمة VIP</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              <span>حصري ومحدود</span>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-amber-500/20"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold shadow-lg shadow-amber-500/25'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-amber-400'
                  }`}
                >
                  <Icon size={20} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-amber-500/20"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400" />
              <input
                type="text"
                placeholder="ابحث في المجموعات الفاخرة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-amber-500/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* VIP Filter */}
              <label className="flex items-center gap-2 text-amber-400">
                <input
                  type="checkbox"
                  checked={showVipOnly}
                  onChange={(e) => setShowVipOnly(e.target.checked)}
                  className="rounded border-amber-500 text-amber-500 focus:ring-amber-500"
                />
                <Crown size={16} />
                VIP فقط
              </label>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-800/50 border border-amber-500/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
              >
                <option value="exclusivity">الحصرية</option>
                <option value="price-high">السعر: الأعلى أولاً</option>
                <option value="price-low">السعر: الأقل أولاً</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-gray-700/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-amber-500 text-black' : 'text-amber-400'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-amber-500 text-black' : 'text-amber-400'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-8'
          }`}
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                } hover:shadow-2xl hover:shadow-amber-500/10`}
              >
                {/* Luxury Badges */}
                <div className="absolute top-4 left-4 z-20 space-y-2">
                  {product.isExclusive && (
                    <span className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <Crown size={12} className="mr-1" />
                      حصري
                    </span>
                  )}
                  {product.isLimitedEdition && (
                    <span className="bg-gradient-to-r from-amber-600 to-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      إصدار محدود
                    </span>
                  )}
                  {product.vipOnly && (
                    <span className="bg-gradient-to-r from-rose-600 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      VIP
                    </span>
                  )}
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <Heart
                    size={18}
                    className={`${
                      wishlist.includes(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-white'
                    } transition-colors`}
                  />
                </button>

                {/* Product Image */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64' : 'aspect-square'}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Quick Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex gap-3">
                      <Link
                        to={`/store/${storeId}/products/${product.id}`}
                        className="bg-amber-500 text-black p-3 rounded-full hover:bg-amber-400 transition-colors shadow-lg"
                      >
                        <Eye size={18} />
                      </Link>
                      {product.appointmentOnly ? (
                        <button
                          onClick={() => requestAppointment(product.id)}
                          className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors shadow-lg"
                        >
                          <Calendar size={18} />
                        </button>
                      ) : (
                        <button className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors shadow-lg">
                          <ShoppingBag size={18} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  {product.availableQuantity <= 3 && (
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.availableQuantity} متبقي فقط
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                        {product.name}
                      </h3>
                      <p className="text-amber-400 font-medium">{product.designer}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'text-amber-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {product.rating} ({product.reviews} تقييم)
                    </span>
                  </div>

                  {/* Materials */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.materials.slice(0, 2).map((material, i) => (
                        <span key={i} className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
                          {material}
                        </span>
                      ))}
                      {product.materials.length > 2 && (
                        <span className="text-amber-400 text-xs">
                          +{product.materials.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-amber-400">
                        {product.price.toLocaleString()} ر.س
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()} ر.س
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="space-y-3">
                    {product.appointmentOnly && (
                      <button
                        onClick={() => requestAppointment(product.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-300 flex items-center justify-center font-medium"
                      >
                        <Calendar size={16} className="ml-2" />
                        حجز موعد للمعاينة
                      </button>
                    )}
                    
                    {product.personalShopperRequired && (
                      <button
                        onClick={() => contactPersonalShopper(product.id)}
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black py-3 px-4 rounded-lg hover:from-amber-700 hover:to-amber-600 transition-all duration-300 flex items-center justify-center font-medium"
                      >
                        <Phone size={16} className="ml-2" />
                        استشارة مختص
                      </button>
                    )}

                    <div className="flex gap-2">
                      <Link
                        to={`/store/${storeId}/products/${product.id}`}
                        className="flex-1 border border-amber-500 text-amber-400 py-2 px-4 rounded-lg hover:bg-amber-500 hover:text-black transition-all duration-300 flex items-center justify-center"
                      >
                        <Eye size={16} className="ml-2" />
                        التفاصيل
                      </Link>
                      
                      {!product.appointmentOnly && (
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                          <ShoppingBag size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Crown className="text-amber-400 w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">لا توجد منتجات متاحة</h3>
            <p className="text-gray-400 mb-8">جرب تغيير فلاتر البحث أو تصفح مجموعة أخرى</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setShowVipOnly(false);
              }}
              className="bg-gradient-to-r from-amber-600 to-amber-500 text-black px-6 py-3 rounded-lg hover:from-amber-700 hover:to-amber-600 transition-all duration-300 font-medium"
            >
              إعادة تعيين الفلاتر
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LuxeCollections;