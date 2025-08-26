import React from 'react';
import { Server, Database, Cloud } from 'lucide-react';
import Card from '../ui/Card';

const SystemHealth: React.FC = () => {
  const services = [
    { name: 'API الرئيسية', status: 'Operational', icon: Server, color: 'green' },
    { name: 'قاعدة البيانات', status: 'Operational', icon: Database, color: 'green' },
    { name: 'خدمات التخزين', status: 'Operational', icon: Cloud, color: 'green' },
    { name: 'بوابة الدفع', status: 'Degraded Performance', icon: Server, color: 'yellow' },
    { name: 'خدمة الإشعارات', status: 'Operational', icon: Server, color: 'green' },
  ];

  return (
    <Card className="h-full">
      <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">صحة النظام</h3>
      <div className="space-y-4">
        {services.map(service => (
          <div key={service.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-${service.color}-100 dark:bg-${service.color}-900/50 rounded-lg`}>
                <service.icon className={`h-5 w-5 text-${service.color}-500`} />
              </div>
              <span className="text-sm font-medium text-secondary-800 dark:text-secondary-200">{service.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full bg-${service.color}-500`}></div>
              <span className={`text-xs font-semibold text-${service.color}-500`}>{service.status}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-center text-secondary-500 dark:text-secondary-400 mt-4">آخر تحديث: الآن</p>
    </Card>
  );
};

export default SystemHealth;
