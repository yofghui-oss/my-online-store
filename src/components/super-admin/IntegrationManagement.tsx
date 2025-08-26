import React, { useState } from 'react';
import Card from '../ui/Card';
import { useStore } from '../../contexts/StoreContext';
import { toast } from 'react-hot-toast';
import { Search, Filter, Tag } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const IntegrationManagement: React.FC = () => {
  const { integrations, toggleIntegration, stores } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [storeFilter, setStoreFilter] = useState('all');
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

  const handleToggle = (id: string, name: string, isEnabled: boolean, storeId?: string) => {
    toggleIntegration(id, storeId);
    toast.success(`تم ${isEnabled ? 'تعطيل' : 'تفعيل'} تكامل ${name}${storeId ? ` للمتجر ${stores.find(s => s.id === storeId)?.name || storeId}` : ''}`);
  };
  
  const handleStoreSelection = (integration: any) => {
    setSelectedIntegration(integration);
    setShowStoreModal(true);
  };
  
  // استخراج فئات التكاملات الفريدة
  const categories = ['all', ...Array.from(new Set(integrations.map(i => i.category || 'أخرى')))];
  
  // فلترة التكاملات
  const filteredIntegrations = integrations.filter(integration => {
    // فلترة حسب البحث
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // فلترة حسب التصنيف
    const matchesCategory = categoryFilter === 'all' || integration.category === categoryFilter;
    
    // فلترة حسب المتجر
    const matchesStore = storeFilter === 'all' || integration.storeId === storeFilter || !integration.storeId;
    
    return matchesSearch && matchesCategory && matchesStore;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة التكاملات</h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-1">
            تفعيل وتعطيل التكاملات المتاحة للمتاجر.
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
          
          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">جميع المتاجر</option>
            {stores.map(store => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map(integration => (
          <Card key={integration.id} className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full">
              {integration.category && (
                <span className="absolute top-0 left-0 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs px-2 py-1 rounded-md flex items-center">
                  <Tag size={12} className="mr-1" />
                  {integration.category}
                </span>
              )}
              
              {integration.storeId && (
                <span className="absolute top-0 right-0 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-md">
                  {stores.find(s => s.id === integration.storeId)?.name || 'متجر محدد'}
                </span>
              )}
            </div>
            
            <img 
              src={integration.logo || `https://ui-avatars.com/api/?name=${integration.name}&background=random`} 
              alt={integration.name} 
              className="w-20 h-20 rounded-full mb-4 mt-8 object-cover border-2 border-secondary-100 dark:border-secondary-700" 
            />
            
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{integration.name}</h3>
            
            <p className="text-sm text-secondary-500 dark:text-secondary-400 flex-grow my-4 line-clamp-3">
              {integration.description}
            </p>
            
            <div className="w-full flex items-center justify-between mt-2">
              <div 
                onClick={() => handleToggle(integration.id, integration.name, integration.isEnabled, integration.storeId)}
                className={`cursor-pointer w-14 h-7 rounded-full p-1 transition-colors ${integration.isEnabled ? 'bg-green-500' : 'bg-secondary-300 dark:bg-secondary-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${integration.isEnabled ? 'translate-x-7 rtl:-translate-x-7' : ''}`} />
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleStoreSelection(integration)}
              >
                تعيين للمتجر
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Modal for Store Selection */}
      <Modal
        isOpen={showStoreModal}
        onClose={() => setShowStoreModal(false)}
        title={`تعيين تكامل ${selectedIntegration?.name || ''} لمتجر محدد`}
      >
        {selectedIntegration && (
          <div className="space-y-4">
            <p className="text-secondary-600 dark:text-secondary-400">
              اختر المتجر الذي تريد تعيين هذا التكامل له. سيتم تفعيل أو تعطيل هذا التكامل لهذا المتجر فقط.
            </p>
            
            <div className="grid grid-cols-1 gap-3 mt-4">
              {stores.map(store => (
                <div 
                  key={store.id} 
                  className="p-3 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 cursor-pointer flex justify-between items-center"
                  onClick={() => {
                    // تعيين التكامل للمتجر المحدد
                    toggleIntegration(selectedIntegration.id, store.id);
                    toast.success(`تم تعيين تكامل ${selectedIntegration.name} للمتجر ${store.name}`);
                    setShowStoreModal(false);
                  }}
                >
                  <div>
                    <h4 className="font-medium text-secondary-900 dark:text-white">{store.name}</h4>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">{store.domain}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${store.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex justify-end border-t border-secondary-200 dark:border-secondary-700">
              <Button onClick={() => setShowStoreModal(false)} variant="secondary">
                إلغاء
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default IntegrationManagement;
