import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { POSCartItem } from '../../pages/POS';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/currency';
import { Currency } from '../../types';

interface OrderPanelProps {
  cart: POSCartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onClearCart: () => void;
  total: number;
  currency: Currency;
  onCheckout: () => void;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ cart, onUpdateQuantity, onClearCart, total, currency, onCheckout }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">الطلب الحالي</h2>
        <Button variant="ghost" size="sm" onClick={onClearCart} disabled={cart.length === 0}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto -mr-2 pr-2 space-y-2">
        {cart.length === 0 ? (
          <div className="text-center text-secondary-500 py-10">
            <p>السلة فارغة</p>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.product.id} className="flex items-center gap-2 bg-secondary-100 dark:bg-secondary-700/50 p-2 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{item.product.name}</p>
                <p className="text-xs text-secondary-500">{formatCurrency(item.product.price, currency)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded-full bg-secondary-200 dark:bg-secondary-600"><Minus size={12} /></button>
                <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded-full bg-secondary-200 dark:bg-secondary-600"><Plus size={12} /></button>
              </div>
              <p className="w-20 text-left font-semibold text-sm">{formatCurrency(item.product.price * item.quantity, currency)}</p>
            </div>
          ))
        )}
      </div>
      <div className="border-t dark:border-secondary-700 pt-4 mt-4 space-y-4">
        <div className="flex justify-between font-bold text-lg">
          <span>الإجمالي</span>
          <span>{formatCurrency(total, currency)}</span>
        </div>
        <Button size="lg" className="w-full" onClick={onCheckout} disabled={cart.length === 0}>
          الدفع
        </Button>
      </div>
    </div>
  );
};

export default OrderPanel;
