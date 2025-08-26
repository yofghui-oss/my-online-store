import React from 'react';
import { HardHat } from 'lucide-react';
import Card from '../ui/Card';

interface SuperAdminPlaceholderProps {
  title: string;
}

const SuperAdminPlaceholder: React.FC<SuperAdminPlaceholderProps> = ({ title }) => {
  return (
    <Card className="text-center p-12">
      <HardHat className="h-16 w-16 text-primary-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
        {title}
      </h1>
      <p className="text-lg text-secondary-600 dark:text-secondary-300">
        هذه الصفحة قيد الإنشاء حاليًا.
      </p>
    </Card>
  );
};

export default SuperAdminPlaceholder;
