import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Zap, Shield, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../../../types';
import { formatCurrency } from '../../../utils/currency';
import { useStore } from '../../../contexts/StoreContext';
import { toast } from 'react-hot-toast';

interface AppliancesProductCardProps {
  product: Product;
  storeId: string;
}

const AppliancesProductCard: React.FC<AppliancesProductCardProps> = ({ product, storeId }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id, 1);
    toast.success(`تم إضافة ${product.name} إلى السلة!`);
  };

  return (
    <Link to={`/store/${storeId}/product/${product.id}`} className="block group">
      <div className="group bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Zap className="h-3 w-3" />
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
            className="absolute top-3 left-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </motion.button>

          {/* Quick Add Button */}
          <motion.button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="h-4 w-4" />
            أضف للسلة
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviewCount || 0} مراجعة)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {formatCurrency(product.price, product.currency)}
              </span>
              {product.discount && product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(product.price / (1 - product.discount / 100), product.currency)}
                </span>
              )}
            </div>
          </div>

          {/* Tags/Features */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Appliance Features */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span>كفاءة الطاقة A+</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>ضمان سنتان</span>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'متوفر في المخزن' : 'غير متوفر'}
            </span>
          </div>

          {/* Energy Efficiency Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                <Zap className="h-3 w-3" />
                A+
              </div>
              <span className="text-xs text-gray-500">تصنيف الطاقة</span>
            </div>
            <div className="text-xs text-gray-500">
              توفير 30% من الكهرباء
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? 'إضافة إلى السلة' : 'غير متوفر'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default AppliancesProductCard;