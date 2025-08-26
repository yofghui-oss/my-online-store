import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../../../types';
import { formatCurrency } from '../../../utils/currency';
import { useStore } from '../../../contexts/StoreContext';
import { toast } from 'react-hot-toast';

interface ModernProductCardProps {
  product: Product;
  storeId: string;
}

const ModernProductCard: React.FC<ModernProductCardProps> = ({ product, storeId }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id, 1);
    toast.success(`تم إضافة ${product.name} إلى السلة!`);
  };

  return (
    <Link to={`/store/${storeId}/product/${product.id}`} className="block group">
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200">
        <div className="relative overflow-hidden">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
            <motion.button
              onClick={handleAddToCart}
              className="p-3 bg-white text-secondary-900 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={20} />
            </motion.button>
          </div>
        </div>
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              مميز
            </span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              خصم {product.discount}%
            </span>
          )}
        </div>
        <div className="p-4 bg-white dark:bg-secondary-900">
          <h3 className="font-semibold text-secondary-800 dark:text-secondary-100 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-secondary-900 dark:text-white mt-1">
            {formatCurrency(product.price, product.currency)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ModernProductCard;
