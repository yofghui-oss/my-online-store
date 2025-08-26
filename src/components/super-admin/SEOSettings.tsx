import React, { useState } from 'react';
import { Search, Globe, Settings, Save, Plus, Edit2, Trash2, BarChart3 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface SEOConfig {
  id: string;
  type: 'platform' | 'store';
  storeId?: string;
  storeName?: string;
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  robots: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  sitemapEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

const SEOSettings: React.FC = () => {
  const [seoConfigs, setSeoConfigs] = useState<SEOConfig[]>([
    {
      id: '1',
      type: 'platform',
      title: 'منصة المتاجر الإلكترونية - أنشئ متجرك الآن',
      description: 'منصة شاملة لإنشاء وإدارة المتاجر الإلكترونية بسهولة. ابدأ تجارتك الإلكترونية اليوم.',
      keywords: ['متجر إلكتروني', 'تجارة إلكترونية', 'منصة تجارية'],
      canonicalUrl: 'https://platform.example.com',
      robots: 'index, follow',
      googleAnalyticsId: 'GA-123456789',
      facebookPixelId: 'FB-123456789',
      sitemapEnabled: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    }
  ]);

  const [stores] = useState([
    { id: 'store_1', name: 'متجر التقنية', domain: 'tech-store.example.com', hasSEOConfig: false },
    { id: 'store_2', name: 'متجر الأزياء', domain: 'fashion-store.example.com', hasSEOConfig: false }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<SEOConfig | null>(null);
  const [activeTab, setActiveTab] = useState<'platform' | 'stores' | 'analytics'>('platform');

  const [formData, setFormData] = useState<{
    type: 'platform' | 'store';
    storeId: string;
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
    robots: string;
    googleAnalyticsId: string;
    facebookPixelId: string;
    sitemapEnabled: boolean;
  }>({
    type: 'platform' as const,
    storeId: '',
    title: '',
    description: '',
    keywords: '',
    canonicalUrl: '',
    robots: 'index, follow',
    googleAnalyticsId: '',
    facebookPixelId: '',
    sitemapEnabled: true
  });

  const handleCreateConfig = () => {
    if (!formData.title || !formData.description) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newConfig: SEOConfig = {
      id: Date.now().toString(),
      type: formData.type,
      storeId: formData.type === 'store' ? formData.storeId : undefined,
      storeName: formData.type === 'store' ? stores.find(s => s.id === formData.storeId)?.name : undefined,
      title: formData.title,
      description: formData.description,
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
      canonicalUrl: formData.canonicalUrl,
      robots: formData.robots,
      googleAnalyticsId: formData.googleAnalyticsId,
      facebookPixelId: formData.facebookPixelId,
      sitemapEnabled: formData.sitemapEnabled,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setSeoConfigs([...seoConfigs, newConfig]);
    toast.success('تم حفظ إعدادات السيو بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteConfig = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف إعدادات السيو؟')) {
      setSeoConfigs(seoConfigs.filter(config => config.id !== id));
      toast.success('تم حذف إعدادات السيو بنجاح');
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'platform',
      storeId: '',
      title: '',
      description: '',
      keywords: '',
      canonicalUrl: '',
      robots: 'index, follow',
      googleAnalyticsId: '',
      facebookPixelId: '',
      sitemapEnabled: true
    });
    setSelectedConfig(null);
  };

  const openEditModal = (config: SEOConfig) => {
    setSelectedConfig(config);
    setFormData({
      type: config.type as 'platform' | 'store',
      storeId: config.storeId || '',
      title: config.title,
      description: config.description,
      keywords: config.keywords.join(', '),
      canonicalUrl: config.canonicalUrl,
      robots: config.robots,
      googleAnalyticsId: config.googleAnalyticsId || '',
      facebookPixelId: config.facebookPixelId || '',
      sitemapEnabled: config.sitemapEnabled
    });
    setIsModalOpen(true);
  };

  const platformConfig = seoConfigs.find(config => config.type === 'platform');
  const storeConfigs = seoConfigs.filter(config => config.type === 'store');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إعدادات السيو</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة إعدادات تحسين محركات البحث للمنصة والمتاجر
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة إعدادات سيو
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex gap-8">
          {[
            { id: 'platform', label: 'المنصة الأساسية', icon: Globe },
            { id: 'stores', label: 'المتاجر', icon: Settings },
            { id: 'analytics', label: 'التحليلات', icon: BarChart3 }
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

      {/* Platform Tab */}
      {activeTab === 'platform' && (
        <div className="space-y-6">
          {platformConfig ? (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary-500" />
                  <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
                    إعدادات سيو المنصة الأساسية
                  </h2>
                </div>
                <Button variant="outline" size="sm" onClick={() => openEditModal(platformConfig)}>
                  <Edit2 className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      العنوان الأساسي
                    </h3>
                    <p className="text-sm text-secondary-900 dark:text-white bg-secondary-50 dark:bg-secondary-800 p-3 rounded">
                      {platformConfig.title}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      الوصف
                    </h3>
                    <p className="text-sm text-secondary-900 dark:text-white bg-secondary-50 dark:bg-secondary-800 p-3 rounded">
                      {platformConfig.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      الكلمات المفتاحية
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {platformConfig.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-400 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      الرابط الأساسي
                    </h3>
                    <p className="text-sm text-secondary-900 dark:text-white bg-secondary-50 dark:bg-secondary-800 p-3 rounded">
                      {platformConfig.canonicalUrl}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      إعدادات الفهرسة
                    </h3>
                    <p className="text-sm text-secondary-900 dark:text-white bg-secondary-50 dark:bg-secondary-800 p-3 rounded">
                      {platformConfig.robots}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      أدوات التحليل
                    </h3>
                    <div className="space-y-2 text-sm">
                      {platformConfig.googleAnalyticsId && (
                        <div className="flex justify-between">
                          <span>Google Analytics:</span>
                          <span className="font-mono text-xs">{platformConfig.googleAnalyticsId}</span>
                        </div>
                      )}
                      {platformConfig.facebookPixelId && (
                        <div className="flex justify-between">
                          <span>Facebook Pixel:</span>
                          <span className="font-mono text-xs">{platformConfig.facebookPixelId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <Globe className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                لا توجد إعدادات سيو للمنصة
              </h3>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 ml-2" />
                إضافة إعدادات سيو
              </Button>
            </Card>
          )}
        </div>
      )}

      {/* Stores Tab */}
      {activeTab === 'stores' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => {
            const storeConfig = storeConfigs.find(config => config.storeId === store.id);
            
            return (
              <Card key={store.id} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="h-8 w-8 text-primary-500" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {store.name}
                    </h3>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      {store.domain}
                    </p>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      store.hasSEOConfig
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400'
                    }`}
                  >
                    {store.hasSEOConfig ? 'مُعد' : 'غير مُعد'}
                  </span>
                </div>

                {storeConfig ? (
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">العنوان:</p>
                      <p className="text-sm text-secondary-900 dark:text-white truncate">
                        {storeConfig.title}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(storeConfig)} className="flex-1">
                        <Edit2 className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteConfig(storeConfig.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setFormData({ ...formData, type: 'store', storeId: store.id });
                      setIsModalOpen(true);
                    }}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    إعداد السيو
                  </Button>
                )}
              </Card>
            );
          })}
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
                <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي الإعدادات</p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">{seoConfigs.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <Settings className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">المتاجر المُعدة</p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {stores.filter(s => s.hasSEOConfig).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                <Search className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">Sitemaps نشطة</p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {seoConfigs.filter(c => c.sitemapEnabled).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">أدوات التحليل</p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {seoConfigs.filter(c => c.googleAnalyticsId).length}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={selectedConfig ? 'تعديل إعدادات السيو' : 'إضافة إعدادات سيو جديدة'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                النوع
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'platform' | 'store' })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                disabled={!!selectedConfig}
              >
                <option value="platform">المنصة الأساسية</option>
                <option value="store">متجر</option>
              </select>
            </div>
            {formData.type === 'store' && (
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  المتجر
                </label>
                <select
                  value={formData.storeId}
                  onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                >
                  <option value="">اختر المتجر</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>{store.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <Input
            label="العنوان (Title)"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="أدخل عنوان الصفحة"
            required
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الوصف (Meta Description)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              rows={3}
              placeholder="وصف الصفحة لمحركات البحث (160 حرف كحد أقصى)"
              maxLength={160}
              required
            />
            <p className="text-xs text-secondary-500 mt-1">{formData.description.length}/160 حرف</p>
          </div>

          <Input
            label="الكلمات المفتاحية (مفصولة بفواصل)"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            placeholder="متجر إلكتروني, تجارة إلكترونية, أونلاين"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="الرابط الأساسي (Canonical URL)"
              value={formData.canonicalUrl}
              onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
              placeholder="https://example.com"
            />
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                إعدادات الروبوت
              </label>
              <select
                value={formData.robots}
                onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              >
                <option value="index, follow">index, follow</option>
                <option value="index, nofollow">index, nofollow</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Google Analytics ID"
              value={formData.googleAnalyticsId}
              onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
              placeholder="GA-XXXXXXXXX"
            />
            <Input
              label="Facebook Pixel ID"
              value={formData.facebookPixelId}
              onChange={(e) => setFormData({ ...formData, facebookPixelId: e.target.value })}
              placeholder="123456789"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="sitemapEnabled"
              checked={formData.sitemapEnabled}
              onChange={(e) => setFormData({ ...formData, sitemapEnabled: e.target.checked })}
              className="h-4 w-4 text-primary-600 rounded border-secondary-300 focus:ring-primary-500"
            />
            <label htmlFor="sitemapEnabled" className="mr-2 text-sm text-secondary-700 dark:text-secondary-300">
              تفعيل Sitemap
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleCreateConfig} className="flex-1">
              <Save className="h-4 w-4 ml-2" />
              حفظ
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

export default SEOSettings;