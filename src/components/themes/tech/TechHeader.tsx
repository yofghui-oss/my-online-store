import React from 'react';
import { Search, ShoppingBag, User, Heart, Menu, Zap } from 'lucide-react';

interface TechHeaderProps {
  storeName?: string;
  onMenuClick?: () => void;
}

const TechHeader: React.FC<TechHeaderProps> = ({ 
  storeName = "تك ستور", 
  onMenuClick 
}) => {

  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {storeName}
            </h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <a href="#" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              الرئيسية
            </a>
            <a href="#" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              المنتجات
            </a>
            <a href="#" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              العروض
            </a>
            <a href="#" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              الدعم
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ابحث عن المنتجات التقنية..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-slate-400"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن المنتجات التقنية..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-slate-400"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
};

export default TechHeader;
