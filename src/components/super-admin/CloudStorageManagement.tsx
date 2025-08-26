import React, { useState } from 'react';
import { Cloud, Upload, Download, Trash2, Eye, Folder, File, Image, Video, Music, FileText, Search, Filter } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface StorageFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'other';
  size: number; // in bytes
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  isPublic: boolean;
  downloads: number;
  path: string;
}

interface StorageUser {
  id: string;
  name: string;
  email: string;
  usedStorage: number; // in bytes
  storageLimit: number; // in bytes
  filesCount: number;
}

const CloudStorageManagement: React.FC = () => {
  const [files] = useState<StorageFile[]>([
    {
      id: '1',
      name: 'logo-company.png',
      type: 'image',
      size: 1024 * 512, // 512KB
      url: 'https://storage.example.com/logo-company.png',
      uploadedBy: 'أحمد السالم',
      uploadedAt: new Date('2024-01-20'),
      isPublic: true,
      downloads: 145,
      path: '/uploads/logos/'
    },
    {
      id: '2',
      name: 'product-catalog.pdf',
      type: 'document',
      size: 1024 * 1024 * 2.5, // 2.5MB
      url: 'https://storage.example.com/product-catalog.pdf',
      uploadedBy: 'فاطمة المحمد',
      uploadedAt: new Date('2024-01-18'),
      isPublic: false,
      downloads: 67,
      path: '/uploads/documents/'
    },
    {
      id: '3',
      name: 'intro-video.mp4',
      type: 'video',
      size: 1024 * 1024 * 15, // 15MB
      url: 'https://storage.example.com/intro-video.mp4',
      uploadedBy: 'محمد العتيبي',
      uploadedAt: new Date('2024-01-15'),
      isPublic: true,
      downloads: 89,
      path: '/uploads/videos/'
    },
    {
      id: '4',
      name: 'background-music.mp3',
      type: 'audio',
      size: 1024 * 1024 * 4.2, // 4.2MB
      url: 'https://storage.example.com/background-music.mp3',
      uploadedBy: 'سارة الأحمد',
      uploadedAt: new Date('2024-01-12'),
      isPublic: true,
      downloads: 23,
      path: '/uploads/audio/'
    }
  ]);

  const [users] = useState<StorageUser[]>([
    {
      id: '1',
      name: 'أحمد السالم',
      email: 'ahmed@example.com',
      usedStorage: 1024 * 1024 * 150, // 150MB
      storageLimit: 1024 * 1024 * 1024, // 1GB
      filesCount: 24
    },
    {
      id: '2',
      name: 'فاطمة المحمد',
      email: 'fatima@example.com',
      usedStorage: 1024 * 1024 * 420, // 420MB
      storageLimit: 1024 * 1024 * 2048, // 2GB
      filesCount: 67
    },
    {
      id: '3',
      name: 'محمد العتيبي',
      email: 'mohammed@example.com',
      usedStorage: 1024 * 1024 * 850, // 850MB
      storageLimit: 1024 * 1024 * 1024, // 1GB
      filesCount: 89
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all');
  const [selectedFile, setSelectedFile] = useState<StorageFile | null>(null);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'files' | 'users' | 'analytics'>('files');

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'audio': return Music;
      case 'document': return FileText;
      default: return File;
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStoragePercentage = (used: number, limit: number) => {
    return (used / limit) * 100;
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = fileTypeFilter === 'all' || file.type === fileTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleDeleteFile = (fileId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الملف؟')) {
      // In real app, this would delete from state
      toast.success('تم حذف الملف بنجاح');
    }
  };

  const handleDownloadFile = (file: StorageFile) => {
    // In real app, this would trigger download
    toast.success(`تم تحميل ${file.name}`);
  };

  const getTotalStats = () => {
    const totalStorage = users.reduce((sum, user) => sum + user.usedStorage, 0);
    const totalLimit = users.reduce((sum, user) => sum + user.storageLimit, 0);
    const totalFiles = users.reduce((sum, user) => sum + user.filesCount, 0);
    const totalDownloads = files.reduce((sum, file) => sum + file.downloads, 0);

    return {
      totalStorage,
      totalLimit,
      totalFiles,
      totalDownloads,
      totalUsers: users.length,
      storagePercentage: (totalStorage / totalLimit) * 100
    };
  };

  const stats = getTotalStats();

  const fileTypeStats = {
    images: files.filter(f => f.type === 'image').length,
    videos: files.filter(f => f.type === 'video').length,
    documents: files.filter(f => f.type === 'document').length,
    audio: files.filter(f => f.type === 'audio').length,
    other: files.filter(f => f.type === 'other').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة التخزين السحابي</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إدارة ملفات ومساحة التخزين للمستخدمين</p>
        </div>
        <Button>
          <Upload size={16} className="ml-2" />
          رفع ملف
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">{formatFileSize(stats.totalStorage)}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي التخزين المستخدم</div>
          <div className="mt-2 w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min(stats.storagePercentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
            {stats.storagePercentage.toFixed(1)}% من {formatFileSize(stats.totalLimit)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{stats.totalFiles}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي الملفات</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">المستخدمين النشطين</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600">{stats.totalDownloads}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي التحميلات</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-orange-600">{formatFileSize(stats.totalLimit - stats.totalStorage)}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">المساحة المتاحة</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
          <button
            onClick={() => setActiveTab('files')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'files'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
            }`}
          >
            <File size={16} className="inline ml-2" />
            الملفات
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
            }`}
          >
            <Cloud size={16} className="inline ml-2" />
            المستخدمين
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
            }`}
          >
            <Eye size={16} className="inline ml-2" />
            الإحصائيات
          </button>
        </nav>
      </div>

      {activeTab === 'files' && (
        <>
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
                  <Input
                    placeholder="البحث في الملفات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={fileTypeFilter}
                  onChange={(e) => setFileTypeFilter(e.target.value)}
                  className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg 
                            bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                >
                  <option value="all">جميع الأنواع</option>
                  <option value="image">صور</option>
                  <option value="video">فيديو</option>
                  <option value="audio">صوتيات</option>
                  <option value="document">مستندات</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Files Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => {
              const IconComponent = getFileIcon(file.type);
              return (
                <Card key={file.id} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <IconComponent className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-secondary-900 dark:text-white truncate">{file.name}</h4>
                      <p className="text-sm text-secondary-600 dark:text-secondary-300">{formatFileSize(file.size)}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-secondary-600 dark:text-secondary-300 mb-4">
                    <div>بواسطة: {file.uploadedBy}</div>
                    <div>رُفع: {file.uploadedAt.toLocaleDateString('ar-SA')}</div>
                    <div>التحميلات: {file.downloads}</div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        file.isPublic 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                      }`}>
                        {file.isPublic ? 'عام' : 'خاص'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedFile(file);
                        setIsFileModalOpen(true);
                      }}
                    >
                      <Eye size={14} className="ml-1" />
                      عرض
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadFile(file)}
                    >
                      <Download size={14} className="ml-1" />
                      تحميل
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteFile(file.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="space-y-4">
          {users.map((user) => {
            const storagePercentage = getStoragePercentage(user.usedStorage, user.storageLimit);
            return (
              <Card key={user.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{user.name}</h3>
                    <p className="text-secondary-600 dark:text-secondary-300">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {formatFileSize(user.usedStorage)} / {formatFileSize(user.storageLimit)}
                    </div>
                    <div className="text-sm text-secondary-600 dark:text-secondary-300">
                      {user.filesCount} ملف
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600 dark:text-secondary-300">استخدام التخزين</span>
                    <span className="font-medium">{storagePercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        storagePercentage > 90 ? 'bg-red-500' : 
                        storagePercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">توزيع أنواع الملفات</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image size={16} className="text-blue-500" />
                  <span>الصور</span>
                </div>
                <span className="font-medium">{fileTypeStats.images}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video size={16} className="text-green-500" />
                  <span>الفيديو</span>
                </div>
                <span className="font-medium">{fileTypeStats.videos}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-orange-500" />
                  <span>المستندات</span>
                </div>
                <span className="font-medium">{fileTypeStats.documents}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music size={16} className="text-purple-500" />
                  <span>الصوتيات</span>
                </div>
                <span className="font-medium">{fileTypeStats.audio}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">أحدث الملفات</h3>
            <div className="space-y-3">
              {files.slice().sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()).slice(0, 5).map((file) => {
                const IconComponent = getFileIcon(file.type);
                return (
                  <div key={file.id} className="flex items-center gap-3">
                    <div className="p-2 bg-secondary-100 dark:bg-secondary-800 rounded-lg">
                      <IconComponent size={16} className="text-secondary-600 dark:text-secondary-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-secondary-900 dark:text-white truncate">{file.name}</div>
                      <div className="text-sm text-secondary-500">{file.uploadedBy}</div>
                    </div>
                    <div className="text-xs text-secondary-500">
                      {file.uploadedAt.toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* File Details Modal */}
      <Modal
        isOpen={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
        title="تفاصيل الملف"
      >
        {selectedFile && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  اسم الملف
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedFile.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  الحجم
                </label>
                <div className="text-secondary-900 dark:text-white">{formatFileSize(selectedFile.size)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  رفع بواسطة
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedFile.uploadedBy}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  تاريخ الرفع
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedFile.uploadedAt.toLocaleDateString('ar-SA')}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  المسار
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedFile.path}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  عدد التحميلات
                </label>
                <div className="text-secondary-900 dark:text-white">{selectedFile.downloads}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                الرابط
              </label>
              <div className="p-2 bg-secondary-100 dark:bg-secondary-800 rounded border text-sm text-secondary-600 dark:text-secondary-300 break-all">
                {selectedFile.url}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsFileModalOpen(false)}>
                إغلاق
              </Button>
              <Button onClick={() => handleDownloadFile(selectedFile)}>
                <Download size={16} className="ml-2" />
                تحميل الملف
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CloudStorageManagement;