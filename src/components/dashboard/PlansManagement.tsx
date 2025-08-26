import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Package, Crown, Star, Users, DollarSign } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Plan {
  id: string;
  name: string;
  displayName: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly' | 'lifetime';
  features: string[];
  limitations: {
    products: number;
    storage: number;
    customDomain: boolean;
    analytics: boolean;
  };
  isPopular: boolean;
  isActive: boolean;
  subscriberCount: number;
  createdAt: string;
  updatedAt: string;
}

const PlansManagement: React.FC = () => {
  const { currentStore } = useStore();
  
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: '1',
      name: 'basic',
      displayName: 'الباقة الأساسية',
      description: 'مثالية للمتاجر الصغيرة والمشاريع الناشئة',
      price: 99,
      currency: 'SAR',
      billingPeriod: 'monthly',
      features: ['متجر إلكتروني كامل', 'نظام إدارة المخزون', 'تقارير أساسية'],
      limitations: {
        products: 100,
        storage: 5,
        customDomain: false,
        analytics: false
      },
      isPopular: false,
      isActive: true,
      subscriberCount: 156,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'professional',
      displayName: 'الباقة الاحترافية',
      description: 'الأفضل للمتاجر المتنامية والشركات المتوسطة',
      price: 199,
      originalPrice: 249,
      currency: 'SAR',
      billingPeriod: 'monthly',
      features: ['جميع مميزات الباقة الأساسية', 'نطاق مخصص', 'تقارير متقدمة'],
      limitations: {
        products: 1000,
        storage: 25,
        customDomain: true,
        analytics: true
      },
      isPopular: true,
      isActive: true,
      subscriberCount: 89,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-20'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    description: '',
    price: '',
    originalPrice: '',
    currency: 'SAR',
    billingPeriod: 'monthly' as const,
    products: '',
    storage: '',
    customDomain: false,
    analytics: false,
    isPopular: false,
    isActive: true
  });

  const handleCreatePlan = () => {
    if (!formData.name || !formData.displayName || !formData.price) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }

    const newPlan: Plan = {
      id: Date.now().toString(),
      name: formData.name,
      displayName: formData.displayName,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      currency: formData.currency,
      billingPeriod: formData.billingPeriod,
      features: [],
      limitations: {
        products: parseInt(formData.products) || 100,
        storage: parseInt(formData.storage) || 10,
        customDomain: formData.customDomain,
        analytics: formData.analytics
      },
      isPopular: formData.isPopular,
      isActive: formData.isActive,
      subscriberCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setPlans([...plans, newPlan]);
    toast.success('تم إنشاء الباقة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdatePlan = () => {
    if (!selectedPlan) return;

    const updatedPlans = plans.map(plan =>
      plan.id === selectedPlan.id
        ? {
            ...plan,
            name: formData.name,
            displayName: formData.displayName,
            description: formData.description,
            price: parseFloat(formData.price),
            originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
            currency: formData.currency,
            billingPeriod: formData.billingPeriod,
            limitations: {
              products: parseInt(formData.products) || 100,
              storage: parseInt(formData.storage) || 10,
              customDomain: formData.customDomain,
              analytics: formData.analytics
            },
            isPopular: formData.isPopular,
            isActive: formData.isActive,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : plan
    );

    setPlans(updatedPlans);
    toast.success('تم تحديث الباقة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeletePlan = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
      setPlans(plans.filter(plan => plan.id !== id));
      toast.success('تم حذف الباقة بنجاح');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      displayName: '',
      description: '',
      price: '',
      originalPrice: '',
      currency: 'SAR',
      billingPeriod: 'monthly',
      products: '',
      storage: '',
      customDomain: false,
      analytics: false,
      isPopular: false,
      isActive: true
    });
    setSelectedPlan(null);
  };

  const openEditModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      displayName: plan.displayName,
      description: plan.description,
      price: plan.price.toString(),
      originalPrice: plan.originalPrice?.toString() || '',
      currency: plan.currency,
      billingPeriod: plan.billingPeriod,
      products: plan.limitations.products.toString(),
      storage: plan.limitations.storage.toString(),
      customDomain: plan.limitations.customDomain,
      analytics: plan.limitations.analytics,
      isPopular: plan.isPopular,
      isActive: plan.isActive
    });
    setIsModalOpen(true);
  };

  const getBillingPeriodLabel = (period: string) => {
    switch (period) {
      case 'monthly': return 'شهرياً';
      case 'yearly': return 'سنوياً';
      case 'lifetime': return 'مدى الحياة';
      default: return period;
    }
  };

  const filteredPlans = plans.filter(plan =>
    plan.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activePlans = plans.filter(p => p.isActive).length;
  const totalSubscribers = plans.reduce((sum, p) => sum + p.subscriberCount, 0);
  const monthlyRevenue = plans.reduce((sum, p) => sum + (p.price * p.subscriberCount), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة الباقات والاشتراكات</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إنشاء وإدارة باقات الاشتراك وخطط التسعير
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          باقة جديدة
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Package className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي الباقات</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{plans.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Star className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">الباقات النشطة</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{activePlans}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي المشتركين</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{totalSubscribers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <DollarSign className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">الإيرادات الشهرية</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">
                {monthlyRevenue.toLocaleString()} ر.س
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
            placeholder="البحث في الباقات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className={`relative overflow-hidden ${plan.isPopular ? 'ring-2 ring-primary-500' : ''}`}>
            {plan.isPopular && (
              <div className="absolute top-0 left-0 bg-primary-500 text-white px-3 py-1 text-sm font-semibold">
                الأكثر شعبية
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white">
                    {plan.displayName}
                  </h3>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">
                    {plan.subscriberCount} مشترك
                  </p>
                </div>
                {!plan.isActive && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400 rounded">
                    غير نشط
                  </span>
                )}
              </div>

              <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  {plan.originalPrice && (
                    <span className="text-lg text-secondary-400 line-through">
                      {plan.originalPrice} {plan.currency}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {plan.price}
                  </span>
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">
                    {plan.currency} / {getBillingPeriodLabel(plan.billingPeriod)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-300">المنتجات:</span>
                  <span className="font-medium text-secondary-900 dark:text-white">
                    {plan.limitations.products}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-300">التخزين:</span>
                  <span className="font-medium text-secondary-900 dark:text-white">
                    {plan.limitations.storage} GB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-300">النطاق المخصص:</span>
                  <span className="font-medium text-secondary-900 dark:text-white">
                    {plan.limitations.customDomain ? 'نعم' : 'لا'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(plan)} className="flex-1">
                  <Edit2 className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeletePlan(plan.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
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
        title={selectedPlan ? 'تعديل الباقة' : 'باقة جديدة'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="اسم الباقة"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="professional"
              required
            />
            <Input
              label="الاسم المعروض"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              placeholder="الباقة الاحترافية"
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
              rows={2}
              placeholder="وصف الباقة ومميزاتها..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="السعر"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="199"
              required
            />
            <Input
              label="السعر الأصلي (اختياري)"
              type="number"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              placeholder="249"
            />
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                فترة الدفع
              </label>
              <select
                value={formData.billingPeriod}
                onChange={(e) => setFormData({ ...formData, billingPeriod: e.target.value as any })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              >
                <option value="monthly">شهرياً</option>
                <option value="yearly">سنوياً</option>
                <option value="lifetime">مدى الحياة</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="عدد المنتجات"
              type="number"
              value={formData.products}
              onChange={(e) => setFormData({ ...formData, products: e.target.value })}
              placeholder="1000"
            />
            <Input
              label="التخزين (GB)"
              type="number"
              value={formData.storage}
              onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
              placeholder="25"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="customDomain"
                checked={formData.customDomain}
                onChange={(e) => setFormData({ ...formData, customDomain: e.target.checked })}
                className="ml-2"
              />
              <label htmlFor="customDomain" className="text-sm text-secondary-700 dark:text-secondary-300">
                نطاق مخصص
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="analytics"
                checked={formData.analytics}
                onChange={(e) => setFormData({ ...formData, analytics: e.target.checked })}
                className="ml-2"
              />
              <label htmlFor="analytics" className="text-sm text-secondary-700 dark:text-secondary-300">
                تقارير متقدمة
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPopular"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                className="ml-2"
              />
              <label htmlFor="isPopular" className="text-sm text-secondary-700 dark:text-secondary-300">
                باقة شائعة
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="ml-2"
              />
              <label htmlFor="isActive" className="text-sm text-secondary-700 dark:text-secondary-300">
                باقة نشطة
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedPlan ? handleUpdatePlan : handleCreatePlan}
              className="flex-1"
            >
              {selectedPlan ? 'تحديث' : 'إنشاء'}
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

export default PlansManagement;