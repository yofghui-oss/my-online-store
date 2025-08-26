import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, 
  Crown, Shield, Truck 
} from 'lucide-react';

const LuxeCartPage: React.FC = () => {
  const { storeId } = useParams();

  // Mock cart items
  const items = [
    {
      id: '1',
      name: 'فستان حرير إيطالي فاخر',
      price: 1899,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      size: 'M',
      color: 'ذهبي',
      material: 'حرير إيطالي خالص'
    },
    {
      id: '2',
      name: 'جاكيت كشمير أنيق',
      price: 2299,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      size: 'L',
      color: 'أسود',
      material: 'كشمير طبيعي'
    },
    {
      id: '3',
      name: 'حقيبة جلد طبيعي',
      price: 1599,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      color: 'بني فاتح',
      material: 'جلد طبيعي إيطالي'
    }
  ];

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm">
              <ShoppingCart size={32} className="text-black" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-neutral-900 mb-4">
            سلة التسوق الفاخرة
          </h1>
          <p className="text-neutral-600 font-serif text-lg">
            {items.length} قطعة مختارة بعناية في مجموعتك الحصرية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="relative group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-2">{item.name}</h3>
                          <div className="space-y-1 text-sm text-neutral-600 font-serif">
                            {item.size && <div>المقاس: {item.size}</div>}
                            {item.color && <div>اللون: {item.color}</div>}
                            {item.material && <div>الخامة: {item.material}</div>}
                          </div>
                        </div>
                        <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-neutral-600 font-serif">الكمية:</span>
                          <div className="flex items-center border border-neutral-300">
                            <button className="p-2 hover:bg-neutral-100 transition-colors">
                              <Minus size={16} className="text-neutral-600" />
                            </button>
                            <span className="px-4 py-2 font-medium text-neutral-900 min-w-[3rem] text-center font-serif">
                              {item.quantity}
                            </span>
                            <button className="p-2 hover:bg-neutral-100 transition-colors">
                              <Plus size={16} className="text-neutral-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-yellow-600 font-serif">
                            {item.price * item.quantity} ر.س
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-neutral-500 font-serif">
                              {item.price} ر.س للقطعة
                            </div>
                          )}
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
                to={`/store/${storeId}/collections`}
                className="inline-flex items-center text-neutral-700 hover:text-yellow-600 font-serif text-lg font-medium group"
              >
                <ArrowRight size={20} className="ml-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                متابعة التسوق في المجموعات الحصرية
              </Link>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-yellow-400/30 p-8 sticky top-8"
            >
              <div className="flex items-center mb-6">
                <Crown size={24} className="text-yellow-600 ml-3" />
                <h2 className="text-2xl font-serif font-bold text-neutral-900">ملخص الطلب الفاخر</h2>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-neutral-700 font-serif">
                  <span>المجموع الفرعي</span>
                  <span className="font-medium">{total} ر.س</span>
                </div>
                <div className="flex justify-between text-neutral-700 font-serif">
                  <span>الشحن المميز</span>
                  <span className="font-medium text-green-600">مجاني</span>
                </div>
                <div className="flex justify-between text-neutral-700 font-serif">
                  <span>التغليف الفاخر</span>
                  <span className="font-medium text-green-600">مجاني</span>
                </div>
                <div className="flex justify-between text-neutral-700 font-serif">
                  <span>الضريبة</span>
                  <span className="font-medium">{Math.round(total * 0.15)} ر.س</span>
                </div>
                <div className="border-t-2 border-neutral-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-neutral-900 font-serif">
                    <span>المجموع الكلي</span>
                    <span className="text-yellow-600">{Math.round(total * 1.15)} ر.س</span>
                  </div>
                </div>
              </div>

              {/* Luxury Services */}
              <div className="mb-8 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200">
                <h3 className="font-serif font-semibold text-neutral-900 mb-3 flex items-center">
                  <Shield size={16} className="ml-2 text-yellow-600" />
                  خدمات حصرية مجانية
                </h3>
                <div className="space-y-2 text-sm text-neutral-700 font-serif">
                  <div className="flex items-center">
                    <Truck size={14} className="ml-2 text-yellow-600" />
                    توصيل فاخر في نفس اليوم
                  </div>
                  <div className="flex items-center">
                    <Crown size={14} className="ml-2 text-yellow-600" />
                    تغليف هدايا فاخر
                  </div>
                  <div className="flex items-center">
                    <Shield size={14} className="ml-2 text-yellow-600" />
                    ضمان الأصالة والجودة
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-8">
                <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                  كود الخصم الحصري
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="أدخل كود VIP"
                    className="flex-1 px-4 py-3 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                  />
                  <button className="px-6 py-3 bg-neutral-800 text-white hover:bg-neutral-900 transition-colors font-serif">
                    تطبيق
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to={`/store/${storeId}/checkout`}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-serif font-bold py-4 px-8 hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                <Crown size={20} className="ml-3" />
                إتمام الطلب الفاخر
                <ArrowRight size={18} className="mr-3 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Security & Trust */}
              <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
                <div className="flex justify-center items-center space-x-4 text-sm text-neutral-600 font-serif">
                  <div className="flex items-center">
                    <Shield size={14} className="ml-1 text-green-600" />
                    <span>دفع آمن 100%</span>
                  </div>
                  <div className="flex items-center">
                    <Crown size={14} className="ml-1 text-yellow-600" />
                    <span>ضمان الفخامة</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxeCartPage;