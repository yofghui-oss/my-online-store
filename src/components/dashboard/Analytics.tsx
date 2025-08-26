import React from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import { formatCurrency } from '../../utils/currency';

const Analytics: React.FC = () => {
  const { orders, customers, currentStore } = useStore();
  const storeOrders = orders.filter(o => o.storeId === currentStore?.id);

  const totalRevenue = storeOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = storeOrders.length;
  const totalCustomers = customers.length;
  const averageOrderValue = totalRevenue / totalOrders || 0;

  const salesData = [
    { name: 'يناير', revenue: 12000, orders: 45 },
    { name: 'فبراير', revenue: 19000, orders: 65 },
    { name: 'مارس', revenue: 15000, orders: 55 },
    { name: 'أبريل', revenue: 25000, orders: 78 },
    { name: 'مايو', revenue: 22000, orders: 70 },
    { name: 'يونيو', revenue: 30000, orders: 95 },
  ];

  const conversionData = [
    { stage: 'الزوار', value: 5000 },
    { stage: 'أضاف للسلة', value: 800 },
    { stage: 'بدأ الدفع', value: 400 },
    { stage: 'أتم الشراء', value: 250 },
  ];

  const salesByChannelData = [
    { channel: 'مباشر', sales: 4000 },
    { channel: 'بحث عضوي', sales: 3200 },
    { channel: 'إعلانات', sales: 2500 },
    { channel: 'اجتماعي', sales: 1800 },
  ];

  const stats = [
    { name: 'إجمالي الإيرادات', value: formatCurrency(totalRevenue, currentStore?.currency), icon: DollarSign },
    { name: 'إجمالي الطلبات', value: totalOrders.toString(), icon: ShoppingCart },
    { name: 'متوسط قيمة الطلب', value: formatCurrency(averageOrderValue, currentStore?.currency), icon: TrendingUp },
    { name: 'العملاء', value: totalCustomers.toString(), icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">التحليلات</h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-1">رؤى عميقة حول أداء متجرك.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <Card key={stat.name} variant="stat">
            <stat.icon className="h-8 w-8 text-primary-500 mb-4" />
            <p className="text-2xl font-bold text-secondary-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-secondary-500 dark:text-secondary-400">{stat.name}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="chart">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">الإيرادات الشهرية</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs><linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(125, 125, 125, 0.1)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card variant="chart">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">قمع التحويل</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(125, 125, 125, 0.1)" />
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
