import React, { useState, useEffect } from 'react';
import { Save, CreditCard, Key, Settings, CheckCircle, XCircle, Globe, Shield, TrendingUp, Calendar, Eye, EyeOff, RefreshCw, ExternalLink } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-hot-toast';
import { paymobService, PaymobConfig } from '../../services/PaymobService';

interface PaymentTransaction {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  createdAt: string;
  paymobTxnId?: string;
}

const PaymobGateway: React.FC = () => {
  const { currentStore } = useStore();
  
  const [config, setConfig] = useState<PaymobConfig>({
    apiKey: '',
    secretKey: '',
    publicKey: '',
    integrationId: '',
    hmacSecret: '',
    iframeId: '',
    testMode: true,
    webhookUrl: '',
    successUrl: '',
    errorUrl: ''
  });

  useEffect(() => {
    // Auto-generate URLs when store is available
    if (currentStore?.id) {
      setConfig(prev => ({
        ...prev,
        webhookUrl: paymobService.generateWebhookUrl(currentStore.id),
        successUrl: paymobService.generateSuccessUrl(currentStore.id),
        errorUrl: paymobService.generateErrorUrl(currentStore.id)
      }));
    }
  }, [currentStore]);

  const [showSecrets, setShowSecrets] = useState<{[key: string]: boolean}>({
    apiKey: false,
    secretKey: false,
    hmacSecret: false
  });

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'transactions' | 'analytics'>('config');

  const [transactions] = useState<PaymentTransaction[]>([
    {
      id: '1',
      orderId: 'ORD-001',
      amount: 299.00,
      currency: 'EGP',
      status: 'completed',
      customerName: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      paymentMethod: 'فيزا',
      createdAt: '2024-01-15T10:30:00Z',
      paymobTxnId: 'PMB-12345678'
    },
    {
      id: '2',
      orderId: 'ORD-002',
      amount: 150.00,
      currency: 'EGP',
      status: 'pending',
      customerName: 'فاطمة علي',
      customerEmail: 'fatma@example.com',
      paymentMethod: 'محفظة إلكترونية',
      createdAt: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      orderId: 'ORD-003',
      amount: 75.50,
      currency: 'EGP',
      status: 'failed',
      customerName: 'محمد حسن',
      customerEmail: 'mohamed@example.com',
      paymentMethod: 'ماستركارد',
      createdAt: '2024-01-14T16:45:00Z'
    }
  ]);

  const handleConfigChange = (field: keyof PaymobConfig, value: string | boolean) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSecretVisibility = (field: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveConfig = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to save configuration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Basic validation
      if (!config.apiKey || !config.integrationId) {
        toast.error('يرجى ملء البيانات المطلوبة');
        return;
      }

      setIsConnected(true);
      toast.success('تم حفظ إعدادات Paymob بنجاح');
    } catch (error) {
      toast.error('حدث خطأ في حفظ الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      paymobService.setConfig(config);
      const result = await paymobService.testConnection();
      
      if (result.success) {
        setIsConnected(true);
        toast.success('تم الاتصال بـ Paymob بنجاح');
      } else {
        setIsConnected(false);
        toast.error(result.error || 'فشل في الاتصال - تحقق من البيانات');
      }
    } catch (error) {
      setIsConnected(false);
      toast.error('فشل في اختبار الاتصال');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'failed': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'refunded': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      default: return 'text-secondary-600 bg-secondary-100 dark:bg-secondary-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتملة';
      case 'pending': return 'قيد الانتظار';
      case 'failed': return 'فاشلة';
      case 'refunded': return 'مسترد';
      default: return status;
    }
  };

  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">بوابة Paymob</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة وتكوين بوابة الدفع Paymob للمتجر
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
            isConnected 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {isConnected ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {isConnected ? 'متصل' : 'غير متصل'}
          </div>
          <Button onClick={handleSaveConfig} disabled={isLoading}>
            <Save className="h-4 w-4 ml-2" />
            {isLoading ? 'جارٍ الحفظ...' : 'حفظ'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="flex space-x-8" dir="ltr">
          {[
            { id: 'config', name: 'الإعدادات', icon: Settings },
            { id: 'transactions', name: 'المعاملات', icon: CreditCard },
            { id: 'analytics', name: 'التحليلات', icon: TrendingUp }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300 dark:text-secondary-400 dark:hover:text-secondary-300'
                }`}
              >
                <div className="flex items-center gap-2" dir="rtl">
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Configuration Tab */}
      {activeTab === 'config' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
              <Key className="h-5 w-5 text-primary-600" />
              مفاتيح API
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  مفتاح API *
                </label>
                <div className="relative">
                  <Input
                    type={showSecrets.apiKey ? 'text' : 'password'}
                    value={config.apiKey}
                    onChange={(e) => handleConfigChange('apiKey', e.target.value)}
                    placeholder="أدخل مفتاح API الخاص بـ Paymob"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => toggleSecretVisibility('apiKey')}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                  >
                    {showSecrets.apiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  المفتاح السري
                </label>
                <div className="relative">
                  <Input
                    type={showSecrets.secretKey ? 'text' : 'password'}
                    value={config.secretKey}
                    onChange={(e) => handleConfigChange('secretKey', e.target.value)}
                    placeholder="أدخل المفتاح السري"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => toggleSecretVisibility('secretKey')}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                  >
                    {showSecrets.secretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  المفتاح العام
                </label>
                <Input
                  value={config.publicKey}
                  onChange={(e) => handleConfigChange('publicKey', e.target.value)}
                  placeholder="أدخل المفتاح العام"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  معرف التكامل *
                </label>
                <Input
                  value={config.integrationId}
                  onChange={(e) => handleConfigChange('integrationId', e.target.value)}
                  placeholder="أدخل معرف التكامل"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  HMAC Secret
                </label>
                <div className="relative">
                  <Input
                    type={showSecrets.hmacSecret ? 'text' : 'password'}
                    value={config.hmacSecret}
                    onChange={(e) => handleConfigChange('hmacSecret', e.target.value)}
                    placeholder="أدخل HMAC Secret"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => toggleSecretVisibility('hmacSecret')}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                  >
                    {showSecrets.hmacSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary-600" />
              إعدادات التكامل
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  معرف iframe
                </label>
                <Input
                  value={config.iframeId}
                  onChange={(e) => handleConfigChange('iframeId', e.target.value)}
                  placeholder="أدخل معرف iframe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  رابط Webhook
                </label>
                <div className="flex gap-2">
                  <Input
                    value={config.webhookUrl}
                    onChange={(e) => handleConfigChange('webhookUrl', e.target.value)}
                    placeholder="https://yourdomain.com/webhook/paymob"
                    readOnly
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(config.webhookUrl)}
                    title="نسخ الرابط"
                  >
                    📋
                  </Button>
                </div>
                <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                  استخدم هذا الرابط في إعدادات Webhook في لوحة تحكم Paymob
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  رابط النجاح
                </label>
                <div className="flex gap-2">
                  <Input
                    value={config.successUrl}
                    onChange={(e) => handleConfigChange('successUrl', e.target.value)}
                    placeholder="https://yourdomain.com/payment/success"
                    readOnly
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(config.successUrl, '_blank')}
                    title="فتح الرابط"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  رابط الخطأ
                </label>
                <div className="flex gap-2">
                  <Input
                    value={config.errorUrl}
                    onChange={(e) => handleConfigChange('errorUrl', e.target.value)}
                    placeholder="https://yourdomain.com/payment/error"
                    readOnly
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(config.errorUrl, '_blank')}
                    title="فتح الرابط"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  وضع الاختبار
                </label>
                <button
                  onClick={() => handleConfigChange('testMode', !config.testMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.testMode ? 'bg-primary-600' : 'bg-secondary-200 dark:bg-secondary-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.testMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
              <Button 
                variant="outline" 
                onClick={handleTestConnection} 
                disabled={isLoading}
                className="w-full"
              >
                <Shield className="h-4 w-4 ml-2" />
                {isLoading ? 'جارٍ الاختبار...' : 'اختبار الاتصال'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              المعاملات الأخيرة
            </h2>
            <div className="text-sm text-secondary-500 dark:text-secondary-400">
              {totalTransactions} معاملة
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
              <thead className="bg-secondary-50 dark:bg-secondary-800/50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase">
                    رقم الطلب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase">
                    العميل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase">
                    المبلغ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase">
                    طريقة الدفع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase">
                    التاريخ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-secondary-900 divide-y divide-secondary-200 dark:divide-secondary-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900 dark:text-white">
                      {transaction.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500 dark:text-secondary-400">
                      <div>
                        <div className="font-medium text-secondary-900 dark:text-white">
                          {transaction.customerName}
                        </div>
                        <div className="text-secondary-500 dark:text-secondary-400">
                          {transaction.customerEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                      {transaction.amount.toFixed(2)} {transaction.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500 dark:text-secondary-400">
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500 dark:text-secondary-400">
                      {new Date(transaction.createdAt).toLocaleDateString('ar-EG')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  إجمالي المعاملات
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {totalTransactions}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  المعاملات المكتملة
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {completedTransactions}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  إجمالي الإيرادات
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {totalRevenue.toFixed(2)} EGP
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymobGateway;