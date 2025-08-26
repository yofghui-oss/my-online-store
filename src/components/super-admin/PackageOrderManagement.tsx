import React, { useState } from 'react';
import { Package, Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';
import { PricingPlan } from '../../types';

interface PackageOrder {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  planId: string;
  planName: string;
  planPrice: number;
  currency: string;
  status: 'pending' | 'active' | 'expired' | 'cancelled' | 'suspended';
  paymentMethod: 'credit_card' | 'bank_transfer' | 'paypal' | 'wallet';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  createdAt: Date;
  lastPaymentDate?: Date;
  nextBillingDate?: Date;
  totalPaid: number;
  features: string[];
}

const PackageOrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<PackageOrder[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      userId: 'user1',
      userName: 'أحمد السالم',
      userEmail: 'ahmed@example.com',
      planId: 'plan_advanced',
      planName: 'الباقة المتقدمة',
      planPrice: 99,
      currency: 'SAR',
      status: 'active',
      paymentMethod: 'credit_card',
      paymentStatus: 'completed',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      autoRenew: true,
      createdAt: new Date('2024-01-01'),
      lastPaymentDate: new Date('2024-01-01'),
      nextBillingDate: new Date('2024-02-01'),
      totalPaid: 99,
      features: ['منتجات غير محدودة', '3 ثيمات احترافية', 'دعم أولوية', 'نطاق مخصص']
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      userId: 'user2',
      userName: 'فاطمة المحمد',
      userEmail: 'fatima@example.com',
      planId: 'plan_enterprise',
      planName: 'الباقة المؤسسية',
      planPrice: 299,
      currency: 'SAR',
      status: 'pending',
      paymentMethod: 'bank_transfer',
      paymentStatus: 'pending',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2025-02-01'),
      autoRenew: false,
      createdAt: new Date('2024-01-15'),
      totalPaid: 0,
      features: ['كل ميزات المتقدمة', 'دعم مخصص', 'تكاملات API', 'تحليلات متقدمة']
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      userId: 'user3',
      userName: 'محمد العتيبي',
      userEmail: 'mohammed@example.com',
      planId: 'plan_free',
      planName: 'الباقة المجانية',
      planPrice: 0,
      currency: 'SAR',
      status: 'active',
      paymentMethod: 'credit_card',
      paymentStatus: 'completed',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-12-31'),
      autoRenew: false,
      createdAt: new Date('2024-01-10'),
      totalPaid: 0,
      features: ['10 منتجات', 'تصميم أساسي', 'دعم محدود']
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      userId: 'user4',
      userName: 'سارة الأحمد',
      userEmail: 'sarah@example.com',
      planId: 'plan_advanced',
      planName: 'الباقة المتقدمة',
      planPrice: 99,
      currency: 'SAR',
      status: 'expired',
      paymentMethod: 'paypal',
      paymentStatus: 'completed',
      startDate: new Date('2023-12-01'),
      endDate: new Date('2023-12-31'),
      autoRenew: false,
      createdAt: new Date('2023-12-01'),
      lastPaymentDate: new Date('2023-12-01'),
      totalPaid: 99,
      features: ['منتجات غير محدودة', '3 ثيمات احترافية', 'دعم أولوية']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<PackageOrder | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
      case 'suspended': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-green-500" />;
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'expired': return <XCircle size={16} className="text-red-500" />;
      case 'cancelled': return <XCircle size={16} className="text-gray-500" />;
      case 'suspended': return <AlertTriangle size={16} className="text-orange-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'pending': return 'معلق';
      case 'expired': return 'منتهي';
      case 'cancelled': return 'ملغي';
      case 'suspended': return 'معلق';
      default: return status;
    }
  };

  const getPaymentStatusColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'completed': return 'text-green-600 dark:text-green-400';
      case 'pending': return 'text-yellow-600 dark:text-yellow-400';
      case 'failed': return 'text-red-600 dark:text-red-400';
      case 'refunded': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.planName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as PackageOrder['status'] }
        : order
    ));
    toast.success('تم تحديث حالة الطلب بنجاح');
  };

  const handleViewDetails = (order: PackageOrder) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const exportOrders = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "رقم الطلب,العميل,البريد الإلكتروني,الباقة,السعر,الحالة,تاريخ البداية,تاريخ النهاية\n" +
      filteredOrders.map(order => 
        `${order.orderNumber},${order.userName},${order.userEmail},${order.planName},${order.planPrice},${getStatusText(order.status)},${order.startDate.toLocaleDateString('ar-SA')},${order.endDate.toLocaleDateString('ar-SA')}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "package_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('تم تصدير البيانات بنجاح');
  };

  const summaryStats = {
    total: orders.length,
    active: orders.filter(o => o.status === 'active').length,
    pending: orders.filter(o => o.status === 'pending').length,
    expired: orders.filter(o => o.status === 'expired').length,
    totalRevenue: orders.filter(o => o.paymentStatus === 'completed').reduce((sum, o) => sum + o.totalPaid, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة طلبات الباقات</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إدارة وتتبع طلبات الاشتراكات والباقات</p>
        </div>
        <Button onClick={exportOrders}>
          <Download size={16} className="ml-2" />
          تصدير البيانات
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">{summaryStats.total}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي الطلبات</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{summaryStats.active}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">نشط</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-yellow-600">{summaryStats.pending}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">معلق</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">{summaryStats.expired}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">منتهي</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{summaryStats.totalRevenue.toLocaleString()} ريال</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي الإيرادات</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
              <Input
                placeholder="البحث بالطلب، العميل، البريد الإلكتروني أو الباقة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg 
                        bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white
                        focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="pending">معلق</option>
              <option value="expired">منتهي</option>
              <option value="cancelled">ملغي</option>
              <option value="suspended">معلق</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  رقم الطلب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  العميل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الباقة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  السعر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  حالة الدفع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  تاريخ الانتهاء
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900 dark:text-white">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-secondary-900 dark:text-white">{order.userName}</div>
                      <div className="text-sm text-secondary-500 dark:text-secondary-400">{order.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                    {order.planName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                    {order.planPrice} {order.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus === 'completed' ? 'مكتمل' : 
                       order.paymentStatus === 'pending' ? 'معلق' :
                       order.paymentStatus === 'failed' ? 'فاشل' : 'مسترد'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                    {order.endDate.toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye size={16} />
                      </button>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'active')}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {order.status === 'active' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'suspended')}
                          className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300"
                        >
                          <AlertTriangle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Order Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="تفاصيل الطلب"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  رقم الطلب
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedOrder.orderNumber}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  تاريخ الإنشاء
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedOrder.createdAt.toLocaleDateString('ar-SA')}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  العميل
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedOrder.userName}</div>
                <div className="text-sm text-secondary-500">{selectedOrder.userEmail}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  الباقة
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedOrder.planName}</div>
                <div className="text-sm text-secondary-500">{selectedOrder.planPrice} {selectedOrder.currency}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  طريقة الدفع
                </label>
                <div className="text-secondary-900 dark:text-white">
                  {selectedOrder.paymentMethod === 'credit_card' ? 'بطاقة ائتمان' :
                   selectedOrder.paymentMethod === 'bank_transfer' ? 'تحويل بنكي' :
                   selectedOrder.paymentMethod === 'paypal' ? 'PayPal' : 'محفظة'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  التجديد التلقائي
                </label>
                <div className="text-secondary-900 dark:text-white">
                  {selectedOrder.autoRenew ? 'مفعل' : 'معطل'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  تاريخ البداية
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedOrder.startDate.toLocaleDateString('ar-SA')}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  تاريخ الانتهاء
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedOrder.endDate.toLocaleDateString('ar-SA')}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                مميزات الباقة
              </label>
              <div className="space-y-1">
                {selectedOrder.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-300">
                    <CheckCircle size={14} className="text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-secondary-200 dark:border-secondary-600">
              <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}>
                إغلاق
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PackageOrderManagement;