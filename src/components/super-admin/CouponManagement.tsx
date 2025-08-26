import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { Coupon } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { Edit, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

const CouponManagement: React.FC = () => {
  const { coupons, updateCoupon } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Partial<Coupon> | null>(null);

  const openModal = (coupon?: Coupon) => {
    setEditingCoupon(coupon || { code: '', type: 'percentage', value: 0, isActive: true });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingCoupon && editingCoupon.id) {
      updateCoupon(editingCoupon.id, editingCoupon);
      toast.success('تم تحديث الكوبون بنجاح');
    } else {
      // Add new coupon logic here
      toast.success('تم إضافة كوبون جديد');
    }
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة القسائم</h1>
        <Button onClick={() => openModal()}><Plus size={16} className="ml-2" /> إضافة كوبون</Button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الكود</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">النوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">القيمة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon.id} className="border-t dark:border-secondary-700">
                  <td className="px-6 py-4 font-semibold">{coupon.code}</td>
                  <td className="px-6 py-4">{coupon.type === 'percentage' ? 'نسبة مئوية' : 'مبلغ ثابت'}</td>
                  <td className="px-6 py-4">{coupon.value}{coupon.type === 'percentage' ? '%' : ' ريال'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {coupon.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" onClick={() => openModal(coupon)}>
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
        title={editingCoupon?.id ? "تعديل كوبون" : "إضافة كوبون"}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>حفظ</Button>
          </>
        }
      >
        {editingCoupon && (
          <div className="space-y-4">
            <Input
              label="كود الكوبون"
              value={editingCoupon.code || ''}
              onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="القيمة"
                type="number"
                value={editingCoupon.value || 0}
                onChange={(e) => setEditingCoupon({ ...editingCoupon, value: Number(e.target.value) })}
              />
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">النوع</label>
                <select 
                  value={editingCoupon.type} 
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, type: e.target.value as 'percentage' | 'fixed' })}
                  className="input-field"
                >
                  <option value="percentage">نسبة مئوية</option>
                  <option value="fixed">مبلغ ثابت</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={editingCoupon.isActive}
                onChange={(e) => setEditingCoupon({ ...editingCoupon, isActive: e.target.checked })}
                className="ml-2 h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isActive" className="text-sm text-secondary-700 dark:text-secondary-300">نشط</label>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CouponManagement;
