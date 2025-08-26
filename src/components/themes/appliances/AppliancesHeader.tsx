import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Phone, Mail } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';
import { useTheme } from '../../../contexts/ThemeContext';

const AppliancesHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, currentStore } = useStore();
  const { colorMode } = useTheme();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={`bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white shadow-xl ${colorMode === 'dark' ? 'border-b border-gray-700' : ''}`}>
      {/* Top Bar */}
      <div className="bg-blue-600">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                <span>Call: +966-555-0123</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                <span>support@{currentStore?.domain}</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-4">
              <span>Free Shipping on Orders Over 500 SAR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{currentStore?.name || 'Appliances Store'}</h1>
              <p className="text-sm text-blue-200">Your Home Electronics Partner</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search appliances..."
                className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/70"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-white/70" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/account"
              className="hidden md:flex items-center space-x-1 hover:text-blue-300 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Account</span>
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center space-x-1 hover:text-blue-300 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
              <span className="hidden md:block">Cart</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 hidden md:block">
          <ul className="flex space-x-8">
            <li><Link to="/" className="hover:text-blue-300 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-300 transition-colors">All Products</Link></li>
            <li><Link to="/products?category=kitchen" className="hover:text-blue-300 transition-colors">Kitchen</Link></li>
            <li><Link to="/products?category=laundry" className="hover:text-blue-300 transition-colors">Laundry</Link></li>
            <li><Link to="/products?category=cooling" className="hover:text-blue-300 transition-colors">AC & Cooling</Link></li>
            <li><Link to="/products?category=electronics" className="hover:text-blue-300 transition-colors">Electronics</Link></li>
            <li><Link to="/about" className="hover:text-blue-300 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search appliances..."
                  className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/70"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-white/70" />
              </div>
            </div>
            <nav>
              <ul className="space-y-3">
                <li><Link to="/" className="block py-2 hover:text-blue-300 transition-colors">Home</Link></li>
                <li><Link to="/products" className="block py-2 hover:text-blue-300 transition-colors">All Products</Link></li>
                <li><Link to="/products?category=kitchen" className="block py-2 hover:text-blue-300 transition-colors">Kitchen</Link></li>
                <li><Link to="/products?category=laundry" className="block py-2 hover:text-blue-300 transition-colors">Laundry</Link></li>
                <li><Link to="/products?category=cooling" className="block py-2 hover:text-blue-300 transition-colors">AC & Cooling</Link></li>
                <li><Link to="/products?category=electronics" className="block py-2 hover:text-blue-300 transition-colors">Electronics</Link></li>
                <li><Link to="/about" className="block py-2 hover:text-blue-300 transition-colors">About</Link></li>
                <li><Link to="/contact" className="block py-2 hover:text-blue-300 transition-colors">Contact</Link></li>
                <li><Link to="/account" className="block py-2 hover:text-blue-300 transition-colors">Account</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppliancesHeader;