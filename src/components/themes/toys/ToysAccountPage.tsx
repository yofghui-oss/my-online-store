import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Heart, ShoppingBag, Settings, Gift, Star, Calendar, MapPin } from 'lucide-react';

const ToysAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'orders', label: 'طلباتي', icon: ShoppingBag },
    { id: 'wishlist', label: 'قائمة الأمنيات', icon: Heart },
    { id: 'rewards', label: 'نقاط المكافآت', icon: Gift },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  const recentOrders = [
    { id: 1, date: '2024-01-20', total: 299.97, status: 'تم التسليم', items: 3 },
    { id: 2, date: '2024-01-15', total: 149.99, status: 'في الطريق', items: 1 },
    { id: 3, date: '2024-01-10', total: 89.99, status: 'تم التسليم', items: 2 },
  ];

  const wishlistItems = [
    { id: 1, name: 'روبوت التعلم الذكي', price: 199.99, image: '/api/placeholder/100/100' },
    { id: 2, name: 'مجموعة الفنون والحرف', price: 79.99, image: '/api/placeholder/100/100' },
    { id: 3, name: 'لعبة البناء المغناطيسية', price: 129.99, image: '/api/placeholder/100/100' },
  ];

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
                <User className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                حسابي
              </h1>
            </motion.div>
            <p className="text-purple-600">مرحباً بك في عالم الألعاب الرائع!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800">سارة أحمد</h3>
                  <p className="text-sm text-gray-500">عضو ذهبي</p>
                </div>
                
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-pink-50'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100"
              >
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <User className="h-6 w-6 text-pink-500" />
                      الملف الشخصي
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">الاسم الكامل</label>
                        <input
                          type="text"
                          defaultValue="سارة أحمد محمد"
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
                        <input
                          type="email"
                          defaultValue="sara@example.com"
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
                        <input
                          type="tel"
                          defaultValue="+966 50 123 4567"
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">تاريخ الميلاد</label>
                        <input
                          type="date"
                          defaultValue="1990-05-15"
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-2">العنوان</label>
                        <input
                          type="text"
                          defaultValue="الرياض، حي النرجس، شارع الأمير محمد بن عبدالعزيز"
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg"
                    >
                      حفظ التغييرات
                    </motion.button>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <ShoppingBag className="h-6 w-6 text-pink-500" />
                      طلباتي
                    </h2>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full">
                                <ShoppingBag className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-800">طلب رقم #{order.id}</h3>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {order.date}
                                </p>
                                <p className="text-sm text-gray-600">{order.items} عنصر</p>
                              </div>
                            </div>
                            <div className="text-left">
                              <div className="text-xl font-bold text-purple-600 mb-2">
                                {order.total.toFixed(2)} ر.س
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                order.status === 'تم التسليم' 
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <Heart className="h-6 w-6 text-pink-500" />
                      قائمة الأمنيات
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ y: -5 }}
                          className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border-2 border-pink-200 hover:border-pink-400 transition-all"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded-lg mb-4"
                          />
                          <h3 className="font-bold text-gray-800 mb-2">{item.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-purple-600">
                              {item.price.toFixed(2)} ر.س
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                            >
                              أضف للسلة
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'rewards' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <Gift className="h-6 w-6 text-pink-500" />
                      نقاط المكافآت
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white text-center">
                        <Gift className="h-12 w-12 mx-auto mb-3" />
                        <div className="text-3xl font-bold mb-2">1,250</div>
                        <div className="text-sm">نقطة متاحة</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-white text-center">
                        <Star className="h-12 w-12 mx-auto mb-3" />
                        <div className="text-3xl font-bold mb-2">عضو ذهبي</div>
                        <div className="text-sm">المستوى الحالي</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl p-6 text-white text-center">
                        <Calendar className="h-12 w-12 mx-auto mb-3" />
                        <div className="text-3xl font-bold mb-2">750</div>
                        <div className="text-sm">نقطة للمستوى التالي</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
                      <h3 className="font-bold text-gray-800 mb-4">المكافآت المتاحة</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-white rounded-lg p-4">
                          <div>
                            <h4 className="font-semibold text-gray-800">خصم 10%</h4>
                            <p className="text-sm text-gray-600">على طلبك التالي</p>
                          </div>
                          <div className="text-left">
                            <div className="text-purple-600 font-bold">500 نقطة</div>
                            <button className="text-sm text-pink-500 hover:text-pink-700">استبدال</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-white rounded-lg p-4">
                          <div>
                            <h4 className="font-semibold text-gray-800">شحن مجاني</h4>
                            <p className="text-sm text-gray-600">لمدة شهر كامل</p>
                          </div>
                          <div className="text-left">
                            <div className="text-purple-600 font-bold">800 نقطة</div>
                            <button className="text-sm text-pink-500 hover:text-pink-700">استبدال</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <Settings className="h-6 w-6 text-pink-500" />
                      الإعدادات
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
                        <h3 className="font-bold text-gray-800 mb-4">إعدادات الإشعارات</h3>
                        <div className="space-y-4">
                          {[
                            { title: 'إشعارات الطلبات', desc: 'تحديثات حالة الطلب والشحن' },
                            { title: 'العروض الخاصة', desc: 'إشعارات حول الخصومات والعروض' },
                            { title: 'منتجات جديدة', desc: 'إشعارات عند وصول ألعاب جديدة' },
                            { title: 'نقاط المكافآت', desc: 'تحديثات نقاط المكافآت والمستوى' },
                          ].map((setting, index) => (
                            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4">
                              <div>
                                <h4 className="font-semibold text-gray-800">{setting.title}</h4>
                                <p className="text-sm text-gray-600">{setting.desc}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
                        <h3 className="font-bold text-gray-800 mb-4">الخصوصية والأمان</h3>
                        <div className="space-y-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white text-gray-800 py-3 rounded-lg font-semibold border-2 border-pink-200 hover:border-pink-400 transition-colors"
                          >
                            تغيير كلمة المرور
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white text-gray-800 py-3 rounded-lg font-semibold border-2 border-pink-200 hover:border-pink-400 transition-colors"
                          >
                            إدارة الخصوصية
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ToysAccountPage;
