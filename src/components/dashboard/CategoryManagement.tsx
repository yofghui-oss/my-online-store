import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, FolderPlus, Folder, Image, Save, X } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  storeId: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
  createdAt: string;
}

const CategoryManagement: React.FC = () => {
  const { currentStore, categories: storeCategories } = useStore();
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'إلكترونيات',
      description: 'جميع الأجهزة الإلكترونية والتقنية',
      image: '/api/placeholder/150/150',
      storeId: currentStore?.id || '',
      isActive: true,
      sortOrder: 1,
      productCount: 25,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'هواتف ذكية',
      description: 'الهواتف الذكية والاكسسوارات',
      image: '/api/placeholder/150/150',
      storeId: currentStore?.id || '',
      parentId: '1',
      isActive: true,
      sortOrder: 1,
      productCount: 12,
      createdAt: '2024-01-16'
    },
    {
      id: '3',
      name: 'ملابس',
      description: 'ملابس رجالية ونسائية وأطفال',
      image: '/api/placeholder/150/150',
      storeId: currentStore?.id || '',
      isActive: true,
      sortOrder: 2,
      productCount: 45,
      createdAt: '2024-01-17'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    parentId: '',
    isActive: true,
    sortOrder: 1
  });

  const handleCreateCategory = () => {
    if (!formData.name.trim()) {
      toast.error('يرجى إدخال اسم الفئة');
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      image: formData.image || '/api/placeholder/150/150',
      storeId: currentStore?.id || '',
      parentId: formData.parentId || undefined,
      isActive: formData.isActive,
      sortOrder: formData.sortOrder,
      productCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCategories([...categories, newCategory]);
    toast.success('تم إنشاء الفئة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateCategory = () => {
    if (!selectedCategory) return;

    const updatedCategories = categories.map(category =>
      category.id === selectedCategory.id
        ? {
            ...category,
            name: formData.name,
            description: formData.description,
            image: formData.image || category.image,
            parentId: formData.parentId || undefined,
            isActive: formData.isActive,
            sortOrder: formData.sortOrder
          }
        : category
    );

    setCategories(updatedCategories);
    toast.success('تم تحديث الفئة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    const hasSubcategories = categories.some(c => c.parentId === id);
    
    if (hasSubcategories) {
      toast.error('لا يمكن حذف فئة تحتوي على فئات فرعية');
      return;
    }

    if (category && category.productCount > 0) {
      if (!window.confirm(`هذه الفئة تحتوي على ${category.productCount} منتج. هل أنت متأكد من الحذف؟`)) {
        return;
      }
    }

    setCategories(categories.filter(category => category.id !== id));
    toast.success('تم حذف الفئة بنجاح');
  };

  const handleToggleStatus = (id: string) => {
    const updatedCategories = categories.map(category =>
      category.id === id ? { ...category, isActive: !category.isActive } : category
    );
    setCategories(updatedCategories);
    toast.success('تم تحديث حالة الفئة');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      parentId: '',
      isActive: true,
      sortOrder: 1
    });
    setSelectedCategory(null);
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      parentId: category.parentId || '',
      isActive: category.isActive,
      sortOrder: category.sortOrder
    });
    setIsModalOpen(true);
  };

  const openCreateModal = (parentId?: string) => {
    resetForm();
    if (parentId) {
      setFormData(prev => ({ ...prev, parentId }));
    }
    setIsModalOpen(true);
  };

  const getParentCategories = () => {
    return categories.filter(category => !category.parentId);
  };

  const getSubcategories = (parentId: string) => {
    return categories.filter(category => category.parentId === parentId);
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActiveFilter = !showOnlyActive || category.isActive;
    return matchesSearch && matchesActiveFilter;
  });

  const parentCategories = getParentCategories().filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActiveFilter = !showOnlyActive || category.isActive;
    return matchesSearch && matchesActiveFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة فئات المنتجات</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            تنظيم وإدارة فئات المنتجات في متجرك
          </p>
        </div>
        <Button onClick={() => openCreateModal()}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة فئة جديدة
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
            <Input
              placeholder="البحث في الفئات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="activeOnly"
              checked={showOnlyActive}
              onChange={(e) => setShowOnlyActive(e.target.checked)}
              className="ml-2"
            />
            <label htmlFor="activeOnly" className="text-sm text-secondary-700 dark:text-secondary-300">
              الفئات النشطة فقط
            </label>
          </div>
        </div>
      </Card>

      {/* Categories List */}
      <div className="space-y-4">
        {parentCategories.map((parentCategory) => (
          <Card key={parentCategory.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={parentCategory.image}
                  alt={parentCategory.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-primary-500" />
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {parentCategory.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        parentCategory.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                      }`}
                    >
                      {parentCategory.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300">
                    {parentCategory.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-secondary-500 dark:text-secondary-400">
                    <span>{parentCategory.productCount} منتج</span>
                    <span>ترتيب: {parentCategory.sortOrder}</span>
                    <span>تاريخ الإنشاء: {new Date(parentCategory.createdAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => openCreateModal(parentCategory.id)}>
                  <FolderPlus className="h-4 w-4 ml-1" />
                  فئة فرعية
                </Button>
                <Button variant="outline" size="sm" onClick={() => openEditModal(parentCategory)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={parentCategory.isActive ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleToggleStatus(parentCategory.id)}
                >
                  {parentCategory.isActive ? 'إلغاء تفعيل' : 'تفعيل'}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteCategory(parentCategory.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            {/* Subcategories */}
            {getSubcategories(parentCategory.id).length > 0 && (
              <div className="mt-4 pl-8 border-r-2 border-secondary-200 dark:border-secondary-700">
                <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                  الفئات الفرعية
                </h4>
                <div className="space-y-2">
                  {getSubcategories(parentCategory.id).map((subCategory) => (
                    <div
                      key={subCategory.id}
                      className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={subCategory.image}
                          alt={subCategory.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-secondary-900 dark:text-white">
                              {subCategory.name}
                            </h5>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                subCategory.isActive
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                              }`}
                            >
                              {subCategory.isActive ? 'نشط' : 'غير نشط'}
                            </span>
                          </div>
                          <p className="text-xs text-secondary-500 dark:text-secondary-400">
                            {subCategory.productCount} منتج
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" onClick={() => openEditModal(subCategory)}>
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(subCategory.id)}
                        >
                          {subCategory.isActive ? 'إلغاء تفعيل' : 'تفعيل'}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteCategory(subCategory.id)}>
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
        title={selectedCategory ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
      >
        <div className="space-y-4">
          <Input
            label="اسم الفئة"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="أدخل اسم الفئة"
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
              placeholder="وصف الفئة"
            />
          </div>

          <Input
            label="رابط الصورة"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الفئة الأساسية
            </label>
            <select
              value={formData.parentId}
              onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
            >
              <option value="">فئة أساسية</option>
              {getParentCategories().map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ترتيب العرض"
              type="number"
              value={formData.sortOrder.toString()}
              onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 1 })}
              min="1"
            />
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="ml-2"
              />
              <label htmlFor="isActive" className="text-sm text-secondary-700 dark:text-secondary-300">
                فئة نشطة
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedCategory ? handleUpdateCategory : handleCreateCategory}
              className="flex-1"
            >
              <Save className="h-4 w-4 ml-2" />
              {selectedCategory ? 'تحديث' : 'إنشاء'}
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

export default CategoryManagement;