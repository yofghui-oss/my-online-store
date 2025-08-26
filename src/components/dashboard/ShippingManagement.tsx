import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Truck, Globe, Clock, Package } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface ShippingZone {
  id: string;
  name: string;
  description: string;
  countries: string[];
  cities: string[];
  isActive: boolean;
  createdAt: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  zoneId: string;
  zoneName: string;
  type: 'flat_rate' | 'free' | 'calculated' | 'pickup';
  cost: number;
  minOrderAmount?: number;
  maxWeight?: number;
  estimatedDays: {
    min: number;
    max: number;
  };
  isActive: boolean;
  createdAt: string;
}

const ShippingManagement: React.FC = () => {
  const { currentStore } = useStore();
  const [activeTab, setActiveTab] = useState<'zones' | 'methods'>('zones');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'zone' | 'method'>('zone');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [zones, setZones] = useState<ShippingZone[]>([
    {
      id: '1',
      name: 'المنطقة المحلية',
      description: 'الشحن داخل المدينة والمناطق المجاورة',
      countries: ['السعودية'],
      cities: ['الرياض', 'جدة', 'الدمام'],
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'دول الخليج',
      description: 'الشحن لدول مجلس التعاون الخليجي',
      countries: ['الإمارات', 'الكويت', 'قطر', 'البحرين', 'عمان'],
      cities: [],
      isActive: true,
      createdAt: '2024-01-10'
    }
  ]);

  const [methods, setMethods] = useState<ShippingMethod[]>([
    {
      id: '1',
      name: 'الشحن العادي',
      description: 'شحن عادي خلال 3-5 أيام عمل',
      zoneId: '1',
      zoneName: 'المنطقة المحلية',
      type: 'flat_rate',
      cost: 25,
      estimatedDays: { min: 3, max: 5 },
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'الشحن السريع',
      description: 'شحن سريع خلال 1-2 أيام عمل',
      zoneId: '1',
      zoneName: 'المنطقة المحلية',
      type: 'flat_rate',
      cost: 50,
      estimatedDays: { min: 1, max: 2 },
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      name: 'الشحن المجاني',
      description: 'شحن مجاني للطلبات فوق 300 ر.س',
      zoneId: '1',
      zoneName: 'المنطقة المحلية',
      type: 'free',
      cost: 0,
      minOrderAmount: 300,
      estimatedDays: { min: 3, max: 7 },
      isActive: true,
      createdAt: '2024-01-12'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    countries: '',
    cities: '',
    type: 'flat_rate' as const,
    cost: '',
    minOrderAmount: '',
    maxWeight: '',
    minDays: '',
    maxDays: '',
    zoneId: '',
    isActive: true
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      countries: '',
      cities: '',
      type: 'flat_rate',
      cost: '',
      minOrderAmount: '',
      maxWeight: '',
      minDays: '',
      maxDays: '',
      zoneId: '',
      isActive: true
    });
    setSelectedItem(null);
  };

  const openCreateModal = (type: 'zone' | 'method') => {
    setModalType(type);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: any, type: 'zone' | 'method') => {
    setModalType(type);
    setSelectedItem(item);
    
    if (type === 'zone') {
      setFormData({
        ...formData,
        name: item.name,
        description: item.description,
        countries: item.countries.join(', '),
        cities: item.cities.join(', '),
        isActive: item.isActive
      });
    } else {
      setFormData({
        ...formData,
        name: item.name,
        description: item.description,
        type: item.type,
        cost: item.cost.toString(),
        minOrderAmount: item.minOrderAmount?.toString() || '',
        maxWeight: item.maxWeight?.toString() || '',
        minDays: item.estimatedDays.min.toString(),
        maxDays: item.estimatedDays.max.toString(),
        zoneId: item.zoneId,
        isActive: item.isActive
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveZone = () => {
    if (!formData.name || !formData.description) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const zoneData = {
      id: selectedItem?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      countries: formData.countries.split(',').map(c => c.trim()).filter(c => c),
      cities: formData.cities.split(',').map(c => c.trim()).filter(c => c),
      isActive: formData.isActive,
      createdAt: selectedItem?.createdAt || new Date().toISOString().split('T')[0]
    };

    if (selectedItem) {
      setZones(zones.map(zone => zone.id === selectedItem.id ? zoneData : zone));
      toast.success('تم تحديث المنطقة بنجاح');
    } else {
      setZones([...zones, zoneData]);
      toast.success('تم إنشاء المنطقة بنجاح');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleSaveMethod = () => {
    if (!formData.name || !formData.zoneId || !formData.minDays || !formData.maxDays) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const zone = zones.find(z => z.id === formData.zoneId);
    const methodData = {
      id: selectedItem?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      zoneId: formData.zoneId,
      zoneName: zone?.name || '',
      type: formData.type,
      cost: formData.type === 'free' ? 0 : parseFloat(formData.cost) || 0,
      minOrderAmount: formData.minOrderAmount ? parseFloat(formData.minOrderAmount) : undefined,
      maxWeight: formData.maxWeight ? parseFloat(formData.maxWeight) : undefined,
      estimatedDays: {
        min: parseInt(formData.minDays),
        max: parseInt(formData.maxDays)
      },
      isActive: formData.isActive,
      createdAt: selectedItem?.createdAt || new Date().toISOString().split('T')[0]
    };

    if (selectedItem) {
      setMethods(methods.map(method => method.id === selectedItem.id ? methodData : method));
      toast.success('تم تحديث طريقة الشحن بنجاح');
    } else {
      setMethods([...methods, methodData]);
      toast.success('تم إنشاء طريقة الشحن بنجاح');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteZone = (id: string) => {
    const hasLinkedMethods = methods.some(method => method.zoneId === id);
    if (hasLinkedMethods) {
      toast.error('لا يمكن حذف منطقة مرتبطة بطرق شحن');
      return;
    }

    if (window.confirm('هل أنت متأكد من حذف هذه المنطقة؟')) {
      setZones(zones.filter(zone => zone.id !== id));
      toast.success('تم حذف المنطقة بنجاح');
    }
  };

  const handleDeleteMethod = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف طريقة الشحن؟')) {
      setMethods(methods.filter(method => method.id !== id));
      toast.success('تم حذف طريقة الشحن بنجاح');
    }
  };

  const handleToggleStatus = (id: string, type: 'zone' | 'method') => {
    if (type === 'zone') {
      setZones(zones.map(zone => 
        zone.id === id ? { ...zone, isActive: !zone.isActive } : zone
      ));
    } else {
      setMethods(methods.map(method => 
        method.id === id ? { ...method, isActive: !method.isActive } : method
      ));
    }
    toast.success('تم تحديث الحالة بنجاح');
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'flat_rate':
        return 'سعر ثابت';
      case 'free':
        return 'مجاني';
      case 'calculated':
        return 'محسوب';
      case 'pickup':
        return 'استلام شخصي';
      default:
        return type;
    }
  };

  const filteredZones = zones.filter(zone =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMethods = methods.filter(method =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.zoneName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة الشحن</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة مناطق الشحن وطرق التوصيل
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex gap-8">
          <button
            onClick={() => setActiveTab('zones')}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'zones'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
            }`}
          >
            <Globe className="h-4 w-4" />
            مناطق الشحن
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'methods'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
            }`}
          >
            <Truck className="h-4 w-4" />
            طرق الشحن
          </button>
        </nav>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
          <Input
            placeholder="البحث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Button onClick={() => openCreateModal(activeTab as 'zone' | 'method')}>
          <Plus className="h-4 w-4 ml-2" />
          {activeTab === 'zones' ? 'إضافة منطقة' : 'إضافة طريقة شحن'}
        </Button>
      </div>

      {/* Zones Tab */}
      {activeTab === 'zones' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredZones.map((zone) => (
            <Card key={zone.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                    {zone.name}
                  </h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    zone.isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                  }`}
                >
                  {zone.isActive ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-4">
                {zone.description}
              </p>

              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">الدول:</p>
                  <div className="flex flex-wrap gap-1">
                    {zone.countries.map((country, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400 rounded"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
                {zone.cities.length > 0 && (
                  <div>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">المدن:</p>
                    <div className="flex flex-wrap gap-1">
                      {zone.cities.slice(0, 3).map((city, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200 rounded"
                        >
                          {city}
                        </span>
                      ))}
                      {zone.cities.length > 3 && (
                        <span className="text-xs text-secondary-500 dark:text-secondary-400">
                          +{zone.cities.length - 3} أخرى
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(zone, 'zone')} className="flex-1">
                  <Edit2 className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(zone.id, 'zone')}
                >
                  {zone.isActive ? 'إيقاف' : 'تفعيل'}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteZone(zone.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Methods Tab */}
      {activeTab === 'methods' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMethods.map((method) => (
            <Card key={method.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                    {method.name}
                  </h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    method.isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                  }`}
                >
                  {method.isActive ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <p className="text-sm text-secondary-600 dark:text-secondary-300">
                  {method.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">المنطقة:</span>
                  <span className="text-sm text-secondary-900 dark:text-white">{method.zoneName}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">النوع:</span>
                  <span className="text-sm text-secondary-900 dark:text-white">{getTypeLabel(method.type)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">التكلفة:</span>
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {method.cost === 0 ? 'مجاني' : `${method.cost} ر.س`}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">مدة التوصيل:</span>
                  <span className="text-sm text-secondary-900 dark:text-white">
                    {method.estimatedDays.min}-{method.estimatedDays.max} أيام
                  </span>
                </div>

                {method.minOrderAmount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-500 dark:text-secondary-400">الحد الأدنى:</span>
                    <span className="text-sm text-secondary-900 dark:text-white">
                      {method.minOrderAmount} ر.س
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(method, 'method')} className="flex-1">
                  <Edit2 className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(method.id, 'method')}
                >
                  {method.isActive ? 'إيقاف' : 'تفعيل'}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteMethod(method.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={
          modalType === 'zone'
            ? selectedItem ? 'تعديل منطقة الشحن' : 'إضافة منطقة شحن جديدة'
            : selectedItem ? 'تعديل طريقة الشحن' : 'إضافة طريقة شحن جديدة'
        }
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="الاسم"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={modalType === 'zone' ? 'منطقة الشحن' : 'طريقة الشحن'}
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
              rows={3}
              placeholder="وصف مختصر"
            />
          </div>

          {modalType === 'zone' ? (
            <>
              <Input
                label="الدول (مفصولة بفواصل)"
                value={formData.countries}
                onChange={(e) => setFormData({ ...formData, countries: e.target.value })}
                placeholder="السعودية, الإمارات, الكويت"
              />
              <Input
                label="المدن (مفصولة بفواصل - اختياري)"
                value={formData.cities}
                onChange={(e) => setFormData({ ...formData, cities: e.target.value })}
                placeholder="الرياض, جدة, الدمام"
              />
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  منطقة الشحن
                </label>
                <select
                  value={formData.zoneId}
                  onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                  required
                >
                  <option value="">اختر المنطقة</option>
                  {zones.map((zone) => (
                    <option key={zone.id} value={zone.id}>{zone.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  نوع الشحن
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                >
                  <option value="flat_rate">سعر ثابت</option>
                  <option value="free">مجاني</option>
                  <option value="calculated">محسوب</option>
                  <option value="pickup">استلام شخصي</option>
                </select>
              </div>

              {formData.type !== 'free' && formData.type !== 'pickup' && (
                <Input
                  label="التكلفة (ر.س)"
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  min="0"
                  step="0.01"
                />
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="أقل مدة توصيل (أيام)"
                  type="number"
                  value={formData.minDays}
                  onChange={(e) => setFormData({ ...formData, minDays: e.target.value })}
                  min="1"
                  required
                />
                <Input
                  label="أقصى مدة توصيل (أيام)"
                  type="number"
                  value={formData.maxDays}
                  onChange={(e) => setFormData({ ...formData, maxDays: e.target.value })}
                  min="1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="الحد الأدنى للطلب (ر.س)"
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                  min="0"
                />
                <Input
                  label="أقصى وزن (كيلو)"
                  type="number"
                  value={formData.maxWeight}
                  onChange={(e) => setFormData({ ...formData, maxWeight: e.target.value })}
                  min="0"
                />
              </div>
            </>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="ml-2"
            />
            <label htmlFor="isActive" className="text-sm text-secondary-700 dark:text-secondary-300">
              {modalType === 'zone' ? 'منطقة نشطة' : 'طريقة نشطة'}
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={modalType === 'zone' ? handleSaveZone : handleSaveMethod}
              className="flex-1"
            >
              {selectedItem ? 'تحديث' : 'إنشاء'}
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

export default ShippingManagement;