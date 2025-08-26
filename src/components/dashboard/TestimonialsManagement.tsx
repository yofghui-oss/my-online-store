import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Star, Eye, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Testimonial {
  id: string;
  customerName: string;
  customerEmail: string;
  customerImage?: string;
  productId?: string;
  productName?: string;
  rating: number;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const TestimonialsManagement: React.FC = () => {
  const { currentStore } = useStore();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      customerName: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      customerImage: '/api/placeholder/50/50',
      productId: 'prod_1',
      productName: 'هاتف ذكي',
      rating: 5,
      title: 'منتج رائع وجودة ممتازة',
      content: 'اشتريت هذا الهاتف وأنا راضي جداً عن الجودة والأداء. التوصيل كان سريع والخدمة ممتازة.',
      status: 'approved',
      featured: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16'
    },
    {
      id: '2',
      customerName: 'سارة أحمد',
      customerEmail: 'sara@example.com',
      productId: 'prod_2',
      productName: 'حقيبة يد',
      rating: 4,
      title: 'جودة جيدة ولكن التوصيل تأخر قليلاً',
      content: 'المنتج جميل والجودة جيدة، لكن التوصيل تأخر عن الموعد المحدد بيومين.',
      status: 'pending',
      featured: false,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      customerName: 'خالد سعد',
      customerEmail: 'khaled@example.com',
      rating: 2,
      title: 'لم أكن راضياً عن الجودة',
      content: 'المنتج لم يلبي توقعاتي والجودة أقل مما هو معروض في الصور.',
      status: 'rejected',
      featured: false,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-13'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerImage: '',
    productName: '',
    rating: 5,
    title: '',
    content: '',
    status: 'pending' as const,
    featured: false
  });

  const handleCreateTestimonial = () => {
    if (!formData.customerName || !formData.title || !formData.content) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerImage: formData.customerImage || undefined,
      productName: formData.productName || undefined,
      rating: formData.rating,
      title: formData.title,
      content: formData.content,
      status: formData.status,
      featured: formData.featured,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setTestimonials([...testimonials, newTestimonial]);
    toast.success('تم إضافة التقييم بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateTestimonial = () => {
    if (!selectedTestimonial) return;

    const updatedTestimonials = testimonials.map(testimonial =>
      testimonial.id === selectedTestimonial.id
        ? {
            ...testimonial,
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            customerImage: formData.customerImage || undefined,
            productName: formData.productName || undefined,
            rating: formData.rating,
            title: formData.title,
            content: formData.content,
            status: formData.status,
            featured: formData.featured,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : testimonial
    );

    setTestimonials(updatedTestimonials);
    toast.success('تم تحديث التقييم بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التقييم؟')) {
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      toast.success('تم حذف التقييم بنجاح');
    }
  };

  const handleApproveTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.map(testimonial =>
      testimonial.id === id
        ? { ...testimonial, status: 'approved' as const, updatedAt: new Date().toISOString().split('T')[0] }
        : testimonial
    );
    setTestimonials(updatedTestimonials);
    toast.success('تم الموافقة على التقييم');
  };

  const handleRejectTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.map(testimonial =>
      testimonial.id === id
        ? { ...testimonial, status: 'rejected' as const, updatedAt: new Date().toISOString().split('T')[0] }
        : testimonial
    );
    setTestimonials(updatedTestimonials);
    toast.success('تم رفض التقييم');
  };

  const handleToggleFeatured = (id: string) => {
    const updatedTestimonials = testimonials.map(testimonial =>
      testimonial.id === id
        ? { ...testimonial, featured: !testimonial.featured, updatedAt: new Date().toISOString().split('T')[0] }
        : testimonial
    );
    setTestimonials(updatedTestimonials);
    toast.success('تم تحديث حالة التميز');
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      customerImage: '',
      productName: '',
      rating: 5,
      title: '',
      content: '',
      status: 'pending',
      featured: false
    });
    setSelectedTestimonial(null);
  };

  const openEditModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      customerName: testimonial.customerName,
      customerEmail: testimonial.customerEmail,
      customerImage: testimonial.customerImage || '',
      productName: testimonial.productName || '',
      rating: testimonial.rating,
      title: testimonial.title,
      content: testimonial.content,
      status: testimonial.status,
      featured: testimonial.featured
    });
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'موافق عليه';
      case 'pending':
        return 'في الانتظار';
      case 'rejected':
        return 'مرفوض';
      default:
        return 'غير محدد';
    }
  };

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
      </div>
    );
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (testimonial.productName && testimonial.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || testimonial.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || testimonial.rating.toString() === ratingFilter;
    return matchesSearch && matchesStatus && matchesRating;
  });

  const approvedCount = testimonials.filter(t => t.status === 'approved').length;
  const pendingCount = testimonials.filter(t => t.status === 'pending').length;
  const featuredCount = testimonials.filter(t => t.featured).length;
  const averageRating = testimonials.length > 0 ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة التقييمات والآراء</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة تقييمات العملاء وآرائهم في المنتجات والخدمات
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة تقييم
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي التقييمات</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{testimonials.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">موافق عليها</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{approvedCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
              <Eye className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">في الانتظار</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{pendingCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <Star className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">متوسط التقييم</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">
                {averageRating.toFixed(1)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
            <Input
              placeholder="البحث في التقييمات..."
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
            <option value="approved">موافق عليه</option>
            <option value="pending">في الانتظار</option>
            <option value="rejected">مرفوض</option>
          </select>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
          >
            <option value="all">جميع التقييمات</option>
            <option value="5">5 نجوم</option>
            <option value="4">4 نجوم</option>
            <option value="3">3 نجوم</option>
            <option value="2">2 نجوم</option>
            <option value="1">1 نجمة</option>
          </select>
        </div>
      </Card>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {testimonial.customerImage ? (
                  <img
                    src={testimonial.customerImage}
                    alt={testimonial.customerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                      {testimonial.customerName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-secondary-900 dark:text-white">
                    {testimonial.customerName}
                  </h3>
                  {testimonial.productName && (
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      {testimonial.productName}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(testimonial.status)}`}>
                  {getStatusLabel(testimonial.status)}
                </span>
                {testimonial.featured && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400">
                    مميز
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                {renderStars(testimonial.rating)}
                <span className="text-sm text-secondary-600 dark:text-secondary-300">
                  ({testimonial.rating}/5)
                </span>
              </div>
              
              <h4 className="font-semibold text-secondary-900 dark:text-white">
                {testimonial.title}
              </h4>
              
              <p className="text-sm text-secondary-600 dark:text-secondary-300 line-clamp-3">
                {testimonial.content}
              </p>
              
              <p className="text-xs text-secondary-500 dark:text-secondary-400">
                {new Date(testimonial.createdAt).toLocaleDateString('ar-SA')}
              </p>
            </div>

            <div className="flex gap-2">
              {testimonial.status === 'pending' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApproveTestimonial(testimonial.id)}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 ml-1 text-green-500" />
                    موافقة
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRejectTestimonial(testimonial.id)}
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </>
              )}
              {testimonial.status === 'approved' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleFeatured(testimonial.id)}
                  className="flex-1"
                >
                  <Star className={`h-4 w-4 ml-1 ${testimonial.featured ? 'text-yellow-500' : 'text-secondary-400'}`} />
                  {testimonial.featured ? 'إلغاء التميز' : 'تمييز'}
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => openEditModal(testimonial)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDeleteTestimonial(testimonial.id)}>
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
        title={selectedTestimonial ? 'تعديل التقييم' : 'إضافة تقييم جديد'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="اسم العميل"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="أحمد محمد"
              required
            />
            <Input
              label="البريد الإلكتروني"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              placeholder="ahmed@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="صورة العميل (رابط)"
              value={formData.customerImage}
              onChange={(e) => setFormData({ ...formData, customerImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            <Input
              label="اسم المنتج (اختياري)"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              placeholder="هاتف ذكي"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              التقييم
            </label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
            >
              <option value={5}>5 نجوم - ممتاز</option>
              <option value={4}>4 نجوم - جيد جداً</option>
              <option value={3}>3 نجوم - جيد</option>
              <option value={2}>2 نجمة - مقبول</option>
              <option value={1}>1 نجمة - ضعيف</option>
            </select>
          </div>

          <Input
            label="عنوان التقييم"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="منتج رائع وجودة ممتازة"
            required
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              محتوى التقييم
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              rows={4}
              placeholder="تفاصيل التقييم والرأي في المنتج..."
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
                <option value="pending">في الانتظار</option>
                <option value="approved">موافق عليه</option>
                <option value="rejected">مرفوض</option>
              </select>
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
                تقييم مميز
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedTestimonial ? handleUpdateTestimonial : handleCreateTestimonial}
              className="flex-1"
            >
              {selectedTestimonial ? 'تحديث' : 'إضافة'}
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

export default TestimonialsManagement;