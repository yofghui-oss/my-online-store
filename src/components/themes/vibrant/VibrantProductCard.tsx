import React from 'react';
import { Heart, ShoppingBag, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../../types';
import { formatCurrency } from '../../../utils/currency';
import { useStore } from '../../../contexts/StoreContext';
import { toast } from 'react-hot-toast';

interface VibrantProductCardProps {
  product: Product;
  storeId: string;
}

const VibrantProductCard: React.FC<VibrantProductCardProps> = ({ product, storeId }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id, 1);
    toast.success(`تم إضافة ${product.name} إلى السلة!`);
  };

  return (
    <Link to={`/store/${storeId}/product/${product.id}`} className="block group">
      <div className="group relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-2xl border-2 border-transparent hover:border-gradient-to-r hover:from-pink-300 hover:to-purple-300 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-200/50 overflow-hidden transform hover:-translate-y-1">
        <div className="relative">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-secondary-900 dark:text-white truncate">
            {product.name}
          </h3>
          {/* Animated Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {product.featured && (
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse flex items-center gap-1">
                <Zap className="w-3 h-3" />
                مميز
              </div>
            )}
            {product.discount && product.discount > 0 && (
              <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-bounce">
                خصم {product.discount}%
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-black text-primary-600 dark:text-primary-400">
              {formatCurrency(product.price, product.currency)}
            </p>
            <motion.button
              onClick={handleAddToCart}
              className="p-2 bg-primary-500 text-white rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VibrantProductCard;
