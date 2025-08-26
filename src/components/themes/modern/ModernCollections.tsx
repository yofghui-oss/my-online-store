import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Grid, List, Heart, ShoppingCart, 
  Star, Eye, TrendingUp, Zap, Crown, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  isNew: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  discount?: number;
  tags: string[];
  colors: string[];
  sizes: string[];
  inStock: number;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  trending: boolean;
}

interface ModernCollectionsProps {
  storeId?: string;
}

const ModernCollections: React.FC<ModernCollectionsProps> = ({ storeId }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const collections: Collection[] = [
    {
      id: 'spring-2024',
      name: 'مجموعة الربيع 2024',
      description: 'أحدث صيحات الموضة لموسم الربيع',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: 120,
      trending: true
    },
    {
      id: 'summer-essentials',
      name: 'أساسيات الصيف',
      description: 'قطع لا غنى عنها لصيف مثالي',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: 85,
      trending: false
    },
    {
      id: 'luxury-collection',
      name: 'المجموعة الفاخرة',
      description: 'قطع حصرية للمناسبات الخاصة',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: 45,
      trending: true
    }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'فستان أنيق للسهرات',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
      category: 'فساتين',
      rating: 4.8,
      reviews: 124,
      description: 'فستان أنيق مثالي للمناسبات الخاصة',
      isNew: true,
      isTrending: true,
      isFeatured: true,
      discount: 25,
      tags: ['أنيق', 'سهرات', 'حديث'],
      colors: ['أسود', 'أزرق', 'أحمر'],
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: 15
    },
    {
      id: '2',
      name: 'بلوزة كاجوال عصرية',
      price: 149,
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
      category: 'بلوزات',
      rating: 4.6,
      reviews: 89,
      description: 'بلوزة مريحة للاستخدام اليومي',
      isNew: false,
      isTrending: true,
      isFeatured: false,
      tags: ['كاجوال', 'مريح', 'يومي'],
      colors: ['أبيض', 'زهري', 'بيج'],
      sizes: ['XS', 'S', 'M', 'L'],
      inStock: 28
    },
    {
      id: '3',
      name: 'حقيبة يد فاخرة',
      price: 399,
      originalPrice: 499,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
      category: 'حقائب',
      rating: 4.9,
      reviews: 67,
      description: 'حقيبة يد جلدية فاخرة',
      isNew: true,
      isTrending: false,
      isFeatured: true,
      discount: 20,
      tags: ['فاخر', 'جلد', 'عملي'],
      colors: ['بني', 'أسود', 'كريمي'],
      sizes: ['One Size'],
      inStock: 12
    }
  ];

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return a.isNew ? -1 : 1;
      case 'trending':
        return a.isTrending ? -1 : 1;
      default:
        return a.isFeatured ? -1 : 1;
    }
  });

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            مجموعاتنا المميزة
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشف أحدث صيحات الموضة والأزياء العصرية في مجموعاتنا الحصرية
          </p>
        </motion.div>

        {/* Collections Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {collection.trending && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <TrendingUp size={14} className="ml-1" />
                  رائج
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                <p className="text-sm opacity-90 mb-3">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-75">{collection.productCount} منتج</span>
                  <Link
                    to={`/store/${storeId}/collections/${collection.id}`}
                    className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors flex items-center"
                  >
                    استكشف
                    <ArrowRight size={14} className="mr-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">جميع الفئات</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="featured">المميزة</option>
              <option value="newest">الأحدث</option>
              <option value="trending">الأكثر رواجاً</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              <Filter size={20} className="ml-2" />
              فلاتر
            </button>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر</label>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <input
                        type="number"
                        placeholder="من"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                        className="w-20 px-3 py-2 border border-gray-200 rounded-lg"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="إلى"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                        className="w-20 px-3 py-2 border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">فلاتر سريعة</label>
                    <div className="flex flex-wrap gap-2">
                      {['جديد', 'رائج', 'مميز', 'خصم'].map(filter => (
                        <button
                          key={filter}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors"
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSortBy('featured');
                        setPriceRange({ min: 0, max: 1000 });
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      مسح الفلاتر
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Products Grid/List */}
        <motion.div
          layout
          className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-6'
          }`}
        >
          <AnimatePresence>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Product Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      جديد
                    </span>
                  )}
                  {product.isTrending && (
                    <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                      <TrendingUp size={10} className="ml-1" />
                      رائج
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                      <Crown size={10} className="ml-1" />
                      مميز
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    size={18}
                    className={`${
                      wishlist.includes(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-600'
                    } transition-colors`}
                  />
                </button>

                {/* Product Image */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48' : 'aspect-square'}`}>
                  <img
                    src={hoveredProduct === product.id && product.images[1] ? product.images[1] : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Quick Action Buttons */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      <Link
                        to={`/store/${storeId}/products/${product.id}`}
                        className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Eye size={18} />
                      </Link>
                      <button className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    {product.inStock < 10 && (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                        {product.inStock} متبقي
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-purple-600">
                        {product.price} ر.س
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.originalPrice} ر.س
                        </span>
                      )}
                    </div>
                    
                    {viewMode === 'list' && (
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                        <ShoppingCart size={16} className="ml-2" />
                        إضافة للسلة
                      </button>
                    )}
                  </div>

                  {/* Colors Preview */}
                  {product.colors.length > 0 && (
                    <div className="flex items-center gap-1 mt-3">
                      <span className="text-xs text-gray-500 ml-2">الألوان:</span>
                      {product.colors.slice(0, 3).map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color === 'أبيض' ? '#fff' : color === 'أسود' ? '#000' : '#8B5CF6' }}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {sortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              عرض المزيد من المنتجات
            </button>
          </motion.div>
        )}

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">لم نجد أي منتجات</h3>
            <p className="text-gray-600 mb-6">جرب تغيير معايير البحث أو الفلاتر</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSortBy('featured');
                setPriceRange({ min: 0, max: 1000 });
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              مسح جميع الفلاتر
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ModernCollections;