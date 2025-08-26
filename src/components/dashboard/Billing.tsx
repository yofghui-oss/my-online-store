import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/currency';

const Billing: React.FC = () => {
  const { pricingPlans, currentStore } = useStore();
  const currentPlan = pricingPlans.find(p => p.id === currentStore?.planId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">الفواتير والخطة</h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-1">
          إدارة خطتك الحالية والترقية.
        </p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-2">خطتك الحالية</h2>
        <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">{currentPlan?.name}</p>
        <ul className="space-y-2">
          {currentPlan?.features?.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">اختر الخطة المناسبة لك</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map(plan => (
            <Card
              key={plan.id}
              className={`p-8 flex flex-col ${plan.isPopular ? 'border-2 border-primary-500' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
                  الأكثر شعبية
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-extrabold mb-4">
                {formatCurrency(plan.price, plan.currency)}
                <span className="text-base font-normal text-secondary-500">/شهرياً</span>
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                variant={plan.id === currentPlan?.id ? 'secondary' : 'primary'}
                disabled={plan.id === currentPlan?.id}
                className="w-full"
              >
                {plan.id === currentPlan?.id ? 'خطتك الحالية' : 'الترقية الآن'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billing;
