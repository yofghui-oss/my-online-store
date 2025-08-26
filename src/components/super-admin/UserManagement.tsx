import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Input from '../ui/Input';

const UserManagement: React.FC = () => {
  const { users, stores } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserStoreCount = (userId: string) => {
    return stores.filter(store => store.ownerId === userId).length;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة المستخدمين</h1>
        <p className="text-secondary-600 dark:text-secondary-300">عرض وإدارة جميع المستخدمين على المنصة.</p>
      </div>

      <Card className="p-4">
        <Input
          placeholder="البحث بالاسم أو البريد الإلكتروني..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="h-4 w-4" />}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div key={user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Card hover>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-300">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">{user.name}</h3>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">{user.email}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-800 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="font-bold text-lg text-secondary-800 dark:text-white">{getUserStoreCount(user.id)}</p>
                  <p className="text-xs text-secondary-500">متاجر</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-secondary-800 dark:text-white">{user.totalOrders}</p>
                  <p className="text-xs text-secondary-500">طلبات</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
