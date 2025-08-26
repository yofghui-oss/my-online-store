import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { useStore } from '../../contexts/StoreContext';
import { toast } from 'react-hot-toast';
import { Puzzle, Search, Filter, Tag, ExternalLink, Info } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const IntegrationManagement: React.FC = () => {
  const { integrations, toggleIntegration, currentStore } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

  // فلترة التكاملات المتاحة للمتجر الحالي
  const storeIntegrations = integrations
    .filter(integration => {
      // فلترة حسب المتجر الحالي أو التكاملات العامة
      const matchesStore = !integration.storeId || integration.storeId === currentStore?.id;
      
      // فلترة حسب البحث
      const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           integration.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // فلترة حسب التصنيف
      const matchesCategory = categoryFilter === 'all' || integration.category === categoryFilter;
      
      return matchesStore && matchesSearch && matchesCategory;
    });

  const handleToggle = (id: string, name: string, isEnabled: boolean) => {
    // استخدام معرف المتجر الحالي عند تبديل حالة التكامل
    if (currentStore) {
      toggleIntegration(id, currentStore.id);
      toast.success(`تم ${isEnabled ? 'تعطيل' : 'تفعيل'} تكامل ${name}`);
    } else {
      toast.error('لا يمكن تفعيل التكامل، لم يتم العثور على معلومات المتجر');
    }
  };
  
  const handleShowInfo = (integration: any) => {
    setSelectedIntegration(integration);
    setShowInfoModal(true);
  };
  
  // استخراج فئات التكاملات الفريدة
  const categories = ['all', ...Array.from(new Set(integrations.map(i => i.category || 'أخرى')))];
  
  useEffect(() => {
    // يمكن إضافة منطق لجلب التكاملات المتاحة من الخادم
  }, [currentStore?.id]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة التكاملات</h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-1">
            قم بتفعيل وإدارة التكاملات المتاحة لمتجرك.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
            <input
              type="text"
              placeholder="بحث عن تكامل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'جميع الفئات' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {storeIntegrations.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <Puzzle className="w-12 h-12 text-secondary-400" />
            <h3 className="text-xl font-medium text-secondary-900 dark:text-white">لا توجد تكاملات متاحة</h3>
            <p className="text-secondary-600 dark:text-secondary-400 max-w-md">
              لا توجد تكاملات متاحة لمتجرك حالياً. يرجى التواصل مع الدعم الفني لإضافة تكاملات جديدة.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeIntegrations.map(integration => (
            <Card key={integration.id} className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full">
                {integration.category && (
                  <span className="absolute top-0 left-0 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs px-2 py-1 rounded-md flex items-center">
                    <Tag size={12} className="mr-1" />
                    {integration.category}
                  </span>
                )}
                <button 
                  onClick={() => handleShowInfo(integration)}
                  className="absolute top-0 right-0 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                >
                  <Info size={18} />
                </button>
              </div>
              
              <img 
                src={integration.logo || `https://ui-avatars.com/api/?name=${integration.name}&background=random`} 
                alt={integration.name} 
                className="w-20 h-20 rounded-full mb-4 mt-4 object-cover border-2 border-secondary-100 dark:border-secondary-700" 
              />
              
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{integration.name}</h3>
              
              {integration.badge && (
                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full mt-1">
                  {integration.badge}
                </span>
              )}
              
              <p className="text-sm text-secondary-500 dark:text-secondary-400 flex-grow my-4 line-clamp-3">
                {integration.description}
              </p>
              
              <div className="w-full flex items-center justify-between mt-2">
                <div 
                  onClick={() => handleToggle(integration.id, integration.name, integration.isEnabled)}
                  className={`cursor-pointer w-14 h-7 rounded-full p-1 transition-colors ${integration.isEnabled ? 'bg-green-500' : 'bg-secondary-300 dark:bg-secondary-700'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${integration.isEnabled ? 'translate-x-7 rtl:-translate-x-7' : ''}`} />
                </div>
                
                {integration.website && (
                  <a 
                    href={integration.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 flex items-center text-sm"
                  >
                    <span className="ml-1">زيارة</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
      {/* Modal for Integration Details */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        title={selectedIntegration?.name || 'تفاصيل التكامل'}
      >
        {selectedIntegration && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <img 
                src={selectedIntegration.logo || `https://ui-avatars.com/api/?name=${selectedIntegration.name}&background=random`} 
                alt={selectedIntegration.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-secondary-100 dark:border-secondary-700" 
              />
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">{selectedIntegration.name}</h3>
                {selectedIntegration.category && (
                  <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs px-2 py-1 rounded-md">
                    {selectedIntegration.category}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-secondary-600 dark:text-secondary-400">
              {selectedIntegration.description}
            </p>
            
            {selectedIntegration.features && (
              <div>
                <h4 className="font-medium text-secondary-900 dark:text-white mb-2">المميزات</h4>
                <ul className="list-disc list-inside space-y-1 text-secondary-600 dark:text-secondary-400">
                  {selectedIntegration.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="pt-4 flex justify-between items-center border-t border-secondary-200 dark:border-secondary-700">
              <div 
                onClick={() => {
                  handleToggle(selectedIntegration.id, selectedIntegration.name, selectedIntegration.isEnabled);
                  setShowInfoModal(false);
                }}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <div 
                  className={`cursor-pointer w-14 h-7 rounded-full p-1 transition-colors ${selectedIntegration.isEnabled ? 'bg-green-500' : 'bg-secondary-300 dark:bg-secondary-700'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${selectedIntegration.isEnabled ? 'translate-x-7 rtl:-translate-x-7' : ''}`} />
                </div>
                <span className="text-secondary-700 dark:text-secondary-300">
                  {selectedIntegration.isEnabled ? 'مفعل' : 'معطل'}
                </span>
              </div>
              
              {selectedIntegration.website && (
                <a 
                  href={selectedIntegration.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
                >
                  <span className="ml-1">زيارة الموقع</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setShowInfoModal(false)} variant="secondary">
                إغلاق
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default IntegrationManagement;