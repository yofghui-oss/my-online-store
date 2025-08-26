import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface ModernCartPageProps {
  storeId: string;
  items?: CartItem[];
}

const ModernCartPage: React.FC<ModernCartPageProps> = ({ 
  storeId,
  items = [
    {
      id: '1',
      name: 'قميص عصري أنيق',
      price: 299,
      quantity: 2,
      image: 'https://via.placeholder.com/400x400?text=Product+1',
      size: 'L',
      color: 'أزرق'
    },
    {
      id: '2',
      name: 'بنطال جينز كلاسيكي',
      price: 199,
      quantity: 1,
      image: 'https://via.placeholder.com/400x400?text=Product+2',
      size: 'M',
      color: 'أسود'
    }
  ]
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            سلة التسوق
          </h1>
          <p className="text-gray-600">
            {items.length} منتج في سلتك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-500 mb-2">
                        {item.size && <span>المقاس: {item.size}</span>}
                        {item.color && <span>اللون: {item.color}</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button className="p-1 rounded-full hover:bg-purple-100 transition-colors">
                            <Minus size={16} className="text-gray-600" />
                          </button>
                          <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button className="p-1 rounded-full hover:bg-purple-100 transition-colors">
                            <Plus size={16} className="text-gray-600" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-purple-600">
                            {item.price * item.quantity} ر.س
                          </span>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Link
                to={`/store/${storeId}/products`}
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                <ArrowRight size={16} className="ml-2 rotate-180" />
                متابعة التسوق
              </Link>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6 sticky top-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">ملخص الطلب</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>المجموع الفرعي</span>
                  <span>{total} ر.س</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>الشحن</span>
                  <span>مجاني</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>الضريبة</span>
                  <span>{Math.round(total * 0.15)} ر.س</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>المجموع الكلي</span>
                    <span>{Math.round(total * 1.15)} ر.س</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كود الخصم
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="أدخل كود الخصم"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    تطبيق
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to={`/store/${storeId}/checkout`}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <ShoppingCart size={18} className="ml-2" />
                إتمام الطلب
              </Link>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center text-sm text-gray-500">
                  <div className="w-4 h-4 bg-green-500 rounded-full ml-2"></div>
                  دفع آمن ومضمون
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCartPage;