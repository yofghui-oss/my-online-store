import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { Product } from '../types';
import ProductGrid from '../components/pos/ProductGrid';
import OrderPanel from '../components/pos/OrderPanel';
import PaymentModal from '../components/pos/PaymentModal';

export interface POSCartItem {
  product: Product;
  quantity: number;
}

const POS: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const { products, currentStore } = useStore();
  const [cart, setCart] = useState<POSCartItem[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const storeProducts = products.filter(p => p.storeId === storeId);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePaymentSuccess = () => {
    // Here you would typically create an order record
    clearCart();
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="h-screen bg-secondary-100 dark:bg-secondary-900 flex flex-col" dir="rtl">
      <header className="bg-white dark:bg-secondary-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-secondary-900 dark:text-white">
          نظام نقاط البيع - {currentStore?.name}
        </h1>
        {/* Add user/settings icon here */}
      </header>
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 p-4 overflow-y-auto">
          <ProductGrid products={storeProducts} onAddToCart={addToCart} />
        </main>
        <aside className="w-96 bg-white dark:bg-secondary-800 p-4 border-r dark:border-secondary-700 flex flex-col">
          <OrderPanel
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onClearCart={clearCart}
            total={total}
            currency={currentStore?.currency || 'SAR'}
            onCheckout={() => setIsPaymentModalOpen(true)}
          />
        </aside>
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
        currency={currentStore?.currency || 'SAR'}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default POS;
