import React, { useState } from 'react';
import { Languages, Plus, Edit3, Trash2, Download, Upload, Globe, Check, X } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Language {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isDefault: boolean;
  isActive: boolean;
  completionPercentage: number;
  lastUpdated: Date;
}

interface Translation {
  key: string;
  arabic: string;
  english: string;
  french?: string;
  spanish?: string;
  category: string;
}

const LanguagesManagement: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([
    {
      id: '1',
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      isDefault: true,
      isActive: true,
      completionPercentage: 100,
      lastUpdated: new Date('2024-01-20')
    },
    {
      id: '2',
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      isDefault: false,
      isActive: true,
      completionPercentage: 95,
      lastUpdated: new Date('2024-01-18')
    },
    {
      id: '3',
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      isDefault: false,
      isActive: false,
      completionPercentage: 60,
      lastUpdated: new Date('2024-01-15')
    },
    {
      id: '4',
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      isDefault: false,
      isActive: false,
      completionPercentage: 45,
      lastUpdated: new Date('2024-01-12')
    }
  ]);

  const [translations, setTranslations] = useState<Translation[]>([
    {
      key: 'welcome',
      arabic: 'مرحباً',
      english: 'Welcome',
      french: 'Bienvenue',
      spanish: 'Bienvenido',
      category: 'general'
    },
    {
      key: 'dashboard',
      arabic: 'لوحة التحكم',
      english: 'Dashboard',
      french: 'Tableau de bord',
      spanish: 'Panel de control',
      category: 'navigation'
    },
    {
      key: 'settings',
      arabic: 'الإعدادات',
      english: 'Settings',
      french: 'Paramètres',
      spanish: 'Configuración',
      category: 'navigation'
    },
    {
      key: 'save',
      arabic: 'حفظ',
      english: 'Save',
      french: 'Enregistrer',
      spanish: 'Guardar',
      category: 'actions'
    },
    {
      key: 'cancel',
      arabic: 'إلغاء',
      english: 'Cancel',
      french: 'Annuler',
      spanish: 'Cancelar',
      category: 'actions'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'languages' | 'translations'>('languages');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isTranslationModalOpen, setIsTranslationModalOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const [languageForm, setLanguageForm] = useState({
    code: '',
    name: '',
    nativeName: '',
    flag: ''
  });

  const [translationForm, setTranslationForm] = useState({
    key: '',
    arabic: '',
    english: '',
    french: '',
    spanish: '',
    category: 'general'
  });

  const categories = ['general', 'navigation', 'actions', 'forms', 'messages', 'errors'];

  const handleAddLanguage = () => {
    setEditingLanguage(null);
    setLanguageForm({ code: '', name: '', nativeName: '', flag: '' });
    setIsLanguageModalOpen(true);
  };

  const handleEditLanguage = (language: Language) => {
    setEditingLanguage(language);
    setLanguageForm({
      code: language.code,
      name: language.name,
      nativeName: language.nativeName,
      flag: language.flag
    });
    setIsLanguageModalOpen(true);
  };

  const handleSaveLanguage = () => {
    if (!languageForm.code || !languageForm.name || !languageForm.nativeName) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (editingLanguage) {
      setLanguages(languages.map(lang => 
        lang.id === editingLanguage.id 
          ? { ...lang, ...languageForm, lastUpdated: new Date() }
          : lang
      ));
      toast.success('تم تحديث اللغة بنجاح');
    } else {
      const newLanguage: Language = {
        id: (languages.length + 1).toString(),
        ...languageForm,
        isDefault: false,
        isActive: false,
        completionPercentage: 0,
        lastUpdated: new Date()
      };
      setLanguages([...languages, newLanguage]);
      toast.success('تم إضافة اللغة بنجاح');
    }

    setIsLanguageModalOpen(false);
    setEditingLanguage(null);
  };

  const handleDeleteLanguage = (languageId: string) => {
    const language = languages.find(l => l.id === languageId);
    if (language?.isDefault) {
      toast.error('لا يمكن حذف اللغة الافتراضية');
      return;
    }

    if (window.confirm('هل أنت متأكد من حذف هذه اللغة؟')) {
      setLanguages(languages.filter(l => l.id !== languageId));
      toast.success('تم حذف اللغة بنجاح');
    }
  };

  const handleToggleLanguage = (languageId: string) => {
    setLanguages(languages.map(lang => 
      lang.id === languageId 
        ? { ...lang, isActive: !lang.isActive, lastUpdated: new Date() }
        : lang
    ));
    const language = languages.find(l => l.id === languageId);
    toast.success(`تم ${language?.isActive ? 'تعطيل' : 'تفعيل'} اللغة بنجاح`);
  };

  const handleSetDefaultLanguage = (languageId: string) => {
    setLanguages(languages.map(lang => ({
      ...lang,
      isDefault: lang.id === languageId,
      lastUpdated: new Date()
    })));
    toast.success('تم تعيين اللغة الافتراضية بنجاح');
  };

  const handleAddTranslation = () => {
    setEditingTranslation(null);
    setTranslationForm({
      key: '',
      arabic: '',
      english: '',
      french: '',
      spanish: '',
      category: 'general'
    });
    setIsTranslationModalOpen(true);
  };

  const handleEditTranslation = (translation: Translation) => {
    setEditingTranslation(translation);
    setTranslationForm({
      key: translation.key,
      arabic: translation.arabic,
      english: translation.english,
      french: translation.french || '',
      spanish: translation.spanish || '',
      category: translation.category
    });
    setIsTranslationModalOpen(true);
  };

  const handleSaveTranslation = () => {
    if (!translationForm.key || !translationForm.arabic || !translationForm.english) {
      toast.error('يرجى ملء الحقول المطلوبة (المفتاح، العربية، الإنجليزية)');
      return;
    }

    if (editingTranslation) {
      setTranslations(translations.map(trans => 
        trans.key === editingTranslation.key 
          ? { ...translationForm, french: translationForm.french || undefined, spanish: translationForm.spanish || undefined }
          : trans
      ));
      toast.success('تم تحديث الترجمة بنجاح');
    } else {
      if (translations.some(t => t.key === translationForm.key)) {
        toast.error('مفتاح الترجمة موجود مسبقاً');
        return;
      }
      
      const newTranslation: Translation = {
        ...translationForm,
        french: translationForm.french || undefined,
        spanish: translationForm.spanish || undefined
      };
      setTranslations([...translations, newTranslation]);
      toast.success('تم إضافة الترجمة بنجاح');
    }

    setIsTranslationModalOpen(false);
    setEditingTranslation(null);
  };

  const handleDeleteTranslation = (key: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الترجمة؟')) {
      setTranslations(translations.filter(t => t.key !== key));
      toast.success('تم حذف الترجمة بنجاح');
    }
  };

  const filteredTranslations = translations.filter(translation => {
    const matchesSearch = 
      translation.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translation.arabic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translation.english.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || translation.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const exportTranslations = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Key,Arabic,English,French,Spanish,Category\n" +
      translations.map(t => 
        `${t.key},${t.arabic},${t.english},${t.french || ''},${t.spanish || ''},${t.category}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "translations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('تم تصدير الترجمات بنجاح');
  };

  const getLanguageStats = () => {
    return {
      totalLanguages: languages.length,
      activeLanguages: languages.filter(l => l.isActive).length,
      averageCompletion: languages.reduce((sum, l) => sum + l.completionPercentage, 0) / languages.length,
      totalTranslations: translations.length
    };
  };

  const stats = getLanguageStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة اللغات</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إدارة اللغات المدعومة والترجمات</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'translations' && (
            <Button onClick={exportTranslations}>
              <Download size={16} className="ml-2" />
              تصدير الترجمات
            </Button>
          )}
          <Button onClick={activeTab === 'languages' ? handleAddLanguage : handleAddTranslation}>
            <Plus size={16} className="ml-2" />
            {activeTab === 'languages' ? 'إضافة لغة' : 'إضافة ترجمة'}
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">{stats.totalLanguages}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي اللغات</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{stats.activeLanguages}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">اللغات النشطة</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.averageCompletion.toFixed(1)}%</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">متوسط الإكمال</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600">{stats.totalTranslations}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي الترجمات</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
          <button
            onClick={() => setActiveTab('languages')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'languages'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
            }`}
          >
            <Globe size={16} className="inline ml-2" />
            اللغات
          </button>
          <button
            onClick={() => setActiveTab('translations')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'translations'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
            }`}
          >
            <Languages size={16} className="inline ml-2" />
            الترجمات
          </button>
        </nav>
      </div>

      {activeTab === 'languages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language) => (
            <Card key={language.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{language.flag}</span>
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                      {language.nativeName}
                      {language.isDefault && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                          افتراضي
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-300">
                      {language.name} ({language.code})
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleLanguage(language.id)}
                    className={`p-1 rounded ${language.isActive ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {language.isActive ? <Check size={16} /> : <X size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-secondary-600 dark:text-secondary-300">نسبة الإكمال</span>
                    <span className="font-medium">{language.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${language.completionPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="text-xs text-secondary-500 dark:text-secondary-400">
                  آخر تحديث: {language.lastUpdated.toLocaleDateString('ar-SA')}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEditLanguage(language)}
                >
                  <Edit3 size={14} className="ml-1" />
                  تعديل
                </Button>
                {!language.isDefault && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSetDefaultLanguage(language.id)}
                    >
                      افتراضي
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteLanguage(language.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'translations' && (
        <>
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="البحث في المفاتيح والترجمات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="md:w-48">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
                >
                  <option value="all">جميع الفئات</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Translations Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50 dark:bg-secondary-800">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      المفتاح
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      العربية
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      English
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      Français
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      Español
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      الفئة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                  {filteredTranslations.map((translation) => (
                    <tr key={translation.key} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-secondary-900 dark:text-white">
                        {translation.key}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                        {translation.arabic}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                        {translation.english}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-300">
                        {translation.french || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-300">
                        {translation.spanish || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                          {translation.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTranslation(translation)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTranslation(translation.key)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Language Modal */}
      <Modal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        title={editingLanguage ? 'تعديل اللغة' : 'إضافة لغة جديدة'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="رمز اللغة"
              value={languageForm.code}
              onChange={(e) => setLanguageForm(prev => ({ ...prev, code: e.target.value }))}
              placeholder="ar, en, fr"
            />
            <Input
              label="اسم اللغة (بالإنجليزية)"
              value={languageForm.name}
              onChange={(e) => setLanguageForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Arabic, English"
            />
          </div>
          <Input
            label="الاسم الأصلي"
            value={languageForm.nativeName}
            onChange={(e) => setLanguageForm(prev => ({ ...prev, nativeName: e.target.value }))}
            placeholder="العربية, English"
          />
          <Input
            label="الرمز التعبيري (العلم)"
            value={languageForm.flag}
            onChange={(e) => setLanguageForm(prev => ({ ...prev, flag: e.target.value }))}
            placeholder="🇸🇦, 🇺🇸"
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsLanguageModalOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveLanguage}>
              {editingLanguage ? 'تحديث' : 'إضافة'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Translation Modal */}
      <Modal
        isOpen={isTranslationModalOpen}
        onClose={() => setIsTranslationModalOpen(false)}
        title={editingTranslation ? 'تعديل الترجمة' : 'إضافة ترجمة جديدة'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="المفتاح *"
              value={translationForm.key}
              onChange={(e) => setTranslationForm(prev => ({ ...prev, key: e.target.value }))}
              placeholder="welcome, dashboard"
              disabled={!!editingTranslation}
            />
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                الفئة
              </label>
              <select
                value={translationForm.category}
                onChange={(e) => setTranslationForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <Input
            label="العربية *"
            value={translationForm.arabic}
            onChange={(e) => setTranslationForm(prev => ({ ...prev, arabic: e.target.value }))}
            placeholder="أدخل النص بالعربية"
          />
          <Input
            label="English *"
            value={translationForm.english}
            onChange={(e) => setTranslationForm(prev => ({ ...prev, english: e.target.value }))}
            placeholder="Enter text in English"
          />
          <Input
            label="Français"
            value={translationForm.french}
            onChange={(e) => setTranslationForm(prev => ({ ...prev, french: e.target.value }))}
            placeholder="Entrez le texte en français"
          />
          <Input
            label="Español"
            value={translationForm.spanish}
            onChange={(e) => setTranslationForm(prev => ({ ...prev, spanish: e.target.value }))}
            placeholder="Introduce el texto en español"
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsTranslationModalOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveTranslation}>
              {editingTranslation ? 'تحديث' : 'إضافة'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LanguagesManagement;