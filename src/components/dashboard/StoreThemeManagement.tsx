import React, { useState, useEffect } from 'react';
import { Save, Eye, Download, Upload, Check, Palette, Settings, ExternalLink, RefreshCw } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { useTheme } from '../../contexts/ThemeContext';
import { availableThemes, getThemeById } from '../../themes';
import { toast } from 'react-hot-toast';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}

const StoreThemeManagement: React.FC = () => {
  const { currentStore, updateStoreSettings } = useStore();
  const { themeId, setThemeId } = useTheme();
  
  const [selectedTheme, setSelectedTheme] = useState(themeId);
  const [isApplying, setIsApplying] = useState(false);
  const [customColors, setCustomColors] = useState<ThemeColors>({
    primary: '#3b82f6',
    secondary: '#1e293b',
    accent: '#06b6d4',
    background: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb'
  });

  // Initialize theme based on store settings
  useEffect(() => {
    if (currentStore && currentStore.themeId !== selectedTheme) {
      setSelectedTheme(currentStore.themeId);
    }
  }, [currentStore, selectedTheme]);

  const handleColorChange = (colorKey: keyof ThemeColors, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const handleApplyTheme = async (theme: any) => {
    try {
      setIsApplying(true);
      
      if (currentStore) {
        // Synchronously persist theme selection to localStorage (both keys)
        localStorage.setItem(`store-${currentStore.id}-theme`, theme.id);
        localStorage.setItem('storeThemeId', theme.id);
        
        // Update local state immediately
        setSelectedTheme(theme.id);
        
        // Update contexts immediately
        setThemeId(theme.id);
        
        // Update store settings
        await updateStoreSettings({ themeId: theme.id });
        
        // Show success message
        toast.success(`✨ تم تطبيق ثيم "${theme.name}" بنجاح!`);
        
        // No need to reload - the theme should apply immediately
        // The unified routing system and context updates handle the theme change
        
      } else {
        toast.error('يرجى اختيار متجر أولاً');
      }
    } catch (error) {
      console.error('Theme application error:', error);
      toast.error('حدث خطأ في تطبيق الثيم');
    } finally {
      setTimeout(() => {
        setIsApplying(false);
      }, 1000);
    }
  };

  const handleSaveCustomTheme = () => {
    // Save custom colors to localStorage
    if (currentStore) {
      localStorage.setItem(`store-${currentStore.id}-custom-colors`, JSON.stringify(customColors));
    }
    
    toast.success('تم حفظ الألوان المخصصة');
  };

  const handleExportTheme = () => {
    const currentTheme = getThemeById(selectedTheme);
    const themeData = JSON.stringify({ theme: currentTheme, customColors }, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${currentTheme.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('تم تصدير الثيم');
  };

  const handleImportTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.theme && data.customColors) {
            setSelectedTheme(data.theme.id);
            setCustomColors(data.customColors);
            toast.success('تم استيراد الثيم بنجاح');
          } else {
            toast.error('تنسيق ملف الثيم غير صحيح');
          }
        } catch (error) {
          toast.error('خطأ في استيراد الثيم');
        }
      };
      reader.readAsText(file);
    }
  };

  const getThemeStatusBadge = (themeId: string) => {
    const isActive = selectedTheme === themeId;
    const isCurrent = themeId === currentStore?.themeId;
    
    if (isActive && isCurrent) {
      return (
        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full font-medium">
          ✓ نشط
        </span>
      );
    } else if (isActive) {
      return (
        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full font-medium">
          محدد
        </span>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white flex items-center gap-3">
            <Palette className="h-6 w-6 text-primary-500" />
            إدارة سمات المتجر
          </h1>
          <p className="text-secondary-600 dark:text-secondary-300 mt-1">
            اختر وخصص مظهر متجرك من مجموعة الثيمات المتاحة
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => window.open(`/store/${currentStore?.id}`, '_blank')}
          >
            <ExternalLink className="h-4 w-4 ml-2" />
            زيارة المتجر
          </Button>
          <Button onClick={handleSaveCustomTheme}>
            <Save className="h-4 w-4 ml-2" />
            حفظ التخصيصات
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Selection */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary-500" />
                اختر ثيم متجرك
              </h2>
              <span className="text-sm text-secondary-500 dark:text-secondary-400">
                {availableThemes.length} ثيم متاح
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {availableThemes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg group ${
                    selectedTheme === theme.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                      : 'border-secondary-200 dark:border-secondary-700 hover:border-primary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800/50'
                  }`}
                  onClick={() => !isApplying && handleApplyTheme(theme)}
                >
                  {selectedTheme === theme.id && (
                    <div className="absolute top-3 left-3 bg-primary-500 text-white rounded-full p-1.5 shadow-lg">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={theme.previewImage}
                        alt={theme.name}
                        className="w-20 h-14 object-cover rounded-lg border border-secondary-200 dark:border-secondary-600 group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <Eye className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {theme.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          {getThemeStatusBadge(theme.id)}
                          <span className="text-xs bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 px-2 py-1 rounded-lg">
                            {theme.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-secondary-600 dark:text-secondary-300 leading-relaxed">
                        {theme.description}
                      </p>
                      
                      {isApplying && selectedTheme === theme.id && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          جاري تطبيق الثيم...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Theme Management */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary-500" />
              إدارة الثيمات
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleExportTheme} className="w-full">
                <Download className="h-4 w-4 ml-2" />
                تصدير الثيم
              </Button>
              <div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportTheme}
                  className="hidden"
                  id="theme-import"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('theme-import')?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 ml-2" />
                  استيراد ثيم
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Color Customization */}
        <div>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6 flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary-500" />
              تخصيص ألوان الثيم
            </h2>
            
            <div className="space-y-6">
              {Object.entries(customColors).map(([key, value]) => (
                <div key={key} className="space-y-3">
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    {key === 'primary' && '🎨 اللون الأساسي'}
                    {key === 'secondary' && '🔧 اللون الثانوي'}
                    {key === 'accent' && '✨ لون التمييز'}
                    {key === 'background' && '🖼️ لون الخلفية'}
                    {key === 'text' && '📝 لون النص'}
                    {key === 'border' && '🔲 لون الحدود'}
                  </label>
                  <div className="flex gap-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                        className="w-14 h-12 border-2 border-secondary-300 dark:border-secondary-600 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <Input
                      value={value}
                      onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                      className="flex-1 font-mono text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-secondary-50 to-primary-50 dark:from-secondary-800 dark:to-primary-900/20 rounded-xl">
              <h3 className="font-medium text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                ℹ️ معلومات الثيم الحالي
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-secondary-500 dark:text-secondary-400">الاسم:</span>
                  <span className="text-secondary-900 dark:text-white font-medium">
                    {getThemeById(selectedTheme).name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary-500 dark:text-secondary-400">الفئة:</span>
                  <span className="text-secondary-900 dark:text-white font-medium">
                    {getThemeById(selectedTheme).category}
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-secondary-200 dark:border-secondary-600">
                <p className="text-sm text-secondary-600 dark:text-secondary-400 leading-relaxed">
                  {getThemeById(selectedTheme).description}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreThemeManagement;