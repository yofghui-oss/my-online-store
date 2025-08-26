import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, TrendingUp, Package, Activity, MessageSquare, ArrowUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import Card from '../ui/Card';

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'new_order': return <ShoppingCart className="h-4 w-4 text-blue-500" />;
    case 'new_customer': return <Users className="h-4 w-4 text-green-500" />;
    case 'product_update': return <Package className="h-4 w-4 text-purple-500" />;
    case 'theme_change': return <MessageSquare className="h-4 w-4 text-yellow-500" />;
    default: return <Activity className="h-4 w-4 text-secondary-500" />;
  }
};

const DashboardOverview: React.FC = () => {
  const { products, orders, customers, activities, currentStore } = useStore();

  const storeOrders = orders.filter(o => o.storeId === currentStore?.id);
  const totalRevenue = storeOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = storeOrders.length;
  const totalCustomers = customers.length; // Assuming customers are shared for simplicity
  const totalProducts = products.filter(p => p.storeId === currentStore?.id).length;

  const salesData = [
    { name: 'يناير', sales: 4000, revenue: 2400 },
    { name: 'فبراير', sales: 3000, revenue: 1398 },
    { name: 'مارس', sales: 2000, revenue: 9800 },
    { name: 'أبريل', sales: 2780, revenue: 3908 },
    { name: 'مايو', sales: 1890, revenue: 4800 },
    { name: 'يونيو', sales: 2390, revenue: 3800 },
  ];

  const stats = [
    { name: 'إجمالي الإيرادات', value: formatCurrency(totalRevenue, currentStore?.currency), change: '+12.5%', icon: DollarSign, color: 'green' },
    { name: 'إجمالي الطلبات', value: totalOrders.toString(), change: '+8.2%', icon: ShoppingCart, color: 'blue' },
    { name: 'إجمالي العملاء', value: totalCustomers.toString(), change: '+5.1%', icon: Users, color: 'purple' },
    { name: 'إجمالي المنتجات', value: totalProducts.toString(), change: '-1.2%', icon: Package, color: 'yellow' },
  ];

  const recentOrders = storeOrders.slice(0, 5);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
          مرحباً بعودتك، {currentStore?.name || 'صاحب المتجر'}!
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-1">
          إليك ملخص أداء متجرك اليوم.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div key={stat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <Card variant="stat">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/50`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                </div>
                <div className={`flex items-center text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  <ArrowUp size={16} className={`mr-1 ${!stat.change.startsWith('+') && 'transform rotate-180'}`} />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-secondary-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">{stat.name}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card variant="chart">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">أداء المبيعات</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(125, 125, 125, 0.1)" />
                <XAxis dataKey="name" stroke="rgba(125, 125, 125, 0.5)" />
                <YAxis stroke="rgba(125, 125, 125, 0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(30,41,59,0.8)', border: 'none', color: 'white', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#colorRevenue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card className="h-full">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">آخر الأنشطة</h3>
            <div className="space-y-4">
              {activities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="p-2 bg-secondary-100 dark:bg-secondary-800 rounded-full mt-1">
                    <ActivityIcon type={activity.type} />
                  </div>
                  <div>
                    <p className="text-sm text-secondary-800 dark:text-secondary-200">{activity.description}</p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">{new Date(activity.timestamp).toLocaleString('ar-SA')}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card>
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">الطلبات الأخيرة</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-secondary-200 dark:border-secondary-700">
                <tr>
                  <th className="py-2 text-right text-xs font-semibold text-secondary-500 uppercase">الطلب</th>
                  <th className="py-2 text-right text-xs font-semibold text-secondary-500 uppercase">العميل</th>
                  <th className="py-2 text-right text-xs font-semibold text-secondary-500 uppercase">المبلغ</th>
                  <th className="py-2 text-right text-xs font-semibold text-secondary-500 uppercase">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => {
                  const customer = customers.find(c => c.id === order.customerId);
                  return (
                    <tr key={order.id} className="border-b border-secondary-200 dark:border-secondary-800 last:border-0">
                      <td className="py-3 text-sm text-secondary-800 dark:text-secondary-200">#{order.id.slice(0, 8)}</td>
                      <td className="py-3 text-sm text-secondary-800 dark:text-secondary-200">{customer?.name || 'غير معروف'}</td>
                      <td className="py-3 text-sm font-medium text-secondary-800 dark:text-secondary-200">{formatCurrency(order.total, order.currency)}</td>
                      <td className="py-3 text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status === 'delivered' ? 'تم التسليم' : 'قيد الانتظar'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
