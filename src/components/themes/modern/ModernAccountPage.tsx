import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Package, MapPin, Settings, Heart, 
  CreditCard, Bell, Shield, Edit, ChevronRight,
  Calendar, Star, Download, Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  image: string;
}

const ModernAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: new Date('2024-01-15'),
      status: 'delivered',
      total: 599,
      items: 2,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 'ORD-002',
      date: new Date('2024-01-10'),
      status: 'shipped',
      total: 299,
      items: 1,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  ];

  const tabs = [
    { id: 'profile', name: 'الملف الشخصي', icon: User },
    { id: 'orders', name: 'طلباتي', icon: Package },
    { id: 'addresses', name: 'العناوين', icon: MapPin },
    { id: 'wishlist', name: 'المفضلة', icon: Heart },
    { id: 'settings', name: 'الإعدادات', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'تم التسليم';
      case 'shipped': return 'قيد الشحن';
      case 'processing': return 'قيد المعالجة';
      case 'pending': return 'في الانتظار';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            حسابي
          </h1>
          <p className="text-gray-600">إدارة معلوماتك الشخصية وطلباتك</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">أحمد محمد</h3>
                <p className="text-gray-600">ahmad@example.com</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      {tab.name}
                      <ChevronRight size={16} className="mr-auto" />
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">الملف الشخصي</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      <Edit size={16} />
                      تعديل
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                      <input
                        type="text"
                        value="أحمد"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأخير</label>
                      <input
                        type="text"
                        value="محمد"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        value="ahmad@example.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        value="+966501234567"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الميلاد</label>
                      <input
                        type="date"
                        value="1990-01-01"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">طلباتي</h2>
                  
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={order.image}
                              alt="Order item"
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-bold text-gray-900">طلب رقم {order.id}</h3>
                              <p className="text-sm text-gray-600 flex items-center">
                                <Calendar size={14} className="ml-1" />
                                {order.date.toLocaleDateString('ar-SA')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{order.items} قطعة</span>
                            <span className="font-bold text-purple-600">{order.total} ر.س</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              <Eye size={14} />
                              عرض
                            </button>
                            {order.status === 'delivered' && (
                              <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                <Download size={14} />
                                فاتورة
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">عناويني</h2>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      إضافة عنوان جديد
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">العنوان الرئيسي</h3>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">افتراضي</span>
                      </div>
                      <div className="text-gray-600 space-y-1">
                        <p>الرياض، المملكة العربية السعودية</p>
                        <p>حي النرجس، شارع الملك فهد</p>
                        <p>مبنى رقم 123، شقة 45</p>
                        <p>الرمز البريدي: 12345</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          تعديل
                        </button>
                        <button className="px-3 py-1 text-red-600 hover:bg-red-50 transition-colors text-sm">
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">المفضلة</h2>
                  <p className="text-gray-600 text-center py-8">لا توجد عناصر في قائمة المفضلة</p>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">الإعدادات</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                        <Bell size={20} className="ml-2" />
                        الإشعارات
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span>إشعارات الطلبات</span>
                          <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span>إشعارات العروض</span>
                          <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span>إشعارات المنتجات الجديدة</span>
                          <input type="checkbox" className="rounded text-purple-600" />
                        </label>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                        <Shield size={20} className="ml-2" />
                        الخصوصية والأمان
                      </h3>
                      <div className="space-y-3">
                        <button className="w-full text-right py-2 hover:text-purple-600 transition-colors">
                          تغيير كلمة المرور
                        </button>
                        <button className="w-full text-right py-2 hover:text-purple-600 transition-colors">
                          إعدادات الخصوصية
                        </button>
                        <button className="w-full text-right py-2 hover:text-purple-600 transition-colors">
                          تفعيل المصادقة الثنائية
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                        <CreditCard size={20} className="ml-2" />
                        طرق الدفع
                      </h3>
                      <button className="w-full text-right py-2 hover:text-purple-600 transition-colors">
                        إدارة طرق الدفع
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernAccountPage;