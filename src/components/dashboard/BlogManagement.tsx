import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, BookOpen, Eye, Calendar, Tag, User, Image } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  authorId: string;
  status: 'published' | 'draft' | 'scheduled';
  featured: boolean;
  tags: string[];
  categories: string[];
  publishDate: string;
  metaTitle?: string;
  metaDescription?: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

const BlogManagement: React.FC = () => {
  const { currentStore } = useStore();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'أفضل منتجات الإلكترونيات لعام 2024',
      slug: 'best-electronics-2024',
      excerpt: 'اكتشف أحدث وأفضل منتجات الإلكترونيات التي يجب أن تقتنيها في عام 2024 مع دليل شامل للمواصفات والأسعار.',
      content: '<h2>مقدمة</h2><p>في عام 2024، شهدت صناعة الإلكترونيات تطورات مذهلة...</p><h3>الهواتف الذكية</h3><p>أحدث الهواتف الذكية تأتي بمواصفات قوية...</p>',
      featuredImage: '/api/placeholder/600/300',
      author: 'أحمد محمد',
      authorId: 'author_1',
      status: 'published',
      featured: true,
      tags: ['إلكترونيات', 'هواتف', 'تقنية'],
      categories: ['تقنية', 'منتجات'],
      publishDate: '2024-01-20',
      metaTitle: 'أفضل منتجات الإلكترونيات لعام 2024 - دليل شامل',
      metaDescription: 'اكتشف أحدث وأفضل منتجات الإلكترونيات لعام 2024 مع مراجعات شاملة وأسعار تنافسية',
      readTime: 8,
      views: 1245,
      likes: 87,
      comments: 23,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'نصائح للتسوق الذكي أونلاين',
      slug: 'smart-online-shopping-tips',
      excerpt: 'تعلم كيفية التسوق بذكاء عبر الإنترنت وتجنب الأخطاء الشائعة مع نصائح عملية من خبراء التجارة الإلكترونية.',
      content: '<h2>مقدمة</h2><p>التسوق الإلكتروني أصبح جزءاً لا يتجزأ من حياتنا اليومية...</p>',
      featuredImage: '/api/placeholder/600/300',
      author: 'سارة أحمد',
      authorId: 'author_2',
      status: 'draft',
      featured: false,
      tags: ['تسوق', 'نصائح', 'تجارة إلكترونية'],
      categories: ['نصائح', 'تسوق'],
      publishDate: '2024-01-25',
      readTime: 5,
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22'
    },
    {
      id: '3',
      title: 'مراجعة شاملة: أفضل سماعات الرأس اللاسلكية',
      slug: 'wireless-headphones-review',
      excerpt: 'مراجعة تفصيلية لأفضل سماعات الرأس اللاسلكية المتوفرة في السوق مع مقارنة الأسعار والمواصفات.',
      content: '<h2>المقارنة الشاملة</h2><p>سماعات الرأس اللاسلكية أصبحت ضرورة...</p>',
      author: 'خالد سعد',
      authorId: 'author_3',
      status: 'scheduled',
      featured: true,
      tags: ['سماعات', 'مراجعة', 'صوت'],
      categories: ['مراجعات', 'صوتيات'],
      publishDate: '2024-01-30',
      readTime: 12,
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: '2024-01-23',
      updatedAt: '2024-01-23'
    }
  ]);

  const [categories] = useState<BlogCategory[]>([
    { id: '1', name: 'تقنية', slug: 'technology', description: 'آخر أخبار التقنية والابتكار', postCount: 15 },
    { id: '2', name: 'مراجعات', slug: 'reviews', description: 'مراجعات شاملة للمنتجات', postCount: 8 },
    { id: '3', name: 'نصائح', slug: 'tips', description: 'نصائح مفيدة للمتسوقين', postCount: 12 },
    { id: '4', name: 'أخبار', slug: 'news', description: 'آخر الأخبار والتحديثات', postCount: 6 }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'المدير',
    status: 'draft' as const,
    featured: false,
    tags: '',
    categories: [] as string[],
    publishDate: '',
    metaTitle: '',
    metaDescription: '',
    readTime: 5
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleCreatePost = () => {
    if (!formData.title || !formData.content || !formData.excerpt) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const slug = formData.slug || generateSlug(formData.title);
    
    if (posts.some(post => post.slug === slug)) {
      toast.error('الرابط المختصر موجود بالفعل');
      return;
    }

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: formData.title,
      slug: slug,
      excerpt: formData.excerpt,
      content: formData.content,
      featuredImage: formData.featuredImage || undefined,
      author: formData.author,
      authorId: 'current_user',
      status: formData.status,
      featured: formData.featured,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      categories: formData.categories,
      publishDate: formData.publishDate || new Date().toISOString().split('T')[0],
      metaTitle: formData.metaTitle || formData.title,
      metaDescription: formData.metaDescription,
      readTime: formData.readTime || calculateReadTime(formData.content),
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setPosts([...posts, newPost]);
    toast.success('تم إنشاء المقال بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdatePost = () => {
    if (!selectedPost) return;

    const slug = formData.slug || generateSlug(formData.title);
    
    if (posts.some(post => post.slug === slug && post.id !== selectedPost.id)) {
      toast.error('الرابط المختصر موجود بالفعل');
      return;
    }

    const updatedPosts = posts.map(post =>
      post.id === selectedPost.id
        ? {
            ...post,
            title: formData.title,
            slug: slug,
            excerpt: formData.excerpt,
            content: formData.content,
            featuredImage: formData.featuredImage || undefined,
            author: formData.author,
            status: formData.status,
            featured: formData.featured,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            categories: formData.categories,
            publishDate: formData.publishDate,
            metaTitle: formData.metaTitle || formData.title,
            metaDescription: formData.metaDescription,
            readTime: formData.readTime || calculateReadTime(formData.content),
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : post
    );

    setPosts(updatedPosts);
    toast.success('تم تحديث المقال بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      setPosts(posts.filter(post => post.id !== id));
      toast.success('تم حذف المقال بنجاح');
    }
  };

  const handleToggleFeatured = (id: string) => {
    const updatedPosts = posts.map(post =>
      post.id === id ? { ...post, featured: !post.featured } : post
    );
    setPosts(updatedPosts);
    toast.success('تم تحديث حالة التميز');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      author: 'المدير',
      status: 'draft',
      featured: false,
      tags: '',
      categories: [],
      publishDate: '',
      metaTitle: '',
      metaDescription: '',
      readTime: 5
    });
    setSelectedPost(null);
  };

  const openEditModal = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage || '',
      author: post.author,
      status: post.status,
      featured: post.featured,
      tags: post.tags.join(', '),
      categories: post.categories,
      publishDate: post.publishDate,
      metaTitle: post.metaTitle || '',
      metaDescription: post.metaDescription || '',
      readTime: post.readTime
    });
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'منشور';
      case 'draft': return 'مسودة';
      case 'scheduled': return 'مجدول';
      default: return 'غير محدد';
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.categories.includes(categoryFilter);
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const draftPosts = posts.filter(p => p.status === 'draft').length;
  const scheduledPosts = posts.filter(p => p.status === 'scheduled').length;
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة المدونة</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إنشاء وإدارة مقالات المدونة والمحتوى التسويقي
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          مقال جديد
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي المقالات</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{posts.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Eye className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">المقالات المنشورة</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{publishedPosts}</p>
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
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{draftPosts}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-500" />
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
            <Input
              placeholder="البحث في المقالات..."
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
            <option value="scheduled">مجدول</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
          >
            <option value="all">جميع الفئات</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            {post.featuredImage && (
              <div className="h-48 relative">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {post.featured && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-purple-500 text-white px-2 py-1 text-xs rounded">
                      مميز
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(post.status)}`}>
                    {getStatusLabel(post.status)}
                  </span>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <User className="h-4 w-4 text-secondary-400" />
                <span className="text-sm text-secondary-600 dark:text-secondary-300">{post.author}</span>
                <Calendar className="h-4 w-4 text-secondary-400 ml-2" />
                <span className="text-sm text-secondary-600 dark:text-secondary-300">
                  {new Date(post.publishDate).toLocaleDateString('ar-SA')}
                </span>
              </div>

              <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex px-2 py-1 text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-secondary-500">+{post.tags.length - 3}</span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400 mb-4">
                <div className="flex items-center gap-4">
                  <span><Eye className="h-4 w-4 inline ml-1" />{post.views}</span>
                  <span>{post.readTime} دقائق</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(post)} className="flex-1">
                  <Edit2 className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleFeatured(post.id)}
                >
                  <Tag className={`h-4 w-4 ${post.featured ? 'text-purple-500' : 'text-secondary-400'}`} />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
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
        title={selectedPost ? 'تعديل المقال' : 'مقال جديد'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="عنوان المقال"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (!formData.slug) {
                  setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                }
              }}
              placeholder="عنوان جذاب للمقال"
              required
            />
            <Input
              label="الرابط المختصر"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="article-url-slug"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              المقدمة/الملخص
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              rows={3}
              placeholder="ملخص مختصر عن المقال..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              محتوى المقال
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              rows={10}
              placeholder="محتوى المقال بتنسيق HTML..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="رابط الصورة البارزة"
              value={formData.featuredImage}
              onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            <Input
              label="الكاتب"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="اسم الكاتب"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
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
                <option value="scheduled">مجدول</option>
              </select>
            </div>
            <Input
              label="تاريخ النشر"
              type="date"
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
            />
            <Input
              label="وقت القراءة (دقائق)"
              type="number"
              value={formData.readTime.toString()}
              onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || 5 })}
              min="1"
            />
          </div>

          <Input
            label="العلامات (مفصولة بفواصل)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="تقنية, مراجعة, إلكترونيات"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="ml-2"
            />
            <label htmlFor="featured" className="text-sm text-secondary-700 dark:text-secondary-300">
              مقال مميز
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedPost ? handleUpdatePost : handleCreatePost}
              className="flex-1"
            >
              {selectedPost ? 'تحديث' : 'إنشاء'}
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

export default BlogManagement;