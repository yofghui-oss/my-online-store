import React, { useState } from 'react';
import { Globe, Plus, Search, DollarSign, Eye, Edit2, Trash2, ExternalLink, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Domain {
  id: string;
  name: string;
  extension: string;
  price: number;
  category: 'premium' | 'standard' | 'expired';
  status: 'available' | 'sold' | 'reserved' | 'pending';
  description?: string;
  keywords: string[];
  registrar: string;
  expiryDate?: string;
  listedDate: string;
  views: number;
  inquiries: number;
}

interface DomainSale {
  id: string;
  domainId: string;
  domainName: string;
  buyerEmail: string;
  buyerName: string;
  salePrice: number;
  saleDate: string;
  status: 'completed' | 'pending' | 'cancelled';
  commission: number;
}

const DomainSeller: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: '1',
      name: 'tech-store',
      extension: '.com',
      price: 5000,
      category: 'premium',
      status: 'available',
      description: 'نطاق مثالي للمتاجر التقنية والإلكترونية',
      keywords: ['tech', 'store', 'technology', 'shop'],
      registrar: 'GoDaddy',
      expiryDate: '2025-12-15',
      listedDate: '2024-01-15',
      views: 234,
      inquiries: 12
    },
    {
      id: '2',
      name: 'fashion-hub',
      extension: '.com',
      price: 3500,
      category: 'standard',
      status: 'available',
      description: 'نطاق مناسب لمتاجر الأزياء والموضة',
      keywords: ['fashion', 'clothing', 'style', 'hub'],
      registrar: 'Namecheap',
      expiryDate: '2025-08-20',
      listedDate: '2024-01-10',
      views: 189,
      inquiries: 8
    },
    {
      id: '3',
      name: 'food-delivery',
      extension: '.net',
      price: 2800,
      category: 'standard',
      status: 'sold',
      description: 'نطاق للخدمات توصيل الطعام',
      keywords: ['food', 'delivery', 'restaurant', 'order'],
      registrar: 'GoDaddy',
      listedDate: '2024-01-05',
      views: 156,
      inquiries: 15
    }
  ]);

  const [sales, setSales] = useState<DomainSale[]>([
    {
      id: '1',
      domainId: '3',
      domainName: 'food-delivery.net',
      buyerEmail: 'buyer@example.com',
      buyerName: 'أحمد محمد',
      salePrice: 2800,
      saleDate: '2024-01-18',
      status: 'completed',
      commission: 280
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [activeTab, setActiveTab] = useState<'domains' | 'sales' | 'analytics'>('domains');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [formData, setFormData] = useState({
    name: '',
    extension: '.com',
    price: '',
    category: 'standard' as const,
    description: '',
    keywords: '',
    registrar: '',
    expiryDate: ''
  });

  const extensions = ['.com', '.net', '.org', '.io', '.co', '.me', '.app', '.tech'];
  const registrars = ['GoDaddy', 'Namecheap', 'Google Domains', 'Cloudflare', 'Name.com'];

  const handleCreateDomain = () => {
    if (!formData.name || !formData.price) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newDomain: Domain = {
      id: Date.now().toString(),
      name: formData.name,
      extension: formData.extension,
      price: parseFloat(formData.price),
      category: formData.category,
      status: 'available',
      description: formData.description,
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
      registrar: formData.registrar,
      expiryDate: formData.expiryDate,
      listedDate: new Date().toISOString().split('T')[0],
      views: 0,
      inquiries: 0
    };

    setDomains([...domains, newDomain]);
    toast.success('تم إضافة النطاق بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateDomain = () => {
    if (!selectedDomain) return;

    const updatedDomains = domains.map(domain =>
      domain.id === selectedDomain.id
        ? {
            ...domain,
            name: formData.name,
            extension: formData.extension,
            price: parseFloat(formData.price),
            category: formData.category,
            description: formData.description,
            keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
            registrar: formData.registrar,
            expiryDate: formData.expiryDate
          }
        : domain
    );

    setDomains(updatedDomains);
    toast.success('تم تحديث النطاق بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteDomain = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا النطاق؟')) {
      setDomains(domains.filter(domain => domain.id !== id));
      toast.success('تم حذف النطاق بنجاح');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      extension: '.com',
      price: '',
      category: 'standard',
      description: '',
      keywords: '',
      registrar: '',
      expiryDate: ''
    });
    setSelectedDomain(null);
  };

  const openEditModal = (domain: Domain) => {
    setSelectedDomain(domain);
    setFormData({
      name: domain.name,
      extension: domain.extension,
      price: domain.price.toString(),
      category: domain.category as 'standard',
      description: domain.description || '',
      keywords: domain.keywords.join(', '),
      registrar: domain.registrar,
      expiryDate: domain.expiryDate || ''
    });
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'sold':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      case 'pending':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400';
      case 'standard':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         domain.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || domain.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.salePrice, 0);
  const totalCommission = sales.reduce((sum, sale) => sum + sale.commission, 0);
  const averagePrice = domains.length > 0 ? domains.reduce((sum, domain) => sum + domain.price, 0) / domains.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">بائع النطاقات</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة سوق النطاقات والمبيعات
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة نطاق جديد
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex gap-8">
          {[
            { id: 'domains', label: 'النطاقات', icon: Globe },
            { id: 'sales', label: 'المبيعات', icon: DollarSign },
            { id: 'analytics', label: 'التحليلات', icon: Eye }
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

      {/* Domains Tab */}
      {activeTab === 'domains' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
                <Input
                  placeholder="البحث في النطاقات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
            >
              <option value="all">جميع الفئات</option>
              <option value="premium">مميز</option>
              <option value="standard">عادي</option>
              <option value="expired">منتهي الصلاحية</option>
            </select>
          </div>

          {/* Domains Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDomains.map((domain) => (
              <Card key={domain.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary-500" />
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {domain.name}{domain.extension}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(domain.category)}`}>
                      {domain.category === 'premium' && 'مميز'}
                      {domain.category === 'standard' && 'عادي'}
                      {domain.category === 'expired' && 'منتهي'}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(domain.status)}`}>
                      {domain.status === 'available' && 'متاح'}
                      {domain.status === 'sold' && 'مُباع'}
                      {domain.status === 'reserved' && 'محجوز'}
                      {domain.status === 'pending' && 'معلق'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {domain.price.toLocaleString()} ر.س
                    </p>
                  </div>
                  {domain.description && (
                    <p className="text-sm text-secondary-600 dark:text-secondary-300">
                      {domain.description}
                    </p>
                  )}
                  <div>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">الكلمات المفتاحية:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {domain.keywords.slice(0, 3).map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                      {domain.keywords.length > 3 && (
                        <span className="text-xs text-secondary-500 dark:text-secondary-400">
                          +{domain.keywords.length - 3} أخرى
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-secondary-500 dark:text-secondary-400">المشاهدات:</p>
                      <p className="font-semibold text-secondary-900 dark:text-white">{domain.views}</p>
                    </div>
                    <div>
                      <p className="text-secondary-500 dark:text-secondary-400">الاستفسارات:</p>
                      <p className="font-semibold text-secondary-900 dark:text-white">{domain.inquiries}</p>
                    </div>
                  </div>
                  {domain.expiryDate && (
                    <div>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">انتهاء الصلاحية:</p>
                      <p className="text-sm text-secondary-900 dark:text-white">
                        {new Date(domain.expiryDate).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(domain)}
                    className="flex-1"
                  >
                    <Edit2 className="h-4 w-4 ml-1" />
                    تعديل
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://${domain.name}${domain.extension}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteDomain(domain.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Sales Tab */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              سجل المبيعات
            </h3>
            <div className="space-y-4">
              {sales.length === 0 ? (
                <div className="text-center py-8 text-secondary-500 dark:text-secondary-400">
                  لا توجد مبيعات حتى الآن
                </div>
              ) : (
                sales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {sale.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : sale.status === 'pending' ? (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-secondary-900 dark:text-white">
                          {sale.domainName}
                        </p>
                        <p className="text-sm text-secondary-600 dark:text-secondary-300">
                          المشتري: {sale.buyerName} - {sale.buyerEmail}
                        </p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400">
                          {new Date(sale.saleDate).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {sale.salePrice.toLocaleString()} ر.س
                      </p>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">
                        العمولة: {sale.commission.toLocaleString()} ر.س
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Globe className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي النطاقات</p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">{domains.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">النطاقات المباعة</p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {domains.filter(d => d.status === 'sold').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {totalRevenue.toLocaleString()} ر.س
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                <Eye className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">متوسط السعر</p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {averagePrice.toLocaleString()} ر.س
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Create/Edit Domain Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={selectedDomain ? 'تعديل النطاق' : 'إضافة نطاق جديد'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="اسم النطاق"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="example"
              required
            />
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                الامتداد
              </label>
              <select
                value={formData.extension}
                onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              >
                {extensions.map((ext) => (
                  <option key={ext} value={ext}>{ext}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="السعر (ر.س)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0"
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
                <option value="standard">عادي</option>
                <option value="premium">مميز</option>
                <option value="expired">منتهي الصلاحية</option>
              </select>
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
              placeholder="وصف النطاق..."
            />
          </div>

          <Input
            label="الكلمات المفتاحية (مفصولة بفواصل)"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            placeholder="tech, store, online, shop"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                المسجل
              </label>
              <select
                value={formData.registrar}
                onChange={(e) => setFormData({ ...formData, registrar: e.target.value })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              >
                <option value="">اختر المسجل</option>
                {registrars.map((registrar) => (
                  <option key={registrar} value={registrar}>{registrar}</option>
                ))}
              </select>
            </div>
            <Input
              label="تاريخ انتهاء الصلاحية"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedDomain ? handleUpdateDomain : handleCreateDomain}
              className="flex-1"
            >
              {selectedDomain ? 'تحديث' : 'إضافة'}
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

export default DomainSeller;