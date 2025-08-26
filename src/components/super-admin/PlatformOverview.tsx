import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, DollarSign, Activity, ArrowUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import Card from '../ui/Card';
import SystemHealth from './SystemHealth';

const PlatformOverview: React.FC = () => {
  const { stores, users, orders } = useStore();

  const totalStores = stores.length;
  const totalUsers = users.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const mrrData = [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 14000 },
    { name: 'Apr', value: 18000 },
    { name: 'May', value: 22000 },
    { name: 'Jun', value: 25000 },
  ];

  const stats = [
    { name: 'إجمالي المتاجر', value: totalStores.toString(), change: '+5', icon: Building, color: 'blue' },
    { name: 'إجمالي المستخدمين', value: totalUsers.toString(), change: '+25', icon: Users, color: 'purple' },
    { name: 'إجمالي الإيرادات', value: formatCurrency(totalRevenue, 'SAR'), change: '+8.2%', icon: DollarSign, color: 'green' },
    { name: 'MRR الحالي', value: formatCurrency(25000, 'SAR'), change: '+3.5%', icon: Activity, color: 'yellow' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">نظرة عامة على المنصة</h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-1">
          مؤشرات الأداء الرئيسية للمنصة.
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
                <div className="flex items-center text-sm font-semibold text-green-500">
                  <ArrowUp size={16} className="mr-1" />
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
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">نمو الإيرادات الشهرية المتكررة (MRR)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mrrData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(125, 125, 125, 0.1)" />
                <XAxis dataKey="name" stroke="rgba(125, 125, 125, 0.5)" />
                <YAxis stroke="rgba(125, 125, 125, 0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(30,41,59,0.8)', border: 'none', color: 'white', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="url(#colorMRR)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <SystemHealth />
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformOverview;
