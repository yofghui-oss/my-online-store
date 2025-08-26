import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';

const BlogManagement: React.FC = () => {
  const { blogPosts } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة المدونات</h1>
        <Button><Plus size={16} className="ml-2" /> مقال جديد</Button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">العنوان</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الكاتب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">تاريخ الإنشاء</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map(post => (
                <tr key={post.id} className="border-t dark:border-secondary-700">
                  <td className="px-6 py-4 font-semibold">{post.title}</td>
                  <td className="px-6 py-4">{post.author}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {post.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(post.createdAt).toLocaleDateString('ar-SA')}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button variant="ghost" size="sm"><Edit size={16} /></Button>
                    <Button variant="ghost" size="sm" className="text-red-500"><Trash2 size={16} /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default BlogManagement;
