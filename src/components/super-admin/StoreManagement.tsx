import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MoreVertical, Eye, Edit2, Ban, CheckCircle, BarChart2, Link, Users } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

const StoreManagement: React.FC = () => {
  const { stores, users, pricingPlans } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const filteredStores = stores.filter(store => {
    const owner = users.find(u => u.id === store.ownerId);
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (owner && owner.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPlan = !planFilter || store.planId === planFilter;
    const matchesStatus = !statusFilter || store.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // وظيفة لتغيير مالك المتجر
  const handleChangeOwner = () => {
    const store = stores.find(s => s.id === selectedStore);
    if (store && selectedUserId) {
      // هنا سيتم تنفيذ منطق تغيير المالك في الواجهة الخلفية
      toast.success(`تم ربط المتجر ${store.name} بالمستخدم بنجاح`);
      setIsLinkModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة المتاجر</h1>
        <p className="text-secondary-600 dark:text-secondary-300">عرض وإدارة جميع المتاجر على المنصة وربطها بالمستخدمين.</p>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="البحث بالاسم، النطاق، أو المالك..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
          <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)} className="input-field">
            <option value="">كل الخطط</option>
            {pricingPlans.map(plan => (
              <option key={plan.id} value={plan.id}>{plan.name}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field">
            <option value="">كل الحالات</option>
            <option value="active">نشط</option>
            <option value="suspended">معلق</option>
          </select>
        </div>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">قائمة المتاجر ({filteredStores.length})</h2>
        <Button variant="primary" size="sm">
          <Plus size={16} className="ml-2" /> إضافة متجر جديد
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-800">
            <thead className="bg-secondary-100 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">المتجر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">المالك</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">الخطة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">تاريخ الإنشاء</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-secondary-900/50 divide-y divide-secondary-200 dark:divide-secondary-800">
              {filteredStores.map((store, index) => {
                const owner = users.find(u => u.id === store.ownerId);
                const plan = pricingPlans.find(p => p.id === store.planId);
                return (
                  <motion.tr key={store.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-secondary-50 dark:hover:bg-secondary-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={store.logo} alt={store.name} className="h-10 w-10 rounded-full" />
                        <div>
                          <div className="text-sm font-semibold text-secondary-900 dark:text-white">{store.name}</div>
                          <div className="text-xs text-secondary-500">{store.domain}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-300">{owner?.name || 'غير معروف'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        plan?.name === 'المؤسسية' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                        plan?.name === 'المتقدمة' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}>{plan?.name || 'غير معروف'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${store.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                        {store.status === 'active' ? 'نشط' : 'معلق'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">{new Date(store.createdAt).toLocaleDateString('ar-SA')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => window.open(`https://${store.domain}`, '_blank')}
                          title="معاينة المتجر"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedStore(store.id);
                            setIsStatsModalOpen(true);
                          }}
                          title="إحصائيات المتجر"
                        >
                          <BarChart2 size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedStore(store.id);
                            setSelectedUserId(store.ownerId);
                            setIsLinkModalOpen(true);
                          }}
                          title="ربط المتجر بمستخدم"
                        >
                          <Link size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          title="تعديل المتجر"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            toast.success(store.status === 'active' ? 'تم تعليق المتجر بنجاح' : 'تم تنشيط المتجر بنجاح');
                          }}
                          title={store.status === 'active' ? 'تعليق المتجر' : 'تنشيط المتجر'}
                        >
                          {store.status === 'active' ? <Ban size={16} className="text-red-500" /> : <CheckCircle size={16} className="text-green-500" />}
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* نافذة إحصائيات المتجر */}
      <Modal isOpen={isStatsModalOpen} onClose={() => setIsStatsModalOpen(false)} title="إحصائيات المتجر">
        {selectedStore && (
          <div className="space-y-6">
            {(() => {
              const store = stores.find(s => s.id === selectedStore);
              if (!store) return null;
              
              // بيانات وهمية للإحصائيات
              const stats = {
                orders: Math.floor(Math.random() * 1000),
                revenue: Math.floor(Math.random() * 100000),
                customers: Math.floor(Math.random() * 500),
                products: Math.floor(Math.random() * 200),
                views: Math.floor(Math.random() * 10000),
              };
              
              return (
                <>
                  <div className="text-center mb-6">
                    <img src={store.logo} alt={store.name} className="h-20 w-20 rounded-full mx-auto mb-2" />
                    <h2 className="text-xl font-bold">{store.name}</h2>
                    <p className="text-secondary-500">{store.domain}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="p-4 text-center">
                      <h3 className="text-secondary-500 text-sm">الطلبات</h3>
                      <p className="text-2xl font-bold">{stats.orders}</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <h3 className="text-secondary-500 text-sm">الإيرادات</h3>
                      <p className="text-2xl font-bold">{stats.revenue} ر.س</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <h3 className="text-secondary-500 text-sm">العملاء</h3>
                      <p className="text-2xl font-bold">{stats.customers}</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <h3 className="text-secondary-500 text-sm">المنتجات</h3>
                      <p className="text-2xl font-bold">{stats.products}</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <h3 className="text-secondary-500 text-sm">المشاهدات</h3>
                      <p className="text-2xl font-bold">{stats.views}</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <h3 className="text-secondary-500 text-sm">معدل التحويل</h3>
                      <p className="text-2xl font-bold">{(stats.orders / stats.views * 100).toFixed(1)}%</p>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="primary" onClick={() => setIsStatsModalOpen(false)}>إغلاق</Button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </Modal>

      {/* نافذة ربط المتجر بمستخدم */}
      <Modal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} title="ربط المتجر بمستخدم">
        {selectedStore && (
          <div className="space-y-6">
            {(() => {
              const store = stores.find(s => s.id === selectedStore);
              if (!store) return null;
              
              return (
                <>
                  <div className="mb-4">
                    <p className="text-secondary-600 dark:text-secondary-300 mb-4">
                      اختر المستخدم الذي تريد ربط المتجر <strong>{store.name}</strong> به:
                    </p>
                    
                    <select 
                      value={selectedUserId} 
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      className="input-field w-full"
                    >
                      <option value="">اختر مستخدم...</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" onClick={() => setIsLinkModalOpen(false)}>إلغاء</Button>
                    <Button 
                      variant="primary" 
                      onClick={handleChangeOwner}
                      disabled={!selectedUserId}
                    >
                      <Users size={16} className="ml-2" /> ربط المتجر
                    </Button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StoreManagement;
