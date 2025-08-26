import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Mail, Users, UserCheck, Download, Upload, Filter } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  tags: string[];
  status: 'active' | 'unsubscribed' | 'bounced';
  subscriptionDate: string;
  lastActivityDate?: string;
  source: 'manual' | 'website' | 'import' | 'api';
  preferences: {
    promotions: boolean;
    newsletters: boolean;
    updates: boolean;
  };
}

interface SubscriberSegment {
  id: string;
  name: string;
  description: string;
  criteria: {
    tags?: string[];
    status?: string[];
    dateRange?: {
      start: string;
      end: string;
    };
  };
  count: number;
}

const SubscribersManagement: React.FC = () => {
  const { currentStore } = useStore();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: '1',
      email: 'ahmed@example.com',
      name: 'أحمد محمد',
      phone: '+966501234567',
      tags: ['عميل مميز', 'مهتم بالإلكترونيات'],
      status: 'active',
      subscriptionDate: '2024-01-15',
      lastActivityDate: '2024-01-20',
      source: 'website',
      preferences: {
        promotions: true,
        newsletters: true,
        updates: false
      }
    },
    {
      id: '2',
      email: 'sara@example.com',
      name: 'سارة أحمد',
      tags: ['عضو جديد'],
      status: 'active',
      subscriptionDate: '2024-01-18',
      lastActivityDate: '2024-01-19',
      source: 'manual',
      preferences: {
        promotions: false,
        newsletters: true,
        updates: true
      }
    },
    {
      id: '3',
      email: 'khaled@example.com',
      name: 'خالد سعد',
      tags: [],
      status: 'unsubscribed',
      subscriptionDate: '2024-01-10',
      lastActivityDate: '2024-01-12',
      source: 'import',
      preferences: {
        promotions: false,
        newsletters: false,
        updates: false
      }
    }
  ]);

  const [segments] = useState<SubscriberSegment[]>([
    {
      id: '1',
      name: 'العملاء المميزون',
      description: 'المشتركون المميزون والمهتمون بالعروض',
      criteria: {
        tags: ['عميل مميز'],
        status: ['active']
      },
      count: 1
    },
    {
      id: '2',
      name: 'الأعضاء الجدد',
      description: 'المشتركون الجدد خلال آخر شهر',
      criteria: {
        tags: ['عضو جديد'],
        status: ['active']
      },
      count: 1
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('');

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    tags: '',
    status: 'active' as const,
    source: 'manual' as const,
    promotions: true,
    newsletters: true,
    updates: false
  });

  const handleCreateSubscriber = () => {
    if (!formData.email) {
      toast.error('يرجى إدخال البريد الإلكتروني');
      return;
    }

    if (subscribers.some(sub => sub.email === formData.email)) {
      toast.error('البريد الإلكتروني موجود بالفعل');
      return;
    }

    const newSubscriber: Subscriber = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.name || undefined,
      phone: formData.phone || undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: formData.status,
      subscriptionDate: new Date().toISOString().split('T')[0],
      source: formData.source,
      preferences: {
        promotions: formData.promotions,
        newsletters: formData.newsletters,
        updates: formData.updates
      }
    };

    setSubscribers([...subscribers, newSubscriber]);
    toast.success('تم إضافة المشترك بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateSubscriber = () => {
    if (!selectedSubscriber) return;

    const updatedSubscribers = subscribers.map(sub =>
      sub.id === selectedSubscriber.id
        ? {
            ...sub,
            email: formData.email,
            name: formData.name || undefined,
            phone: formData.phone || undefined,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            status: formData.status,
            preferences: {
              promotions: formData.promotions,
              newsletters: formData.newsletters,
              updates: formData.updates
            }
          }
        : sub
    );

    setSubscribers(updatedSubscribers);
    toast.success('تم تحديث المشترك بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteSubscriber = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشترك؟')) {
      setSubscribers(subscribers.filter(sub => sub.id !== id));
      toast.success('تم حذف المشترك بنجاح');
    }
  };

  const handleBulkUnsubscribe = () => {
    const selectedIds = subscribers.filter(sub => sub.status === 'active').map(sub => sub.id);
    if (selectedIds.length === 0) {
      toast.error('لا توجد مشتركين نشطين للإلغاء');
      return;
    }

    if (window.confirm(`هل أنت متأكد من إلغاء اشتراك ${selectedIds.length} مشترك؟`)) {
      const updatedSubscribers = subscribers.map(sub =>
        selectedIds.includes(sub.id) ? { ...sub, status: 'unsubscribed' as const } : sub
      );
      setSubscribers(updatedSubscribers);
      toast.success(`تم إلغاء اشتراك ${selectedIds.length} مشترك`);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      phone: '',
      tags: '',
      status: 'active',
      source: 'manual',
      promotions: true,
      newsletters: true,
      updates: false
    });
    setSelectedSubscriber(null);
  };

  const openEditModal = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setFormData({
      email: subscriber.email,
      name: subscriber.name || '',
      phone: subscriber.phone || '',
      tags: subscriber.tags.join(', '),
      status: subscriber.status,
      source: subscriber.source,
      promotions: subscriber.preferences.promotions,
      newsletters: subscriber.preferences.newsletters,
      updates: subscriber.preferences.updates
    });
    setIsModalOpen(true);
  };

  const exportSubscribers = () => {
    const csvContent = [
      ['البريد الإلكتروني', 'الاسم', 'الهاتف', 'الحالة', 'تاريخ الاشتراك'],
      ...filteredSubscribers.map(sub => [
        sub.email,
        sub.name || '',
        sub.phone || '',
        sub.status === 'active' ? 'نشط' : sub.status === 'unsubscribed' ? 'ملغي' : 'مرتد',
        sub.subscriptionDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast.success('تم تصدير قائمة المشتركين');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'unsubscribed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
      case 'bounced':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'unsubscribed':
        return 'ملغي الاشتراك';
      case 'bounced':
        return 'مرتد';
      default:
        return 'غير محدد';
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (subscriber.name && subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
    const matchesTag = !tagFilter || subscriber.tags.some(tag => 
      tag.toLowerCase().includes(tagFilter.toLowerCase())
    );
    return matchesSearch && matchesStatus && matchesTag;
  });

  const activeSubscribers = subscribers.filter(sub => sub.status === 'active').length;
  const unsubscribedCount = subscribers.filter(sub => sub.status === 'unsubscribed').length;
  const bouncedCount = subscribers.filter(sub => sub.status === 'bounced').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة المشتركين</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة قائمة المشتركين في النشرة الإخبارية والتسويق
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportSubscribers}>
            <Download className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة مشترك
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي المشتركين</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{subscribers.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">المشتركون النشطون</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{activeSubscribers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
              <Mail className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">ملغو الاشتراك</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{unsubscribedCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
              <Filter className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">الرسائل المرتدة</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{bouncedCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
            <Input
              placeholder="البحث في المشتركين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="unsubscribed">ملغي الاشتراك</option>
            <option value="bounced">مرتد</option>
          </select>
          <Input
            placeholder="البحث بالتصنيف..."
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          />
          <Button variant="outline" onClick={handleBulkUnsubscribe}>
            إلغاء اشتراك المحددين
          </Button>
        </div>
      </Card>

      {/* Subscribers Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  المشترك
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  التصنيفات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  تاريخ الاشتراك
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-secondary-900 divide-y divide-secondary-200 dark:divide-secondary-700">
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-secondary-900 dark:text-white">
                        {subscriber.name || 'غير محدد'}
                      </div>
                      <div className="text-sm text-secondary-500 dark:text-secondary-400">
                        {subscriber.email}
                      </div>
                      {subscriber.phone && (
                        <div className="text-xs text-secondary-400 dark:text-secondary-500">
                          {subscriber.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {subscriber.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscriber.status)}`}>
                      {getStatusLabel(subscriber.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                    {new Date(subscriber.subscriptionDate).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(subscriber)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteSubscriber(subscriber.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={selectedSubscriber ? 'تعديل المشترك' : 'إضافة مشترك جديد'}
      >
        <div className="space-y-4">
          <Input
            label="البريد الإلكتروني"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="example@domain.com"
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="الاسم (اختياري)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="أحمد محمد"
            />
            <Input
              label="رقم الهاتف (اختياري)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+966501234567"
            />
          </div>

          <Input
            label="التصنيفات (مفصولة بفواصل)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="عميل مميز, مهتم بالإلكترونيات"
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الحالة
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
            >
              <option value="active">نشط</option>
              <option value="unsubscribed">ملغي الاشتراك</option>
              <option value="bounced">مرتد</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
              تفضيلات الاشتراك
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="promotions"
                  checked={formData.promotions}
                  onChange={(e) => setFormData({ ...formData, promotions: e.target.checked })}
                  className="ml-2"
                />
                <label htmlFor="promotions" className="text-sm text-secondary-700 dark:text-secondary-300">
                  العروض الترويجية
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletters"
                  checked={formData.newsletters}
                  onChange={(e) => setFormData({ ...formData, newsletters: e.target.checked })}
                  className="ml-2"
                />
                <label htmlFor="newsletters" className="text-sm text-secondary-700 dark:text-secondary-300">
                  النشرة الإخبارية
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="updates"
                  checked={formData.updates}
                  onChange={(e) => setFormData({ ...formData, updates: e.target.checked })}
                  className="ml-2"
                />
                <label htmlFor="updates" className="text-sm text-secondary-700 dark:text-secondary-300">
                  تحديثات المنتجات
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedSubscriber ? handleUpdateSubscriber : handleCreateSubscriber}
              className="flex-1"
            >
              {selectedSubscriber ? 'تحديث' : 'إضافة'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="flex-1"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SubscribersManagement;