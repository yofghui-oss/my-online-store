import React, { useState } from 'react';
import { Mail, Plus, Users, Send, Eye, Trash2, Download, Filter } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Subscriber {
  id: string;
  email: string;
  name: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  subscribedAt: Date;
  source: 'website' | 'manual' | 'import';
  tags: string[];
}

interface Campaign {
  id: string;
  subject: string;
  content: string;
  status: 'draft' | 'scheduled' | 'sent';
  recipientCount: number;
  openRate: number;
  clickRate: number;
  createdAt: Date;
  sentAt?: Date;
}

const NewsletterManagement: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: '1',
      email: 'ahmed@example.com',
      name: 'أحمد السالم',
      status: 'active',
      subscribedAt: new Date('2024-01-15'),
      source: 'website',
      tags: ['عميل مميز', 'التجارة الإلكترونية']
    },
    {
      id: '2',
      email: 'fatima@example.com',
      name: 'فاطمة المحمد',
      status: 'active',
      subscribedAt: new Date('2024-01-20'),
      source: 'manual',
      tags: ['مستخدم جديد']
    },
    {
      id: '3',
      email: 'mohammed@example.com',
      name: 'محمد العتيبي',
      status: 'unsubscribed',
      subscribedAt: new Date('2024-01-10'),
      source: 'import',
      tags: ['مطور']
    }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      subject: 'مرحباً بكم في منشئ المتاجر الجديد!',
      content: 'نحن متحمسون لتقديم ميزات جديدة مذهلة...',
      status: 'sent',
      recipientCount: 1250,
      openRate: 68.5,
      clickRate: 12.3,
      createdAt: new Date('2024-01-20'),
      sentAt: new Date('2024-01-21')
    },
    {
      id: '2',
      subject: 'تحديثات جديدة وعروض خاصة',
      content: 'اكتشف أحدث التحديثات والعروض الحصرية...',
      status: 'draft',
      recipientCount: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: new Date('2024-01-25')
    }
  ]);

  const [activeTab, setActiveTab] = useState<'subscribers' | 'campaigns'>('subscribers');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [modalType, setModalType] = useState<'subscriber' | 'campaign'>('subscriber');
  
  const [subscriberForm, setSubscriberForm] = useState({
    email: '',
    name: '',
    tags: ''
  });

  const [campaignForm, setCampaignForm] = useState({
    subject: '',
    content: '',
    recipientFilter: 'all'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'unsubscribed': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'bounced': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'sent': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
      case 'scheduled': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = 
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSubscriber = () => {
    if (!subscriberForm.email || !subscriberForm.name) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newSubscriber: Subscriber = {
      id: (subscribers.length + 1).toString(),
      email: subscriberForm.email,
      name: subscriberForm.name,
      status: 'active',
      subscribedAt: new Date(),
      source: 'manual',
      tags: subscriberForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    setSubscribers([...subscribers, newSubscriber]);
    setSubscriberForm({ email: '', name: '', tags: '' });
    setIsModalOpen(false);
    toast.success('تم إضافة المشترك بنجاح');
  };

  const handleCreateCampaign = () => {
    if (!campaignForm.subject || !campaignForm.content) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const activeSubscribers = subscribers.filter(s => s.status === 'active');
    const newCampaign: Campaign = {
      id: (campaigns.length + 1).toString(),
      subject: campaignForm.subject,
      content: campaignForm.content,
      status: 'draft',
      recipientCount: activeSubscribers.length,
      openRate: 0,
      clickRate: 0,
      createdAt: new Date()
    };

    setCampaigns([...campaigns, newCampaign]);
    setCampaignForm({ subject: '', content: '', recipientFilter: 'all' });
    setIsModalOpen(false);
    toast.success('تم إنشاء الحملة بنجاح');
  };

  const handleDeleteSubscriber = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشترك؟')) {
      setSubscribers(subscribers.filter(s => s.id !== id));
      toast.success('تم حذف المشترك بنجاح');
    }
  };

  const handleSendCampaign = (campaignId: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: 'sent' as const, sentAt: new Date() }
        : campaign
    ));
    toast.success('تم إرسال الحملة بنجاح');
  };

  const exportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "البريد الإلكتروني,الاسم,الحالة,تاريخ الاشتراك,المصدر\n" +
      filteredSubscribers.map(sub => 
        `${sub.email},${sub.name},${sub.status},${sub.subscribedAt.toLocaleDateString('ar-SA')},${sub.source}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('تم تصدير البيانات بنجاح');
  };

  const stats = {
    totalSubscribers: subscribers.length,
    activeSubscribers: subscribers.filter(s => s.status === 'active').length,
    unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length,
    totalCampaigns: campaigns.length,
    sentCampaigns: campaigns.filter(c => c.status === 'sent').length,
    avgOpenRate: campaigns.filter(c => c.status === 'sent').length > 0 
      ? campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + c.openRate, 0) / campaigns.filter(c => c.status === 'sent').length 
      : 0
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة النشرة الإخبارية</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إدارة المشتركين والحملات الإعلانية</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'subscribers' && (
            <Button onClick={exportSubscribers}>
              <Download size={16} className="ml-2" />
              تصدير المشتركين
            </Button>
          )}
          <Button onClick={() => {
            setModalType(activeTab === 'subscribers' ? 'subscriber' : 'campaign');
            setIsModalOpen(true);
          }}>
            <Plus size={16} className="ml-2" />
            {activeTab === 'subscribers' ? 'إضافة مشترك' : 'حملة جديدة'}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">{stats.totalSubscribers}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي المشتركين</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{stats.activeSubscribers}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">نشط</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">{stats.unsubscribed}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">ألغى الاشتراك</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.totalCampaigns}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي الحملات</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600">{stats.sentCampaigns}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">حملات مرسلة</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-orange-600">{stats.avgOpenRate.toFixed(1)}%</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">معدل الفتح</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'subscribers'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
            }`}
          >
            <Users size={16} className="inline ml-2" />
            المشتركين
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'campaigns'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
            }`}
          >
            <Mail size={16} className="inline ml-2" />
            الحملات
          </button>
        </nav>
      </div>

      {activeTab === 'subscribers' && (
        <>
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="البحث بالبريد الإلكتروني أو الاسم..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg 
                            bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="active">نشط</option>
                  <option value="unsubscribed">ألغى الاشتراك</option>
                  <option value="bounced">مرتد</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Subscribers Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50 dark:bg-secondary-800">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      المشترك
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      تاريخ الاشتراك
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      المصدر
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      العلامات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-secondary-900 dark:text-white">{subscriber.name}</div>
                          <div className="text-sm text-secondary-500 dark:text-secondary-400">{subscriber.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscriber.status)}`}>
                          {subscriber.status === 'active' ? 'نشط' : 
                           subscriber.status === 'unsubscribed' ? 'ألغى الاشتراك' : 'مرتد'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                        {subscriber.subscribedAt.toLocaleDateString('ar-SA')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                        {subscriber.source === 'website' ? 'الموقع' : 
                         subscriber.source === 'manual' ? 'يدوي' : 'استيراد'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {subscriber.tags.map((tag, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteSubscriber(subscriber.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{campaign.subject}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status === 'sent' ? 'مرسل' : 
                       campaign.status === 'draft' ? 'مسودة' : 'مجدول'}
                    </span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-300 mb-4">{campaign.content.substring(0, 100)}...</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-secondary-500">المستلمين:</span>
                      <span className="font-medium text-secondary-900 dark:text-white ml-2">{campaign.recipientCount}</span>
                    </div>
                    {campaign.status === 'sent' && (
                      <>
                        <div>
                          <span className="text-secondary-500">معدل الفتح:</span>
                          <span className="font-medium text-green-600 ml-2">{campaign.openRate}%</span>
                        </div>
                        <div>
                          <span className="text-secondary-500">معدل النقر:</span>
                          <span className="font-medium text-blue-600 ml-2">{campaign.clickRate}%</span>
                        </div>
                        <div>
                          <span className="text-secondary-500">تاريخ الإرسال:</span>
                          <span className="font-medium text-secondary-900 dark:text-white ml-2">
                            {campaign.sentAt?.toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {campaign.status === 'draft' && (
                    <Button size="sm" onClick={() => handleSendCampaign(campaign.id)}>
                      <Send size={14} className="ml-1" />
                      إرسال
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Eye size={14} className="ml-1" />
                    معاينة
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'subscriber' ? 'إضافة مشترك جديد' : 'إنشاء حملة جديدة'}
      >
        {modalType === 'subscriber' ? (
          <div className="space-y-4">
            <Input
              label="البريد الإلكتروني"
              type="email"
              value={subscriberForm.email}
              onChange={(e) => setSubscriberForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="أدخل البريد الإلكتروني"
            />
            <Input
              label="الاسم"
              value={subscriberForm.name}
              onChange={(e) => setSubscriberForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="أدخل الاسم"
            />
            <Input
              label="العلامات (مفصولة بفاصلة)"
              value={subscriberForm.tags}
              onChange={(e) => setSubscriberForm(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="عميل مميز, مطور, التجارة الإلكترونية"
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
              <Button onClick={handleAddSubscriber}>إضافة</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="موضوع الحملة"
              value={campaignForm.subject}
              onChange={(e) => setCampaignForm(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="أدخل موضوع الحملة"
            />
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                محتوى الحملة
              </label>
              <textarea
                value={campaignForm.content}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, content: e.target.value }))}
                className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
                rows={6}
                placeholder="أدخل محتوى الحملة"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
              <Button onClick={handleCreateCampaign}>إنشاء</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NewsletterManagement;