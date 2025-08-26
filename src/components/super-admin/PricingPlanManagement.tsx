import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { PricingPlan } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { Edit } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PricingPlanManagement: React.FC = () => {
  const { pricingPlans, updatePricingPlan } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  const openEditModal = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingPlan) {
      updatePricingPlan(editingPlan.id, editingPlan);
      toast.success('تم تحديث الخطة بنجاح');
      setIsModalOpen(false);
      setEditingPlan(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">إدارة خطط الأسعار</h1>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الاسم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">المميزات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {pricingPlans.map(plan => (
                <tr key={plan.id} className="border-t dark:border-secondary-700">
                  <td className="px-6 py-4 font-semibold">{plan.name}</td>
                  <td className="px-6 py-4">{plan.price} {plan.currency}</td>
                  <td className="px-6 py-4">{plan.features.join(', ')}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(plan)}>
                      <Edit size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="تعديل خطة الأسعار"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>حفظ التغييرات</Button>
          </>
        }
      >
        {editingPlan && (
          <div className="space-y-4">
            <Input
              label="اسم الخطة"
              value={editingPlan.name}
              onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
            />
            <Input
              label="السعر"
              type="number"
              value={editingPlan.price}
              onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
            />
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">المميزات (مفصولة بفاصلة)</label>
              <textarea
                value={editingPlan.features.join(', ')}
                onChange={(e) => setEditingPlan({ ...editingPlan, features: e.target.value.split(',').map(f => f.trim()) })}
                className="input-field"
                rows={3}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PricingPlanManagement;
