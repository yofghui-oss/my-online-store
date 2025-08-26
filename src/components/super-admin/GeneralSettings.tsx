import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

const GeneralSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'منشئ المتاجر',
    siteLogo: 'https://example.com/logo.png',
    adminEmail: 'admin@storebuilder.sa',
  });

  const handleSave = () => {
    toast.success('تم حفظ الإعدادات العامة');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">الإعدادات العامة</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <Input
            label="اسم المنصة"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
          />
          <Input
            label="رابط شعار المنصة"
            value={settings.siteLogo}
            onChange={(e) => setSettings({ ...settings, siteLogo: e.target.value })}
          />
          <Input
            label="البريد الإلكتروني للمشرف"
            type="email"
            value={settings.adminEmail}
            onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>
            <Save size={16} className="ml-2" />
            حفظ التغييرات
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GeneralSettings;
