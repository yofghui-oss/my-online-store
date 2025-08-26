import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';

const PageManagement: React.FC = () => {
  const { pages } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة الصفحات</h1>
        <Button><Plus size={16} className="ml-2" /> صفحة جديدة</Button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">العنوان</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الرابط</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">آخر تعديل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page.id} className="border-t dark:border-secondary-700">
                  <td className="px-6 py-4 font-semibold">{page.title}</td>
                  <td className="px-6 py-4 text-primary-500">{page.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {page.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(page.lastModified).toLocaleDateString('ar-SA')}</td>
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

export default PageManagement;
