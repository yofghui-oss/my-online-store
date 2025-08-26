import React, { useState } from 'react';
import { Users, Edit2, Trash2, Plus, Shield, Eye, Lock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { toast } from 'react-hot-toast';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  createdAt: Date;
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'مدير عام',
      description: 'صلاحيات كاملة لجميع أجزاء النظام',
      permissions: ['all'],
      userCount: 2,
      isSystem: true,
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'مدير محتوى',
      description: 'إدارة المحتوى والصفحات والمدونات',
      permissions: ['content.read', 'content.write', 'blog.manage', 'pages.manage'],
      userCount: 5,
      isSystem: false,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '3',
      name: 'مدير دعم',
      description: 'إدارة تذاكر الدعم والعملاء',
      permissions: ['support.read', 'support.write', 'users.read'],
      userCount: 8,
      isSystem: false,
      createdAt: new Date('2024-02-01')
    },
    {
      id: '4',
      name: 'محلل بيانات',
      description: 'عرض التقارير والتحليلات فقط',
      permissions: ['analytics.read', 'reports.read'],
      userCount: 3,
      isSystem: false,
      createdAt: new Date('2024-02-15')
    }
  ]);

  const [permissions] = useState<Permission[]>([
    { id: 'all', name: 'جميع الصلاحيات', description: 'وصول كامل للنظام', category: 'نظام' },
    { id: 'users.read', name: 'عرض المستخدمين', description: 'إمكانية عرض قائمة المستخدمين', category: 'مستخدمين' },
    { id: 'users.write', name: 'إدارة المستخدمين', description: 'إنشاء وتعديل وحذف المستخدمين', category: 'مستخدمين' },
    { id: 'content.read', name: 'عرض المحتوى', description: 'إمكانية عرض المحتوى', category: 'محتوى' },
    { id: 'content.write', name: 'إدارة المحتوى', description: 'إنشاء وتعديل المحتوى', category: 'محتوى' },
    { id: 'blog.manage', name: 'إدارة المدونة', description: 'إدارة مقالات المدونة', category: 'محتوى' },
    { id: 'pages.manage', name: 'إدارة الصفحات', description: 'إدارة صفحات الموقع', category: 'محتوى' },
    { id: 'support.read', name: 'عرض الدعم', description: 'عرض تذاكر الدعم', category: 'دعم' },
    { id: 'support.write', name: 'إدارة الدعم', description: 'الرد على تذاكر الدعم', category: 'دعم' },
    { id: 'analytics.read', name: 'عرض التحليلات', description: 'عرض التقارير والإحصائيات', category: 'تحليلات' },
    { id: 'reports.read', name: 'عرض التقارير', description: 'عرض التقارير المالية', category: 'تحليلات' },
    { id: 'settings.manage', name: 'إدارة الإعدادات', description: 'تعديل إعدادات النظام', category: 'نظام' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [viewPermissions, setViewPermissions] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const handleCreateRole = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '', permissions: [] });
    setIsModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setIsModalOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystem) {
      toast.error('لا يمكن حذف الأدوار النظامية');
      return;
    }
    
    if (window.confirm('هل أنت متأكد من حذف هذا الدور؟')) {
      setRoles(roles.filter(r => r.id !== roleId));
      toast.success('تم حذف الدور بنجاح');
    }
  };

  const handleSaveRole = () => {
    if (!formData.name.trim()) {
      toast.error('يرجى إدخال اسم الدور');
      return;
    }

    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...formData }
          : role
      ));
      toast.success('تم تحديث الدور بنجاح');
    } else {
      const newRole: Role = {
        id: (roles.length + 1).toString(),
        ...formData,
        userCount: 0,
        isSystem: false,
        createdAt: new Date()
      };
      setRoles([...roles, newRole]);
      toast.success('تم إنشاء الدور بنجاح');
    }

    setIsModalOpen(false);
    setEditingRole(null);
  };

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const getPermissionsByCategory = () => {
    const categories: { [key: string]: Permission[] } = {};
    permissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    return categories;
  };

  const getRolePermissionNames = (rolePermissions: string[]) => {
    if (rolePermissions.includes('all')) {
      return ['جميع الصلاحيات'];
    }
    return rolePermissions.map(permId => {
      const perm = permissions.find(p => p.id === permId);
      return perm ? perm.name : permId;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة الأدوار</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إدارة أدوار المستخدمين وصلاحياتهم</p>
        </div>
        <Button onClick={handleCreateRole}>
          <Plus size={16} className="ml-2" />
          دور جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {roles.map(role => (
          <Card key={role.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${role.isSystem ? 'bg-red-100 dark:bg-red-900/50' : 'bg-blue-100 dark:bg-blue-900/50'}`}>
                  <Shield className={`h-5 w-5 ${role.isSystem ? 'text-red-500' : 'text-blue-500'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">{role.name}</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300">{role.description}</p>
                </div>
              </div>
              {!role.isSystem && (
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleEditRole(role)}
                    className="p-1.5 text-secondary-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDeleteRole(role.id)}
                    className="p-1.5 text-secondary-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-600 dark:text-secondary-300">المستخدمين:</span>
                <span className="font-medium">{role.userCount}</span>
              </div>
              
              <div className="space-y-1">
                <button 
                  onClick={() => setViewPermissions(viewPermissions === role.id ? null : role.id)}
                  className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
                >
                  <Eye size={14} />
                  {viewPermissions === role.id ? 'إخفاء' : 'عرض'} الصلاحيات
                </button>
                
                {viewPermissions === role.id && (
                  <div className="mt-2 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <div className="space-y-1">
                      {getRolePermissionNames(role.permissions).map((permName, index) => (
                        <div key={index} className="text-xs text-secondary-600 dark:text-secondary-300 flex items-center gap-1">
                          <Lock size={10} />
                          {permName}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-secondary-500 dark:text-secondary-400">
                تم الإنشاء: {role.createdAt.toLocaleDateString('ar-SA')}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingRole ? 'تعديل الدور' : 'دور جديد'}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <Input
              label="اسم الدور"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="أدخل اسم الدور"
            />
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                الوصف
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="أدخل وصف الدور"
                className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg 
                          bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white
                          focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">الصلاحيات</h4>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
                <div key={category} className="border border-secondary-200 dark:border-secondary-600 rounded-lg p-4">
                  <h5 className="font-medium text-secondary-800 dark:text-secondary-200 mb-3">{category}</h5>
                  <div className="space-y-2">
                    {categoryPermissions.map(permission => (
                      <label key={permission.id} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.id)}
                          onChange={() => togglePermission(permission.id)}
                          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                        />
                        <div>
                          <div className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                            {permission.name}
                          </div>
                          <div className="text-xs text-secondary-500 dark:text-secondary-400">
                            {permission.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-secondary-200 dark:border-secondary-600">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveRole}>
              {editingRole ? 'تحديث' : 'إنشاء'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RoleManagement;