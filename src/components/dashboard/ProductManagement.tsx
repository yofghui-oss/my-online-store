import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useStore } from '../../contexts/StoreContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { Product } from '../../types';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  stock: string;
  images: string[];
}

const ProductManagement: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, currentStore } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    stock: '',
    images: [''],
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };
  
  const openAddModal = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      categoryId: categories[0]?.id || '',
      stock: '0',
      images: [''],
    });
    setIsAddModalOpen(true);
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.categoryId || !currentStore) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    addProduct({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      categoryId: formData.categoryId,
      storeId: currentStore.id,
      stock: parseInt(formData.stock) || 0,
      images: formData.images.filter(img => img.trim() !== ''),
      isActive: true,
      currency: currentStore.currency,
    });

    setIsAddModalOpen(false);
    toast.success('تم إضافة المنتج بنجاح');
  };

  const openEditModal = (product: Product) => {
    setProductToEdit(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      categoryId: product.categoryId,
      stock: String(product.stock),
      images: product.images.length > 0 ? product.images : [''],
    });
    setIsEditModalOpen(true);
  };

  const handleEditProduct = () => {
    if (!productToEdit) return;

    updateProduct(productToEdit.id, {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      categoryId: formData.categoryId,
      stock: parseInt(formData.stock) || 0,
      images: formData.images.filter((img: string) => img.trim() !== ''),
    });

    setIsEditModalOpen(false);
    setProductToEdit(null);
    toast.success('تم تحديث المنتج بنجاح');
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      deleteProduct(id);
      toast.success('تم حذف المنتج بنجاح');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة المنتجات</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إدارة منتجات متجرك وتحديث المعلومات</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة منتج جديد
        </Button>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="البحث في المنتجات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} icon={<Search className="h-4 w-4" />}/>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="input-field">
            <option value="">جميع التصنيفات</option>
            {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
          </select>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
            <Card hover className="overflow-hidden">
              <img src={product.images[0] || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/f3f4f6/9ca3af?text=منتج'} alt={product.name} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary-600">{product.price.toFixed(2)} ريال</span>
                  <span className="text-sm text-secondary-500">المخزون: {product.stock}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEditModal(product)} className="flex-1"><Edit className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)} className="flex-1 text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
        title={isEditModalOpen ? "تحديث المنتج" : "إضافة منتج جديد"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}>إلغاء</Button>
            <Button onClick={isEditModalOpen ? handleEditProduct : handleAddProduct}>
              {isEditModalOpen ? 'حفظ التغييرات' : 'إضافة المنتج'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="اسم المنتج *" name="name" value={formData.name} onChange={handleFormChange} placeholder="أدخل اسم المنتج"/>
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">الوصف</label>
            <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="أدخل وصف المنتج" rows={3} className="input-field"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="السعر *" name="price" type="number" value={formData.price} onChange={handleFormChange} placeholder="0.00"/>
            <Input label="الكمية" name="stock" type="number" value={formData.stock} onChange={handleFormChange} placeholder="0"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">التصنيف *</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleFormChange} className="input-field">
              <option value="">اختر التصنيف</option>
              {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
            </select>
          </div>
          <Input label="رابط الصورة" name="images" value={formData.images[0]} onChange={(e) => handleImageChange(0, e.target.value)} placeholder="https://example.com/image.jpg"/>
        </div>
      </Modal>
    </div>
  );
};

export default ProductManagement;
