import React, { useState } from 'react';
import { User, Package, Heart, MapPin, Settings, LogOut, Eye, Star, Calendar, Zap, Monitor, Cpu } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

interface TechAccountPageProps {
  storeName?: string;
}

const TechAccountPage: React.FC<TechAccountPageProps> = ({ 
  storeName = "TechStore" 
}) => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const user = {
    name: 'أحمد التقني',
    email: 'ahmed.tech@example.com',
    phone: '+966 50 123 4567',
    joinDate: '2023-01-15',
    techLevel: 'خبير'
  };

  // Mock tech orders data
  const orders = [
    {
      id: 'TECH-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 2999.99,
      items: 2,
      type: 'laptop',
      warranty: '2 سنة'
    },
    {
      id: 'TECH-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 1599.50,
      items: 1,
      type: 'phone',
      warranty: '1 سنة'
    },
    {
      id: 'TECH-003',
      date: '2024-01-05',
      status: 'processing',
      total: 899.99,
      items: 3,
      type: 'accessories',
      warranty: '6 أشهر'
    }
  ];

  // Mock tech wishlist (first 6 products)
  const wishlist = products.slice(0, 6).map(product => ({
    ...product,
    image: product.image || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    specs: ['معالج Intel Core i7', '16GB RAM', '512GB SSD']
  }));

  // Mock addresses
  const addresses = [
    {
      id: 1,
      type: 'home',
      name: 'المنزل',
      address: 'شارع التقنية، حي الحاسوب، الرياض 12345',
      isDefault: true,
      installationNotes: 'يوجد مصعد - الدور الثالث'
    },
    {
      id: 2,
      type: 'work',
      name: 'المكتب',
      address: 'مجمع التقنية، طريق الملك فهد، الرياض 11564',
      isDefault: false,
      installationNotes: 'مكتب رقم 305 - يرجى التنسيق مسبقاً'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-400 bg-green-500/20';
      case 'shipped': return 'text-blue-400 bg-blue-500/20';
      case 'processing': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
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

  const getOrderIcon = (type: string) => {
    switch (type) {
      case 'laptop': return Monitor;
      case 'phone': return User;
      case 'accessories': return Cpu;
      default: return Package;
    }
  };

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'orders', label: 'طلباتي التقنية', icon: Package },
    { id: 'wishlist', label: 'المفضلة', icon: Heart },
    { id: 'addresses', label: 'عناوين التوصيل', icon: MapPin },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Zap className="h-8 w-8 text-blue-400" />
            حسابي التقني
          </h1>
          <p className="text-gray-400">إدارة معلوماتك وطلباتك التقنية</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-semibold text-white">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
                <div className="mt-2 inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                  <Zap className="h-3 w-3" />
                  {user.techLevel}
                </div>
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
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.label}
                    </button>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right text-red-400 hover:bg-red-500/20 transition-colors">
                  <LogOut className="h-5 w-5" />
                  تسجيل الخروج
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">الملف الشخصي التقني</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">المستوى التقني</label>
                      <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="beginner">مبتدئ</option>
                        <option value="intermediate">متوسط</option>
                        <option value="advanced">متقدم</option>
                        <option value="expert" selected>خبير</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
                      حفظ التغييرات
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">طلباتي التقنية</h2>
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const OrderIcon = getOrderIcon(order.type);
                      return (
                        <div key={order.id} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <OrderIcon className="h-5 w-5 text-blue-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-white">طلب #{order.id}</h3>
                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(order.date).toLocaleDateString('ar-SA')}
                                </p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400">
                              {order.items} منتج • {order.total} ر.س • ضمان {order.warranty}
                            </div>
                            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                              <Eye className="h-4 w-4" />
                              عرض التفاصيل
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">المنتجات المفضلة</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((product) => (
                      <div key={product.id} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-medium text-white mb-2">{product.name}</h3>
                        <div className="mb-3">
                          <div className="text-xs text-gray-400 mb-1">المواصفات:</div>
                          <div className="flex flex-wrap gap-1">
                            {product.specs.slice(0, 2).map((spec, index) => (
                              <span key={index} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">({product.rating})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-blue-400">{product.price} ر.س</span>
                          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
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
                    <h2 className="text-xl font-semibold text-white">عناوين التوصيل والتركيب</h2>
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
                      إضافة عنوان جديد
                    </button>
                  </div>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-white">{address.name}</h3>
                              {address.isDefault && (
                                <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs rounded-full">
                                  افتراضي
                                </span>
                              )}
                            </div>
                            <p className="text-gray-300 mb-2">{address.address}</p>
                            <div className="text-sm text-blue-400">
                              <strong>ملاحظات التركيب:</strong> {address.installationNotes}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-gray-400 hover:text-white transition-colors">
                              تعديل
                            </button>
                            <button className="text-red-400 hover:text-red-300 transition-colors">
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
                  <h2 className="text-xl font-semibold text-white mb-6">الإعدادات التقنية</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-white mb-3">الإشعارات</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600" />
                          <span className="mr-3 text-gray-300">إشعارات الطلبات والشحن</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600" />
                          <span className="mr-3 text-gray-300">العروض التقنية والخصومات</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600" />
                          <span className="mr-3 text-gray-300">أخبار التقنية والمنتجات الجديدة</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600" />
                          <span className="mr-3 text-gray-300">تذكيرات انتهاء الضمان</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-white mb-3">التفضيلات التقنية</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">العلامات التجارية المفضلة</label>
                          <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="all">جميع العلامات</option>
                            <option value="apple">Apple</option>
                            <option value="samsung">Samsung</option>
                            <option value="dell">Dell</option>
                            <option value="hp">HP</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">نطاق السعر المفضل</label>
                          <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="all">جميع الأسعار</option>
                            <option value="budget">اقتصادي (أقل من 1000 ر.س)</option>
                            <option value="mid">متوسط (1000-3000 ر.س)</option>
                            <option value="premium">متقدم (أكثر من 3000 ر.س)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-white mb-3">الأمان</h3>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        تغيير كلمة المرور
                      </button>
                    </div>

                    <div className="pt-4">
                      <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
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

export default TechAccountPage;
