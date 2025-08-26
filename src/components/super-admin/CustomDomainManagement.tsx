import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Globe, Check, X } from 'lucide-react';

const CustomDomainManagement: React.FC = () => {
  const requests = [
    { id: 1, store: 'متجر الأزياء', domain: 'fashion.sa', status: 'pending' },
    { id: 2, store: 'عالم الإلكترونيات', domain: 'electronics.com', status: 'approved' },
    { id: 3, store: 'البيت الأنيق', domain: 'home.store', status: 'rejected' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">طلبات النطاق المخصص</h1>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">المتجر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">النطاق المطلوب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id} className="border-t dark:border-secondary-700">
                  <td className="px-6 py-4 font-semibold">{req.store}</td>
                  <td className="px-6 py-4 flex items-center gap-2 text-primary-500"><Globe size={16} /> {req.domain}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      req.status === 'approved' ? 'bg-green-100 text-green-800' :
                      req.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status === 'approved' ? 'موافق عليه' : req.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    {req.status === 'pending' && (
                      <>
                        <Button variant="ghost" size="sm" className="text-green-500"><Check size={16} /></Button>
                        <Button variant="ghost" size="sm" className="text-red-500"><X size={16} /></Button>
                      </>
                    )}
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

export default CustomDomainManagement;
