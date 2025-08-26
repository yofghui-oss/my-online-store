import React from 'react';
import { Heart, ShoppingBag, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../../types';
import { formatCurrency } from '../../../utils/currency';
import { useStore } from '../../../contexts/StoreContext';
import { toast } from 'react-hot-toast';

interface TechProductCardProps {
  product: Product;
  storeId: string;
}

const TechProductCard: React.FC<TechProductCardProps> = ({ product, storeId }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id, 1);
    toast.success(`تم إضافة ${product.name} إلى السلة!`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success('تم إضافة المنتج إلى المفضلة!');
  };

  return (
    <Link to={`/store/${storeId}/product/${product.id}`} className="block group">
      <div className="group bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 overflow-hidden">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-lg bg-slate-700">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {product.featured && (
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                <Zap className="h-3 w-3" />
                مميز
              </div>
            )}
            {product.discount && product.discount > 0 && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                خصم {product.discount}%
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <motion.button
            onClick={handleToggleFavorite}
            className="absolute top-4 left-4 p-2 bg-gray-800/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-700 border border-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="h-4 w-4 text-gray-300 hover:text-red-400" />
          </motion.button>

          {/* Quick Add Button */}
          <motion.button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="h-4 w-4" />
            أضف للسلة
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-white mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-800 text-blue-400 px-2 py-1 rounded border border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">({product.reviewCount || 0})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">
              {formatCurrency(product.price, product.currency)}
            </span>
            {product.discount && product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.price / (1 - product.discount / 100), product.currency)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TechProductCard;
