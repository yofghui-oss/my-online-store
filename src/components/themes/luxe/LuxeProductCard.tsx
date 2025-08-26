import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../../types';
import { formatCurrency } from '../../../utils/currency';
import { useStore } from '../../../contexts/StoreContext';
import { toast } from 'react-hot-toast';

interface LuxeProductCardProps {
  product: Product;
  storeId: string;
}

const LuxeProductCard: React.FC<LuxeProductCardProps> = ({ product, storeId }) => {
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
      <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                مميز
              </span>
            )}
            {product.discount && product.discount > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                خصم {product.discount}%
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <motion.button
            onClick={handleToggleFavorite}
            className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white shadow-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="h-4 w-4 text-amber-600 hover:text-red-500" />
          </motion.button>

          {/* Quick Add Button */}
          <motion.button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="h-4 w-4" />
            أضف للسلة
          </motion.button>
        </div>
        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-amber-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-amber-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-amber-600">({product.reviewCount || 0})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-amber-800">
              {formatCurrency(product.price, product.currency)}
            </span>
            {product.discount && product.discount > 0 && (
              <span className="text-sm text-amber-600 line-through">
                {formatCurrency(product.price / (1 - product.discount / 100), product.currency)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LuxeProductCard;
