import React from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PaymentGatewaySettings: React.FC = () => {
  const handleSave = () => {
    toast.success('تم حفظ إعدادات بوابات الدفع');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">إعدادات بوابات الدفع</h1>
      <p className="text-secondary-600 dark:text-secondary-300">إدارة مفاتيح API لبوابات الدفع المتاحة على المنصة.</p>
      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Stripe</h2>
          <div className="space-y-4">
            <Input label="Publishable Key" name="stripe_pk" placeholder="pk_test_..." />
            <Input label="Secret Key" name="stripe_sk" type="password" placeholder="sk_test_..." />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-4">PayPal</h2>
          <div className="space-y-4">
            <Input label="Client ID" name="paypal_client_id" placeholder="AZ..." />
            <Input label="Client Secret" name="paypal_client_secret" type="password" placeholder="..." />
          </div>
        </Card>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave}><Save size={16} className="ml-2" /> حفظ الإعدادات</Button>
      </div>
    </div>
  );
};

export default PaymentGatewaySettings;
