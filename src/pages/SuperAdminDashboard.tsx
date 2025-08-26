import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck, Users, Settings, LogOut, Menu, X,
  LayoutDashboard, UserCheck, BookOpen, FileText, LayoutTemplate, Tag, ShoppingBag,
  Wallet, Globe, Ticket, Mail, Smile, Puzzle, Paintbrush, Cloud, Bot, Link2,
  Plug, BarChart2, MessageSquare, Webhook, Wrench, CreditCard, Languages, Search
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import PlatformOverview from '../components/super-admin/PlatformOverview';
import StoreManagement from '../components/super-admin/StoreManagement';
import UserManagement from '../components/super-admin/UserManagement';
import LandingPageCustomizer from '../components/super-admin/LandingPageCustomizer';
import PricingPlanManagement from '../components/super-admin/PricingPlanManagement';
import CouponManagement from '../components/super-admin/CouponManagement';
import TestimonialManagement from '../components/super-admin/TestimonialManagement';
import GeneralSettings from '../components/super-admin/GeneralSettings';
import SuperAdminPlaceholder from '../components/super-admin/SuperAdminPlaceholder';
import BlogManagement from '../components/super-admin/BlogManagement';
import PageManagement from '../components/super-admin/PageManagement';
import SupportTicketManagement from '../components/super-admin/SupportTicketManagement';
import ThemeManagement from '../components/super-admin/ThemeManagement';
import CustomDomainManagement from '../components/super-admin/CustomDomainManagement';
import IntegrationManagement from '../components/super-admin/IntegrationManagement';
import PaymentGatewaySettings from '../components/super-admin/PaymentGatewaySettings';
import RoleManagement from '../components/super-admin/RoleManagement';
import PackageOrderManagement from '../components/super-admin/PackageOrderManagement';
import WalletManagement from '../components/super-admin/WalletManagement';
import NewsletterManagement from '../components/super-admin/NewsletterManagement';
import FormBuilder from '../components/super-admin/FormBuilder';
import WebsiteAnalytics from '../components/super-admin/WebsiteAnalytics';
import UserWebsiteManagement from '../components/super-admin/UserWebsiteManagement';
import CloudStorageManagement from '../components/super-admin/CloudStorageManagement';
import LanguagesManagement from '../components/super-admin/LanguagesManagement';
import SMSGatewayManagement from '../components/super-admin/SMSGatewayManagement';
import WebhookManagement from '../components/super-admin/WebhookManagement';
import DashboardAutomation from '../components/super-admin/DashboardAutomation';
import DomainSeller from '../components/super-admin/DomainSeller';
import AddonsManagement from '../components/super-admin/AddonsManagement';
import SEOSettings from '../components/super-admin/SEOSettings';

const SuperAdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { colorMode: theme, toggleColorMode: toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'لوحة التحكم', href: '/super-admin', icon: LayoutDashboard, component: PlatformOverview },
    { name: 'إدارة دور المدير', href: '/super-admin/roles', icon: UserCheck, component: RoleManagement },
    { name: 'إدارة المستخدمين', href: '/super-admin/users', icon: Users, component: UserManagement },
    { name: 'المدونات', href: '/super-admin/blogs', icon: BookOpen, component: BlogManagement },
    { name: 'الصفحات', href: '/super-admin/pages', icon: FileText, component: PageManagement },
    { name: 'القوالب', href: '/super-admin/templates', icon: LayoutTemplate, component: ThemeManagement },
    { name: 'خطة الأسعار', href: '/super-admin/pricing', icon: Tag, component: PricingPlanManagement },
    { name: 'إدارة القسائم', href: '/super-admin/coupons', icon: ShoppingBag, component: CouponManagement },
    { name: 'إدارة طلبات الباقات', href: '/super-admin/package-orders', icon: ShoppingBag, component: PackageOrderManagement },
    { name: 'إدارة المحفظة', href: '/super-admin/wallet', icon: Wallet, component: WalletManagement },
    { name: 'نطاق مخصص', href: '/super-admin/custom-domain', icon: Globe, component: CustomDomainManagement },
    { name: 'تذاكر الدعم', href: '/super-admin/support-tickets', icon: Ticket, component: SupportTicketManagement },
    { name: 'إدارة النشرة الإخبارية', href: '/super-admin/newsletter', icon: Mail, component: NewsletterManagement },
    { name: 'شهادات العملاء', href: '/super-admin/testimonials', icon: Smile, component: TestimonialManagement },
    { name: 'منشئ النماذج', href: '/super-admin/form-builder', icon: Puzzle, component: FormBuilder },
    { name: 'إعدادات المظهر', href: '/super-admin/appearance', icon: Paintbrush, component: LandingPageCustomizer },
    { name: 'موقع المستخدم', href: '/super-admin/user-website', icon: Globe, component: UserWebsiteManagement },
    { name: 'التخزين السحابي', href: '/super-admin/cloud-storage', icon: Cloud, component: CloudStorageManagement },
    { name: 'أتمتة لوحة التحكم', href: '/super-admin/automation', icon: Bot, component: DashboardAutomation },
    { name: 'بائع النطاقات', href: '/super-admin/domain-seller', icon: Link2, component: DomainSeller },
    { name: 'التكاملات', href: '/super-admin/integrations', icon: Plug, component: IntegrationManagement },
    { name: 'إدارة الإضافات', href: '/super-admin/addons', icon: Puzzle, component: AddonsManagement },
    { name: 'تحليلات الموقع', href: '/super-admin/analytics', icon: BarChart2, component: WebsiteAnalytics },
    { name: 'بوابة الرسائل النصية', href: '/super-admin/sms-gateway', icon: MessageSquare, component: SMSGatewayManagement },
    { name: 'إدارة خطاف الويب', href: '/super-admin/webhooks', icon: Webhook, component: WebhookManagement },
    { name: 'الإعدادات العامة', href: '/super-admin/general-settings', icon: Wrench, component: GeneralSettings },
    { name: 'إعدادات الدفع', href: '/super-admin/payment-settings', icon: CreditCard, component: PaymentGatewaySettings },
    { name: 'إعدادات السيو', href: '/super-admin/seo-settings', icon: Search, component: SEOSettings },
  ];

  const isCurrentPath = (path: string) => {
    if (path === '/super-admin') {
      return location.pathname === '/super-admin' || location.pathname === '/super-admin/';
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

      <aside className={`fixed inset-y-0 right-0 z-50 w-80 bg-gradient-to-b from-secondary-900 via-secondary-900 to-purple-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col border-l border-purple-800/30`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-purple-800/30 bg-gradient-to-r from-purple-900/50 to-blue-900/30">
          <Link to="/super-admin" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-secondary-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-secondary-900 rounded-full"></div>
              </div>
            </div>
            <div>
              <span className="text-lg font-bold group-hover:text-purple-200 transition-colors">
                المشرف العام
              </span>
              <p className="text-xs text-purple-300">
                نظام إدارة شامل
              </p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-purple-300 hover:text-white hover:bg-purple-800/50 transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-grow mt-4 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const current = isCurrentPath(item.href);
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden ${
                      current
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/25 transform scale-[1.02]'
                        : 'text-purple-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-800/50 hover:to-purple-700/50 hover:shadow-md'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {current && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                    )}
                    <div className={`p-2.5 rounded-lg mr-3 transition-all duration-200 ${
                      current 
                        ? 'bg-white/20 shadow-sm' 
                        : 'bg-purple-800/30 group-hover:bg-purple-700/50'
                    }`}>
                      <Icon className={`h-4 w-4 transition-all duration-200 ${
                        current 
                          ? 'text-white' 
                          : 'text-purple-300 group-hover:text-white'
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
        </nav>

        <div className="p-4 border-t border-purple-800/30 bg-gradient-to-r from-red-900/20 to-purple-900/30">
          <button className="w-full group flex items-center px-4 py-3 text-sm font-medium rounded-xl text-purple-200 hover:bg-red-900/30 hover:text-white transition-all duration-200 hover:shadow-md">
            <div className="p-2 rounded-lg mr-3 bg-purple-800/30 group-hover:bg-red-800/50 transition-all duration-200">
              <LogOut size={16} className="group-hover:text-red-300 transition-colors duration-200" />
            </div>
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              تسجيل الخروج
            </span>
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:mr-80">
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
                  لوحة تحكم المشرف العام
                </h2>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  إدارة وتحكم شامل
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
                to="/dashboard" 
                className="px-3 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
              >
                لوحة تحكم المتجر
              </Link>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-purple-600 dark:text-purple-300">مشرف عام</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            {navigation.map(item => {
              const PathComponent = item.component || (() => <SuperAdminPlaceholder title={item.name} />);
              return (
                <Route
                  key={item.href}
                  path={item.href.replace('/super-admin', '')}
                  element={<PathComponent />}
                />
              )
            })}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
