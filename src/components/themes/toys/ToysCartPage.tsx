import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, Heart, Star } from 'lucide-react';

const ToysCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'دمية الأميرة الساحرة',
      price: 89.99,
      image: '/api/placeholder/150/150',
      quantity: 2,
      color: 'وردي',
      age: '3-8 سنوات'
    },
    {
      id: 2,
      name: 'سيارة التحكم عن بُعد',
      price: 149.99,
      image: '/api/placeholder/150/150',
      quantity: 1,
      color: 'أحمر',
      age: '6-12 سنة'
    },
    {
      id: 3,
      name: 'مكعبات البناء الملونة',
      price: 59.99,
      image: '/api/placeholder/150/150',
      quantity: 3,
      color: 'متعدد الألوان',
      age: '2-6 سنوات'
    }
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.00;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                سلة الألعاب
              </h1>
            </motion.div>
            <p className="text-purple-600">ألعابك المفضلة في انتظارك!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100 hover:border-pink-300 transition-all"
                >
                  <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl border-2 border-pink-200"
                      />
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                        جديد!
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                          {item.color}
                        </span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {item.age}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500">(4.8)</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-full flex items-center justify-center"
                      >
                        <Minus className="h-4 w-4" />
                      </motion.button>
                      <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-full flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4" />
                      </motion.button>
                    </div>

                    {/* Price & Actions */}
                    <div className="text-left">
                      <div className="text-2xl font-bold text-purple-600 mb-3">
                        {(item.price * item.quantity).toFixed(2)} ر.س
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-lg"
                        >
                          <Heart className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 sticky top-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  ملخص الطلب
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>الشحن</span>
                    <span>{shipping.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>الضريبة (15%)</span>
                    <span>{tax.toFixed(2)} ر.س</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-purple-600">
                      <span>المجموع الكلي</span>
                      <span>{total.toFixed(2)} ر.س</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  إتمام الشراء
                </motion.button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    شحن مجاني للطلبات أكثر من 200 ر.س
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ToysCartPage;
