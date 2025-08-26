import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Star, Heart } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';
import { useTheme } from '../../../contexts/ThemeContext';

const ToysHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, currentStore } = useStore();
  const { colorMode } = useTheme();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={`bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white shadow-xl relative overflow-hidden ${colorMode === 'dark' ? 'border-b border-gray-700' : ''}`}>
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-10 text-yellow-300 animate-bounce">⭐</div>
        <div className="absolute top-8 right-20 text-pink-300 animate-pulse">🎈</div>
        <div className="absolute bottom-4 left-1/4 text-green-300 animate-bounce delay-300">🎨</div>
        <div className="absolute top-12 left-1/3 text-orange-300 animate-pulse delay-150">🧸</div>
        <div className="absolute bottom-8 right-1/4 text-blue-300 animate-bounce delay-500">🎮</div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-6 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30">
              <span className="text-2xl">🧸</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                {currentStore?.name || 'Toy Kingdom'}
              </h1>
              <p className="text-sm text-purple-200">Where Fun Never Ends!</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for awesome toys..."
                className="w-full px-4 py-3 pl-12 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/70 font-medium"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-white/70" />
              <div className="absolute right-3 top-2">
                <div className="bg-yellow-400 text-purple-700 rounded-full p-1">
                  <Star className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/account"
              className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Account</span>
            </Link>

            <button className="hidden md:block bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30">
              <Heart className="w-5 h-5" />
            </button>

            <Link
              to="/cart"
              className="relative bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-purple-700 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 hidden md:block">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link to="/" className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 font-medium">
                <span>🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 font-medium">
                <span>🎯</span>
                <span>All Toys</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=educational" className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 font-medium">
                <span>📚</span>
                <span>Educational</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=action" className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 font-medium">
                <span>🚀</span>
                <span>Action Figures</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=creative" className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 font-medium">
                <span>🎨</span>
                <span>Creative</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=outdoor" className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 font-medium">
                <span>⚽</span>
                <span>Outdoor</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for awesome toys..."
                  className="w-full px-4 py-3 pl-12 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/70 font-medium"
                />
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-white/70" />
              </div>
            </div>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium">
                    <span className="text-xl">🏠</span>
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium">
                    <span className="text-xl">🎯</span>
                    <span>All Toys</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=educational" className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium">
                    <span className="text-xl">📚</span>
                    <span>Educational Toys</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=action" className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium">
                    <span className="text-xl">🚀</span>
                    <span>Action Figures</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=creative" className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium">
                    <span className="text-xl">🎨</span>
                    <span>Creative Toys</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=outdoor" className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium">
                    <span className="text-xl">⚽</span>
                    <span>Outdoor Play</span>
                  </Link>
                </li>
                <li>
                  <Link to="/account" className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium">
                    <User className="w-5 h-5" />
                    <span>My Account</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Bottom rainbow border */}
      <div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400"></div>
    </header>
  );
};

export default ToysHeader;