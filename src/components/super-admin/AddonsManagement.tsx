import React, { useState } from 'react';
import { Puzzle, Plus, Download, Star, Eye, Trash2, Upload, Shield, Search } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Addon {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: 'payment' | 'shipping' | 'marketing' | 'analytics' | 'security' | 'design';
  price: number;
  rating: number;
  downloads: number;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  features: string[];
}

const AddonsManagement: React.FC = () => {
  const [addons, setAddons] = useState<Addon[]>([
    {
      id: '1',
      name: 'محفظة مدى',
      description: 'إضافة دفع متقدمة لمحافظ مدى والبطاقات السعودية',
      version: '2.1.0',
      author: 'مطوري التقنية',
      category: 'payment',
      price: 299,
      rating: 4.8,
      downloads: 1250,
      status: 'active',
      features: ['دعم مدى', 'محافظ رقمية', 'أمان عالي', 'تقارير مفصلة']
    },
    {
      id: '2',
      name: 'شحن سريع',
      description: 'حلول شحن متقدمة مع تتبع الطلبات والإشعارات التلقائية',
      version: '1.5.2',
      author: 'فريق الشحن',
      category: 'shipping',
      price: 199,
      rating: 4.6,
      downloads: 890,
      status: 'active',
      features: ['تتبع مباشر', 'شركات شحن متعددة', 'إشعارات SMS', 'حاسبة تكلفة']
    },
    {
      id: '3',
      name: 'تسويق ذكي',
      description: 'أدوات تسويق متقدمة مع تحليلات ذكية وحملات تلقائية',
      version: '3.0.1',
      author: 'وكالة التسويق الرقمي',
      category: 'marketing',
      price: 399,
      rating: 4.9,
      downloads: 2100,
      status: 'pending',
      features: ['حملات تلقائية', 'تحليلات متقدمة', 'A/B Testing', 'تجزئة العملاء']
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState<Addon | null>(null);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'upload'>('marketplace');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    version: '',
    author: '',
    category: 'payment' as const,
    price: '',
    features: ''
  });

  const categories = [
    { value: 'payment', label: 'الدفع' },
    { value: 'shipping', label: 'الشحن' },
    { value: 'marketing', label: 'التسويق' },
    { value: 'analytics', label: 'التحليلات' },
    { value: 'security', label: 'الأمان' },
    { value: 'design', label: 'التصميم' }
  ];

  const handleCreateAddon = () => {
    if (!formData.name || !formData.description || !formData.version) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newAddon: Addon = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      version: formData.version,
      author: formData.author,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      rating: 0,
      downloads: 0,
      status: 'pending',
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    setAddons([...addons, newAddon]);
    toast.success('تم رفع الإضافة بنجاح وهي قيد المراجعة');
    setIsModalOpen(false);
    resetForm();
  };

  const handleApproveAddon = (id: string) => {
    const updatedAddons = addons.map(addon =>
      addon.id === id ? { ...addon, status: 'active' as const } : addon
    );
    setAddons(updatedAddons);
    toast.success('تم الموافقة على الإضافة');
  };

  const handleRejectAddon = (id: string) => {
    const updatedAddons = addons.map(addon =>
      addon.id === id ? { ...addon, status: 'rejected' as const } : addon
    );
    setAddons(updatedAddons);
    toast.success('تم رفض الإضافة');
  };

  const handleDeleteAddon = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الإضافة؟')) {
      setAddons(addons.filter(addon => addon.id !== id));
      toast.success('تم حذف الإضافة بنجاح');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      version: '',
      author: '',
      category: 'payment',
      price: '',
      features: ''
    });
    setSelectedAddon(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'payment':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400';
      case 'shipping':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'marketing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  const filteredAddons = addons.filter(addon =>
    addon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    addon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-secondary-300'
            }`}
          />
        ))}
        <span className="text-sm text-secondary-600 dark:text-secondary-300 ml-1">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة الإضافات</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة سوق الإضافات والمكونات الإضافية
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          رفع إضافة جديدة
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex gap-8">
          {[
            { id: 'marketplace', label: 'السوق', icon: Puzzle },
            { id: 'upload', label: 'رفع إضافة', icon: Upload }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Marketplace Tab */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
            <Input
              placeholder="البحث في الإضافات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* Addons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAddons.map((addon) => (
              <Card key={addon.id} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Puzzle className="h-8 w-8 text-primary-500" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {addon.name}
                    </h3>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      بواسطة {addon.author}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(addon.category)}`}>
                      {categories.find(c => c.value === addon.category)?.label}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(addon.status)}`}>
                      {addon.status === 'active' && 'نشط'}
                      {addon.status === 'pending' && 'قيد المراجعة'}
                      {addon.status === 'rejected' && 'مرفوض'}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-4">
                  {addon.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {addon.price === 0 ? 'مجاني' : `${addon.price} ر.س`}
                    </span>
                    <span className="text-sm text-secondary-500 dark:text-secondary-400">
                      v{addon.version}
                    </span>
                  </div>
                  
                  {renderStars(addon.rating)}

                  <div className="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400">
                    <span>{addon.downloads} تحميل</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {addon.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {addon.features.length > 2 && (
                      <span className="text-xs text-secondary-500 dark:text-secondary-400">
                        +{addon.features.length - 2} أخرى
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAddon(addon)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 ml-1" />
                    عرض
                  </Button>
                  {addon.status === 'pending' && (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleApproveAddon(addon.id)}
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRejectAddon(addon.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {addon.status !== 'pending' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAddon(addon.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            رفع إضافة جديدة
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="اسم الإضافة"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم الإضافة"
                required
              />
              <Input
                label="الإصدار"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="1.0.0"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="اسم المطور"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="أدخل اسم المطور"
                required
              />
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  الفئة
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <Input
              label="السعر (ر.س)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0"
            />

            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                الوصف
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                rows={4}
                placeholder="وصف مفصل للإضافة وميزاتها..."
                required
              />
            </div>

            <Input
              label="الميزات (مفصولة بفواصل)"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="ميزة 1, ميزة 2, ميزة 3"
            />

            <div className="border-2 border-dashed border-secondary-300 dark:border-secondary-600 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
              <p className="text-secondary-600 dark:text-secondary-300 mb-2">
                اسحب وأفلت ملف الإضافة هنا أو انقر للاختيار
              </p>
              <Button variant="outline" className="mt-4">
                اختيار ملف
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCreateAddon} className="flex-1">
                رفع الإضافة
              </Button>
              <Button variant="outline" onClick={resetForm} className="flex-1">
                إعادة تعيين
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Addon Details Modal */}
      {selectedAddon && (
        <Modal
          isOpen={!!selectedAddon}
          onClose={() => setSelectedAddon(null)}
          title={selectedAddon.name}
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Puzzle className="h-16 w-16 text-primary-500" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                  {selectedAddon.name}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  بواسطة {selectedAddon.author} • الإصدار {selectedAddon.version}
                </p>
                {renderStars(selectedAddon.rating)}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {selectedAddon.price === 0 ? 'مجاني' : `${selectedAddon.price} ر.س`}
                </p>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                  {selectedAddon.downloads} تحميل
                </p>
              </div>
            </div>

            <p className="text-secondary-700 dark:text-secondary-300">
              {selectedAddon.description}
            </p>

            <div>
              <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">الميزات</h4>
              <ul className="space-y-1">
                {selectedAddon.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-secondary-700 dark:text-secondary-300">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1">
                <Download className="h-4 w-4 ml-2" />
                تحميل الإضافة
              </Button>
              <Button variant="outline" onClick={() => setSelectedAddon(null)}>
                إغلاق
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title="رفع إضافة جديدة"
      >
        <div className="space-y-4">
          <Input
            label="اسم الإضافة"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="أدخل اسم الإضافة"
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
              placeholder="وصف الإضافة..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={handleCreateAddon} className="flex-1">
              رفع الإضافة
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

export default AddonsManagement;