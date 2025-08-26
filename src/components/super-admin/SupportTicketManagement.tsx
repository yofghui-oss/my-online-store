import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Eye, Filter } from 'lucide-react';

const SupportTicketManagement: React.FC = () => {
  const { supportTickets } = useStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">تذاكر الدعم</h1>
        <Button variant="outline"><Filter size={16} className="ml-2" /> فلترة</Button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الموضوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">المستخدم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الأولوية</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">آخر تحديث</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {supportTickets.map(ticket => (
                <tr key={ticket.id} className="border-t dark:border-secondary-700">
                  <td className="px-6 py-4 font-semibold">{ticket.subject}</td>
                  <td className="px-6 py-4">{ticket.user}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status === 'open' ? 'مفتوحة' : ticket.status === 'in_progress' ? 'قيد المعالجة' : 'مغلقة'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 font-bold ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority === 'high' ? 'عالية' : ticket.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </td>
                  <td className="px-6 py-4">{new Date(ticket.lastUpdate).toLocaleString('ar-SA')}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm"><Eye size={16} /></Button>
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

export default SupportTicketManagement;
