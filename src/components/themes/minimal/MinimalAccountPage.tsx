import React, { useState } from 'react';
import { User, Package, Heart, MapPin, Settings, LogOut, Eye, Star, Calendar } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

interface MinimalAccountPageProps {
  storeName?: string;
}

const MinimalAccountPage: React.FC<MinimalAccountPageProps> = ({ 
  storeName = "متجر الأناقة" 
}) => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const user = {
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    joinDate: '2023-01-15'
  };

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 159.50,
      items: 2
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 89.99,
      items: 1
    }
  ];

  // Mock wishlist (first 6 products)
  const wishlist = products.slice(0, 6);

  // Mock addresses
  const addresses = [
    {
      id: 1,
      type: 'home',
      name: 'المنزل',
      address: 'شارع الملك فهد، حي النخيل، الرياض 12345',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'العمل',
      address: 'طريق الملك عبدالعزيز، حي الوزارات، الرياض 11564',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'shipped': return 'text-blue-600 bg-blue-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'تم التوصيل';
      case 'shipped': return 'قيد الشحن';
      case 'processing': return 'قيد المعالجة';
      default: return status;
    }
  };

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'orders', label: 'طلباتي', icon: Package },
    { id: 'wishlist', label: 'المفضلة', icon: Heart },
    { id: 'addresses', label: 'العناوين', icon: MapPin },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">حسابي</h1>
          <p className="text-gray-600">إدارة معلوماتك الشخصية وطلباتك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.label}
                    </button>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="h-5 w-5" />
                  تسجيل الخروج
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">الملف الشخصي</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانضمام</label>
                      <input
                        type="text"
                        value={new Date(user.joinDate).toLocaleDateString('ar-SA')}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                      حفظ التغييرات
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">طلباتي</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">طلب #{order.id}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(order.date).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            {order.items} منتج • {order.total} ر.س
                          </div>
                          <button className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors">
                            <Eye className="h-4 w-4" />
                            عرض التفاصيل
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">المفضلة</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({product.rating})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900">{product.price} ر.س</span>
                          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                            أضف للسلة
                          </button>
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
                    <h2 className="text-xl font-semibold text-gray-900">العناوين</h2>
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                      إضافة عنوان جديد
                    </button>
                  </div>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{address.name}</h3>
                              {address.isDefault && (
                                <span className="px-2 py-1 bg-gray-900 text-white text-xs rounded-full">
                                  افتراضي
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600">{address.address}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-gray-600 hover:text-gray-900 transition-colors">
                              تعديل
                            </button>
                            <button className="text-red-600 hover:text-red-800 transition-colors">
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">الإعدادات</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">الإشعارات</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded text-gray-900 focus:ring-gray-500" />
                          <span className="mr-3 text-gray-700">إشعارات الطلبات</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded text-gray-900 focus:ring-gray-500" />
                          <span className="mr-3 text-gray-700">العروض والخصومات</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-gray-900 focus:ring-gray-500" />
                          <span className="mr-3 text-gray-700">النشرة الإخبارية</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">اللغة والمنطقة</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                            <option value="ar">العربية</option>
                            <option value="en">English</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                            <option value="sar">ريال سعودي (ر.س)</option>
                            <option value="usd">دولار أمريكي ($)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">الأمان</h3>
                      <button className="text-gray-900 hover:text-gray-700 transition-colors">
                        تغيير كلمة المرور
                      </button>
                    </div>

                    <div className="pt-4">
                      <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                        حفظ الإعدادات
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalAccountPage;
