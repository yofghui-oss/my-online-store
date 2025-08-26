import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, FileText, Eye, Globe, Copy } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  status: 'published' | 'draft' | 'archived';
  isSystem: boolean;
  template: 'default' | 'full-width' | 'no-sidebar' | 'contact';
  featured: boolean;
  showInMenu: boolean;
  showInFooter: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  views: number;
}

const CustomPagesManagement: React.FC = () => {
  const { currentStore } = useStore();
  const [pages, setPages] = useState<CustomPage[]>([
    {
      id: '1',
      title: 'من نحن',
      slug: 'about-us',
      content: '<h2>مرحباً بكم في متجرنا</h2><p>نحن متجر إلكتروني متخصص في تقديم أفضل المنتجات بأعلى جودة وأفضل الأسعار.</p>',
      metaTitle: 'من نحن - تعرف على قصتنا ورسالتنا',
      metaDescription: 'اكتشف قصة متجرنا ورؤيتنا ورسالتنا في تقديم أفضل المنتجات والخدمات',
      status: 'published',
      isSystem: true,
      template: 'default',
      featured: true,
      showInMenu: true,
      showInFooter: true,
      order: 1,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15',
      views: 245
    },
    {
      id: '2',
      title: 'اتصل بنا',
      slug: 'contact-us',
      content: '<h2>تواصل معنا</h2><p>نحن هنا لمساعدتك! لا تتردد في التواصل معنا.</p>',
      status: 'published',
      isSystem: true,
      template: 'contact',
      featured: false,
      showInMenu: true,
      showInFooter: true,
      order: 2,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      views: 189
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<CustomPage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    status: 'draft' as const,
    template: 'default' as const,
    featured: false,
    showInMenu: false,
    showInFooter: false,
    order: 0
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleCreatePage = () => {
    if (!formData.title || !formData.content) {
      toast.error('يرجى ملء العنوان والمحتوى');
      return;
    }

    const slug = formData.slug || generateSlug(formData.title);
    
    if (pages.some(page => page.slug === slug)) {
      toast.error('الرابط المختصر موجود بالفعل');
      return;
    }

    const newPage: CustomPage = {
      id: Date.now().toString(),
      title: formData.title,
      slug: slug,
      content: formData.content,
      metaTitle: formData.metaTitle || formData.title,
      metaDescription: formData.metaDescription,
      status: formData.status,
      isSystem: false,
      template: formData.template,
      featured: formData.featured,
      showInMenu: formData.showInMenu,
      showInFooter: formData.showInFooter,
      order: formData.order || pages.length + 1,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      views: 0
    };

    setPages([...pages, newPage]);
    toast.success('تم إنشاء الصفحة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdatePage = () => {
    if (!selectedPage) return;

    const updatedPages = pages.map(page =>
      page.id === selectedPage.id
        ? {
            ...page,
            title: formData.title,
            slug: formData.slug || generateSlug(formData.title),
            content: formData.content,
            metaTitle: formData.metaTitle,
            status: formData.status,
            template: formData.template,
            featured: formData.featured,
            showInMenu: formData.showInMenu,
            showInFooter: formData.showInFooter,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : page
    );

    setPages(updatedPages);
    toast.success('تم تحديث الصفحة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeletePage = (id: string) => {
    const page = pages.find(p => p.id === id);
    if (page?.isSystem) {
      toast.error('لا يمكن حذف الصفحات الأساسية');
      return;
    }

    if (window.confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
      setPages(pages.filter(page => page.id !== id));
      toast.success('تم حذف الصفحة بنجاح');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      status: 'draft',
      template: 'default',
      featured: false,
      showInMenu: false,
      showInFooter: false,
      order: 0
    });
    setSelectedPage(null);
  };

  const openEditModal = (page: CustomPage) => {
    setSelectedPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || '',
      status: page.status,
      template: page.template,
      featured: page.featured,
      showInMenu: page.showInMenu,
      showInFooter: page.showInFooter,
      order: page.order
    });
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'منشور';
      case 'draft': return 'مسودة';
      case 'archived': return 'مؤرشف';
      default: return 'غير محدد';
    }
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const publishedPages = pages.filter(p => p.status === 'published').length;
  const draftPages = pages.filter(p => p.status === 'draft').length;
  const totalViews = pages.reduce((sum, p) => sum + p.views, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة الصفحات المخصصة</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إنشاء وإدارة صفحات المتجر المخصصة مثل من نحن، اتصل بنا، وغيرها
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة صفحة جديدة
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي الصفحات</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{pages.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Globe className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">الصفحات المنشورة</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{publishedPages}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
              <Edit2 className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">المسودات</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{draftPages}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Eye className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي المشاهدات</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{totalViews.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
            <Input
              placeholder="البحث في الصفحات..."
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
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
            <option value="archived">مؤرشف</option>
          </select>
        </div>
      </Card>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page) => (
          <Card key={page.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                  <FileText className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                    {page.title}
                  </h3>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">
                    /{page.slug}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(page.status)}`}>
                  {getStatusLabel(page.status)}
                </span>
                {page.isSystem && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400">
                    نظام
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="text-sm text-secondary-600 dark:text-secondary-300">
                <div dangerouslySetInnerHTML={{ 
                  __html: page.content.length > 100 ? 
                    page.content.substring(0, 100).replace(/<[^>]*>/g, '') + '...' : 
                    page.content.replace(/<[^>]*>/g, '') 
                }} />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-500 dark:text-secondary-400">
                  <Eye className="h-4 w-4 inline ml-1" />
                  {page.views} مشاهدة
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {page.showInMenu && (
                  <span className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400 px-2 py-1 rounded">
                    في القائمة
                  </span>
                )}
                {page.showInFooter && (
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400 px-2 py-1 rounded">
                    في التذييل
                  </span>
                )}
              </div>

              <p className="text-xs text-secondary-500 dark:text-secondary-400">
                آخر تحديث: {new Date(page.updatedAt).toLocaleDateString('ar-SA')}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => openEditModal(page)} className="flex-1">
                <Edit2 className="h-4 w-4 ml-1" />
                تعديل
              </Button>
              {!page.isSystem && (
                <Button variant="outline" size="sm" onClick={() => handleDeletePage(page.id)}>
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
        title={selectedPage ? 'تعديل الصفحة' : 'إضافة صفحة جديدة'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="عنوان الصفحة"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (!formData.slug) {
                  setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                }
              }}
              placeholder="من نحن"
              required
            />
            <Input
              label="الرابط المختصر"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="about-us"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              محتوى الصفحة
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              rows={8}
              placeholder="محتوى الصفحة بتنسيق HTML..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                الحالة
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              >
                <option value="draft">مسودة</option>
                <option value="published">منشور</option>
                <option value="archived">مؤرشف</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                النموذج
              </label>
              <select
                value={formData.template}
                onChange={(e) => setFormData({ ...formData, template: e.target.value as any })}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              >
                <option value="default">افتراضي</option>
                <option value="full-width">عرض كامل</option>
                <option value="no-sidebar">بدون شريط جانبي</option>
                <option value="contact">صفحة اتصال</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
              خيارات العرض
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showInMenu"
                  checked={formData.showInMenu}
                  onChange={(e) => setFormData({ ...formData, showInMenu: e.target.checked })}
                  className="ml-2"
                />
                <label htmlFor="showInMenu" className="text-sm text-secondary-700 dark:text-secondary-300">
                  عرض في القائمة الرئيسية
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showInFooter"
                  checked={formData.showInFooter}
                  onChange={(e) => setFormData({ ...formData, showInFooter: e.target.checked })}
                  className="ml-2"
                />
                <label htmlFor="showInFooter" className="text-sm text-secondary-700 dark:text-secondary-300">
                  عرض في تذييل الموقع
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="ml-2"
                />
                <label htmlFor="featured" className="text-sm text-secondary-700 dark:text-secondary-300">
                  صفحة مميزة
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedPage ? handleUpdatePage : handleCreatePage}
              className="flex-1"
            >
              {selectedPage ? 'تحديث' : 'إنشاء'}
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

export default CustomPagesManagement;