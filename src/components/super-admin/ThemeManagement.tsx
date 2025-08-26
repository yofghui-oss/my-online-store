import React from 'react';
import { availableThemes } from '../../themes';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircle } from 'lucide-react';

const ThemeManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">إدارة القوالب</h1>
      <p className="text-secondary-600 dark:text-secondary-300">عرض وإدارة القوالب المتاحة للمتاجر.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableThemes.map(theme => (
          <Card key={theme.id} className="p-0 overflow-hidden">
            <img src={theme.previewImage} alt={theme.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{theme.name}</h3>
              <p className="text-sm text-secondary-500 mb-4">{theme.description}</p>
              <Button variant="outline" className="w-full">
                <CheckCircle size={16} className="ml-2 text-green-500" />
                القالب مفعل
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemeManagement;
