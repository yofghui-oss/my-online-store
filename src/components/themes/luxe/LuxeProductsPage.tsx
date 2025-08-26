import React, { useState } from 'react';
import { Search, Filter, Crown, Star, SlidersHorizontal } from 'lucide-react';
import { Product } from '../../../types';
import LuxeProductCard from './LuxeProductCard';

interface LuxeProductsPageProps {
  products: Product[];
  categories: any[];
  storeId: string;
}

const LuxeProductsPage: React.FC<LuxeProductsPageProps> = ({
  products,
  categories,
  storeId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name, 'ar');
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Luxury Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-10 h-10 text-yellow-600 ml-4" />
            <h1 className="text-4xl font-bold text-amber-900">المجموعة الفاخرة</h1>
          </div>
          <p className="text-xl text-amber-700">اكتشف مجموعتنا الحصرية من المنتجات الفاخرة</p>
        </div>

        {/* Elegant Search and Filters */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-amber-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Premium Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-6 h-6" />
              <input
                type="text"
                placeholder="ابحث في المجموعة الفاخرة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-6 py-4 border-2 border-amber-200 rounded-2xl focus:ring-4 focus:ring-amber-300 focus:border-amber-400 text-lg"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 border-2 border-amber-200 rounded-2xl focus:ring-4 focus:ring-amber-300 focus:border-amber-400 text-lg bg-white"
            >
              <option value="">جميع الفئات الفاخرة</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Premium Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 border-2 border-amber-200 rounded-2xl focus:ring-4 focus:ring-amber-300 focus:border-amber-400 text-lg bg-white"
            >
              <option value="featured">المنتجات المميزة أولاً</option>
              <option value="name">ترتيب حسب الاسم</option>
              <option value="price-high">الأغلى سعراً أولاً</option>
              <option value="price-low">الأقل سعراً أولاً</option>
            </select>
          </div>
        </div>

        {/* Luxury Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <p className="text-amber-800 text-lg font-medium">
              {sortedProducts.length} منتج فاخر متاح
            </p>
          </div>
        </div>

        {/* Premium Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <LuxeProductCard
              key={product.id}
              product={product}
              storeId={storeId}
            />
          ))}
        </div>

        {/* Elegant Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-amber-200">
              <Crown className="w-16 h-16 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-4">لم يتم العثور على منتجات فاخرة</h3>
            <p className="text-amber-700 text-lg">جرب تغيير معايير البحث للعثور على المنتج المثالي</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LuxeProductsPage;
