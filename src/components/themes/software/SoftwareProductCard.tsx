import React from 'react';
import { Heart, ShoppingBag, Star, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../../types';
import { formatCurrency } from '../../../utils/currency';
import { useStore } from '../../../contexts/StoreContext';
import { toast } from 'react-hot-toast';

interface SoftwareProductCardProps {
  product: Product;
  storeId: string;
}

const SoftwareProductCard: React.FC<SoftwareProductCardProps> = ({ product, storeId }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success('تم إضافة المنتج إلى المفضلة!');
  };


  return (
    <Link to={`/store/${storeId}/product/${product.id}`} className="block group">
      <div className="group bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Download className="h-3 w-3" />
                مميز
              </span>
            )}
            {product.discount && product.discount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                خصم {product.discount}%
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <motion.button
            onClick={handleToggleFavorite}
            className="absolute top-3 left-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </motion.button>

          {/* Quick Add Button */}
          <motion.button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="h-4 w-4" />
            أضف للسلة
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-slate-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.tags.slice(0, 3).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-slate-900">
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

export default SoftwareProductCard;