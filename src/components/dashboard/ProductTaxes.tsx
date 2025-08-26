import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Calculator, Percent, Save, X, MapPin } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface TaxRule {
  id: string;
  name: string;
  rate: number;
  type: 'percentage' | 'fixed';
  isInclusive: boolean;
  status: 'active' | 'inactive';
  applicableRegions: string[];
  productCategories: string[];
  minimumAmount?: number;
  maximumAmount?: number;
  description?: string;
  createdAt: string;
}

interface TaxRegion {
  id: string;
  name: string;
  code: string;
  type: 'country' | 'state' | 'city';
}

const ProductTaxes: React.FC = () => {
  const { currentStore } = useStore();
  const [taxRules, setTaxRules] = useState<TaxRule[]>([
    {
      id: '1',
      name: 'ضريبة القيمة المضافة',
      rate: 15,
      type: 'percentage',
      isInclusive: false,
      status: 'active',
      applicableRegions: ['SA'],
      productCategories: ['all'],
      description: 'ضريبة القيمة المضافة المطبقة في المملكة العربية السعودية',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'ضريبة الخدمات',
      rate: 5,
      type: 'percentage',
      isInclusive: true,
      status: 'active',
      applicableRegions: ['SA'],
      productCategories: ['services'],
      description: 'ضريبة على الخدمات الرقمية',
      createdAt: '2024-01-16'
    },
    {
      id: '3',
      name: 'رسوم ثابتة للشحن',
      rate: 10,
      type: 'fixed',
      isInclusive: false,
      status: 'active',
      applicableRegions: ['SA'],
      productCategories: ['shipping'],
      minimumAmount: 50,
      description: 'رسوم ثابتة على عمليات الشحن',
      createdAt: '2024-01-17'
    }
  ]);

  const [regions] = useState<TaxRegion[]>([
    { id: 'SA', name: 'المملكة العربية السعودية', code: 'SA', type: 'country' },
    { id: 'AE', name: 'الإمارات العربية المتحدة', code: 'AE', type: 'country' },
    { id: 'KW', name: 'الكويت', code: 'KW', type: 'country' },
    { id: 'QA', name: 'قطر', code: 'QA', type: 'country' }
  ]);

  const [categories] = useState([
    { id: 'all', name: 'جميع المنتجات' },
    { id: 'electronics', name: 'إلكترونيات' },
    { id: 'clothing', name: 'ملابس' },
    { id: 'services', name: 'خدمات' },
    { id: 'shipping', name: 'شحن' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<TaxRule | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    name: '',
    rate: 0,
    type: 'percentage' as const,
    isInclusive: false,
    status: 'active' as const,
    applicableRegions: [] as string[],
    productCategories: [] as string[],
    minimumAmount: '',
    maximumAmount: '',
    description: ''
  });

  const handleCreateRule = () => {
    if (!formData.name.trim() || formData.rate <= 0) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (formData.applicableRegions.length === 0) {
      toast.error('يرجى اختيار منطقة واحدة على الأقل');
      return;
    }

    const newRule: TaxRule = {
      id: Date.now().toString(),
      name: formData.name,
      rate: formData.rate,
      type: formData.type,
      isInclusive: formData.isInclusive,
      status: formData.status,
      applicableRegions: formData.applicableRegions,
      productCategories: formData.productCategories.length > 0 ? formData.productCategories : ['all'],
      minimumAmount: formData.minimumAmount ? parseFloat(formData.minimumAmount) : undefined,
      maximumAmount: formData.maximumAmount ? parseFloat(formData.maximumAmount) : undefined,
      description: formData.description,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTaxRules([...taxRules, newRule]);
    toast.success('تم إنشاء قاعدة الضريبة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateRule = () => {
    if (!selectedRule) return;

    const updatedRules = taxRules.map(rule =>
      rule.id === selectedRule.id
        ? {
            ...rule,
            name: formData.name,
            rate: formData.rate,
            type: formData.type,
            isInclusive: formData.isInclusive,
            status: formData.status,
            applicableRegions: formData.applicableRegions,
            productCategories: formData.productCategories.length > 0 ? formData.productCategories : ['all'],
            minimumAmount: formData.minimumAmount ? parseFloat(formData.minimumAmount) : undefined,
            maximumAmount: formData.maximumAmount ? parseFloat(formData.maximumAmount) : undefined,
            description: formData.description
          }
        : rule
    );

    setTaxRules(updatedRules);
    toast.success('تم تحديث قاعدة الضريبة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteRule = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه القاعدة الضريبية؟')) {
      setTaxRules(taxRules.filter(rule => rule.id !== id));
      toast.success('تم حذف قاعدة الضريبة بنجاح');
    }
  };

  const handleToggleStatus = (id: string) => {
    const updatedRules = taxRules.map(rule =>
      rule.id === id ? { ...rule, status: rule.status === 'active' ? 'inactive' as const : 'active' as const } : rule
    );
    setTaxRules(updatedRules);
    toast.success('تم تحديث حالة القاعدة الضريبية');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      rate: 0,
      type: 'percentage',
      isInclusive: false,
      status: 'active',
      applicableRegions: [],
      productCategories: [],
      minimumAmount: '',
      maximumAmount: '',
      description: ''
    });
    setSelectedRule(null);
  };

  const openEditModal = (rule: TaxRule) => {
    setSelectedRule(rule);
    setFormData({
      name: rule.name,
      rate: rule.rate,
      type: rule.type,
      isInclusive: rule.isInclusive,
      status: rule.status,
      applicableRegions: rule.applicableRegions,
      productCategories: rule.productCategories,
      minimumAmount: rule.minimumAmount?.toString() || '',
      maximumAmount: rule.maximumAmount?.toString() || '',
      description: rule.description || ''
    });
    setIsModalOpen(true);
  };

  const calculateTaxExample = (rule: TaxRule, amount: number = 100) => {
    if (rule.type === 'percentage') {
      if (rule.isInclusive) {
        const taxAmount = (amount * rule.rate) / (100 + rule.rate);
        return { taxAmount, total: amount, subtotal: amount - taxAmount };
      } else {
        const taxAmount = (amount * rule.rate) / 100;
        return { taxAmount, total: amount + taxAmount, subtotal: amount };
      }
    } else {
      return { taxAmount: rule.rate, total: amount + rule.rate, subtotal: amount };
    }
  };

  const filteredRules = taxRules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rule.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRegionChange = (regionId: string) => {
    const newRegions = formData.applicableRegions.includes(regionId)
      ? formData.applicableRegions.filter(id => id !== regionId)
      : [...formData.applicableRegions, regionId];
    setFormData({ ...formData, applicableRegions: newRegions });
  };

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = formData.productCategories.includes(categoryId)
      ? formData.productCategories.filter(id => id !== categoryId)
      : [...formData.productCategories, categoryId];
    setFormData({ ...formData, productCategories: newCategories });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة ضرائب المنتجات</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة قواعد الضرائب والرسوم المطبقة على المنتجات
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة قاعدة ضريبية
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
            <Input
              placeholder="البحث في القواعد الضريبية..."
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
            <option value="inactive">غير نشط</option>
          </select>
        </div>
      </Card>

      {/* Tax Rules List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRules.map((rule) => {
          const example = calculateTaxExample(rule, 100);
          
          return (
            <Card key={rule.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                    <Calculator className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {rule.name}
                    </h3>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      {rule.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      rule.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                    }`}
                  >
                    {rule.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">تفاصيل الضريبة</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-secondary-500 dark:text-secondary-400">المعدل:</span>
                      <span className="font-medium">
                        {rule.rate}{rule.type === 'percentage' ? '%' : ' ر.س'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-500 dark:text-secondary-400">النوع:</span>
                      <span className="font-medium">
                        {rule.type === 'percentage' ? 'نسبة مئوية' : 'مبلغ ثابت'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-500 dark:text-secondary-400">شامل:</span>
                      <span className="font-medium">
                        {rule.isInclusive ? 'نعم' : 'لا'}
                      </span>
                    </div>
                    {rule.minimumAmount && (
                      <div className="flex justify-between">
                        <span className="text-secondary-500 dark:text-secondary-400">الحد الأدنى:</span>
                        <span className="font-medium">{rule.minimumAmount} ر.س</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">نطاق التطبيق</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400 mb-1">المناطق:</p>
                      <div className="flex flex-wrap gap-1">
                        {rule.applicableRegions.map(regionId => {
                          const region = regions.find(r => r.id === regionId);
                          return (
                            <span key={regionId} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400 rounded">
                              {region?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400 mb-1">الفئات:</p>
                      <div className="flex flex-wrap gap-1">
                        {rule.productCategories.map(categoryId => {
                          const category = categories.find(c => c.id === categoryId);
                          return (
                            <span key={categoryId} className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400 rounded">
                              {category?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">مثال حسابي</h4>
                  <div className="bg-secondary-50 dark:bg-secondary-800/50 p-3 rounded-lg text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>المبلغ الأساسي:</span>
                        <span>{example.subtotal.toFixed(2)} ر.س</span>
                      </div>
                      <div className="flex justify-between">
                        <span>الضريبة:</span>
                        <span>{example.taxAmount.toFixed(2)} ر.س</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-1">
                        <span>الإجمالي:</span>
                        <span>{example.total.toFixed(2)} ر.س</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <div className="text-xs text-secondary-500 dark:text-secondary-400">
                  تاريخ الإنشاء: {new Date(rule.createdAt).toLocaleDateString('ar-SA')}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(rule)}>
                    <Edit2 className="h-4 w-4 ml-1" />
                    تعديل
                  </Button>
                  <Button
                    variant={rule.status === 'active' ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => handleToggleStatus(rule.id)}
                  >
                    {rule.status === 'active' ? 'إلغاء تفعيل' : 'تفعيل'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={selectedRule ? 'تعديل القاعدة الضريبية' : 'إضافة قاعدة ضريبية جديدة'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="اسم القاعدة الضريبية"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="مثل: ضريبة القيمة المضافة"
            required
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الوصف
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              rows={2}
              placeholder="وصف القاعدة الضريبية"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="المعدل/المبلغ"
              type="number"
              value={formData.rate.toString()}
              onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) || 0 })}
              step="0.01"
              min="0"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                نوع الضريبة
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              >
                <option value="percentage">نسبة مئوية (%)</option>
                <option value="fixed">مبلغ ثابت (ر.س)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="الحد الأدنى (اختياري)"
              type="number"
              value={formData.minimumAmount}
              onChange={(e) => setFormData({ ...formData, minimumAmount: e.target.value })}
              placeholder="0"
              step="0.01"
              min="0"
            />
            
            <Input
              label="الحد الأقصى (اختياري)"
              type="number"
              value={formData.maximumAmount}
              onChange={(e) => setFormData({ ...formData, maximumAmount: e.target.value })}
              placeholder="0"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              المناطق المطبقة
            </label>
            <div className="grid grid-cols-2 gap-2">
              {regions.map(region => (
                <label key={region.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.applicableRegions.includes(region.id)}
                    onChange={() => handleRegionChange(region.id)}
                    className="ml-2"
                  />
                  <span className="text-sm">{region.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              فئات المنتجات
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(category => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.productCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="ml-2"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isInclusive"
                checked={formData.isInclusive}
                onChange={(e) => setFormData({ ...formData, isInclusive: e.target.checked })}
                className="ml-2"
              />
              <label htmlFor="isInclusive" className="text-sm text-secondary-700 dark:text-secondary-300">
                ضريبة شاملة (مدرجة في السعر)
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                الحالة
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedRule ? handleUpdateRule : handleCreateRule}
              className="flex-1"
            >
              <Save className="h-4 w-4 ml-2" />
              {selectedRule ? 'تحديث' : 'إنشاء'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="flex-1"
            >
              <X className="h-4 w-4 ml-2" />
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductTaxes;