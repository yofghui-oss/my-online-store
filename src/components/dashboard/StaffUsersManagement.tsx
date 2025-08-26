import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, User, Mail, Shield, UserCheck, UserX, Calendar } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface StaffUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  role: string;
  roleDisplayName: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  permissions: string[];
}

const StaffUsersManagement: React.FC = () => {
  const { currentStore } = useStore();
  
  const [roles] = useState([
    { id: 'owner', name: 'مالك المتجر', permissions: ['*'] },
    { id: 'admin', name: 'مدير عام', permissions: ['store.*', 'products.*', 'orders.*'] },
    { id: 'manager', name: 'مدير متجر', permissions: ['products.*', 'orders.view'] },
    { id: 'support', name: 'خدمة العملاء', permissions: ['orders.view', 'customers.*'] }
  ]);

  const [users, setUsers] = useState<StaffUser[]>([
    {
      id: '1',
      email: 'owner@store.com',
      name: 'أحمد محمد',
      avatar: '/api/placeholder/50/50',
      phone: '+966501234567',
      role: 'owner',
      roleDisplayName: 'مالك المتجر',
      status: 'active',
      lastLogin: '2024-01-20T10:30:00Z',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-20',
      permissions: ['*']
    },
    {
      id: '2',
      email: 'admin@store.com',
      name: 'سارة أحمد',
      phone: '+966502345678',
      role: 'admin',
      roleDisplayName: 'مدير عام',
      status: 'active',
      lastLogin: '2024-01-19T14:20:00Z',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-19',
      permissions: ['store.*', 'products.*', 'orders.*']
    },
    {
      id: '3',
      email: 'manager@store.com',
      name: 'خالد سعد',
      role: 'manager',
      roleDisplayName: 'مدير متجر',
      status: 'active',
      lastLogin: '2024-01-18T09:15:00Z',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-18',
      permissions: ['products.*', 'orders.view']
    },
    {
      id: '4',
      email: 'support@store.com',
      name: 'فاطمة علي',
      role: 'support',
      roleDisplayName: 'خدمة العملاء',
      status: 'pending',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      permissions: ['orders.view', 'customers.*']
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<StaffUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    role: 'support',
    status: 'active' as const
  });

  const handleCreateUser = () => {
    if (!formData.email || !formData.name) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }

    if (users.some(user => user.email === formData.email)) {
      toast.error('البريد الإلكتروني موجود بالفعل');
      return;
    }

    const selectedRole = roles.find(r => r.id === formData.role);
    const newUser: StaffUser = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.name,
      phone: formData.phone || undefined,
      role: formData.role,
      roleDisplayName: selectedRole?.name || 'غير محدد',
      status: formData.status,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      permissions: selectedRole?.permissions || []
    };

    setUsers([...users, newUser]);
    toast.success('تم إضافة المستخدم بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    const selectedRole = roles.find(r => r.id === formData.role);
    const updatedUsers = users.map(user =>
      user.id === selectedUser.id
        ? {
            ...user,
            email: formData.email,
            name: formData.name,
            phone: formData.phone || undefined,
            role: formData.role,
            roleDisplayName: selectedRole?.name || 'غير محدد',
            status: formData.status,
            permissions: selectedRole?.permissions || [],
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : user
    );

    setUsers(updatedUsers);
    toast.success('تم تحديث المستخدم بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteUser = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user?.role === 'owner') {
      toast.error('لا يمكن حذف مالك المتجر');
      return;
    }

    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      setUsers(users.filter(user => user.id !== id));
      toast.success('تم حذف المستخدم بنجاح');
    }
  };

  const handleToggleStatus = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user?.role === 'owner') {
      toast.error('لا يمكن تعديل حالة مالك المتجر');
      return;
    }

    const updatedUsers = users.map(user =>
      user.id === id
        ? {
            ...user,
            status: user.status === 'active' ? 'inactive' as const : 'active' as const,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : user
    );
    setUsers(updatedUsers);
    toast.success('تم تحديث حالة المستخدم');
  };

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      phone: '',
      role: 'support',
      status: 'active'
    });
    setSelectedUser(null);
  };

  const openEditModal = (user: StaffUser) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      name: user.name,
      phone: user.phone || '',
      role: user.role,
      status: user.status
    });
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'pending': return 'في الانتظار';
      default: return 'غير محدد';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUsers = users.filter(u => u.status === 'active').length;
  const pendingUsers = users.filter(u => u.status === 'pending').length;
  const totalUsers = users.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة فريق العمل</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة المستخدمين والموظفين في المتجر
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة مستخدم
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <User className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي المستخدمين</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{totalUsers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">المستخدمون النشطون</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{activeUsers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
              <Calendar className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">في الانتظار</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{pendingUsers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Shield className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">المديرون</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">
                {users.filter(u => ['owner', 'admin', 'manager'].includes(u.role)).length}
              </p>
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
              placeholder="البحث في المستخدمين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
          >
            <option value="all">جميع الأدوار</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="pending">في الانتظار</option>
          </select>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  المستخدم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الدور
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  آخر دخول
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-secondary-900 divide-y divide-secondary-200 dark:divide-secondary-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                      )}
                      <div className="mr-4">
                        <div className="text-sm font-medium text-secondary-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-secondary-500 dark:text-secondary-400">
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-xs text-secondary-400 dark:text-secondary-500">
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400">
                      {user.roleDisplayName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('ar-SA') : 'لم يدخل بعد'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(user)}
                        disabled={user.role === 'owner'}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(user.id)}
                        disabled={user.role === 'owner'}
                      >
                        {user.status === 'active' ? (
                          <UserX className="h-4 w-4 text-red-500" />
                        ) : (
                          <UserCheck className="h-4 w-4 text-green-500" />
                        )}
                      </Button>
                      {user.role !== 'owner' && (
                        <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
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
        title={selectedUser ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="الاسم الكامل"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="أحمد محمد"
              required
            />
            <Input
              label="البريد الإلكتروني"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="user@example.com"
              required
              disabled={!!selectedUser}
            />
          </div>

          <Input
            label="رقم الهاتف (اختياري)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+966501234567"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                الدور
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                disabled={selectedUser?.role === 'owner'}
              >
                {roles.filter(role => role.id !== 'owner').map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
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
                <option value="inactive">غير نشط</option>
                <option value="pending">في الانتظار</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedUser ? handleUpdateUser : handleCreateUser}
              className="flex-1"
            >
              {selectedUser ? 'تحديث' : 'إضافة'}
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

export default StaffUsersManagement;