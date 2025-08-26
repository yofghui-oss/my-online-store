import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { Order } from '../../types';

const OrderManagement: React.FC = () => {
  const { orders, products, customers } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const customer = customers.find(c => c.id === order.customerId);
    const matchesSearch = customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار';
      case 'processing': return 'قيد المعالجة';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // This would typically update the order in the backend
    toast.success(`تم تحديث حالة الطلب إلى: ${getStatusText(newStatus)}`);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة الطلبات</h1>
        <p className="text-secondary-600 dark:text-secondary-300">متابعة وإدارة طلبات العملاء</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="البحث في الطلبات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} icon={<Search className="h-4 w-4" />}/>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field">
            <option value="">جميع الحالات</option>
            <option value="pending">قيد الانتظار</option>
            <option value="processing">قيد المعالجة</option>
            <option value="shipped">تم الشحن</option>
            <option value="delivered">تم التسليم</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">رقم الطلب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">العميل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">المبلغ الإجمالي</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-secondary-900 divide-y divide-secondary-200 dark:divide-secondary-700">
              {filteredOrders.map((order, index) => {
                const customer = customers.find(c => c.id === order.customerId);
                return (
                  <motion.tr key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-secondary-900 dark:text-white">#{order.id.slice(0, 8)}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap"><div><div className="text-sm font-medium text-secondary-900 dark:text-white">{customer?.name || 'غير معروف'}</div><div className="text-sm text-secondary-500 dark:text-secondary-400">{customer?.email}</div></div></td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-secondary-900 dark:text-white">{order.total.toFixed(2)} ريال</span></td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>{getStatusIcon(order.status)}<span className="mr-1">{getStatusText(order.status)}</span></span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500 dark:text-secondary-400">{new Date(order.createdAt).toLocaleDateString('ar-SA')}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}><Eye className="h-4 w-4" /></Button></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`تفاصيل الطلب #${selectedOrder?.id?.slice(0, 8)}`} size="lg">
        {selectedOrder && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">معلومات العميل</h3>
              <div className="bg-secondary-50 dark:bg-secondary-800/50 p-4 rounded-lg space-y-1">
                <p><strong>الاسم:</strong> {selectedOrder.shippingAddress.name}</p>
                <p><strong>الهاتف:</strong> {selectedOrder.shippingAddress.phone}</p>
                <p><strong>العنوان:</strong> {selectedOrder.shippingAddress.address}</p>
                <p><strong>المدينة:</strong> {selectedOrder.shippingAddress.city}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">المنتجات</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => {
                  const product = products.find(p => p.id === item.productId);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg">
                      <div className="flex items-center"><img src={product?.images[0] || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/60x60/f3f4f6/9ca3af?text=منتج'} alt={product?.name} className="h-12 w-12 rounded-lg object-cover ml-3"/><div><p className="font-medium text-secondary-900 dark:text-white">{product?.name || 'منتج غير معروف'}</p><p className="text-sm text-secondary-500 dark:text-secondary-400">الكمية: {item.quantity}</p></div></div>
                      <span className="font-medium text-secondary-900 dark:text-white">{(item.price * item.quantity).toFixed(2)} ريال</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-secondary-200 dark:border-secondary-700 pt-3 mt-3"><div className="flex justify-between items-center text-lg font-bold"><span>المبلغ الإجمالي:</span><span>{selectedOrder.total.toFixed(2)} ريال</span></div></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">تحديث حالة الطلب</h3>
              <div className="flex gap-2 flex-wrap">
                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (<Button key={status} size="sm" variant={selectedOrder.status === status ? 'primary' : 'outline'} onClick={() => updateOrderStatus(selectedOrder.id, status)} disabled={selectedOrder.status === status}>{getStatusText(status)}</Button>))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
