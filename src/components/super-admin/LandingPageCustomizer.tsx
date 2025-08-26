import React from 'react';
import { Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLandingPage } from '../../contexts/LandingPageContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LandingPageCustomizer: React.FC = () => {
  const { content, setContent } = useLandingPage();

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [name]: value }
    }));
  };

  const handleFeatureChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFeatures = [...content.features];
    (newFeatures[index] as any)[name] = value;
    setContent(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSave = () => {
    // In a real app, this would send the content to a backend to be saved.
    // For now, it's just saved in context state.
    toast.success('تم حفظ تغييرات الصفحة الرئيسية!');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">إعدادات المظهر</h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-1">
            تخصيص محتوى الصفحة الرئيسية للمنصة.
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="ml-2 h-4 w-4" />
          حفظ التغييرات
        </Button>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">قسم الهيرو</h2>
        <div className="space-y-4">
          <Input label="العنوان الرئيسي" name="title" value={content.hero.title} onChange={handleHeroChange} />
          <Input label="النص المميز" name="highlight" value={content.hero.highlight} onChange={handleHeroChange} />
          <Input label="العنوان الفرعي" name="subtitle" value={content.hero.subtitle} onChange={handleHeroChange} />
          <Input label="رابط الصورة" name="image" value={content.hero.image} onChange={handleHeroChange} />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">قسم المميزات</h2>
        <div className="space-y-6">
          {content.features.map((feature, index) => (
            <div key={index} className="p-4 border rounded-lg dark:border-secondary-700">
              <h3 className="font-medium mb-2">الميزة #{index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="العنوان" name="title" value={feature.title} onChange={(e) => handleFeatureChange(index, e)} />
                <Input label="الوصف" name="description" value={feature.description} onChange={(e) => handleFeatureChange(index, e)} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Add sections for testimonials etc. here */}
    </div>
  );
};

export default LandingPageCustomizer;
