import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Save, Eye, Palette, Type, Layout, Smartphone, Monitor, Tablet, GripVertical } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
import { useStore } from '../contexts/StoreContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import * as Preview from '../components/theme/PreviewComponents';

const initialLayout = [
  { id: 'header', component: 'Header' },
  { id: 'hero', component: 'Hero' },
  { id: 'categories', component: 'Categories' },
  { id: 'featured', component: 'FeaturedProducts' },
  { id: 'newsletter', component: 'Newsletter' },
  { id: 'footer', component: 'Footer' },
];

const ThemeBuilder: React.FC = () => {
  const { t } = useTranslation();
  const { currentStore } = useStore();
  const [activeTab, setActiveTab] = useState('layout');
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [layoutComponents, setLayoutComponents] = useState(initialLayout);

  const [themeSettings, setThemeSettings] = useState({
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      size: 'medium',
    effects: {
      borderRadius: 'md',
      showSearch: true,
      showWishlist: true,
      showCompare: false,
    const items = Array.from(layoutComponents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLayoutComponents(items);
    if (!result.destination) return;
    
    // Handle dragging between different lists
    if (result.source.droppableId !== result.destination.droppableId) {
      if (result.source.droppableId === 'layout-components' && result.destination.droppableId === 'available-components') {
  };
  
  const handleSpacingChange = (spacingKey: string, value: string) => {
    setThemeSettings({
      ...themeSettings,
        [spacingKey]: value
      }
    });
  };
  
  const handleEffectsChange = (effectKey: string, value: any) => {
    setThemeSettings({
      ...themeSettings,
      effects: {
        ...themeSettings.effects,
        [effectKey]: value
      }
    });
  };
  
  const handleLayoutChange = (layoutKey: string, value: string) => {
    setThemeSettings({
      ...themeSettings,
      layout: {
        ...themeSettings.layout,
        [layoutKey]: value
      }
    });
  };

  const handleWidgetChange = (widgetKey: string, value: any) => {
            <div className="flex items-center gap-4">

  const handleAdvancedChange = (advancedKey: string, value: string) => {
    setThemeSettings({
      ...themeSettings,
      advanced: {
        ...themeSettings.advanced,
        [advancedKey]: value
      }
    });
  };

  const tabs = [
    { id: 'layout', name: t('themeBuilder.tabs.layout'), icon: Layout },
    { id: 'colors', name: t('themeBuilder.tabs.colors'), icon: Palette },
    { id: 'fonts', name: t('themeBuilder.tabs.fonts'), icon: Type },
    { id: 'spacing', name: t('themeBuilder.tabs.spacing'), icon: Sliders },
    { id: 'effects', name: t('themeBuilder.tabs.effects'), icon: Layers },
    { id: 'widgets', name: 'الويدجت', icon: Grid },
    { id: 'advanced', name: 'متقدم', icon: Settings },
  ];

  const deviceIcons = {
    desktop: Monitor,
    tablet: Tablet,
    mobile: Smartphone,
  };

  const renderPreviewComponent = (componentName: string, props: any) => {
    const Component = (Preview as any)[`Preview${componentName}`];
    return Component ? <Component {...props} /> : null;
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <header className="bg-white dark:bg-secondary-800 shadow-sm border-b border-secondary-200 dark:border-secondary-700">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-primary-600 hover:text-primary-700 text-sm">
                ← {t('themeBuilder.backToDashboard')}
              </Link>
              <h1 className="ltr:ml-6 rtl:mr-6 text-xl font-bold text-secondary-900 dark:text-white">
                {t('themeBuilder.title')}
              </h1>
            </div>
                    <Droppable droppableId="layout-components">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                          {layoutComponents.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex items-center gap-3 p-3 bg-secondary-100 dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700"
                                >
                                  <GripVertical className="text-secondary-400" />
                                  <span className="text-sm font-medium text-secondary-800 dark:text-secondary-200">
                                    {item.component}
                                  </span>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                                        className="p-1 h-auto" 
                                        onClick={() => handleEditComponent(item.id)}
                                      >
              {/* Other tabs content here */}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                        {t('themeBuilder.effects.borderRadius')}
                      </label>
                      <select 
                        value={themeSettings.effects.borderRadius}
                        onChange={(e) => handleEffectsChange('borderRadius', e.target.value)}
                <div className="flex items-center gap-2 bg-secondary-100 dark:bg-secondary-800 rounded-lg p-1">
                  {Object.entries(deviceIcons).map(([device, Icon]) => (
                    <button
                      key={device}
                      onClick={() => setPreviewDevice(device)}
                      className={`p-2 rounded-md transition-colors duration-200 ${
                        previewDevice === device
                          ? 'bg-white dark:bg-secondary-700 text-primary-600 shadow-sm'
                          : 'text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
              
              {activeTab === 'widgets' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="relative bg-secondary-200 dark:bg-secondary-800 p-4 rounded-lg flex justify-center items-center">
                    إعدادات الويدجت
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={themeSettings.widgets.showCart} 
                          onChange={(e) => handleWidgetChange('showCart', e.target.checked)}
                        />
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    {layoutComponents.map(item => renderPreviewComponent(item.component, { themeSettings }))}
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={themeSettings.widgets.showSearch} 
                          onChange={(e) => handleWidgetChange('showSearch', e.target.checked)}
                          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          عرض البحث
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={themeSettings.widgets.showWishlist} 
                          onChange={(e) => handleWidgetChange('showWishlist', e.target.checked)}
                          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          عرض المفضلة
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={themeSettings.widgets.showCompare} 
                          onChange={(e) => handleWidgetChange('showCompare', e.target.checked)}
                          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          عرض المقارنة
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={themeSettings.widgets.showCurrency} 
                          onChange={(e) => handleWidgetChange('showCurrency', e.target.checked)}
                          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          عرض العملة
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={themeSettings.widgets.showLanguage} 
                          onChange={(e) => handleWidgetChange('showLanguage', e.target.checked)}
                          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          عرض اللغة
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={themeSettings.widgets.showSocial} 
                          onChange={(e) => handleWidgetChange('showSocial', e.target.checked)}
                          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          عرض الشبكات الاجتماعية
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={themeSettings.widgets.chatWidget} 
                          onChange={(e) => handleWidgetChange('chatWidget', e.target.checked)}
                          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          تفعيل ويدجت الدردشة
                        </span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'advanced' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                    الإعدادات المتقدمة
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                        الشعار
                      </label>
                      <Input 
                        type="url" 
                        value={themeSettings.advanced.logo} 
                        onChange={(e) => handleAdvancedChange('logo', e.target.value)} 
                        placeholder="https://example.com/logo.png"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                        حجم الشعار
                      </label>
                      <select 
                        value={themeSettings.advanced.logoSize}
                        onChange={(e) => handleAdvancedChange('logoSize', e.target.value)}
                        className="w-full p-2 border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-800"
                      >
                        <option value="sm">صغير</option>
                        <option value="md">متوسط</option>
                        <option value="lg">كبير</option>
                        <option value="xl">كبير جداً</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                        رابط الفافيكون
                      </label>
                      <Input 
                        type="url" 
                        value={themeSettings.advanced.favicon} 
                        onChange={(e) => handleAdvancedChange('favicon', e.target.value)} 
                        placeholder="https://example.com/favicon.ico"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                        كود CSS مخصص
                      </label>
                      <textarea 
                        value={themeSettings.advanced.customCSS} 
                        onChange={(e) => handleAdvancedChange('customCSS', e.target.value)}
                        className="w-full p-2 border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-800 font-mono text-sm"
                        rows={6}
                        placeholder="/* اكتب كود CSS المخصص هنا */"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                        كود JavaScript مخصص
                      </label>
                      <textarea 
                        value={themeSettings.advanced.customJS} 
                        onChange={(e) => handleAdvancedChange('customJS', e.target.value)}
                        className="w-full p-2 border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-800 font-mono text-sm"
                        rows={6}
                        placeholder="// اكتب كود JavaScript المخصص هنا"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                        Meta Tags إضافية
                      </label>
                      <textarea 
                        value={themeSettings.advanced.metaTags} 
                        onChange={(e) => handleAdvancedChange('metaTags', e.target.value)}
                        className="w-full p-2 border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-800 font-mono text-sm"
                        rows={4}
                        placeholder='<meta name="description" content="وصف الموقع" />'
                      />
                    </div>
                  </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-9">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  {t('themeBuilder.livePreview')}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setPreviewScale(Math.max(0.5, previewScale - 0.1))}
                      className="p-1 rounded-md bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white"
                    >
                      -
                    </button>
                    <span className="text-xs text-secondary-600 dark:text-secondary-400 w-12 text-center">
                      {Math.round(previewScale * 100)}%
                    </span>
                    <button 
                      onClick={() => setPreviewScale(Math.min(1.5, previewScale + 0.1))}
                      className="p-1 rounded-md bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-secondary-100 dark:bg-secondary-800 rounded-lg p-1">
                    {Object.entries(deviceIcons).map(([device, Icon]) => (
                      <button
                        key={device}
                        onClick={() => setPreviewDevice(device)}
                        className={`p-2 rounded-md transition-colors duration-200 ${
                          previewDevice === device
                            ? 'bg-white dark:bg-secondary-700 text-primary-600 shadow-sm'
                            : 'text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                  
                  <label className="flex items-center gap-2 text-xs text-secondary-600 dark:text-secondary-400">
                    <input 
                      type="checkbox" 
                      checked={autoPreview} 
                      onChange={(e) => setAutoPreview(e.target.checked)}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    {t('themeBuilder.autoPreview')}
                  </label>
                </div>
              </div>

              <div className="relative bg-secondary-200 dark:bg-secondary-800 p-4 rounded-lg flex justify-center items-center overflow-auto" style={{ height: '600px' }}>
                <motion.div
                  animate={previewDevice}
                  variants={{
                    desktop: { width: '100%', height: '600px' },
                    tablet: { width: '768px', height: '1024px' },
                    mobile: { width: '375px', height: '667px' },
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="bg-white dark:bg-secondary-900 rounded-lg shadow-2xl overflow-hidden"
                  style={{ transform: `scale(${previewScale})`, transformOrigin: 'top center' }}
                >
                  <div className="w-full h-full overflow-y-auto">
                    {layoutComponents.map(item => renderPreviewComponent(item.component, { themeSettings }))}                    
                  </div>
                </motion.div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeBuilder;
