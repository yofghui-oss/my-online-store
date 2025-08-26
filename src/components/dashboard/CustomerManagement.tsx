import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Phone, MapPin, User, TrendingUp } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CustomerManagement: React.FC = () => {
  const { customers, orders } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredCustomers = customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'orders':
          return b.totalOrders - a.totalOrders;
        case 'spent':
          return b.totalSpent - a.totalSpent;
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const getCustomerOrders = (customerId: string) => {
    return orders.filter(order => order.customerId === customerId);
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(customer => customer.totalOrders > 0).length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.totalOrders, 0) || 0;

  const stats = [
    {
      name: 'إجمالي العملاء',
      value: totalCustomers.toString(),
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      name: 'العملاء النشطون',
      value: activeCustomers.toString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      name: 'إجمالي الإيرادات',
      value: `${totalRevenue.toFixed(2)} ريال`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      name: 'متوسط قيمة الطلب',
      value: `${averageOrderValue.toFixed(2)} ريال`,
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
          إدارة العملاء
        </h1>
        <p className="text-secondary-600 dark:text-secondary-300">
          متابعة وإدارة بيانات العملاء
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-secondary-600 dark:text-secondary-300">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="البحث في العملاء..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="name">ترتيب حسب الاسم</option>
            <option value="orders">ترتيب حسب عدد الطلبات</option>
            <option value="spent">ترتيب حسب المبلغ المنفق</option>
            <option value="date">ترتيب حسب تاريخ التسجيل</option>
          </select>
        </div>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => {
          const customerOrders = getCustomerOrders(customer.id);
          const lastOrder = customerOrders.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )[0];

          return (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center ml-3">
                      <User className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-white">
                        {customer.name}
                      </h3>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">
                        منذ {new Date(customer.createdAt).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-300">
                    <Mail className="h-4 w-4 ml-2" />
                    {customer.email}
                  </div>
                  <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-300">
                    <Phone className="h-4 w-4 ml-2" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-300">
                    <MapPin className="h-4 w-4 ml-2" />
                    {customer.city}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                  <div className="text-center">
                    <p className="text-lg font-bold text-secondary-900 dark:text-white">
                      {customer.totalOrders}
                    </p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      طلب
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-secondary-900 dark:text-white">
                      {customer.totalSpent.toFixed(2)}
                    </p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      ريال
                    </p>
                  </div>
                </div>

                {lastOrder && (
                  <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                    <p className="text-sm text-secondary-600 dark:text-secondary-300">
                      آخر طلب: {new Date(lastOrder.createdAt).toLocaleDateString('ar-SA')}
                    </p>
                    <p className="text-sm font-medium text-secondary-900 dark:text-white">
                      {lastOrder.total.toFixed(2)} ريال
                    </p>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <Card className="p-12 text-center">
          <User className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
            لم يتم العثور على عملاء
          </h3>
          <p className="text-secondary-500 dark:text-secondary-400">
            جرب تعديل البحث أو الفلاتر
          </p>
        </Card>
      )}
    </div>
  );
};

export default CustomerManagement;
