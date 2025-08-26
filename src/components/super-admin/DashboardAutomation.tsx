import React, { useState } from 'react';
import { Bot, Plus, Play, Pause, Edit2, Trash2, Clock, Zap, Settings, Check, X } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'order_created' | 'user_registered' | 'payment_completed' | 'low_stock' | 'inactive_user';
    conditions: any;
  };
  actions: {
    type: 'send_email' | 'send_sms' | 'create_coupon' | 'assign_role' | 'send_notification';
    parameters: any;
  }[];
  status: 'active' | 'inactive';
  lastRun?: string;
  timesExecuted: number;
  createdAt: string;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'marketing' | 'customer_service' | 'sales' | 'admin';
  triggers: string[];
  actions: string[];
}

const DashboardAutomation: React.FC = () => {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'ترحيب بالعضو الجديد',
      description: 'إرسال رسالة ترحيب عند تسجيل عضو جديد',
      trigger: {
        type: 'user_registered',
        conditions: {}
      },
      actions: [
        {
          type: 'send_email',
          parameters: {
            template: 'welcome_email',
            subject: 'مرحباً بك في منصتنا'
          }
        }
      ],
      status: 'active',
      lastRun: '2024-01-20T10:30:00Z',
      timesExecuted: 45,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'تنبيه نفاد المخزون',
      description: 'إرسال تنبيه عند انخفاض كمية المنتج',
      trigger: {
        type: 'low_stock',
        conditions: {
          threshold: 5
        }
      },
      actions: [
        {
          type: 'send_notification',
          parameters: {
            message: 'كمية المنتج منخفضة',
            recipients: ['admin']
          }
        }
      ],
      status: 'active',
      lastRun: '2024-01-19T14:20:00Z',
      timesExecuted: 12,
      createdAt: '2024-01-10'
    }
  ]);

  const [templates] = useState<WorkflowTemplate[]>([
    {
      id: '1',
      name: 'حملة ترحيب العملاء',
      description: 'سلسلة رسائل ترحيب تلقائية للعملاء الجدد',
      category: 'marketing',
      triggers: ['user_registered'],
      actions: ['send_email', 'assign_role']
    },
    {
      id: '2',
      name: 'استرداد السلة المتروكة',
      description: 'تذكير العملاء بالمنتجات في سلة التسوق',
      category: 'sales',
      triggers: ['cart_abandoned'],
      actions: ['send_email', 'create_coupon']
    },
    {
      id: '3',
      name: 'دعم العملاء التلقائي',
      description: 'استجابة تلقائية لاستفسارات العملاء',
      category: 'customer_service',
      triggers: ['ticket_created'],
      actions: ['send_notification', 'assign_role']
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [activeTab, setActiveTab] = useState<'rules' | 'templates' | 'logs'>('rules');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    triggerType: 'order_created' as const,
    actionType: 'send_email' as const,
    conditions: {},
    parameters: {}
  });

  const triggerTypes = [
    { value: 'order_created', label: 'طلب جديد' },
    { value: 'user_registered', label: 'عضو جديد' },
    { value: 'payment_completed', label: 'دفعة مكتملة' },
    { value: 'low_stock', label: 'مخزون منخفض' },
    { value: 'inactive_user', label: 'عضو غير نشط' }
  ];

  const actionTypes = [
    { value: 'send_email', label: 'إرسال بريد إلكتروني' },
    { value: 'send_sms', label: 'إرسال رسالة نصية' },
    { value: 'create_coupon', label: 'إنشاء قسيمة' },
    { value: 'assign_role', label: 'تعيين دور' },
    { value: 'send_notification', label: 'إرسال إشعار' }
  ];

  const handleCreateRule = () => {
    if (!formData.name || !formData.description) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newRule: AutomationRule = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      trigger: {
        type: formData.triggerType,
        conditions: formData.conditions
      },
      actions: [{
        type: formData.actionType,
        parameters: formData.parameters
      }],
      status: 'active',
      timesExecuted: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAutomationRules([...automationRules, newRule]);
    toast.success('تم إنشاء قاعدة الأتمتة بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleToggleStatus = (id: string) => {
    const updatedRules = automationRules.map(rule =>
      rule.id === id
        ? { ...rule, status: rule.status === 'active' ? 'inactive' as const : 'active' as const }
        : rule
    );
    setAutomationRules(updatedRules);
    toast.success('تم تحديث حالة القاعدة');
  };

  const handleDeleteRule = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه القاعدة؟')) {
      setAutomationRules(automationRules.filter(rule => rule.id !== id));
      toast.success('تم حذف القاعدة بنجاح');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      triggerType: 'order_created',
      actionType: 'send_email',
      conditions: {},
      parameters: {}
    });
    setSelectedRule(null);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ar-SA');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'marketing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400';
      case 'customer_service':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'sales':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400';
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">أتمتة لوحة التحكم</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة قواعد الأتمتة وسير العمل التلقائي
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إنشاء قاعدة جديدة
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex gap-8">
          {[
            { id: 'rules', label: 'قواعد الأتمتة', icon: Bot },
            { id: 'templates', label: 'القوالب', icon: Settings },
            { id: 'logs', label: 'سجل التنفيذ', icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automationRules.map((rule) => (
            <Card key={rule.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                    {rule.name}
                  </h3>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    rule.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                  }`}
                >
                  {rule.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-4">
                {rule.description}
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">المحفز:</p>
                  <p className="text-sm text-secondary-900 dark:text-white">
                    {triggerTypes.find(t => t.value === rule.trigger.type)?.label}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">الإجراءات:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {rule.actions.map((action, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200 rounded"
                      >
                        {actionTypes.find(a => a.value === action.type)?.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">مرات التنفيذ:</p>
                    <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                      {rule.timesExecuted}
                    </p>
                  </div>
                  {rule.lastRun && (
                    <div>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">آخر تنفيذ:</p>
                      <p className="text-xs text-secondary-900 dark:text-white">
                        {formatTimestamp(rule.lastRun)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(rule.id)}
                  className="flex-1"
                >
                  {rule.status === 'active' ? (
                    <Pause className="h-4 w-4 ml-1" />
                  ) : (
                    <Play className="h-4 w-4 ml-1" />
                  )}
                  {rule.status === 'active' ? 'إيقاف' : 'تشغيل'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {}}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteRule(rule.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  {template.name}
                </h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(template.category)}`}>
                  {template.category === 'marketing' && 'تسويق'}
                  {template.category === 'customer_service' && 'خدمة العملاء'}
                  {template.category === 'sales' && 'مبيعات'}
                  {template.category === 'admin' && 'إدارة'}
                </span>
              </div>

              <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-4">
                {template.description}
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">المحفزات:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.triggers.map((trigger, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400 rounded"
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">الإجراءات:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.actions.map((action, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400 rounded"
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => toast.success('سيتم إضافة هذه الميزة قريباً')}
              >
                <Zap className="h-4 w-4 ml-2" />
                استخدام القالب
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            سجل تنفيذ قواعد الأتمتة
          </h3>
          <div className="space-y-4">
            {[
              {
                id: '1',
                rule: 'ترحيب بالعضو الجديد',
                status: 'success',
                timestamp: '2024-01-20T10:30:00Z',
                details: 'تم إرسال رسالة ترحيب للعضو الجديد'
              },
              {
                id: '2',
                rule: 'تنبيه نفاد المخزون',
                status: 'success',
                timestamp: '2024-01-19T14:20:00Z',
                details: 'تم إرسال تنبيه نفاد المخزون للمشرف'
              },
              {
                id: '3',
                rule: 'ترحيب بالعضو الجديد',
                status: 'failed',
                timestamp: '2024-01-19T09:15:00Z',
                details: 'فشل في إرسال رسالة الترحيب - خطأ في الخادم'
              }
            ].map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {log.status === 'success' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-secondary-900 dark:text-white">
                      {log.rule}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      {log.details}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">
                    {formatTimestamp(log.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Create Rule Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title="إنشاء قاعدة أتمتة جديدة"
      >
        <div className="space-y-4">
          <Input
            label="اسم القاعدة"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="أدخل اسم القاعدة"
            required
          />
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الوصف
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
              rows={3}
              placeholder="وصف مختصر للقاعدة"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              المحفز
            </label>
            <select
              value={formData.triggerType}
              onChange={(e) => setFormData({ ...formData, triggerType: e.target.value as any })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
            >
              {triggerTypes.map((trigger) => (
                <option key={trigger.value} value={trigger.value}>
                  {trigger.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الإجراء
            </label>
            <select
              value={formData.actionType}
              onChange={(e) => setFormData({ ...formData, actionType: e.target.value as any })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
            >
              {actionTypes.map((action) => (
                <option key={action.value} value={action.value}>
                  {action.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={handleCreateRule} className="flex-1">
              إنشاء القاعدة
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

export default DashboardAutomation;