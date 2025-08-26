import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, MousePointer, Globe, Calendar, Download, Filter } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const WebsiteAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  
  const visitorsData = [
    { name: 'يناير', visitors: 4000, pageViews: 12000, uniqueVisitors: 3200 },
    { name: 'فبراير', visitors: 3500, pageViews: 11000, uniqueVisitors: 2800 },
    { name: 'مارس', visitors: 5000, pageViews: 15000, uniqueVisitors: 4200 },
    { name: 'أبريل', visitors: 4200, pageViews: 13500, uniqueVisitors: 3600 },
    { name: 'مايو', visitors: 6000, pageViews: 18000, uniqueVisitors: 5100 },
    { name: 'يونيو', visitors: 5500, pageViews: 16500, uniqueVisitors: 4700 }
  ];

  const trafficSources = [
    { name: 'البحث المباشر', value: 45, color: '#3b82f6' },
    { name: 'وسائل التواصل', value: 25, color: '#10b981' },
    { name: 'المراجع', value: 20, color: '#f59e0b' },
    { name: 'الإعلانات', value: 10, color: '#ef4444' }
  ];

  const topPages = [
    { page: 'الصفحة الرئيسية', views: 15420, uniqueViews: 12350 },
    { page: 'صفحة المنتجات', views: 8930, uniqueViews: 7200 },
    { page: 'حول المنصة', views: 5670, uniqueViews: 4800 },
    { page: 'التسعير', views: 4320, uniqueViews: 3900 },
    { page: 'المدونة', views: 3210, uniqueViews: 2800 }
  ];

  const userBehavior = [
    { metric: 'متوسط وقت الجلسة', value: '3:45', trend: '+12%' },
    { metric: 'معدل الارتداد', value: '32%', trend: '-8%' },
    { metric: 'الصفحات لكل جلسة', value: '4.2', trend: '+15%' },
    { metric: 'معدل التحويل', value: '2.8%', trend: '+22%' }
  ];

  const deviceData = [
    { device: 'الجوال', percentage: 65, count: 32500 },
    { device: 'الكمبيوتر', percentage: 28, count: 14000 },
    { device: 'التابلت', percentage: 7, count: 3500 }
  ];

  const countries = [
    { country: 'السعودية', flag: '🇸🇦', visitors: 18420, percentage: 45 },
    { country: 'الإمارات', flag: '🇦🇪', visitors: 8930, percentage: 22 },
    { country: 'الكويت', flag: '🇰🇼', visitors: 4560, percentage: 11 },
    { country: 'قطر', flag: '🇶🇦', visitors: 3210, percentage: 8 },
    { country: 'البحرين', flag: '🇧🇭', visitors: 2870, percentage: 7 },
    { country: 'عمان', flag: '🇴🇲', visitors: 2010, percentage: 5 }
  ];

  const kpiCards = [
    {
      title: 'إجمالي الزوار',
      value: '124,590',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'مشاهدات الصفحة',
      value: '387,420',
      change: '+8.2%',
      trend: 'up',
      icon: Eye,
      color: 'green'
    },
    {
      title: 'معدل النقر',
      value: '3.2%',
      change: '+0.8%',
      trend: 'up',
      icon: MousePointer,
      color: 'purple'
    },
    {
      title: 'الجلسات النشطة',
      value: '2,847',
      change: '-2.1%',
      trend: 'down',
      icon: Globe,
      color: 'orange'
    }
  ];

  const exportReport = () => {
    toast.success('تم تصدير التقرير بنجاح');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">تحليلات الموقع</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إحصائيات شاملة عن أداء المنصة</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="p-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700"
          >
            <option value="7">آخر 7 أيام</option>
            <option value="30">آخر 30 يوم</option>
            <option value="90">آخر 3 أشهر</option>
            <option value="365">آخر سنة</option>
          </select>
          <Button onClick={exportReport}>
            <Download size={16} className="ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300">{kpi.title}</p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp
                      size={14}
                      className={`ml-1 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
                    />
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-${kpi.color}-100 dark:bg-${kpi.color}-900/50`}>
                  <IconComponent className={`h-6 w-6 text-${kpi.color}-500`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">اتجاه الزوار</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="uniqueVisitors" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">مصادر الزيارات</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Page Views Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">مشاهدات الصفحات الشهرية</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitorsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pageViews" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">أكثر الصفحات زيارة</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200 dark:border-secondary-700">
                  <th className="text-right py-2 text-secondary-600 dark:text-secondary-300">الصفحة</th>
                  <th className="text-right py-2 text-secondary-600 dark:text-secondary-300">المشاهدات</th>
                  <th className="text-right py-2 text-secondary-600 dark:text-secondary-300">زوار فريدون</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, index) => (
                  <tr key={index} className="border-b border-secondary-100 dark:border-secondary-800">
                    <td className="py-3 text-secondary-900 dark:text-white">{page.page}</td>
                    <td className="py-3 text-secondary-700 dark:text-secondary-300">{page.views.toLocaleString()}</td>
                    <td className="py-3 text-secondary-700 dark:text-secondary-300">{page.uniqueViews.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Countries */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">الزوار حسب البلد</h3>
          <div className="space-y-3">
            {countries.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-secondary-900 dark:text-white">{country.country}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-secondary-700 dark:text-secondary-300">{country.visitors.toLocaleString()}</span>
                  <div className="w-20 bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-secondary-600 dark:text-secondary-400 w-8">
                    {country.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Behavior and Device Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Behavior */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">سلوك المستخدمين</h3>
          <div className="space-y-4">
            {userBehavior.map((behavior, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <span className="text-secondary-700 dark:text-secondary-300">{behavior.metric}</span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-secondary-900 dark:text-white">{behavior.value}</span>
                  <span className="text-sm text-green-600 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">
                    {behavior.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Device Usage */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">الأجهزة المستخدمة</h3>
          <div className="space-y-4">
            {deviceData.map((device, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700 dark:text-secondary-300">{device.device}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-secondary-900 dark:text-white">{device.count.toLocaleString()}</span>
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">{device.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Real-time Stats */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">الإحصائيات المباشرة</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-secondary-600 dark:text-secondary-300">مباشر</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">847</div>
            <div className="text-sm text-secondary-600 dark:text-secondary-300">مستخدم نشط الآن</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">23</div>
            <div className="text-sm text-secondary-600 dark:text-secondary-300">طلب جديد اليوم</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">156</div>
            <div className="text-sm text-secondary-600 dark:text-secondary-300">تسجيل جديد اليوم</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">12.5k</div>
            <div className="text-sm text-secondary-600 dark:text-secondary-300">إيرادات اليوم (ريال)</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WebsiteAnalytics;