import React, { useState } from 'react';
import { Search, Filter, Gift, Star, Heart, Gamepad2 } from 'lucide-react';
import { Product } from '../../../types';
import ToysProductCard from './ToysProductCard';

interface ToysProductsPageProps {
  products: Product[];
  categories: any[];
  storeId: string;
}

const ToysProductsPage: React.FC<ToysProductsPageProps> = ({
  products,
  categories,
  storeId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [ageGroup, setAgeGroup] = useState('');

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
      case 'popular':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Playful Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Gift className="w-10 h-10 text-pink-500 ml-4 animate-bounce" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              متجر الألعاب السحري
            </h1>
            <Heart className="w-10 h-10 text-red-500 mr-4 animate-pulse" />
          </div>
          <p className="text-xl text-purple-700">اكتشف عالماً مليئاً بالألعاب الممتعة والتعليمية</p>
        </div>

        {/* Fun Search and Filters */}
        <div className="bg-gradient-to-r from-white to-pink-50 rounded-3xl shadow-2xl border-4 border-pink-200 p-8 mb-8 transform hover:scale-105 transition-all">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Playful Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-600 w-6 h-6 animate-pulse" />
              <input
                type="text"
                placeholder="ابحث عن اللعبة المثالية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-6 py-4 border-4 border-pink-300 rounded-2xl focus:ring-4 focus:ring-purple-400 focus:border-purple-400 text-lg bg-gradient-to-r from-white to-pink-50"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 border-4 border-blue-300 rounded-2xl focus:ring-4 focus:ring-blue-400 focus:border-blue-400 text-lg bg-gradient-to-r from-white to-blue-50"
            >
              <option value="">جميع أنواع الألعاب</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Age Group Filter */}
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="px-6 py-4 border-4 border-green-300 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 text-lg bg-gradient-to-r from-white to-green-50"
            >
              <option value="">جميع الأعمار</option>
              <option value="0-2">0-2 سنة</option>
              <option value="3-5">3-5 سنوات</option>
              <option value="6-8">6-8 سنوات</option>
              <option value="9-12">9-12 سنة</option>
              <option value="13+">13+ سنة</option>
            </select>

            {/* Fun Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 border-4 border-yellow-300 rounded-2xl focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 text-lg bg-gradient-to-r from-white to-yellow-50"
            >
              <option value="popular">الأكثر شعبية</option>
              <option value="name">ترتيب حسب الاسم</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>

        {/* Fun Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-purple-600 animate-bounce" />
            <p className="text-purple-800 text-lg font-bold">
              {sortedProducts.length} لعبة ممتعة ومثيرة
            </p>
          </div>
        </div>

        {/* Toys Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ToysProductCard
              key={product.id}
              product={product}
              storeId={storeId}
            />
          ))}
        </div>

        {/* Playful Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-pink-300 animate-bounce">
              <Gift className="w-16 h-16 text-pink-600" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              لا توجد ألعاب هنا!
            </h3>
            <p className="text-purple-700 text-lg">جرب تغيير البحث للعثور على اللعبة المثالية لطفلك</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToysProductsPage;
