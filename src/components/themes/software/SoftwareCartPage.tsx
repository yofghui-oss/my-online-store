import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, Zap } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';
import { formatCurrency } from '../../../utils/currency';

const SoftwareCartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">سلة التسوق</h1>
            </motion.div>
            <p className="text-blue-200">مراجعة البرامج المحددة قبل الشراء</p>
          </div>

          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="p-6 bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-700 max-w-md mx-auto">
                <ShoppingCart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">السلة فارغة</h3>
                <p className="text-slate-400">لم تقم بإضافة أي برامج بعد</p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{item.product.name}</h3>
                        <p className="text-slate-400 text-sm mb-2">{item.product.description}</p>
                        <div className="text-blue-400 font-bold">
                          {formatCurrency(item.product.price, item.product.currency)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-slate-600 rounded"
                          >
                            <Minus className="h-4 w-4 text-white" />
                          </button>
                          <span className="px-3 py-1 text-white font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-600 rounded"
                          >
                            <Plus className="h-4 w-4 text-white" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 h-fit"
              >
                <h3 className="text-xl font-semibold text-white mb-6">ملخص الطلب</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-300">
                    <span>المجموع الفرعي:</span>
                    <span>{formatCurrency(subtotal, 'SAR')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>الضريبة (15%):</span>
                    <span>{formatCurrency(tax, 'SAR')}</span>
                  </div>
                  <div className="border-t border-slate-600 pt-4">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>المجموع الكلي:</span>
                      <span>{formatCurrency(total, 'SAR')}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <CreditCard className="h-5 w-5" />
                  متابعة للدفع
                </motion.button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-400">دفع آمن ومشفر</p>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SoftwareCartPage;
