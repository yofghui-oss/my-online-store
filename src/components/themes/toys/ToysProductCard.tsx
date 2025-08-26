import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../../../types';
import { formatCurrency } from '../../../utils/currency';
import { useStore } from '../../../contexts/StoreContext';
import { toast } from 'react-hot-toast';

interface ToysProductCardProps {
  product: Product;
  storeId: string;
}

const ToysProductCard: React.FC<ToysProductCardProps> = ({ product, storeId }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id, 1);
  };


  return (
    <Link to={`/store/${storeId}/product/${product.id}`} className="block group">
      <div className="group bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-2xl border-2 border-yellow-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl overflow-hidden transform hover:scale-105">
        {/* Fun decorative elements */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-1">
            <span className="text-yellow-400 animate-pulse">⭐</span>
            <span className="text-pink-400 animate-bounce delay-100">🎈</span>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Fun Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full font-bold animate-bounce flex items-center gap-1">
                <Gift className="h-3 w-3" />
                مميز
              </span>
            )}
            {product.discount && product.discount > 0 && (
              <span className="bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                خصم {product.discount}%
              </span>
            )}
          </div>

          {/* Animated Favorite Button */}
          <motion.button
            onClick={() => toast('Favorite button clicked')}
            className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg hover:shadow-pink-200"
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="h-4 w-4 text-pink-500 hover:text-red-500 transition-colors duration-200" />
          </motion.button>

          {/* Action Buttons */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col gap-2">
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-2 rounded-full shadow-lg transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-sm text-purple-600 font-bold mb-2 flex items-center gap-1">
            <span>🎯</span>
            {product.categoryId}
          </p>

          {/* Title */}
          <Link to={`/store/${storeId}/product/${product.id}`}>
            <h3 className="font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors line-clamp-2 group-hover:text-pink-600">
              {product.name}
            </h3>
          </Link>

          {/* Colorful Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 transition-all duration-200 hover:scale-125 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-current animate-pulse'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.tags.slice(0, 2).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Playful Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              {formatCurrency(product.price, product.currency)}
            </span>
            {product.discount && product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.price / (1 - product.discount / 100), product.currency)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="text-xs">
            {product.inStock ? (
              <span className="text-green-600 font-bold flex items-center gap-1">
                <span>✅</span>
                In Stock
              </span>
            ) : (
              <span className="text-red-600 font-bold flex items-center gap-1">
                <span>❌</span>
                Out of Stock
              </span>
            )}
          </div>

          {/* Fun Quick Add Button */}
          <motion.button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-400 hover:via-red-400 hover:to-pink-400 text-white px-6 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <ShoppingBag className="h-4 w-4" />
            أضف للسلة
          </motion.button>
        </div>
      </div>
    </Link>
  );
};

export default ToysProductCard;