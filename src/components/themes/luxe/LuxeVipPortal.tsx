import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Diamond, Star, Calendar, Phone, Shield,
  Award, Sparkles, ChevronRight, Clock, User,
  CreditCard, Package, MapPin, Heart, Eye,
  Bell, Settings, Lock, Gift, Zap, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface VipService {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  available: boolean;
  premium: boolean;
}

interface Appointment {
  id: string;
  date: Date;
  time: string;
  service: string;
  consultant: string;
  status: 'confirmed' | 'pending' | 'completed';
  location: string;
}

interface PersonalShopper {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  languages: string[];
  image: string;
  available: boolean;
}

const LuxeVipPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedShopper, setSelectedShopper] = useState<string | null>(null);

  const vipServices: VipService[] = [
    {
      id: 'personal-shopper',
      title: 'مستشار شخصي',
      description: 'مستشار أزياء شخصي متاح 24/7 لمساعدتك في اختيار القطع المثالية',
      icon: User,
      available: true,
      premium: false
    },
    {
      id: 'private-showroom',
      title: 'صالة عرض خاصة',
      description: 'احجز صالة عرض خاصة لتجربة القطع في بيئة مريحة وحصرية',
      icon: Crown,
      available: true,
      premium: true
    },
    {
      id: 'home-delivery',
      title: 'التوصيل الفاخر',
      description: 'خدمة توصيل VIP مع تغليف فاخر وتجربة استلام استثنائية',
      icon: Package,
      available: true,
      premium: false
    },
    {
      id: 'concierge',
      title: 'خدمة الكونسيرج',
      description: 'مساعد شخصي لترتيب كافة احتياجاتك من المنتجات والخدمات',
      icon: Bell,
      available: true,
      premium: true
    },
    {
      id: 'authentication',
      title: 'خدمة التوثيق',
      description: 'توثيق وتقييم مجانية لجميع مشترياتك من القطع الفاخرة',
      icon: Shield,
      available: true,
      premium: false
    },
    {
      id: 'customization',
      title: 'التخصيص الحصري',
      description: 'تخصيص القطع حسب ذوقك الشخصي مع أفضل الحرفيين',
      icon: Sparkles,
      available: true,
      premium: true
    }
  ];

  const upcomingAppointments: Appointment[] = [
    {
      id: '1',
      date: new Date('2024-01-20'),
      time: '14:00',
      service: 'معاينة مجوهرات',
      consultant: 'سارة أحمد',
      status: 'confirmed',
      location: 'صالة VIP - الرياض'
    },
    {
      id: '2',
      date: new Date('2024-01-25'),
      time: '10:30',
      service: 'استشارة أزياء',
      consultant: 'ليلى محمد',
      status: 'pending',
      location: 'أتيليه خاص'
    }
  ];

  const personalShoppers: PersonalShopper[] = [
    {
      id: '1',
      name: 'سارة الزهراني',
      specialty: 'مجوهرات فاخرة',
      rating: 4.9,
      experience: '12 سنة',
      languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b412?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      available: true
    },
    {
      id: '2',
      name: 'نورا الأحمد',
      specialty: 'أزياء كوتور',
      rating: 5.0,
      experience: '15 سنة',
      languages: ['العربية', 'الإنجليزية', 'الإيطالية'],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      available: true
    },
    {
      id: '3',
      name: 'ريم السعدون',
      specialty: 'ساعات فاخرة',
      rating: 4.8,
      experience: '10 سنوات',
      languages: ['العربية', 'الإنجليزية', 'الألمانية'],
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      available: false
    }
  ];

  const tabs = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: Crown },
    { id: 'services', name: 'الخدمات', icon: Sparkles },
    { id: 'appointments', name: 'المواعيد', icon: Calendar },
    { id: 'shoppers', name: 'المستشارين', icon: User },
    { id: 'rewards', name: 'المكافآت', icon: Gift },
    { id: 'settings', name: 'الإعدادات', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'completed': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'مؤكد';
      case 'pending': return 'في الانتظار';
      case 'completed': return 'مكتمل';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VIP Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Crown className="text-amber-400 w-16 h-16" />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl" />
            </motion.div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent mb-4">
            بوابة العضوية المميزة
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            مرحباً بك في عالم الرفاهية الحصري، حيث كل التفاصيل مصممة خصيصاً لك
          </p>
          
          {/* Member Status */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600/20 to-amber-400/20 backdrop-blur-lg border border-amber-500/30 rounded-full px-8 py-4 mt-6"
          >
            <Diamond className="text-amber-400 w-6 h-6" />
            <span className="text-amber-300 font-bold text-lg">عضو ماسي</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-amber-400 fill-current" />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-6">
              {/* Profile */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User size={40} className="text-black" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1">
                    <Crown size={16} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">أحمد الملكي</h3>
                <p className="text-amber-400">عضو ماسي منذ 2020</p>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-sm text-gray-400">نقاط الولاء: </span>
                  <span className="text-amber-400 font-bold ml-1">12,450</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black font-medium shadow-lg shadow-amber-500/25'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-amber-400'
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
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-8">
              
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <Crown className="text-amber-400 mr-3" />
                    لوحة التحكم
                  </h2>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-300 text-sm">إجمالي المشتريات</p>
                          <p className="text-2xl font-bold text-white">125,000 ر.س</p>
                        </div>
                        <CreditCard className="text-purple-400 w-8 h-8" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border border-emerald-500/30 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-emerald-300 text-sm">نقاط الولاء</p>
                          <p className="text-2xl font-bold text-white">12,450</p>
                        </div>
                        <Star className="text-emerald-400 w-8 h-8 fill-current" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 border border-amber-500/30 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-amber-300 text-sm">المواعيد القادمة</p>
                          <p className="text-2xl font-bold text-white">{upcomingAppointments.length}</p>
                        </div>
                        <Calendar className="text-amber-400 w-8 h-8" />
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">النشاط الأخير</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl">
                        <div className="bg-emerald-500 p-2 rounded-full">
                          <Package size={16} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">تم توصيل طلبك</p>
                          <p className="text-gray-400 text-sm">عقد الياقوت الملكي - منذ يومين</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl">
                        <div className="bg-amber-500 p-2 rounded-full">
                          <Calendar size={16} className="text-black" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">موعد مؤكد</p>
                          <p className="text-gray-400 text-sm">معاينة ساعة فاخرة - 20 يناير</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exclusive Offers */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">عروض حصرية لك</h3>
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
                      <div className="flex items-center gap-4">
                        <Gift className="text-purple-400 w-12 h-12" />
                        <div className="flex-1">
                          <h4 className="text-white font-bold mb-2">خصم خاص 25%</h4>
                          <p className="text-gray-300 mb-4">على مجموعة الساعات السويسرية الجديدة</p>
                          <button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-300">
                            استخدم العرض
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <Sparkles className="text-amber-400 mr-3" />
                    الخدمات المميزة
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {vipServices.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                            service.available
                              ? 'bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-amber-500/30 hover:border-amber-400/50'
                              : 'bg-gray-800/30 border-gray-600/30 opacity-50'
                          }`}
                        >
                          {service.premium && (
                            <div className="absolute top-4 right-4">
                              <Crown className="text-amber-400 w-5 h-5" />
                            </div>
                          )}
                          
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`p-3 rounded-full ${
                              service.available
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-gray-600/20 text-gray-500'
                            }`}>
                              <Icon size={24} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-bold mb-2">{service.title}</h3>
                              <p className="text-gray-300 text-sm">{service.description}</p>
                            </div>
                          </div>

                          <button
                            disabled={!service.available}
                            className={`w-full py-2 px-4 rounded-lg transition-all duration-300 ${
                              service.available
                                ? 'bg-amber-500 text-black hover:bg-amber-400 font-medium'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {service.available ? 'طلب الخدمة' : 'غير متاح حالياً'}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white flex items-center">
                      <Calendar className="text-amber-400 mr-3" />
                      مواعيدي
                    </h2>
                    <button className="bg-gradient-to-r from-amber-600 to-amber-500 text-black px-6 py-3 rounded-lg hover:from-amber-700 hover:to-amber-600 transition-all duration-300 font-medium">
                      حجز موعد جديد
                    </button>
                  </div>

                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/30 rounded-xl p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="bg-amber-500 p-3 rounded-full">
                              <Calendar size={20} className="text-black" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold">{appointment.service}</h3>
                              <p className="text-gray-400">مع {appointment.consultant}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center text-gray-300">
                            <Clock size={16} className="ml-2 text-amber-400" />
                            {appointment.date.toLocaleDateString('ar-SA')} - {appointment.time}
                          </div>
                          <div className="flex items-center text-gray-300">
                            <MapPin size={16} className="ml-2 text-amber-400" />
                            {appointment.location}
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">
                              تعديل
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                              إلغاء
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Shoppers Tab */}
              {activeTab === 'shoppers' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <User className="text-amber-400 mr-3" />
                    المستشارين الشخصيين
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {personalShoppers.map((shopper, index) => (
                      <motion.div
                        key={shopper.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative bg-gradient-to-br from-gray-700/50 to-gray-800/50 border rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
                          shopper.available
                            ? 'border-amber-500/30 hover:border-amber-400/50'
                            : 'border-gray-600/30 opacity-70'
                        }`}
                      >
                        {!shopper.available && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs">
                            غير متاح
                          </div>
                        )}
                        
                        <div className="text-center mb-4">
                          <img
                            src={shopper.image}
                            alt={shopper.name}
                            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                          />
                          <h3 className="text-white font-bold">{shopper.name}</h3>
                          <p className="text-amber-400 text-sm">{shopper.specialty}</p>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">التقييم:</span>
                            <div className="flex items-center">
                              <Star size={14} className="text-amber-400 fill-current mr-1" />
                              <span className="text-white">{shopper.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">الخبرة:</span>
                            <span className="text-white">{shopper.experience}</span>
                          </div>
                          
                          <div className="text-sm">
                            <span className="text-gray-400">اللغات:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {shopper.languages.map((lang, i) => (
                                <span key={i} className="bg-gray-600/50 text-gray-300 px-2 py-1 rounded text-xs">
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            disabled={!shopper.available}
                            className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                              shopper.available
                                ? 'bg-amber-500 text-black hover:bg-amber-400 font-medium'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {shopper.available ? 'حجز استشارة' : 'غير متاح'}
                          </button>
                          <button className="px-3 py-2 border border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-black transition-all duration-300">
                            <Phone size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other tabs can be added here */}
              {activeTab === 'rewards' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <Gift className="text-amber-400 mr-3" />
                    برنامج المكافآت
                  </h2>
                  <p className="text-gray-300 text-center py-8">قريباً...</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <Settings className="text-amber-400 mr-3" />
                    إعدادات الحساب
                  </h2>
                  <p className="text-gray-300 text-center py-8">قريباً...</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LuxeVipPortal;