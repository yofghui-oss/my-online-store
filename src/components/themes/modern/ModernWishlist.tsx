import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Trash2, ShoppingCart, Share2, Grid, List,
  Filter, Star, Eye, ArrowRight, X, Gift, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: number;
  dateAdded: Date;
  isOnSale: boolean;
  saleEndsAt?: Date;
  colors: string[];
  sizes: string[];
  discount?: number;
}

interface ModernWishlistProps {
  storeId?: string;
}

const ModernWishlist: React.FC<ModernWishlistProps> = ({ storeId }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterBy, setFilterBy] = useState('all');
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock wishlist data
  useEffect(() => {
    const mockWishlist: WishlistItem[] = [
      {
        id: '1',
        name: 'فستان أنيق للسهرات',
        price: 299,
        originalPrice: 399,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        category: 'فساتين',
        rating: 4.8,
        reviews: 124,
        description: 'فستان أنيق مثالي للمناسبات الخاصة',
        inStock: 5,
        dateAdded: new Date('2024-01-15'),
        isOnSale: true,
        saleEndsAt: new Date('2024-02-15'),
        colors: ['أسود', 'أزرق', 'أحمر'],
        sizes: ['S', 'M', 'L'],
        discount: 25
      },
      {
        id: '2',
        name: 'حقيبة يد فاخرة',
        price: 399,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        category: 'حقائب',
        rating: 4.9,
        reviews: 67,
        description: 'حقيبة يد جلدية عالية الجودة',
        inStock: 12,
        dateAdded: new Date('2024-01-10'),
        isOnSale: false,
        colors: ['بني', 'أسود'],
        sizes: ['One Size']
      },
      {
        id: '3',
        name: 'جاكيت شتوي أنيق',
        price: 249,
        originalPrice: 349,
        image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        category: 'ملابس شتوية',
        rating: 4.6,
        reviews: 89,
        description: 'جاكيت دافئ ومريح للطقس البارد',
        inStock: 0,
        dateAdded: new Date('2024-01-05'),
        isOnSale: true,
        saleEndsAt: new Date('2024-01-25'),
        colors: ['أسود', 'رمادي', 'كحلي'],
        sizes: ['M', 'L', 'XL'],
        discount: 29
      }
    ];
    setWishlistItems(mockWishlist);
  }, []);

  const filteredAndSortedItems = wishlistItems
    .filter(item => {
      switch (filterBy) {
        case 'onSale':
          return item.isOnSale;
        case 'inStock':
          return item.inStock > 0;
        case 'outOfStock':
          return item.inStock === 0;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'dateAdded':
        default:
          return b.dateAdded.getTime() - a.dateAdded.getTime();
      }
    });

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(
      selectedItems.length === filteredAndSortedItems.length
        ? []
        : filteredAndSortedItems.map(item => item.id)
    );
  };

  const removeSelectedItems = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const addAllToCart = () => {
    const availableItems = selectedItems.filter(id => {
      const item = wishlistItems.find(i => i.id === id);
      return item && item.inStock > 0;
    });
    // Here you would add items to cart
    console.log('Adding to cart:', availableItems);
  };

  const shareWishlist = () => {
    setShowShareModal(true);
  };

  const copyWishlistLink = () => {
    const link = `${window.location.origin}/store/${storeId}/wishlist/share/user123`;
    navigator.clipboard.writeText(link);
    // Show success message
  };

  const timeUntilSaleEnds = (endDate: Date) => {
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    
    if (days > 0) return `${days} يوم`;
    if (hours > 0) return `${hours} ساعة`;
    return 'قريباً';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              قائمة الأمنيات
            </h1>
            <p className="text-gray-600">
              {wishlistItems.length} عنصر في قائمة أمنياتك
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <button
              onClick={shareWishlist}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 size={16} />
              مشاركة
            </button>
            
            {selectedItems.length > 0 && (
              <>
                <button
                  onClick={addAllToCart}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ShoppingCart size={16} />
                  إضافة للسلة ({selectedItems.length})
                </button>
                
                <button
                  onClick={removeSelectedItems}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                  حذف المحدد
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Selection Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={selectAllItems}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredAndSortedItems.length && filteredAndSortedItems.length > 0}
                  readOnly
                  className="rounded"
                />
                تحديد الكل
              </button>
              
              {selectedItems.length > 0 && (
                <span className="text-sm text-gray-600">
                  {selectedItems.length} عنصر محدد
                </span>
              )}
            </div>

            {/* Filters and Sort */}
            <div className="flex items-center gap-4">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">جميع العناصر</option>
                <option value="onSale">في التخفيضات</option>
                <option value="inStock">متوفر</option>
                <option value="outOfStock">غير متوفر</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="dateAdded">تاريخ الإضافة</option>
                <option value="name">الاسم</option>
                <option value="price">السعر</option>
                <option value="rating">التقييم</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wishlist Items */}
        {filteredAndSortedItems.length > 0 ? (
          <motion.div
            layout
            className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }`}
          >
            <AnimatePresence>
              {filteredAndSortedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    viewMode === 'list' ? 'flex' : ''
                  } ${selectedItems.includes(item.id) ? 'ring-2 ring-purple-500' : ''}`}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                  </div>

                  {/* Sale Badge */}
                  {item.isOnSale && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{item.discount}%
                      </div>
                      {item.saleEndsAt && (
                        <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold mt-1 flex items-center">
                          <Clock size={10} className="ml-1" />
                          {timeUntilSaleEnds(item.saleEndsAt)}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Out of Stock Overlay */}
                  {item.inStock === 0 && (
                    <div className="absolute inset-0 bg-gray-900/50 z-10 flex items-center justify-center">
                      <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
                        غير متوفر
                      </span>
                    </div>
                  )}

                  {/* Product Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48' : 'aspect-square'}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Quick Actions */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-2">
                        <Link
                          to={`/store/${storeId}/products/${item.id}`}
                          className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Heart size={18} className="fill-current text-red-500" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                    <p className="text-sm text-purple-600 mb-2">{item.category}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < Math.floor(item.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {item.rating} ({item.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-purple-600">
                          {item.price} ر.س
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {item.originalPrice} ر.س
                          </span>
                        )}
                      </div>
                      
                      {item.inStock > 0 && item.inStock < 10 && (
                        <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                          {item.inStock} متبقي
                        </span>
                      )}
                    </div>

                    {/* Colors */}
                    {item.colors.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-500">الألوان:</span>
                        <div className="flex gap-1">
                          {item.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color === 'أبيض' ? '#fff' : color === 'أسود' ? '#000' : '#8B5CF6' }}
                            />
                          ))}
                          {item.colors.length > 3 && (
                            <span className="text-xs text-gray-500">+{item.colors.length - 3}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Date Added */}
                    <div className="text-xs text-gray-500 mb-4">
                      أُضيف في {item.dateAdded.toLocaleDateString('ar-SA')}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {item.inStock > 0 ? (
                        <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                          <ShoppingCart size={16} className="ml-2" />
                          إضافة للسلة
                        </button>
                      ) : (
                        <button className="flex-1 bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed">
                          غير متوفر
                        </button>
                      )}
                      
                      <Link
                        to={`/store/${storeId}/products/${item.id}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <Eye size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-6">
              <Heart size={80} className="mx-auto mb-4" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">قائمة الأمنيات فارغة</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              ابدأ في إضافة المنتجات التي تعجبك إلى قائمة أمنياتك لتتمكن من العثور عليها بسهولة لاحقاً
            </p>
            <Link
              to={`/store/${storeId}/collections`}
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              استكشف المنتجات
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowShareModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">مشاركة قائمة الأمنيات</h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">
                  شارك قائمة أمنياتك مع الأصدقاء والعائلة
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={copyWishlistLink}
                    className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Share2 size={16} />
                    نسخ الرابط
                  </button>
                  
                  <button className="w-full flex items-center justify-center gap-3 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                    <Gift size={16} />
                    إرسال كهدية
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModernWishlist;