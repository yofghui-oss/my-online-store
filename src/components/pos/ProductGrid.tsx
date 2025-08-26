import React from 'react';
import { Product } from '../../types';
import Card from '../ui/Card';
import { formatCurrency } from '../../utils/currency';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map(product => (
        <Card
          key={product.id}
          onClick={() => onAddToCart(product)}
          className="cursor-pointer p-2 text-center"
          hover
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-24 object-cover rounded-md mb-2"
          />
          <h3 className="text-sm font-semibold text-secondary-800 dark:text-secondary-200 truncate">
            {product.name}
          </h3>
          <p className="text-xs font-bold text-primary-600 dark:text-primary-400">
            {formatCurrency(product.price, product.currency)}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
