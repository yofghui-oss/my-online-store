import React, { useState } from 'react';
import { MessageSquare, Send, Settings, Eye, Trash2, Plus, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface SMSProvider {
  id: string;
  name: string;
  provider: 'twilio' | 'nexmo' | 'aws-sns' | 'local';
  isActive: boolean;
  apiKey: string;
  apiSecret: string;
  senderId: string;
  credits: number;
  ratePerSMS: number;
  lastUsed: Date;
  totalSent: number;
}

interface SMSMessage {
  id: string;
  recipient: string;
  message: string;
  status: 'sent' | 'delivered' | 'failed' | 'pending';
  provider: string;
  sentAt: Date;
  deliveredAt?: Date;
  cost: number;
  type: 'verification' | 'marketing' | 'notification' | 'alert';
}

const SMSGatewayManagement: React.FC = () => {
  const [providers, setProviders] = useState<SMSProvider[]>([
    {
      id: '1',
      name: 'Twilio الأساسي',
      provider: 'twilio',
      isActive: true,
      apiKey: 'AC*********************',
      apiSecret: '*********************',
      senderId: 'StoreBuilder',
      credits: 1250,
      ratePerSMS: 0.05,
      lastUsed: new Date('2024-01-20'),
      totalSent: 5420
    },
    {
      id: '2',
      name: 'AWS SNS',
      provider: 'aws-sns',
      isActive: false,
      apiKey: 'AKIA******************',
      apiSecret: '*********************',
      senderId: 'StoreBuilder',
      credits: 800,
      ratePerSMS: 0.04,
      lastUsed: new Date('2024-01-15'),
      totalSent: 2130
    }
  ]);

  const [messages, setMessages] = useState<SMSMessage[]>([
    {
      id: '1',
      recipient: '+966501234567',
      message: 'رمز التحقق الخاص بك هو: 123456',
      status: 'delivered',
      provider: 'Twilio الأساسي',
      sentAt: new Date('2024-01-20T10:30:00'),
      deliveredAt: new Date('2024-01-20T10:30:15'),
      cost: 0.05,
      type: 'verification'
    },
    {
      id: '2',
      recipient: '+966509876543',
      message: 'تم إنشاء متجرك بنجاح! مرحباً بك في منشئ المتاجر',
      status: 'sent',
      provider: 'Twilio الأساسي',
      sentAt: new Date('2024-01-20T09:15:00'),
      cost: 0.05,
      type: 'notification'
    },
    {
      id: '3',
      recipient: '+966551122334',
      message: 'عرض خاص! خصم 20% على جميع الباقات. استخدم الكود: SAVE20',
      status: 'failed',
      provider: 'AWS SNS',
      sentAt: new Date('2024-01-19T16:45:00'),
      cost: 0.04,
      type: 'marketing'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'providers' | 'messages' | 'send'>('providers');
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<SMSProvider | null>(null);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const [providerForm, setProviderForm] = useState({
    name: '',
    provider: 'twilio' as SMSProvider['provider'],
    apiKey: '',
    apiSecret: '',
    senderId: ''
  });

  const [sendForm, setSendForm] = useState({
    recipients: '',
    message: '',
    type: 'notification' as SMSMessage['type'],
    provider: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'sent': return 'text-blue-600';
      case 'failed': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'sent': return <MessageSquare size={16} className="text-blue-500" />;
      case 'failed': return <XCircle size={16} className="text-red-500" />;
      case 'pending': return <AlertTriangle size={16} className="text-yellow-500" />;
      default: return <MessageSquare size={16} className="text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'verification': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'marketing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
      case 'notification': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'alert': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const handleAddProvider = () => {
    setEditingProvider(null);
    setProviderForm({
      name: '',
      provider: 'twilio',
      apiKey: '',
      apiSecret: '',
      senderId: ''
    });
    setIsProviderModalOpen(true);
  };

  const handleEditProvider = (provider: SMSProvider) => {
    setEditingProvider(provider);
    setProviderForm({
      name: provider.name,
      provider: provider.provider,
      apiKey: provider.apiKey,
      apiSecret: provider.apiSecret,
      senderId: provider.senderId
    });
    setIsProviderModalOpen(true);
  };

  const handleSaveProvider = () => {
    if (!providerForm.name || !providerForm.apiKey || !providerForm.senderId) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (editingProvider) {
      setProviders(providers.map(provider => 
        provider.id === editingProvider.id 
          ? { ...provider, ...providerForm, lastUsed: new Date() }
          : provider
      ));
      toast.success('تم تحديث مزود الخدمة بنجاح');
    } else {
      const newProvider: SMSProvider = {
        id: (providers.length + 1).toString(),
        ...providerForm,
        isActive: false,
        credits: 0,
        ratePerSMS: 0.05,
        lastUsed: new Date(),
        totalSent: 0
      };
      setProviders([...providers, newProvider]);
      toast.success('تم إضافة مزود الخدمة بنجاح');
    }

    setIsProviderModalOpen(false);
    setEditingProvider(null);
  };

  const handleToggleProvider = (providerId: string) => {
    setProviders(providers.map(provider => ({
      ...provider,
      isActive: provider.id === providerId ? !provider.isActive : provider.isActive
    })));
    
    const provider = providers.find(p => p.id === providerId);
    toast.success(`تم ${provider?.isActive ? 'تعطيل' : 'تفعيل'} مزود الخدمة بنجاح`);
  };

  const handleDeleteProvider = (providerId: string) => {
    if (window.confirm('هل أنت متأكد من حذف مزود الخدمة؟')) {
      setProviders(providers.filter(p => p.id !== providerId));
      toast.success('تم حذف مزود الخدمة بنجاح');
    }
  };

  const handleSendSMS = () => {
    if (!sendForm.recipients || !sendForm.message || !sendForm.provider) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // In real app, this would send the SMS
    const recipients = sendForm.recipients.split(',').map(r => r.trim());
    
    recipients.forEach(recipient => {
      const newMessage: SMSMessage = {
        id: Date.now().toString() + Math.random(),
        recipient,
        message: sendForm.message,
        status: 'sent',
        provider: sendForm.provider,
        sentAt: new Date(),
        cost: 0.05,
        type: sendForm.type
      };
      setMessages(prev => [newMessage, ...prev]);
    });

    toast.success(`تم إرسال ${recipients.length} رسالة بنجاح`);
    setIsSendModalOpen(false);
    setSendForm({
      recipients: '',
      message: '',
      type: 'notification',
      provider: ''
    });
  };

  const getTotalStats = () => {
    const totalCredits = providers.reduce((sum, p) => sum + p.credits, 0);
    const totalSent = messages.length;
    const totalCost = messages.reduce((sum, m) => sum + m.cost, 0);
    const successRate = messages.length > 0 
      ? (messages.filter(m => m.status === 'delivered' || m.status === 'sent').length / messages.length) * 100 
      : 0;

    return {
      totalCredits,
      totalSent,
      totalCost,
      successRate,
      activeProviders: providers.filter(p => p.isActive).length
    };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة بوابة الرسائل النصية</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إدارة مزودي خدمة الرسائل النصية والإرسال</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsSendModalOpen(true)}>
            <Send size={16} className="ml-2" />
            إرسال رسالة
          </Button>
          {activeTab === 'providers' && (
            <Button onClick={handleAddProvider}>
              <Plus size={16} className="ml-2" />
              إضافة مزود
            </Button>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">{stats.activeProviders}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">مزودين نشطين</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.totalCredits.toLocaleString()}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي الرصيد</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{stats.totalSent}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">الرسائل المرسلة</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600">{stats.totalCost.toFixed(2)} ريال</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي التكلفة</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-orange-600">{stats.successRate.toFixed(1)}%</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">معدل النجاح</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
          <button
            onClick={() => setActiveTab('providers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'providers'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
            }`}
          >
            <Settings size={16} className="inline ml-2" />
            مزودي الخدمة
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
            }`}
          >
            <MessageSquare size={16} className="inline ml-2" />
            سجل الرسائل
          </button>
        </nav>
      </div>

      {activeTab === 'providers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {providers.map((provider) => (
            <Card key={provider.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                    {provider.name}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      provider.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                    }`}>
                      {provider.isActive ? 'نشط' : 'معطل'}
                    </span>
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300 capitalize">
                    {provider.provider}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-secondary-500">الرصيد:</span>
                    <span className="font-medium text-secondary-900 dark:text-white ml-2">
                      {provider.credits.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary-500">التكلفة:</span>
                    <span className="font-medium text-secondary-900 dark:text-white ml-2">
                      {provider.ratePerSMS} ريال
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary-500">المرسل:</span>
                    <span className="font-medium text-secondary-900 dark:text-white ml-2">
                      {provider.senderId}
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary-500">المرسل:</span>
                    <span className="font-medium text-secondary-900 dark:text-white ml-2">
                      {provider.totalSent.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-secondary-500 dark:text-secondary-400">
                  آخر استخدام: {provider.lastUsed.toLocaleDateString('ar-SA')}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleToggleProvider(provider.id)}
                  variant={provider.isActive ? 'outline' : 'default'}
                >
                  {provider.isActive ? 'تعطيل' : 'تفعيل'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditProvider(provider)}
                >
                  <Settings size={14} className="ml-1" />
                  إعدادات
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteProvider(provider.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'messages' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 dark:bg-secondary-800">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                    المستلم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                    الرسالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                    النوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                    المزود
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                    التكلفة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                    تاريخ الإرسال
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                {messages.map((message) => (
                  <tr key={message.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900 dark:text-white">
                      {message.recipient}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-900 dark:text-white max-w-xs truncate">
                      {message.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(message.type)}`}>
                        {message.type === 'verification' ? 'تحقق' :
                         message.type === 'marketing' ? 'تسويق' :
                         message.type === 'notification' ? 'إشعار' : 'تنبيه'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(message.status)}
                        <span className={`text-sm font-medium ${getStatusColor(message.status)}`}>
                          {message.status === 'delivered' ? 'تم التسليم' :
                           message.status === 'sent' ? 'مرسل' :
                           message.status === 'failed' ? 'فشل' : 'معلق'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                      {message.provider}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                      {message.cost.toFixed(2)} ريال
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                      {message.sentAt.toLocaleDateString('ar-SA')}
                      <br />
                      <span className="text-xs text-secondary-500">
                        {message.sentAt.toLocaleTimeString('ar-SA')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Provider Modal */}
      <Modal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        title={editingProvider ? 'تعديل مزود الخدمة' : 'إضافة مزود جديد'}
      >
        <div className="space-y-4">
          <Input
            label="اسم المزود"
            value={providerForm.name}
            onChange={(e) => setProviderForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="مثال: Twilio الأساسي"
          />
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              نوع المزود
            </label>
            <select
              value={providerForm.provider}
              onChange={(e) => setProviderForm(prev => ({ ...prev, provider: e.target.value as SMSProvider['provider'] }))}
              className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
            >
              <option value="twilio">Twilio</option>
              <option value="nexmo">Nexmo</option>
              <option value="aws-sns">AWS SNS</option>
              <option value="local">محلي</option>
            </select>
          </div>

          <Input
            label="مفتاح API"
            value={providerForm.apiKey}
            onChange={(e) => setProviderForm(prev => ({ ...prev, apiKey: e.target.value }))}
            placeholder="أدخل مفتاح API"
          />

          <Input
            label="سر API"
            type="password"
            value={providerForm.apiSecret}
            onChange={(e) => setProviderForm(prev => ({ ...prev, apiSecret: e.target.value }))}
            placeholder="أدخل سر API"
          />

          <Input
            label="هوية المرسل"
            value={providerForm.senderId}
            onChange={(e) => setProviderForm(prev => ({ ...prev, senderId: e.target.value }))}
            placeholder="StoreBuilder"
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsProviderModalOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveProvider}>
              {editingProvider ? 'تحديث' : 'إضافة'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Send SMS Modal */}
      <Modal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        title="إرسال رسالة نصية"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              المزود
            </label>
            <select
              value={sendForm.provider}
              onChange={(e) => setSendForm(prev => ({ ...prev, provider: e.target.value }))}
              className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
            >
              <option value="">اختر المزود</option>
              {providers.filter(p => p.isActive).map(provider => (
                <option key={provider.id} value={provider.name}>{provider.name}</option>
              ))}
            </select>
          </div>

          <Input
            label="أرقام المستلمين (مفصولة بفاصلة)"
            value={sendForm.recipients}
            onChange={(e) => setSendForm(prev => ({ ...prev, recipients: e.target.value }))}
            placeholder="+966501234567, +966509876543"
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              نوع الرسالة
            </label>
            <select
              value={sendForm.type}
              onChange={(e) => setSendForm(prev => ({ ...prev, type: e.target.value as SMSMessage['type'] }))}
              className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
            >
              <option value="notification">إشعار</option>
              <option value="verification">تحقق</option>
              <option value="marketing">تسويق</option>
              <option value="alert">تنبيه</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              نص الرسالة
            </label>
            <textarea
              value={sendForm.message}
              onChange={(e) => setSendForm(prev => ({ ...prev, message: e.target.value }))}
              className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
              rows={4}
              placeholder="أدخل نص الرسالة هنا..."
            />
            <div className="text-xs text-secondary-500 mt-1">
              {sendForm.message.length} / 160 حرف
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsSendModalOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSendSMS}>
              <Send size={16} className="ml-2" />
              إرسال
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SMSGatewayManagement;