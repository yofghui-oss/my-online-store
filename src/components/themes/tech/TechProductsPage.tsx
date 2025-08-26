import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, QrCode, SlidersHorizontal, Zap } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

interface TechProductsPageProps {
  storeName?: string;
}

const TechProductsPage: React.FC<TechProductsPageProps> = ({ 
  storeName = "TechStore" 
}) => {
  const { products, addToCart } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Tech-specific product data
  const techProducts = products.map(product => ({
    ...product,
    image: product.image || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    specs: ['معالج Intel Core i7', '16GB RAM', '512GB SSD', 'كرت RTX 4060'],
    brand: ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo'][Math.floor(Math.random() * 5)],
    category: ['laptops', 'phones', 'accessories', 'components'][Math.floor(Math.random() * 4)]
  }));

  const categories = [
    { id: 'all', name: 'جميع المنتجات', count: techProducts.length },
    { id: 'laptops', name: 'أجهزة الكمبيوتر', count: 45 },
    { id: 'phones', name: 'الهواتف الذكية', count: 32 },
    { id: 'accessories', name: 'الإكسسوارات', count: 28 },
    { id: 'components', name: 'قطع الكمبيوتر', count: 19 }
  ];

  const brands = ['all', 'Apple', 'Samsung', 'Dell', 'HP', 'Lenovo'];

  const filteredProducts = techProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">المنتجات التقنية</h1>
          <p className="text-gray-400">اكتشف أحدث الأجهزة والتقنيات المتطورة</p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* QR Scanner */}
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
              <QrCode className="h-5 w-5" />
              مسح الباركود
            </button>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
            >
              <SlidersHorizontal className="h-5 w-5" />
              فلترة
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">الفئة</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">العلامة التجارية</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand === 'all' ? 'جميع العلامات' : brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    السعر: {priceRange[0]} - {priceRange[1]} ر.س
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">ترتيب حسب</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">المميزة</option>
                    <option value="price-low">السعر: من الأقل للأعلى</option>
                    <option value="price-high">السعر: من الأعلى للأقل</option>
                    <option value="rating">الأعلى تقييماً</option>
                    <option value="newest">الأحدث</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-400">
            عرض {sortedProducts.length} من {techProducts.length} منتج
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product) => (
            <div key={product.id} className={`bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group ${
              viewMode === 'list' ? 'flex gap-6' : ''
            }`}>
              <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'} bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden ${viewMode === 'grid' ? 'rounded-t-xl' : 'rounded-l-xl'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                      {product.brand}
                    </span>
                    {product.rating > 4.5 && (
                      <span className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        الأفضل
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
                  
                  {viewMode === 'list' && (
                    <div className="mb-3">
                      <div className="text-sm text-gray-400 mb-2">المواصفات:</div>
                      <div className="flex flex-wrap gap-1">
                        {product.specs.slice(0, 3).map((spec, index) => (
                          <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">({product.rating})</span>
                  </div>
                </div>
                
                <div className={`flex items-center ${viewMode === 'list' ? 'justify-between' : 'justify-between'}`}>
                  <span className="text-xl font-bold text-blue-400">{product.price} ر.س</span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-red-400 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => addToCart(product.id, 1)}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {viewMode === 'list' && 'أضف للسلة'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
              تحميل المزيد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechProductsPage;
