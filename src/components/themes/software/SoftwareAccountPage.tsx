import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Download, CreditCard, Shield, Bell, Key, Zap, Package, Calendar } from 'lucide-react';

const SoftwareAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'downloads', label: 'التحميلات', icon: Download },
    { id: 'billing', label: 'الفواتير', icon: CreditCard },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
  ];

  const downloadedSoftware = [
    { id: 1, name: 'Adobe Photoshop 2024', version: '25.0', downloadDate: '2024-01-15', size: '2.1 GB', status: 'مكتمل' },
    { id: 2, name: 'Microsoft Office 365', version: '16.0', downloadDate: '2024-01-10', size: '3.5 GB', status: 'مكتمل' },
    { id: 3, name: 'AutoCAD 2024', version: '24.1', downloadDate: '2024-01-05', size: '4.2 GB', status: 'مكتمل' },
  ];

  const licenses = [
    { id: 1, software: 'Adobe Creative Suite', type: 'سنوي', expiryDate: '2024-12-31', status: 'نشط' },
    { id: 2, software: 'Microsoft Office 365', type: 'شهري', expiryDate: '2024-02-28', status: 'نشط' },
    { id: 3, software: 'AutoCAD Professional', type: 'سنوي', expiryDate: '2024-06-30', status: 'نشط' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full">
                <User className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">حسابي</h1>
            </motion.div>
            <p className="text-blue-200">إدارة حسابك وتراخيص البرامج</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700'
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
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">الملف الشخصي</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-300 mb-2">الاسم الكامل</label>
                        <input
                          type="text"
                          defaultValue="أحمد محمد"
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2">البريد الإلكتروني</label>
                        <input
                          type="email"
                          defaultValue="ahmed@example.com"
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2">رقم الهاتف</label>
                        <input
                          type="tel"
                          defaultValue="+966 50 123 4567"
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2">الشركة</label>
                        <input
                          type="text"
                          defaultValue="شركة التقنية المتقدمة"
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      حفظ التغييرات
                    </motion.button>
                  </div>
                )}

                {activeTab === 'downloads' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">التحميلات</h2>
                    <div className="space-y-4">
                      {downloadedSoftware.map((software) => (
                        <div key={software.id} className="bg-slate-700/50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                                <Package className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-white font-semibold">{software.name}</h3>
                                <p className="text-slate-400 text-sm">الإصدار {software.version} • {software.size}</p>
                                <p className="text-slate-500 text-xs">تم التحميل في {software.downloadDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-green-400 text-sm">{software.status}</span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                              >
                                <Download className="h-4 w-4" />
                                إعادة تحميل
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">التراخيص والفواتير</h2>
                    <div className="space-y-4">
                      {licenses.map((license) => (
                        <div key={license.id} className="bg-slate-700/50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
                                <Key className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-white font-semibold">{license.software}</h3>
                                <p className="text-slate-400 text-sm">ترخيص {license.type}</p>
                                <p className="text-slate-500 text-xs">ينتهي في {license.expiryDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-green-400 text-sm">{license.status}</span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
                              >
                                تجديد
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">الأمان</h2>
                    <div className="space-y-6">
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-3">تغيير كلمة المرور</h3>
                        <div className="space-y-4">
                          <input
                            type="password"
                            placeholder="كلمة المرور الحالية"
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="password"
                            placeholder="كلمة المرور الجديدة"
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="password"
                            placeholder="تأكيد كلمة المرور الجديدة"
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                          />
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold"
                          >
                            تحديث كلمة المرور
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-3">المصادقة الثنائية</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-slate-300">تأمين إضافي لحسابك</p>
                            <p className="text-slate-500 text-sm">حماية حسابك برمز التحقق</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                          >
                            تفعيل
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">إعدادات الإشعارات</h2>
                    <div className="space-y-4">
                      {[
                        { title: 'تحديثات البرامج', desc: 'إشعارات عند توفر تحديثات جديدة' },
                        { title: 'انتهاء التراخيص', desc: 'تذكير قبل انتهاء صلاحية التراخيص' },
                        { title: 'العروض الخاصة', desc: 'إشعارات حول العروض والخصومات' },
                        { title: 'الأمان', desc: 'تنبيهات أمنية ومحاولات تسجيل الدخول' },
                      ].map((notification, index) => (
                        <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-semibold">{notification.title}</h3>
                              <p className="text-slate-400 text-sm">{notification.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      ))}
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

export default SoftwareAccountPage;
