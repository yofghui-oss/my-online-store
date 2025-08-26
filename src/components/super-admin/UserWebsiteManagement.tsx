import React, { useState } from 'react';
import { Globe, Search, Settings, Eye, Link2, Palette, Code, Shield } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface UserWebsite {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  domain: string;
  subdomain: string;
  title: string;
  description: string;
  theme: string;
  status: 'active' | 'suspended' | 'maintenance';
  ssl: boolean;
  customDomain?: string;
  favicon?: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  createdAt: Date;
  lastModified: Date;
  pageViews: number;
  bandwidth: number; // in MB
}

const UserWebsiteManagement: React.FC = () => {
  const [websites, setWebsites] = useState<UserWebsite[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'أحمد السالم',
      userEmail: 'ahmed@example.com',
      domain: 'ahmed-store.storebuilder.sa',
      subdomain: 'ahmed-store',
      title: 'متجر أحمد للأزياء',
      description: 'متجر متخصص في الأزياء العصرية',
      theme: 'modern',
      status: 'active',
      ssl: true,
      customDomain: 'ahmedstore.com',
      primaryColor: '#3b82f6',
      secondaryColor: '#1e40af',
      fontFamily: 'Cairo',
      createdAt: new Date('2024-01-15'),
      lastModified: new Date('2024-01-20'),
      pageViews: 12540,
      bandwidth: 2048
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'فاطمة المحمد',
      userEmail: 'fatima@example.com',
      domain: 'fatima-jewelry.storebuilder.sa',
      subdomain: 'fatima-jewelry',
      title: 'مجوهرات فاطمة',
      description: 'أجمل المجوهرات والإكسسوارات',
      theme: 'luxe',
      status: 'active',
      ssl: true,
      primaryColor: '#d97706',
      secondaryColor: '#92400e',
      fontFamily: 'Amiri',
      createdAt: new Date('2024-01-10'),
      lastModified: new Date('2024-01-18'),
      pageViews: 8930,
      bandwidth: 1536
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'محمد العتيبي',
      userEmail: 'mohammed@example.com',
      domain: 'mohammed-tech.storebuilder.sa',
      subdomain: 'mohammed-tech',
      title: 'تقنيات محمد',
      description: 'متجر الإلكترونيات والتقنية',
      theme: 'vibrant',
      status: 'maintenance',
      ssl: false,
      primaryColor: '#10b981',
      secondaryColor: '#059669',
      fontFamily: 'Tajawal',
      createdAt: new Date('2024-01-05'),
      lastModified: new Date('2024-01-12'),
      pageViews: 5670,
      bandwidth: 1024
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedWebsite, setSelectedWebsite] = useState<UserWebsite | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const themes = [
    { id: 'modern', name: 'عصري', description: 'تصميم نظيف وبسيط' },
    { id: 'luxe', name: 'فاخر', description: 'تصميم أنيق وراقي' },
    { id: 'vibrant', name: 'حيوي', description: 'تصميم ملون وجذاب' },
    { id: 'minimal', name: 'بسيط', description: 'تصميم مينيمال' }
  ];

  const fonts = [
    { id: 'Cairo', name: 'Cairo' },
    { id: 'Amiri', name: 'Amiri' },
    { id: 'Tajawal', name: 'Tajawal' },
    { id: 'Almarai', name: 'Almarai' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'suspended': return 'معلق';
      case 'maintenance': return 'صيانة';
      default: return status;
    }
  };

  const filteredWebsites = websites.filter(website => {
    const matchesSearch = 
      website.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.domain.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || website.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (websiteId: string, newStatus: UserWebsite['status']) => {
    setWebsites(websites.map(website => 
      website.id === websiteId 
        ? { ...website, status: newStatus, lastModified: new Date() }
        : website
    ));
    toast.success('تم تحديث حالة الموقع بنجاح');
  };

  const handleSettingsUpdate = (updatedWebsite: UserWebsite) => {
    setWebsites(websites.map(website => 
      website.id === updatedWebsite.id 
        ? { ...updatedWebsite, lastModified: new Date() }
        : website
    ));
    setIsSettingsModalOpen(false);
    toast.success('تم تحديث إعدادات الموقع بنجاح');
  };

  const handleViewWebsite = (website: UserWebsite) => {
    const url = website.customDomain 
      ? `https://${website.customDomain}` 
      : `https://${website.domain}`;
    window.open(url, '_blank');
  };

  const getTotalStats = () => {
    return {
      totalWebsites: websites.length,
      activeWebsites: websites.filter(w => w.status === 'active').length,
      suspendedWebsites: websites.filter(w => w.status === 'suspended').length,
      maintenanceWebsites: websites.filter(w => w.status === 'maintenance').length,
      totalPageViews: websites.reduce((sum, w) => sum + w.pageViews, 0),
      totalBandwidth: websites.reduce((sum, w) => sum + w.bandwidth, 0)
    };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة مواقع المستخدمين</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إدارة وتخصيص مواقع العملاء</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">{stats.totalWebsites}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي المواقع</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{stats.activeWebsites}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">نشط</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">{stats.suspendedWebsites}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">معلق</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-yellow-600">{stats.maintenanceWebsites}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">صيانة</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.totalPageViews.toLocaleString()}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي المشاهدات</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600">{(stats.totalBandwidth / 1024).toFixed(1)} GB</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">استهلاك البيانات</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
              <Input
                placeholder="البحث بالموقع، المالك أو النطاق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg 
                        bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="suspended">معلق</option>
              <option value="maintenance">صيانة</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Websites Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWebsites.map((website) => (
          <Card key={website.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: website.primaryColor }}
                >
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">{website.title}</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300">{website.userName}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(website.status)}`}>
                {getStatusText(website.status)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Link2 size={14} className="text-secondary-400" />
                <span className="text-secondary-600 dark:text-secondary-300 truncate">
                  {website.customDomain || website.domain}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Palette size={14} className="text-secondary-400" />
                <span className="text-secondary-600 dark:text-secondary-300">
                  {themes.find(t => t.id === website.theme)?.name || website.theme}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield size={14} className="text-secondary-400" />
                <span className={`text-sm ${website.ssl ? 'text-green-600' : 'text-red-600'}`}>
                  {website.ssl ? 'SSL مفعل' : 'SSL غير مفعل'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-secondary-500">المشاهدات:</span>
                <span className="font-medium text-secondary-900 dark:text-white ml-2">
                  {website.pageViews.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-secondary-500">البيانات:</span>
                <span className="font-medium text-secondary-900 dark:text-white ml-2">
                  {(website.bandwidth / 1024).toFixed(1)} GB
                </span>
              </div>
            </div>

            <div className="text-xs text-secondary-500 dark:text-secondary-400 mb-4">
              آخر تعديل: {website.lastModified.toLocaleDateString('ar-SA')}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleViewWebsite(website)}
              >
                <Eye size={14} className="ml-1" />
                عرض
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedWebsite(website);
                  setIsSettingsModalOpen(true);
                }}
              >
                <Settings size={14} className="ml-1" />
                إعدادات
              </Button>
              <div className="relative">
                <select
                  value={website.status}
                  onChange={(e) => handleStatusUpdate(website.id, e.target.value as UserWebsite['status'])}
                  className="text-xs p-2 border border-secondary-300 dark:border-secondary-600 rounded 
                            bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                >
                  <option value="active">نشط</option>
                  <option value="suspended">معلق</option>
                  <option value="maintenance">صيانة</option>
                </select>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Website Settings Modal */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title={`إعدادات موقع - ${selectedWebsite?.title}`}
      >
        {selectedWebsite && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="عنوان الموقع"
                value={selectedWebsite.title}
                onChange={(e) => setSelectedWebsite({ ...selectedWebsite, title: e.target.value })}
              />
              <Input
                label="النطاق الفرعي"
                value={selectedWebsite.subdomain}
                onChange={(e) => setSelectedWebsite({ ...selectedWebsite, subdomain: e.target.value })}
              />
              <Input
                label="النطاق المخصص"
                value={selectedWebsite.customDomain || ''}
                onChange={(e) => setSelectedWebsite({ ...selectedWebsite, customDomain: e.target.value })}
                placeholder="example.com"
              />
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  القالب
                </label>
                <select
                  value={selectedWebsite.theme}
                  onChange={(e) => setSelectedWebsite({ ...selectedWebsite, theme: e.target.value })}
                  className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
                >
                  {themes.map(theme => (
                    <option key={theme.id} value={theme.id}>{theme.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                الوصف
              </label>
              <textarea
                value={selectedWebsite.description}
                onChange={(e) => setSelectedWebsite({ ...selectedWebsite, description: e.target.value })}
                className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="اللون الأساسي"
                type="color"
                value={selectedWebsite.primaryColor}
                onChange={(e) => setSelectedWebsite({ ...selectedWebsite, primaryColor: e.target.value })}
              />
              <Input
                label="اللون الثانوي"
                type="color"
                value={selectedWebsite.secondaryColor}
                onChange={(e) => setSelectedWebsite({ ...selectedWebsite, secondaryColor: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  الخط
                </label>
                <select
                  value={selectedWebsite.fontFamily}
                  onChange={(e) => setSelectedWebsite({ ...selectedWebsite, fontFamily: e.target.value })}
                  className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
                >
                  {fonts.map(font => (
                    <option key={font.id} value={font.id}>{font.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ssl"
                checked={selectedWebsite.ssl}
                onChange={(e) => setSelectedWebsite({ ...selectedWebsite, ssl: e.target.checked })}
              />
              <label htmlFor="ssl" className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                تفعيل شهادة SSL
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-secondary-200 dark:border-secondary-600">
              <Button variant="outline" onClick={() => setIsSettingsModalOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => handleSettingsUpdate(selectedWebsite)}>
                حفظ التغييرات
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserWebsiteManagement;