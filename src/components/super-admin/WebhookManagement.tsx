import React, { useState } from 'react';
import { Webhook, Plus, Edit2, Trash2, Activity, Eye, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  secret: string;
  createdAt: string;
  lastTriggered?: string;
  successRate: number;
}

interface WebhookLog {
  id: string;
  webhookId: string;
  event: string;
  status: 'success' | 'failed' | 'pending';
  responseCode?: number;
  responseTime: number;
  timestamp: string;
  payload: any;
  response?: string;
  error?: string;
}

const WebhookManagement: React.FC = () => {
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
    {
      id: '1',
      name: 'طلب جديد',
      url: 'https://example.com/webhook/order',
      events: ['order.created', 'order.updated'],
      status: 'active',
      secret: 'wh_secret_123',
      createdAt: '2024-01-15',
      lastTriggered: '2024-01-20T10:30:00Z',
      successRate: 98.5
    },
    {
      id: '2',
      name: 'دفع مكتمل',
      url: 'https://example.com/webhook/payment',
      events: ['payment.completed', 'payment.failed'],
      status: 'active',
      secret: 'wh_secret_456',
      createdAt: '2024-01-10',
      lastTriggered: '2024-01-20T09:15:00Z',
      successRate: 95.2
    }
  ]);

  const [logs, setLogs] = useState<WebhookLog[]>([
    {
      id: '1',
      webhookId: '1',
      event: 'order.created',
      status: 'success',
      responseCode: 200,
      responseTime: 245,
      timestamp: '2024-01-20T10:30:00Z',
      payload: { orderId: 'ORD-001', amount: 150.00 }
    },
    {
      id: '2',
      webhookId: '2',
      event: 'payment.completed',
      status: 'success',
      responseCode: 200,
      responseTime: 189,
      timestamp: '2024-01-20T09:15:00Z',
      payload: { paymentId: 'PAY-001', amount: 150.00 }
    },
    {
      id: '3',
      webhookId: '1',
      event: 'order.updated',
      status: 'failed',
      responseCode: 500,
      responseTime: 1500,
      timestamp: '2024-01-20T08:45:00Z',
      payload: { orderId: 'ORD-002', status: 'shipped' },
      error: 'Internal Server Error'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookEndpoint | null>(null);
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null);
  const [isLogDetailModalOpen, setIsLogDetailModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    events: [] as string[],
    secret: ''
  });

  const availableEvents = [
    'order.created',
    'order.updated',
    'order.cancelled',
    'payment.completed',
    'payment.failed',
    'user.registered',
    'product.created',
    'product.updated'
  ];

  const handleCreateWebhook = () => {
    if (!formData.name || !formData.url || formData.events.length === 0) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newWebhook: WebhookEndpoint = {
      id: Date.now().toString(),
      name: formData.name,
      url: formData.url,
      events: formData.events,
      status: 'active',
      secret: formData.secret || `wh_secret_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      successRate: 100
    };

    setWebhooks([...webhooks, newWebhook]);
    toast.success('تم إنشاء الويب هوك بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateWebhook = () => {
    if (!selectedWebhook) return;

    const updatedWebhooks = webhooks.map(webhook =>
      webhook.id === selectedWebhook.id
        ? {
            ...webhook,
            name: formData.name,
            url: formData.url,
            events: formData.events,
            secret: formData.secret
          }
        : webhook
    );

    setWebhooks(updatedWebhooks);
    toast.success('تم تحديث الويب هوك بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteWebhook = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الويب هوك؟')) {
      setWebhooks(webhooks.filter(webhook => webhook.id !== id));
      toast.success('تم حذف الويب هوك بنجاح');
    }
  };

  const handleToggleStatus = (id: string) => {
    const updatedWebhooks = webhooks.map(webhook =>
      webhook.id === id
        ? { ...webhook, status: webhook.status === 'active' ? 'inactive' as const : 'active' as const }
        : webhook
    );
    setWebhooks(updatedWebhooks);
    toast.success('تم تحديث حالة الويب هوك');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      url: '',
      events: [],
      secret: ''
    });
    setSelectedWebhook(null);
  };

  const openEditModal = (webhook: WebhookEndpoint) => {
    setSelectedWebhook(webhook);
    setFormData({
      name: webhook.name,
      url: webhook.url,
      events: webhook.events,
      secret: webhook.secret
    });
    setIsModalOpen(true);
  };

  const viewLogs = (webhook: WebhookEndpoint) => {
    setSelectedWebhook(webhook);
    setIsLogsModalOpen(true);
  };

  const viewLogDetail = (log: WebhookLog) => {
    setSelectedLog(log);
    setIsLogDetailModalOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ar-SA');
  };

  const getWebhookLogs = (webhookId: string) => {
    return logs.filter(log => log.webhookId === webhookId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة خطاف الويب</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة نقاط نهاية الويب هوك ومراقبة الأحداث
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إنشاء ويب هوك جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webhooks.map((webhook) => (
          <Card key={webhook.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Webhook className="h-5 w-5 text-primary-500" />
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  {webhook.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    webhook.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                  }`}
                >
                  {webhook.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">الرابط:</p>
                <p className="text-sm text-secondary-900 dark:text-white truncate">{webhook.url}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">الأحداث:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {webhook.events.map((event) => (
                    <span
                      key={event}
                      className="inline-flex px-2 py-1 text-xs bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200 rounded"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">معدل النجاح:</p>
                <p className="text-sm font-semibold text-green-600">{webhook.successRate}%</p>
              </div>
              {webhook.lastTriggered && (
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">آخر تفعيل:</p>
                  <p className="text-sm text-secondary-900 dark:text-white">
                    {formatTimestamp(webhook.lastTriggered)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditModal(webhook)}
                className="flex-1"
              >
                <Edit2 className="h-4 w-4 ml-1" />
                تعديل
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => viewLogs(webhook)}
                className="flex-1"
              >
                <Activity className="h-4 w-4 ml-1" />
                السجلات
              </Button>
              <Button
                variant={webhook.status === 'active' ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => handleToggleStatus(webhook.id)}
              >
                {webhook.status === 'active' ? 'تعطيل' : 'تفعيل'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteWebhook(webhook.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Webhook Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={selectedWebhook ? 'تعديل الويب هوك' : 'إنشاء ويب هوك جديد'}
      >
        <div className="space-y-4">
          <Input
            label="اسم الويب هوك"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="أدخل اسم الويب هوك"
            required
          />
          <Input
            label="رابط الويب هوك"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://example.com/webhook"
            required
          />
          <Input
            label="السر (اختياري)"
            value={formData.secret}
            onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
            placeholder="سيتم إنشاؤه تلقائياً إذا ترك فارغاً"
          />
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الأحداث *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableEvents.map((event) => (
                <label key={event} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.events.includes(event)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          events: [...formData.events, event]
                        });
                      } else {
                        setFormData({
                          ...formData,
                          events: formData.events.filter(e => e !== event)
                        });
                      }
                    }}
                    className="ml-2"
                  />
                  <span className="text-sm text-secondary-700 dark:text-secondary-300">
                    {event}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedWebhook ? handleUpdateWebhook : handleCreateWebhook}
              className="flex-1"
            >
              {selectedWebhook ? 'تحديث' : 'إنشاء'}
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

      {/* Webhook Logs Modal */}
      <Modal
        isOpen={isLogsModalOpen}
        onClose={() => setIsLogsModalOpen(false)}
        title={`سجلات الويب هوك - ${selectedWebhook?.name}`}
        size="lg"
      >
        <div className="space-y-4">
          {getWebhookLogs(selectedWebhook?.id || '').length === 0 ? (
            <div className="text-center py-8 text-secondary-500 dark:text-secondary-400">
              لا توجد سجلات متاحة
            </div>
          ) : (
            <div className="space-y-2">
              {getWebhookLogs(selectedWebhook?.id || '').map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg cursor-pointer hover:bg-secondary-100 dark:hover:bg-secondary-800"
                  onClick={() => viewLogDetail(log)}
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(log.status)}
                    <div>
                      <p className="text-sm font-medium text-secondary-900 dark:text-white">
                        {log.event}
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        {formatTimestamp(log.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    {log.responseCode && (
                      <p className="text-sm text-secondary-700 dark:text-secondary-300">
                        {log.responseCode}
                      </p>
                    )}
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      {log.responseTime}ms
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* Log Detail Modal */}
      <Modal
        isOpen={isLogDetailModalOpen}
        onClose={() => setIsLogDetailModalOpen(false)}
        title="تفاصيل السجل"
        size="lg"
      >
        {selectedLog && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">الحدث:</p>
                <p className="text-sm text-secondary-900 dark:text-white">{selectedLog.event}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">الحالة:</p>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedLog.status)}
                  <span className="text-sm text-secondary-900 dark:text-white">{selectedLog.status}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">كود الاستجابة:</p>
                <p className="text-sm text-secondary-900 dark:text-white">{selectedLog.responseCode || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">وقت الاستجابة:</p>
                <p className="text-sm text-secondary-900 dark:text-white">{selectedLog.responseTime}ms</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">التوقيت:</p>
                <p className="text-sm text-secondary-900 dark:text-white">{formatTimestamp(selectedLog.timestamp)}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">البيانات المرسلة:</p>
              <pre className="bg-secondary-100 dark:bg-secondary-800 p-3 rounded-lg text-xs overflow-x-auto">
                {JSON.stringify(selectedLog.payload, null, 2)}
              </pre>
            </div>

            {selectedLog.error && (
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">الخطأ:</p>
                <p className="text-sm bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 p-3 rounded-lg">
                  {selectedLog.error}
                </p>
              </div>
            )}

            {selectedLog.response && (
              <div>
                <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">الاستجابة:</p>
                <pre className="bg-secondary-100 dark:bg-secondary-800 p-3 rounded-lg text-xs overflow-x-auto">
                  {selectedLog.response}
                </pre>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WebhookManagement;