import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Type, Mail, Phone, Calendar, CheckSquare, Radio, 
  List, FileText, Save, Eye, Trash2, Plus, Settings,
  Copy, Move, Edit3
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'date' | 'checkbox' | 'radio' | 'select' | 'textarea';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

interface Form {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  submissions: number;
  status: 'active' | 'inactive';
  createdAt: Date;
}

const FormBuilder: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([
    {
      id: '1',
      name: 'نموذج التواصل',
      description: 'نموذج أساسي للتواصل مع العملاء',
      fields: [
        { id: '1', type: 'text', label: 'الاسم الكامل', required: true },
        { id: '2', type: 'email', label: 'البريد الإلكتروني', required: true },
        { id: '3', type: 'textarea', label: 'الرسالة', required: true }
      ],
      submissions: 45,
      status: 'active',
      createdAt: new Date('2024-01-15')
    }
  ]);

  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [fieldConfigModal, setFieldConfigModal] = useState<{
    isOpen: boolean;
    field: FormField | null;
    isNew: boolean;
  }>({ isOpen: false, field: null, isNew: false });

  const fieldTypes = [
    { type: 'text', label: 'نص', icon: Type },
    { type: 'email', label: 'بريد إلكتروني', icon: Mail },
    { type: 'phone', label: 'هاتف', icon: Phone },
    { type: 'date', label: 'تاريخ', icon: Calendar },
    { type: 'checkbox', label: 'خانة اختيار', icon: CheckSquare },
    { type: 'radio', label: 'اختيار متعدد', icon: Radio },
    { type: 'select', label: 'قائمة منسدلة', icon: List },
    { type: 'textarea', label: 'نص طويل', icon: FileText }
  ];

  const handleDragEnd = (result: any) => {
    if (!result.destination || !selectedForm) return;

    const items = Array.from(selectedForm.fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedForm({ ...selectedForm, fields: items });
  };

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `${fieldTypes.find(f => f.type === type)?.label} جديد`,
      required: false,
      options: type === 'radio' || type === 'select' ? ['خيار 1', 'خيار 2'] : undefined
    };

    setFieldConfigModal({ isOpen: true, field: newField, isNew: true });
  };

  const editField = (field: FormField) => {
    setFieldConfigModal({ isOpen: true, field: { ...field }, isNew: false });
  };

  const saveField = (field: FormField) => {
    if (!selectedForm) return;

    if (fieldConfigModal.isNew) {
      setSelectedForm({
        ...selectedForm,
        fields: [...selectedForm.fields, field]
      });
    } else {
      setSelectedForm({
        ...selectedForm,
        fields: selectedForm.fields.map(f => f.id === field.id ? field : f)
      });
    }

    setFieldConfigModal({ isOpen: false, field: null, isNew: false });
    toast.success('تم حفظ الحقل بنجاح');
  };

  const deleteField = (fieldId: string) => {
    if (!selectedForm) return;

    setSelectedForm({
      ...selectedForm,
      fields: selectedForm.fields.filter(f => f.id !== fieldId)
    });
    toast.success('تم حذف الحقل بنجاح');
  };

  const saveForm = () => {
    if (!selectedForm) return;

    if (isEditing) {
      setForms(forms.map(f => f.id === selectedForm.id ? selectedForm : f));
      toast.success('تم تحديث النموذج بنجاح');
    } else {
      const newForm = {
        ...selectedForm,
        id: Date.now().toString(),
        submissions: 0,
        status: 'active' as const,
        createdAt: new Date()
      };
      setForms([...forms, newForm]);
      toast.success('تم إنشاء النموذج بنجاح');
    }

    setSelectedForm(null);
    setIsEditing(false);
  };

  const createNewForm = () => {
    setSelectedForm({
      id: '',
      name: 'نموذج جديد',
      description: '',
      fields: [],
      submissions: 0,
      status: 'active',
      createdAt: new Date()
    });
    setIsEditing(false);
  };

  const duplicateField = (field: FormField) => {
    if (!selectedForm) return;

    const newField = {
      ...field,
      id: Date.now().toString(),
      label: field.label + ' - نسخة'
    };

    setSelectedForm({
      ...selectedForm,
      fields: [...selectedForm.fields, newField]
    });
    toast.success('تم نسخ الحقل بنجاح');
  };

  const renderField = (field: FormField, isPreview = false) => {
    const baseClassName = "w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white";
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <input
            type={field.type}
            placeholder={field.placeholder || field.label}
            className={baseClassName}
            disabled={!isPreview}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            className={baseClassName}
            disabled={!isPreview}
          />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder || field.label}
            className={baseClassName}
            rows={4}
            disabled={!isPreview}
          />
        );
      case 'checkbox':
        return (
          <div className="flex items-center gap-2">
            <input type="checkbox" disabled={!isPreview} />
            <label>{field.label}</label>
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input type="radio" name={field.id} disabled={!isPreview} />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'select':
        return (
          <select className={baseClassName} disabled={!isPreview}>
            <option>اختر {field.label}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">منشئ النماذج</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إنشاء وإدارة النماذج التفاعلية</p>
        </div>
        <Button onClick={createNewForm}>
          <Plus size={16} className="ml-2" />
          نموذج جديد
        </Button>
      </div>

      {!selectedForm ? (
        /* Forms List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <Card key={form.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{form.name}</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300">{form.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  form.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
                }`}>
                  {form.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600 dark:text-secondary-300">الحقول:</span>
                  <span className="font-medium">{form.fields.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600 dark:text-secondary-300">المرسلات:</span>
                  <span className="font-medium">{form.submissions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600 dark:text-secondary-300">تاريخ الإنشاء:</span>
                  <span className="font-medium">{form.createdAt.toLocaleDateString('ar-SA')}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedForm(form);
                    setIsEditing(true);
                  }}
                >
                  <Edit3 size={14} className="ml-1" />
                  تعديل
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedForm(form);
                    setIsPreviewOpen(true);
                  }}
                >
                  <Eye size={14} className="ml-1" />
                  معاينة
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Form Builder */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Field Types */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">عناصر النموذج</h3>
            <div className="space-y-2">
              {fieldTypes.map((fieldType) => {
                const IconComponent = fieldType.icon;
                return (
                  <button
                    key={fieldType.type}
                    onClick={() => addField(fieldType.type)}
                    className="w-full flex items-center gap-3 p-3 text-right border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
                  >
                    <IconComponent size={16} className="text-secondary-600 dark:text-secondary-300" />
                    <span className="text-sm">{fieldType.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Main Builder Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Form Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">إعدادات النموذج</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="اسم النموذج"
                  value={selectedForm.name}
                  onChange={(e) => setSelectedForm({ ...selectedForm, name: e.target.value })}
                />
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    الوصف
                  </label>
                  <textarea
                    value={selectedForm.description}
                    onChange={(e) => setSelectedForm({ ...selectedForm, description: e.target.value })}
                    className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            {/* Form Fields */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">حقول النموذج</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsPreviewOpen(true)}
                  >
                    <Eye size={16} className="ml-2" />
                    معاينة
                  </Button>
                  <Button onClick={saveForm}>
                    <Save size={16} className="ml-2" />
                    حفظ النموذج
                  </Button>
                </div>
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="form-fields">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {selectedForm.fields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4 bg-white dark:bg-secondary-800"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium text-secondary-900 dark:text-white">
                                    {field.label}
                                    {field.required && <span className="text-red-500 mr-1">*</span>}
                                  </h4>
                                  <p className="text-sm text-secondary-600 dark:text-secondary-300">
                                    {fieldTypes.find(f => f.type === field.type)?.label}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => editField(field)}
                                    className="p-1.5 text-secondary-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded"
                                  >
                                    <Settings size={14} />
                                  </button>
                                  <button
                                    onClick={() => duplicateField(field)}
                                    className="p-1.5 text-secondary-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/50 rounded"
                                  >
                                    <Copy size={14} />
                                  </button>
                                  <button
                                    onClick={() => deleteField(field.id)}
                                    className="p-1.5 text-secondary-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 rounded"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                  <div className="p-1.5 text-secondary-400 cursor-move">
                                    <Move size={14} />
                                  </div>
                                </div>
                              </div>
                              <div className="pointer-events-none">
                                {renderField(field)}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {selectedForm.fields.length === 0 && (
                        <div className="text-center py-12 text-secondary-500 dark:text-secondary-400">
                          <FileText size={48} className="mx-auto mb-4 opacity-50" />
                          <p>لا توجد حقول في النموذج</p>
                          <p className="text-sm">اختر نوع الحقل من الشريط الجانبي لإضافته</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedForm(null);
                  setIsEditing(false);
                }}
              >
                إلغاء
              </Button>
              <Button onClick={saveForm}>
                <Save size={16} className="ml-2" />
                {isEditing ? 'تحديث النموذج' : 'إنشاء النموذج'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Field Configuration Modal */}
      <Modal
        isOpen={fieldConfigModal.isOpen}
        onClose={() => setFieldConfigModal({ isOpen: false, field: null, isNew: false })}
        title={fieldConfigModal.isNew ? 'إضافة حقل جديد' : 'تعديل الحقل'}
      >
        {fieldConfigModal.field && (
          <div className="space-y-4">
            <Input
              label="تسمية الحقل"
              value={fieldConfigModal.field.label}
              onChange={(e) => setFieldConfigModal(prev => ({
                ...prev,
                field: prev.field ? { ...prev.field, label: e.target.value } : null
              }))}
            />
            
            <Input
              label="النص التوضيحي"
              value={fieldConfigModal.field.placeholder || ''}
              onChange={(e) => setFieldConfigModal(prev => ({
                ...prev,
                field: prev.field ? { ...prev.field, placeholder: e.target.value } : null
              }))}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="required"
                checked={fieldConfigModal.field.required}
                onChange={(e) => setFieldConfigModal(prev => ({
                  ...prev,
                  field: prev.field ? { ...prev.field, required: e.target.checked } : null
                }))}
              />
              <label htmlFor="required" className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                حقل مطلوب
              </label>
            </div>

            {(fieldConfigModal.field.type === 'radio' || fieldConfigModal.field.type === 'select') && (
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  الخيارات (كل خيار في سطر منفصل)
                </label>
                <textarea
                  value={fieldConfigModal.field.options?.join('\n') || ''}
                  onChange={(e) => setFieldConfigModal(prev => ({
                    ...prev,
                    field: prev.field ? { 
                      ...prev.field, 
                      options: e.target.value.split('\n').filter(Boolean)
                    } : null
                  }))}
                  className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
                  rows={4}
                  placeholder="خيار 1&#10;خيار 2&#10;خيار 3"
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setFieldConfigModal({ isOpen: false, field: null, isNew: false })}
              >
                إلغاء
              </Button>
              <Button onClick={() => fieldConfigModal.field && saveField(fieldConfigModal.field)}>
                {fieldConfigModal.isNew ? 'إضافة' : 'تحديث'}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={`معاينة النموذج - ${selectedForm?.name}`}
      >
        {selectedForm && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                {selectedForm.name}
              </h3>
              {selectedForm.description && (
                <p className="text-secondary-600 dark:text-secondary-300 mb-4">
                  {selectedForm.description}
                </p>
              )}
            </div>

            <form className="space-y-4">
              {selectedForm.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 mr-1">*</span>}
                  </label>
                  {renderField(field, true)}
                </div>
              ))}
              
              <div className="pt-4">
                <Button className="w-full">
                  إرسال النموذج
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FormBuilder;