import React, { useState } from 'react';
import { Search, Filter, Code, Download, Star, Zap } from 'lucide-react';
import { Product } from '../../../types';
import SoftwareProductCard from './SoftwareProductCard';

interface SoftwareProductsPageProps {
  products: Product[];
  categories: any[];
  storeId: string;
}

const SoftwareProductsPage: React.FC<SoftwareProductsPageProps> = ({
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
      case 'downloads':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tech Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Code className="w-10 h-10 text-blue-600 ml-4" />
            <h1 className="text-4xl font-bold text-slate-900">مكتبة البرمجيات</h1>
          </div>
          <p className="text-xl text-slate-700">اكتشف أفضل البرامج والأدوات التقنية للمطورين والمحترفين</p>
        </div>

        {/* Professional Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tech Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-600 w-6 h-6" />
              <input
                type="text"
                placeholder="ابحث في البرمجيات والأدوات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-lg"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-lg bg-white"
            >
              <option value="">جميع فئات البرمجيات</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Tech Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-lg bg-white"
            >
              <option value="downloads">الأكثر تحميلاً</option>
              <option value="name">ترتيب حسب الاسم</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>

        {/* Tech Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            <p className="text-slate-800 text-lg font-medium">
              {sortedProducts.length} برنامج وأداة متاحة
            </p>
          </div>
        </div>

        {/* Software Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <SoftwareProductCard
              key={product.id}
              product={product}
              storeId={storeId}
            />
          ))}
        </div>

        {/* Tech Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-slate-200">
              <Code className="w-16 h-16 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">لم يتم العثور على برمجيات</h3>
            <p className="text-slate-700 text-lg">جرب تغيير معايير البحث للعثور على البرنامج المناسب</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftwareProductsPage;
