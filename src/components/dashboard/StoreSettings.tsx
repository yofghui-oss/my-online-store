import React, { useState } from 'react';
import { Save, Globe, Mail, Phone, MapPin, Clock, CreditCard, Truck, Shield } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-hot-toast';

interface StoreConfig {
  general: {
    storeName: string;
    storeDescription: string;
    storeEmail: string;
    storePhone: string;
    storeAddress: string;
    storeCity: string;
    storeCountry: string;
    storeZip: string;
    currency: string;
    timezone: string;
    language: string;
  };
  business: {
    businessType: string;
    taxNumber: string;
    registrationNumber: string;
    vatEnabled: boolean;
    vatRate: number;
    invoicePrefix: string;
    orderPrefix: string;
  };
  shipping: {
    freeShippingThreshold: number;
    defaultShippingCost: number;
    shippingCalculation: 'flat' | 'weight' | 'price';
    maxShippingDays: number;
    internationalShipping: boolean;
  };
  payment: {
    enableCash: boolean;
    enableCard: boolean;
    enableBank: boolean;
    enableWallet: boolean;
    minimumOrderAmount: number;
    maximumOrderAmount: number;
  };
  notifications: {
    emailOrderConfirmation: boolean;
    emailPaymentConfirmation: boolean;
    emailShippingUpdate: boolean;
    smsOrderConfirmation: boolean;
    smsPaymentConfirmation: boolean;
    smsShippingUpdate: boolean;
  };
  security: {
    enableSSL: boolean;
    enableTwoFactor: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    enableCaptcha: boolean;
  };
}

const StoreSettings: React.FC = () => {
  const { currentStore } = useStore();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setSaving] = useState(false);

  const [settings, setSettings] = useState<StoreConfig>({
    general: {
      storeName: currentStore?.name || 'متجري الإلكتروني',
      storeDescription: 'متجر إلكتروني متميز يقدم أفضل المنتجات',
      storeEmail: 'info@mystore.com',
      storePhone: '+966501234567',
      storeAddress: 'شارع الملك فهد',
      storeCity: 'الرياض',
      storeCountry: 'المملكة العربية السعودية',
      storeZip: '12345',
      currency: 'SAR',
      timezone: 'Asia/Riyadh',
      language: 'ar'
    },
    business: {
      businessType: 'retail',
      taxNumber: '123456789',
      registrationNumber: 'CR-987654321',
      vatEnabled: true,
      vatRate: 15,
      invoicePrefix: 'INV',
      orderPrefix: 'ORD'
    },
    shipping: {
      freeShippingThreshold: 300,
      defaultShippingCost: 25,
      shippingCalculation: 'flat',
      maxShippingDays: 7,
      internationalShipping: false
    },
    payment: {
      enableCash: true,
      enableCard: true,
      enableBank: true,
      enableWallet: false,
      minimumOrderAmount: 50,
      maximumOrderAmount: 10000
    },
    notifications: {
      emailOrderConfirmation: true,
      emailPaymentConfirmation: true,
      emailShippingUpdate: true,
      smsOrderConfirmation: true,
      smsPaymentConfirmation: false,
      smsShippingUpdate: true
    },
    security: {
      enableSSL: true,
      enableTwoFactor: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      enableCaptcha: true
    }
  });

  const tabs = [
    { id: 'general', name: 'عام', icon: Globe },
    { id: 'business', name: 'الأعمال', icon: CreditCard },
    { id: 'shipping', name: 'الشحن', icon: Truck },
    { id: 'payment', name: 'الدفع', icon: CreditCard },
    { id: 'notifications', name: 'الإشعارات', icon: Mail },
    { id: 'security', name: 'الأمان', icon: Shield }
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('تم حفظ الإعدادات بنجاح');
    } catch (error) {
      toast.error('فشل في حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const updateGeneralSettings = (field: string, value: any) => {
    setSettings({
      ...settings,
      general: { ...settings.general, [field]: value }
    });
  };

  const updateBusinessSettings = (field: string, value: any) => {
    setSettings({
      ...settings,
      business: { ...settings.business, [field]: value }
    });
  };

  const updateShippingSettings = (field: string, value: any) => {
    setSettings({
      ...settings,
      shipping: { ...settings.shipping, [field]: value }
    });
  };

  const updatePaymentSettings = (field: string, value: any) => {
    setSettings({
      ...settings,
      payment: { ...settings.payment, [field]: value }
    });
  };

  const updateNotificationSettings = (field: string, value: any) => {
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [field]: value }
    });
  };

  const updateSecuritySettings = (field: string, value: any) => {
    setSettings({
      ...settings,
      security: { ...settings.security, [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إعدادات المتجر</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة الإعدادات العامة للمتجر والتكوينات
          </p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 ml-2" />
          {loading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex gap-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              معلومات المتجر الأساسية
            </h3>
            <div className="space-y-4">
              <Input
                label="اسم المتجر"
                value={settings.general.storeName}
                onChange={(e) => updateGeneralSettings('storeName', e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  وصف المتجر
                </label>
                <textarea
                  value={settings.general.storeDescription}
                  onChange={(e) => updateGeneralSettings('storeDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                  rows={3}
                />
              </div>
              <Input
                label="البريد الإلكتروني"
                type="email"
                value={settings.general.storeEmail}
                onChange={(e) => updateGeneralSettings('storeEmail', e.target.value)}
                required
              />
              <Input
                label="رقم الهاتف"
                value={settings.general.storePhone}
                onChange={(e) => updateGeneralSettings('storePhone', e.target.value)}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              العنوان والموقع
            </h3>
            <div className="space-y-4">
              <Input
                label="العنوان"
                value={settings.general.storeAddress}
                onChange={(e) => updateGeneralSettings('storeAddress', e.target.value)}
              />
              <Input
                label="المدينة"
                value={settings.general.storeCity}
                onChange={(e) => updateGeneralSettings('storeCity', e.target.value)}
              />
              <Input
                label="الدولة"
                value={settings.general.storeCountry}
                onChange={(e) => updateGeneralSettings('storeCountry', e.target.value)}
              />
              <Input
                label="الرمز البريدي"
                value={settings.general.storeZip}
                onChange={(e) => updateGeneralSettings('storeZip', e.target.value)}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              الإعدادات الإقليمية
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  العملة
                </label>
                <select
                  value={settings.general.currency}
                  onChange={(e) => updateGeneralSettings('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                  <option value="EUR">يورو (EUR)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  المنطقة الزمنية
                </label>
                <select
                  value={settings.general.timezone}
                  onChange={(e) => updateGeneralSettings('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                >
                  <option value="Asia/Riyadh">الرياض</option>
                  <option value="Asia/Dubai">دبي</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  اللغة الافتراضية
                </label>
                <select
                  value={settings.general.language}
                  onChange={(e) => updateGeneralSettings('language', e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Business Settings */}
      {activeTab === 'business' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              معلومات العمل
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  نوع النشاط التجاري
                </label>
                <select
                  value={settings.business.businessType}
                  onChange={(e) => updateBusinessSettings('businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
                >
                  <option value="retail">تجارة تجزئة</option>
                  <option value="wholesale">تجارة جملة</option>
                  <option value="services">خدمات</option>
                  <option value="manufacturing">تصنيع</option>
                </select>
              </div>
              <Input
                label="الرقم الضريبي"
                value={settings.business.taxNumber}
                onChange={(e) => updateBusinessSettings('taxNumber', e.target.value)}
              />
              <Input
                label="رقم السجل التجاري"
                value={settings.business.registrationNumber}
                onChange={(e) => updateBusinessSettings('registrationNumber', e.target.value)}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              إعدادات الضرائب
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="vatEnabled"
                  checked={settings.business.vatEnabled}
                  onChange={(e) => updateBusinessSettings('vatEnabled', e.target.checked)}
                  className="ml-2"
                />
                <label htmlFor="vatEnabled" className="text-sm text-secondary-700 dark:text-secondary-300">
                  تفعيل ضريبة القيمة المضافة
                </label>
              </div>
              {settings.business.vatEnabled && (
                <Input
                  label="نسبة ضريبة القيمة المضافة (%)"
                  type="number"
                  value={settings.business.vatRate.toString()}
                  onChange={(e) => updateBusinessSettings('vatRate', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                />
              )}
              <Input
                label="بادئة رقم الفاتورة"
                value={settings.business.invoicePrefix}
                onChange={(e) => updateBusinessSettings('invoicePrefix', e.target.value)}
              />
              <Input
                label="بادئة رقم الطلب"
                value={settings.business.orderPrefix}
                onChange={(e) => updateBusinessSettings('orderPrefix', e.target.value)}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Payment Settings */}
      {activeTab === 'payment' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              طرق الدفع المقبولة
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableCash"
                  checked={settings.payment.enableCash}
                  onChange={(e) => updatePaymentSettings('enableCash', e.target.checked)}
                  className="ml-2"
                />
                <label htmlFor="enableCash" className="text-sm text-secondary-700 dark:text-secondary-300">
                  الدفع نقداً عند الاستلام
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableCard"
                  checked={settings.payment.enableCard}
                  onChange={(e) => updatePaymentSettings('enableCard', e.target.checked)}
                  className="ml-2"
                />
                <label htmlFor="enableCard" className="text-sm text-secondary-700 dark:text-secondary-300">
                  بطاقات الائتمان والخصم
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableBank"
                  checked={settings.payment.enableBank}
                  onChange={(e) => updatePaymentSettings('enableBank', e.target.checked)}
                  className="ml-2"
                />
                <label htmlFor="enableBank" className="text-sm text-secondary-700 dark:text-secondary-300">
                  التحويل البنكي
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableWallet"
                  checked={settings.payment.enableWallet}
                  onChange={(e) => updatePaymentSettings('enableWallet', e.target.checked)}
                  className="ml-2"
                />
                <label htmlFor="enableWallet" className="text-sm text-secondary-700 dark:text-secondary-300">
                  المحافظ الرقمية
                </label>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              حدود الطلبات
            </h3>
            <div className="space-y-4">
              <Input
                label="الحد الأدنى لقيمة الطلب (ر.س)"
                type="number"
                value={settings.payment.minimumOrderAmount.toString()}
                onChange={(e) => updatePaymentSettings('minimumOrderAmount', parseFloat(e.target.value))}
                min="0"
              />
              <Input
                label="الحد الأقصى لقيمة الطلب (ر.س)"
                type="number"
                value={settings.payment.maximumOrderAmount.toString()}
                onChange={(e) => updatePaymentSettings('maximumOrderAmount', parseFloat(e.target.value))}
                min="0"
              />
            </div>
          </Card>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              إعدادات الأمان
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableSSL"
                  checked={settings.security.enableSSL}
                  onChange={(e) => updateSecuritySettings('enableSSL', e.target.checked)}
                  className="ml-2"
                />
                <label htmlFor="enableSSL" className="text-sm text-secondary-700 dark:text-secondary-300">
                  تفعيل شهادة SSL
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableTwoFactor"
                  checked={settings.security.enableTwoFactor}
                  onChange={(e) => updateSecuritySettings('enableTwoFactor', e.target.checked)}
                  className="ml-2"
                />
                <label htmlFor="enableTwoFactor" className="text-sm text-secondary-700 dark:text-secondary-300">
                  المصادقة الثنائية
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableCaptcha"
                  checked={settings.security.enableCaptcha}
                  onChange={(e) => updateSecuritySettings('enableCaptcha', e.target.checked)}
                  className="ml-2"
                />
                <label htmlFor="enableCaptcha" className="text-sm text-secondary-700 dark:text-secondary-300">
                  تفعيل كابتشا
                </label>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              إعدادات الجلسة
            </h3>
            <div className="space-y-4">
              <Input
                label="مهلة انتهاء الجلسة (دقيقة)"
                type="number"
                value={settings.security.sessionTimeout.toString()}
                onChange={(e) => updateSecuritySettings('sessionTimeout', parseInt(e.target.value))}
                min="5"
                max="1440"
              />
              <Input
                label="الحد الأقصى لمحاولات تسجيل الدخول"
                type="number"
                value={settings.security.maxLoginAttempts.toString()}
                onChange={(e) => updateSecuritySettings('maxLoginAttempts', parseInt(e.target.value))}
                min="3"
                max="10"
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StoreSettings;