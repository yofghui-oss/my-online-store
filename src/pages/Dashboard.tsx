import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Eye,
  MonitorSmartphone,
  CreditCard,
  UserCheck,
  Crown,
  Tags,
  Percent,
  Ticket,
  MessageSquare,
  Truck,
  FileText,
  BookOpen,
  Gift,
  Palette,
  Store,
  Puzzle,
  Banknote,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useStore } from '../contexts/StoreContext';

// Dashboard components
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ProductManagement from '../components/dashboard/ProductManagement';
import OrderManagement from '../components/dashboard/OrderManagement';
import CustomerManagement from '../components/dashboard/CustomerManagement';
import Analytics from '../components/dashboard/Analytics';
import StoreSettings from '../components/dashboard/StoreSettings';
import IntegrationManagement from '../components/dashboard/IntegrationManagement';
import StoreThemeManagement from '../components/dashboard/StoreThemeManagement';
import CategoryManagement from '../components/dashboard/CategoryManagement';
import ProductTaxes from '../components/dashboard/ProductTaxes';
import ProductCoupons from '../components/dashboard/ProductCoupons';
import SubscribersManagement from '../components/dashboard/SubscribersManagement';
import TestimonialsManagement from '../components/dashboard/TestimonialsManagement';
import ShippingManagement from '../components/dashboard/ShippingManagement';
import CustomPagesManagement from '../components/dashboard/CustomPagesManagement';
import BlogManagement from '../components/dashboard/BlogManagement';
import StaffRolesManagement from '../components/dashboard/StaffRolesManagement';
import StaffUsersManagement from '../components/dashboard/StaffUsersManagement';
import PlansManagement from '../components/dashboard/PlansManagement';
import ReferralsProgram from '../components/dashboard/ReferralsProgram';
import PaymobGateway from '../components/dashboard/PaymobGateway';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  isExternal?: boolean;
}

interface NavigationSection {
  category: string;
  items: NavigationItem[];
}

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { colorMode: theme, toggleColorMode: toggleTheme } = useTheme();
  const { currentStore } = useStore();
  const location = useLocation();

  const navigation: NavigationSection[] = [
    {
      category: 'لوحة التحكم',
      items: [
        { name: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
        { name: 'تحليلات المتجر', href: '/dashboard/analytics', icon: BarChart3 },
        { name: 'الطلبات', href: '/dashboard/orders', icon: ShoppingCart },
      ]
    },
    {
      category: 'السمات',
      items: [
        { name: 'السمات', href: '/dashboard/themes', icon: Palette },
      ]
    },
    {
      category: 'الموظفون',
      items: [
        { name: 'الأدوار', href: '/dashboard/roles', icon: Crown },
        { name: 'المستخدمون', href: '/dashboard/staff', icon: UserCheck },
      ]
    },
    {
      category: 'نقاط البيع',
      items: [
        { name: 'نقاط البيع', href: `/pos/${currentStore?.id}`, icon: MonitorSmartphone, isExternal: true },
      ]
    },
    {
      category: 'المتجر',
      items: [
        { name: 'المنتجات', href: '/dashboard/products', icon: Package },
        { name: 'فئة المنتج', href: '/dashboard/categories', icon: Tags },
        { name: 'ضريبة المنتج', href: '/dashboard/taxes', icon: Percent },
        { name: 'قسيمة المنتج', href: '/dashboard/coupons', icon: Ticket },
        { name: 'المشتركون', href: '/dashboard/subscribers', icon: Users },
        { name: 'شهادات العملاء', href: '/dashboard/testimonials', icon: MessageSquare },
        { name: 'الشحن', href: '/dashboard/shipping', icon: Truck },
        { name: 'صفحة مخصصة', href: '/dashboard/custom-pages', icon: FileText },
        { name: 'المدونات', href: '/dashboard/blogs', icon: BookOpen },
        { name: 'التكاملات', href: '/dashboard/integrations', icon: Puzzle },
      ]
    },
    {
      category: 'العملاء',
      items: [
        { name: 'العملاء', href: '/dashboard/customers', icon: Users },
      ]
    },
    {
      category: 'المدفوعات',
      items: [
        { name: 'بوابة Paymob', href: '/dashboard/paymob', icon: Banknote },
      ]
    },
    {
      category: 'الخطط',
      items: [
        { name: 'الخطط', href: '/dashboard/plans', icon: CreditCard },
      ]
    },
    {
      category: 'برنامج الإحالة',
      items: [
        { name: 'برنامج الإحالة', href: '/dashboard/referrals', icon: Gift },
      ]
    },
    {
      category: 'إعدادات المتجر',
      items: [
        { name: 'إعدادات المتجر', href: '/dashboard/store-settings', icon: Store },
        { name: 'الإعدادات العامة', href: '/dashboard/settings', icon: Settings },
      ]
    },
  ];

  const isCurrentPath = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex" dir="rtl">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 right-0 z-50 w-72 bg-white dark:bg-secondary-900 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col border-l border-secondary-200/50 dark:border-secondary-800/50`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-secondary-200/50 dark:border-secondary-800/50 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-9 w-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300 group-hover:scale-105">
                <Shield size={18} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-secondary-900"></div>
            </div>
            <div>
              <span className="text-lg font-bold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                متجري
              </span>
              <p className="text-xs text-secondary-500 dark:text-secondary-400">
                نظام إدارة المتاجر
              </p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>

        {currentStore && (
          <div className="p-5 border-b border-secondary-200/50 dark:border-secondary-800/50 bg-gradient-to-r from-secondary-50 to-primary-50/30 dark:from-secondary-800/50 dark:to-primary-900/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={currentStore.logo}
                  alt={currentStore.name}
                  className="h-12 w-12 rounded-xl object-cover shadow-md border-2 border-white dark:border-secondary-800"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-secondary-800 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-secondary-900 dark:text-white mb-1">
                  {currentStore.name}
                </h3>
                <Link 
                  to={`/store/${currentStore.id}`} 
                  target="_blank" 
                  className="flex items-center gap-2 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors group"
                >
                  <Eye size={12} className="group-hover:scale-110 transition-transform" />
                  <span>{currentStore.domain}</span>
                  <div className="w-1 h-1 bg-current rounded-full opacity-50"></div>
                  <span className="text-green-600 dark:text-green-400">نشط</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-grow mt-4 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-300 dark:scrollbar-thumb-secondary-700">
          <div className="space-y-5">
            {navigation.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-xs font-bold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-3 px-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full"></div>
                  {section.category}
                </h3>
                <ul className="space-y-1.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const current = !item.isExternal && isCurrentPath(item.href);
                    
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          target={item.isExternal ? '_blank' : '_self'}
                          className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden ${
                            current
                              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 transform scale-[1.02]'
                              : 'text-secondary-600 hover:text-secondary-900 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-primary-50/50 dark:text-secondary-300 dark:hover:text-white dark:hover:from-secondary-800 dark:hover:to-primary-900/20 hover:shadow-md'
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {current && (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                          )}
                          <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${
                            current 
                              ? 'bg-white/20 shadow-sm' 
                              : 'bg-secondary-100 dark:bg-secondary-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30'
                          }`}>
                            <Icon className={`h-4 w-4 transition-all duration-200 ${
                              current 
                                ? 'text-white' 
                                : 'text-secondary-600 dark:text-secondary-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                            }`} />
                          </div>
                          <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">
                            {item.name}
                          </span>
                          {current && (
                            <div className="mr-auto w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-secondary-200/50 dark:border-secondary-800/50 bg-gradient-to-r from-secondary-50/50 to-red-50/50 dark:from-secondary-800/50 dark:to-red-900/10">
          <button className="w-full group flex items-center px-4 py-3 text-sm font-medium rounded-xl text-secondary-600 dark:text-secondary-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:shadow-md">
            <div className="p-2 rounded-lg mr-3 bg-secondary-100 dark:bg-secondary-800 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-all duration-200">
              <LogOut size={16} className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200" />
            </div>
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              تسجيل الخروج
            </span>
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:mr-72">
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-secondary-950/80 backdrop-blur-xl shadow-sm border-b border-secondary-200/50 dark:border-secondary-800/50">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
              >
                <Menu size={20} />
              </button>
              <div className="hidden md:block">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  {currentStore?.name || 'لوحة تحكم المتجر'}
                </h2>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  أهلاً وسهلاً بك
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-all duration-200 hover:scale-105"
                title={theme === 'light' ? 'التبديل للوضع المظلم' : 'التبديل للوضع الفاتح'}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {theme === 'light' ? '🌙' : '☀️'}
                </div>
              </button>
              <div className="h-6 w-px bg-secondary-200 dark:bg-secondary-700"></div>
              <Link 
                to="/super-admin" 
                className="px-3 py-1.5 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
              >
                Super Admin
              </Link>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-secondary-600 dark:text-secondary-300">متصل</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/themes" element={<StoreThemeManagement />} />
            <Route path="/roles" element={<StaffRolesManagement />} />
            <Route path="/staff" element={<StaffUsersManagement />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/taxes" element={<ProductTaxes />} />
            <Route path="/coupons" element={<ProductCoupons />} />
            <Route path="/subscribers" element={<SubscribersManagement />} />
            <Route path="/testimonials" element={<TestimonialsManagement />} />
            <Route path="/shipping" element={<ShippingManagement />} />
            <Route path="/custom-pages" element={<CustomPagesManagement />} />
            <Route path="/blogs" element={<BlogManagement />} />
            <Route path="/integrations" element={<IntegrationManagement />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/plans" element={<PlansManagement />} />
            <Route path="/paymob" element={<PaymobGateway />} />
            <Route path="/referrals" element={<ReferralsProgram />} />
            <Route path="/store-settings" element={<StoreSettings />} />
            <Route path="/settings" element={<StoreSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
