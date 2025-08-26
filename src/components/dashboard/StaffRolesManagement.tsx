import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Shield, Users, Key, Check, X } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Permission {
  id: string;
  name: string;
  displayName: string;
  category: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
  userCount: number;
  color: string;
  createdAt: string;
  updatedAt: string;
}

const StaffRolesManagement: React.FC = () => {
  const { currentStore } = useStore();
  
  const [permissions] = useState<Permission[]>([
    // Store Management
    { id: 'store.view', name: 'store.view', displayName: 'عرض المتجر', category: 'store', description: 'عرض معلومات المتجر' },
    { id: 'store.edit', name: 'store.edit', displayName: 'تعديل المتجر', category: 'store', description: 'تعديل إعدادات المتجر' },
    { id: 'store.settings', name: 'store.settings', displayName: 'إعدادات المتجر', category: 'store', description: 'إدارة إعدادات المتجر' },
    
    // Products
    { id: 'products.view', name: 'products.view', displayName: 'عرض المنتجات', category: 'products', description: 'عرض قائمة المنتجات' },
    { id: 'products.create', name: 'products.create', displayName: 'إضافة المنتجات', category: 'products', description: 'إضافة منتجات جديدة' },
    { id: 'products.edit', name: 'products.edit', displayName: 'تعديل المنتجات', category: 'products', description: 'تعديل المنتجات الموجودة' },
    { id: 'products.delete', name: 'products.delete', displayName: 'حذف المنتجات', category: 'products', description: 'حذف المنتجات' },
    { id: 'products.inventory', name: 'products.inventory', displayName: 'إدارة المخزون', category: 'products', description: 'إدارة كميات المخزون' },
    
    // Orders
    { id: 'orders.view', name: 'orders.view', displayName: 'عرض الطلبات', category: 'orders', description: 'عرض قائمة الطلبات' },
    { id: 'orders.edit', name: 'orders.edit', displayName: 'تعديل الطلبات', category: 'orders', description: 'تعديل حالة الطلبات' },
    { id: 'orders.delete', name: 'orders.delete', displayName: 'حذف الطلبات', category: 'orders', description: 'حذف الطلبات' },
    { id: 'orders.fulfill', name: 'orders.fulfill', displayName: 'تنفيذ الطلبات', category: 'orders', description: 'تنفيذ وشحن الطلبات' },
    
    // Customers
    { id: 'customers.view', name: 'customers.view', displayName: 'عرض العملاء', category: 'customers', description: 'عرض قائمة العملاء' },
    { id: 'customers.edit', name: 'customers.edit', displayName: 'تعديل العملاء', category: 'customers', description: 'تعديل بيانات العملاء' },
    { id: 'customers.delete', name: 'customers.delete', displayName: 'حذف العملاء', category: 'customers', description: 'حذف حسابات العملاء' },
    
    // Staff Management
    { id: 'staff.view', name: 'staff.view', displayName: 'عرض الموظفين', category: 'staff', description: 'عرض قائمة الموظفين' },
    { id: 'staff.create', name: 'staff.create', displayName: 'إضافة الموظفين', category: 'staff', description: 'إضافة موظفين جدد' },
    { id: 'staff.edit', name: 'staff.edit', displayName: 'تعديل الموظفين', category: 'staff', description: 'تعديل بيانات الموظفين' },
    { id: 'staff.delete', name: 'staff.delete', displayName: 'حذف الموظفين', category: 'staff', description: 'حذف حسابات الموظفين' },
    { id: 'staff.roles', name: 'staff.roles', displayName: 'إدارة الأدوار', category: 'staff', description: 'إدارة أدوار وصلاحيات الموظفين' },
    
    // Analytics
    { id: 'analytics.view', name: 'analytics.view', displayName: 'عرض التقارير', category: 'analytics', description: 'عرض التقارير والإحصائيات' },
    { id: 'analytics.export', name: 'analytics.export', displayName: 'تصدير التقارير', category: 'analytics', description: 'تصدير التقارير والبيانات' },
    
    // Marketing
    { id: 'marketing.coupons', name: 'marketing.coupons', displayName: 'إدارة القسائم', category: 'marketing', description: 'إدارة قسائم الخصم' },
    { id: 'marketing.email', name: 'marketing.email', displayName: 'التسويق الإلكتروني', category: 'marketing', description: 'إدارة الحملات التسويقية' },
    { id: 'marketing.blog', name: 'marketing.blog', displayName: 'إدارة المدونة', category: 'marketing', description: 'إدارة مقالات المدونة' }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'owner',
      displayName: 'مالك المتجر',
      description: 'يملك جميع الصلاحيات والتحكم الكامل في المتجر',
      permissions: permissions.map(p => p.id),
      isSystem: true,
      userCount: 1,
      color: 'purple',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'admin',
      displayName: 'مدير عام',
      description: 'صلاحيات إدارية واسعة مع تقييد بعض الإعدادات الحساسة',
      permissions: [
        'store.view', 'store.edit',
        'products.view', 'products.create', 'products.edit', 'products.inventory',
        'orders.view', 'orders.edit', 'orders.fulfill',
        'customers.view', 'customers.edit',
        'staff.view', 'staff.edit',
        'analytics.view', 'analytics.export',
        'marketing.coupons', 'marketing.email', 'marketing.blog'
      ],
      isSystem: false,
      userCount: 2,
      color: 'blue',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'manager',
      displayName: 'مدير متجر',
      description: 'إدارة العمليات اليومية للمتجر والمنتجات',
      permissions: [
        'store.view',
        'products.view', 'products.create', 'products.edit', 'products.inventory',
        'orders.view', 'orders.edit', 'orders.fulfill',
        'customers.view', 'customers.edit',
        'analytics.view',
        'marketing.coupons'
      ],
      isSystem: false,
      userCount: 3,
      color: 'green',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-15'
    },
    {
      id: '4',
      name: 'support',
      displayName: 'خدمة العملاء',
      description: 'التعامل مع استفسارات العملاء والطلبات',
      permissions: [
        'orders.view', 'orders.edit',
        'customers.view', 'customers.edit',
        'products.view'
      ],
      isSystem: false,
      userCount: 5,
      color: 'orange',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-18'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    description: '',
    permissions: [] as string[],
    color: 'blue'
  });

  const handleCreateRole = () => {
    if (!formData.name || !formData.displayName) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }

    if (roles.some(role => role.name === formData.name)) {
      toast.error('اسم الدور موجود بالفعل');
      return;
    }

    const newRole: Role = {
      id: Date.now().toString(),
      name: formData.name.toLowerCase().replace(/\s+/g, '_'),
      displayName: formData.displayName,
      description: formData.description,
      permissions: formData.permissions,
      isSystem: false,
      userCount: 0,
      color: formData.color,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setRoles([...roles, newRole]);
    toast.success('تم إنشاء الدور بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateRole = () => {
    if (!selectedRole) return;

    const updatedRoles = roles.map(role =>
      role.id === selectedRole.id
        ? {
            ...role,
            name: formData.name.toLowerCase().replace(/\s+/g, '_'),
            displayName: formData.displayName,
            description: formData.description,
            permissions: formData.permissions,
            color: formData.color,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : role
    );

    setRoles(updatedRoles);
    toast.success('تم تحديث الدور بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteRole = (id: string) => {
    const role = roles.find(r => r.id === id);
    if (role?.isSystem) {
      toast.error('لا يمكن حذف الأدوار الأساسية');
      return;
    }

    if (role && role.userCount > 0) {
      toast.error('لا يمكن حذف دور يحتوي على مستخدمين');
      return;
    }

    if (window.confirm('هل أنت متأكد من حذف هذا الدور؟')) {
      setRoles(roles.filter(role => role.id !== id));
      toast.success('تم حذف الدور بنجاح');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      displayName: '',
      description: '',
      permissions: [],
      color: 'blue'
    });
    setSelectedRole(null);
  };

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      displayName: role.displayName,
      description: role.description,
      permissions: [...role.permissions],
      color: role.color
    });
    setIsModalOpen(true);
  };

  const togglePermission = (permissionId: string) => {
    const newPermissions = formData.permissions.includes(permissionId)
      ? formData.permissions.filter(p => p !== permissionId)
      : [...formData.permissions, permissionId];
    
    setFormData({ ...formData, permissions: newPermissions });
  };

  const toggleCategoryPermissions = (category: string) => {
    const categoryPermissions = permissions.filter(p => p.category === category).map(p => p.id);
    const hasAllPermissions = categoryPermissions.every(p => formData.permissions.includes(p));
    
    if (hasAllPermissions) {
      // Remove all category permissions
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => !categoryPermissions.includes(p))
      });
    } else {
      // Add all category permissions
      const newPermissions = [...new Set([...formData.permissions, ...categoryPermissions])];
      setFormData({ ...formData, permissions: newPermissions });
    }
  };

  const getColorClass = (color: string) => {
    const colorClasses: { [key: string]: string } = {
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400',
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400'
    };
    return colorClasses[color] || colorClasses.blue;
  };

  const filteredRoles = roles.filter(role =>
    role.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const permissionCategories = [...new Set(permissions.map(p => p.category))];
  const categoryNames: { [key: string]: string } = {
    store: 'إدارة المتجر',
    products: 'المنتجات',
    orders: 'الطلبات',
    customers: 'العملاء',
    staff: 'الموظفين',
    analytics: 'التقارير',
    marketing: 'التسويق'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة أدوار الموظفين</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إنشاء وإدارة أدوار الموظفين وصلاحياتهم في المتجر
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          دور جديد
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي الأدوار</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{roles.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Users className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي المستخدمين</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">
                {roles.reduce((sum, role) => sum + role.userCount, 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Key className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي الصلاحيات</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{permissions.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <Shield className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">الأدوار المخصصة</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">
                {roles.filter(r => !r.isSystem).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
          <Input
            placeholder="البحث في الأدوار..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </Card>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <Card key={role.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getColorClass(role.color)}`}>
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                    {role.displayName}
                  </h3>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">
                    {role.userCount} مستخدم
                  </p>
                </div>
              </div>
              {role.isSystem && (
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
                  نظام
                </span>
              )}
            </div>

            <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-4">
              {role.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  الصلاحيات:
                </span>
                <span className="text-sm text-secondary-500 dark:text-secondary-400">
                  {role.permissions.length} من {permissions.length}
                </span>
              </div>
              
              <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{
                    width: `${(role.permissions.length / permissions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditModal(role)}
                className="flex-1"
                disabled={role.isSystem && role.name === 'owner'}
              >
                <Edit2 className="h-4 w-4 ml-1" />
                تعديل
              </Button>
              {!role.isSystem && (
                <Button variant="outline" size="sm" onClick={() => handleDeleteRole(role.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={selectedRole ? 'تعديل الدور' : 'دور جديد'}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="اسم الدور"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="manager"
              required
              disabled={selectedRole?.isSystem}
            />
            <Input
              label="الاسم المعروض"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              placeholder="مدير متجر"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الوصف
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              rows={3}
              placeholder="وصف مختصر لمسؤوليات هذا الدور..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              لون الدور
            </label>
            <div className="flex gap-2">
              {['blue', 'green', 'purple', 'orange', 'red', 'yellow'].map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 rounded-full border-2 ${
                    formData.color === color ? 'border-secondary-400' : 'border-transparent'
                  } ${getColorClass(color)}`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-4">
              الصلاحيات ({formData.permissions.length} محددة)
            </label>
            
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {permissionCategories.map(category => {
                const categoryPermissions = permissions.filter(p => p.category === category);
                const hasAllPermissions = categoryPermissions.every(p => formData.permissions.includes(p.id));
                const hasSomePermissions = categoryPermissions.some(p => formData.permissions.includes(p.id));
                
                return (
                  <div key={category} className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-secondary-900 dark:text-white">
                        {categoryNames[category]}
                      </h4>
                      <button
                        type="button"
                        onClick={() => toggleCategoryPermissions(category)}
                        className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
                          hasAllPermissions
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                            : hasSomePermissions
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400'
                            : 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-300'
                        }`}
                      >
                        {hasAllPermissions ? (
                          <>
                            <Check className="h-4 w-4" />
                            الكل
                          </>
                        ) : hasSomePermissions ? (
                          <>
                            <div className="w-4 h-4 bg-current rounded-sm" />
                            جزئي
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4" />
                            لا شيء
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {categoryPermissions.map(permission => (
                        <div key={permission.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={permission.id}
                            checked={formData.permissions.includes(permission.id)}
                            onChange={() => togglePermission(permission.id)}
                            className="ml-2"
                          />
                          <label
                            htmlFor={permission.id}
                            className="flex-1 text-sm text-secondary-700 dark:text-secondary-300 cursor-pointer"
                          >
                            <span className="font-medium">{permission.displayName}</span>
                            <span className="block text-xs text-secondary-500 dark:text-secondary-400">
                              {permission.description}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedRole ? handleUpdateRole : handleCreateRole}
              className="flex-1"
            >
              {selectedRole ? 'تحديث' : 'إنشاء'}
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

export default StaffRolesManagement;