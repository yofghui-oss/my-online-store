import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Gift } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

const ToysFooter: React.FC = () => {
  const { currentStore } = useStore();

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 text-white relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-4 left-10 text-yellow-300 animate-bounce text-2xl">⭐</div>
        <div className="absolute top-12 right-20 text-pink-300 animate-pulse text-xl">🎈</div>
        <div className="absolute bottom-8 left-1/4 text-green-300 animate-bounce delay-300 text-lg">🎨</div>
        <div className="absolute top-20 left-1/3 text-orange-300 animate-pulse delay-150 text-2xl">🧸</div>
        <div className="absolute bottom-12 right-1/4 text-blue-300 animate-bounce delay-500 text-lg">🎮</div>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30">
                <span className="text-xl">🧸</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                  {currentStore?.name || 'Toy Kingdom'}
                </h3>
                <p className="text-sm text-purple-200">Where Fun Never Ends!</p>
              </div>
            </div>
            <p className="text-purple-200 mb-6">
              Creating magical moments for children with safe, educational, and fun toys that inspire creativity and learning.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30">
                <Heart className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30">
                <Star className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30">
                <Gift className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Age Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <span>🎯</span>
              <span>Shop by Age</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products?age=0-2" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>👶</span>
                  <span>Baby (0-2 years)</span>
                </Link>
              </li>
              <li>
                <Link to="/products?age=3-5" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>🧒</span>
                  <span>Toddler (3-5 years)</span>
                </Link>
              </li>
              <li>
                <Link to="/products?age=6-8" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>👦</span>
                  <span>Kids (6-8 years)</span>
                </Link>
              </li>
              <li>
                <Link to="/products?age=9-12" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>👧</span>
                  <span>Tweens (9-12 years)</span>
                </Link>
              </li>
              <li>
                <Link to="/products?age=13+" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>🧑</span>
                  <span>Teens (13+ years)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <span>🎈</span>
              <span>Categories</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=educational" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>📚</span>
                  <span>Educational Toys</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=action" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>🚀</span>
                  <span>Action Figures</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=creative" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>🎨</span>
                  <span>Arts & Crafts</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=outdoor" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>⚽</span>
                  <span>Outdoor Play</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=puzzles" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>🧩</span>
                  <span>Puzzles & Games</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Safety */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <span>🛡️</span>
              <span>Help & Safety</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/safety" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>✅</span>
                  <span>Toy Safety</span>
                </Link>
              </li>
              <li>
                <Link to="/parents" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>👨‍👩‍👧‍👦</span>
                  <span>Parent Resources</span>
                </Link>
              </li>
              <li>
                <Link to="/returns" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>🔄</span>
                  <span>Easy Returns</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>💬</span>
                  <span>Customer Support</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center space-x-2 text-purple-200 hover:text-yellow-300 transition-colors">
                  <span>📞</span>
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              🎉 Fun Kingdom Stats! 🎉
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">10,000+</div>
              <div className="text-purple-200 text-sm">Happy Little Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">2,500+</div>
              <div className="text-purple-200 text-sm">Amazing Toys</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">100+</div>
              <div className="text-purple-200 text-sm">Trusted Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">99%</div>
              <div className="text-purple-200 text-sm">Smiles Guaranteed</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 text-sm font-medium">
              © 2024 {currentStore?.name || 'Toy Kingdom'}. Spreading joy worldwide! 🌟
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-purple-200 hover:text-yellow-300 text-sm transition-colors font-medium">
                Privacy Promise 🔒
              </Link>
              <Link to="/terms" className="text-purple-200 hover:text-yellow-300 text-sm transition-colors font-medium">
                Fun Rules 📜
              </Link>
              <Link to="/accessibility" className="text-purple-200 hover:text-yellow-300 text-sm transition-colors font-medium">
                Accessibility ♿
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom rainbow border */}
      <div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400"></div>
    </footer>
  );
};

export default ToysFooter;