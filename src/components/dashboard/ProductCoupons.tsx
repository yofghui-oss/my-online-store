import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Percent, DollarSign, Calendar, Users, Copy } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Coupon {
  id: string;
  code: string;
  description: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: number;
  minimumAmount?: number;
  usageLimit?: number;
  usageCount: number;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
}

const ProductCoupons: React.FC = () => {
  const { currentStore } = useStore();
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      code: 'WELCOME10',
      description: 'خصم ترحيبي للعملاء الجدد',
      type: 'percentage',
      value: 10,
      minimumAmount: 100,
      usageLimit: 100,
      usageCount: 25,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      code: 'FREESHIP',
      description: 'شحن مجاني للطلبات فوق 200 ر.س',
      type: 'free_shipping',
      value: 0,
      minimumAmount: 200,
      usageLimit: 500,
      usageCount: 120,
      startDate: '2024-01-01',
      isActive: true,
      createdAt: '2024-01-10'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'percentage' as const,
    value: '',
    minimumAmount: '',
    usageLimit: '',
    startDate: '',
    endDate: '',
    isActive: true
  });

  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code: result });
  };

  const handleCreateCoupon = () => {
    if (!formData.code || !formData.description) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (coupons.some(coupon => coupon.code === formData.code)) {
      toast.error('رمز القسيمة موجود بالفعل');
      return;
    }

    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code: formData.code.toUpperCase(),
      description: formData.description,
      type: formData.type,
      value: parseFloat(formData.value) || 0,
      minimumAmount: formData.minimumAmount ? parseFloat(formData.minimumAmount) : undefined,
      usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : undefined,
      usageCount: 0,
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      isActive: formData.isActive,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCoupons([...coupons, newCoupon]);
    toast.success('تم إنشاء القسيمة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateCoupon = () => {
    if (!selectedCoupon) return;

    const updatedCoupons = coupons.map(coupon =>
      coupon.id === selectedCoupon.id
        ? {
            ...coupon,
            code: formData.code.toUpperCase(),
            description: formData.description,
            type: formData.type,
            value: parseFloat(formData.value) || 0,
            minimumAmount: formData.minimumAmount ? parseFloat(formData.minimumAmount) : undefined,
            usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : undefined,
            startDate: formData.startDate,
            endDate: formData.endDate || undefined,
            isActive: formData.isActive
          }
        : coupon
    );

    setCoupons(updatedCoupons);
    toast.success('تم تحديث القسيمة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
    toast.success('تم حذف القسيمة بنجاح');
  };

  const handleToggleStatus = (id: string) => {
    const updatedCoupons = coupons.map(coupon =>
      coupon.id === id ? { ...coupon, isActive: !coupon.isActive } : coupon
    );
    setCoupons(updatedCoupons);
    toast.success('تم تحديث حالة القسيمة');
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      type: 'percentage',
      value: '',
      minimumAmount: '',
      usageLimit: '',
      startDate: '',
      endDate: '',
      isActive: true
    });
    setSelectedCoupon(null);
  };

  const openEditModal = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description,
      type: coupon.type,
      value: coupon.value.toString(),
      minimumAmount: coupon.minimumAmount?.toString() || '',
      usageLimit: coupon.usageLimit?.toString() || '',
      startDate: coupon.startDate,
      endDate: coupon.endDate || '',
      isActive: coupon.isActive
    });
    setIsModalOpen(true);
  };

  const isExpired = (coupon: Coupon) => {
    if (!coupon.endDate) return false;
    return new Date(coupon.endDate) < new Date();
  };

  const formatValue = (coupon: Coupon) => {
    switch (coupon.type) {
      case 'percentage':
        return `${coupon.value}%`;
      case 'fixed_amount':
        return `${coupon.value} ر.س`;
      case 'free_shipping':
        return 'شحن مجاني';
      default:
        return coupon.value.toString();
    }
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة قسائم الخصم</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إنشاء وإدارة قسائم الخصم وأكواد الترويج
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة قسيمة جديدة
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
          <Input
            placeholder="البحث في القسائم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Percent className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي القسائم</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{coupons.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Users className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">القسائم النشطة</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">
                {coupons.filter(c => c.isActive).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي الاستخدامات</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">
                {coupons.reduce((sum, c) => sum + c.usageCount, 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <DollarSign className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">التوفير الإجمالي</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">
                {coupons.filter(c => c.type === 'fixed_amount').reduce((sum, c) => sum + (c.value * c.usageCount), 0).toLocaleString()} ر.س
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Coupons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.map((coupon) => (
          <Card key={coupon.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                  {coupon.type === 'percentage' && <Percent className="h-4 w-4" />}
                  {coupon.type === 'fixed_amount' && <DollarSign className="h-4 w-4" />}
                  {coupon.type === 'free_shipping' && <Calendar className="h-4 w-4" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                    {coupon.code}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      coupon.isActive && !isExpired(coupon)
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                    }`}
                  >
                    {coupon.isActive && !isExpired(coupon) ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(coupon.code);
                  toast.success('تم نسخ رمز القسيمة');
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              <p className="text-sm text-secondary-600 dark:text-secondary-300">
                {coupon.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatValue(coupon)}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                {coupon.minimumAmount && (
                  <div className="flex justify-between">
                    <span className="text-secondary-500 dark:text-secondary-400">الحد الأدنى:</span>
                    <span className="text-secondary-900 dark:text-white">{coupon.minimumAmount} ر.س</span>
                  </div>
                )}
                {coupon.usageLimit && (
                  <div className="flex justify-between">
                    <span className="text-secondary-500 dark:text-secondary-400">الاستخدامات:</span>
                    <span className="text-secondary-900 dark:text-white">
                      {coupon.usageCount} / {coupon.usageLimit}
                    </span>
                  </div>
                )}
                {coupon.endDate && (
                  <div className="flex justify-between">
                    <span className="text-secondary-500 dark:text-secondary-400">تنتهي في:</span>
                    <span className="text-secondary-900 dark:text-white">
                      {new Date(coupon.endDate).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                )}
              </div>

              {/* Usage Progress */}
              {coupon.usageLimit && (
                <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min((coupon.usageCount / coupon.usageLimit) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => openEditModal(coupon)} className="flex-1">
                <Edit2 className="h-4 w-4 ml-1" />
                تعديل
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleStatus(coupon.id)}
              >
                {coupon.isActive ? 'إيقاف' : 'تفعيل'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDeleteCoupon(coupon.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
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
        title={selectedCoupon ? 'تعديل القسيمة' : 'إضافة قسيمة جديدة'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Input
                label="رمز القسيمة"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="SAVE10"
                required
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={generateCouponCode} className="w-full">
                توليد رمز
              </Button>
            </div>
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
              placeholder="وصف القسيمة..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                نوع الخصم
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              >
                <option value="percentage">نسبة مئوية (%)</option>
                <option value="fixed_amount">مبلغ ثابت (ر.س)</option>
                <option value="free_shipping">شحن مجاني</option>
              </select>
            </div>
            {formData.type !== 'free_shipping' && (
              <Input
                label={formData.type === 'percentage' ? 'النسبة المئوية' : 'المبلغ (ر.س)'}
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder={formData.type === 'percentage' ? '10' : '50'}
                min="0"
                max={formData.type === 'percentage' ? '100' : undefined}
                required
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="الحد الأدنى للطلب (ر.س)"
              type="number"
              value={formData.minimumAmount}
              onChange={(e) => setFormData({ ...formData, minimumAmount: e.target.value })}
              placeholder="100"
              min="0"
            />
            <Input
              label="عدد مرات الاستخدام"
              type="number"
              value={formData.usageLimit}
              onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
              placeholder="100"
              min="1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="تاريخ البداية"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
            <Input
              label="تاريخ الانتهاء (اختياري)"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
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
              قسيمة نشطة
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedCoupon ? handleUpdateCoupon : handleCreateCoupon}
              className="flex-1"
            >
              {selectedCoupon ? 'تحديث' : 'إنشاء'}
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

export default ProductCoupons;