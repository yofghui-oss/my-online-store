import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { Testimonial } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

const TestimonialManagement: React.FC = () => {
  const { testimonials, updateTestimonial } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);

  const openModal = (testimonial?: Testimonial) => {
    setEditingTestimonial(testimonial || { name: '', role: '', content: '', avatar: '', rating: 5 });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingTestimonial && editingTestimonial.id) {
      updateTestimonial(editingTestimonial.id, editingTestimonial);
      toast.success('تم تحديث الشهادة بنجاح');
    } else {
      // Add new testimonial logic here
      toast.success('تم إضافة شهادة جديدة');
    }
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة شهادات العملاء</h1>
        <Button onClick={() => openModal()}><Plus size={16} className="ml-2" /> إضافة شهادة</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(testimonial => (
          <Card key={testimonial.id}>
            <div className="flex items-center mb-4">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full ml-4" />
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-secondary-500">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-secondary-600 dark:text-secondary-300 mb-4">"{testimonial.content}"</p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => openModal(testimonial)}><Edit size={16} /></Button>
              <Button variant="ghost" size="sm" className="text-red-500"><Trash2 size={16} /></Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="إدارة شهادة عميل"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>حفظ</Button>
          </>
        }
      >
        {editingTestimonial && (
          <div className="space-y-4">
            <Input
              label="الاسم"
              value={editingTestimonial.name || ''}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
            />
            <Input
              label="الدور الوظيفي"
              value={editingTestimonial.role || ''}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
            />
            <Input
              label="رابط الصورة الرمزية"
              value={editingTestimonial.avatar || ''}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })}
            />
            <Input
              label="التقييم (1-5)"
              type="number"
              min="1"
              max="5"
              value={editingTestimonial.rating || 5}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
            />
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">المحتوى</label>
              <textarea
                value={editingTestimonial.content || ''}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                className="input-field"
                rows={4}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TestimonialManagement;
