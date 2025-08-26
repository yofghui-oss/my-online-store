import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import { useTheme } from '../../contexts/ThemeContext';

// This component serves as a fallback when the DynamicThemeRoutes system 
// doesn't have a specific contact component for the current theme

const StorefrontContact: React.FC = () => {
  const { currentStore } = useStore();
  const { themeId } = useTheme();

  if (!currentStore) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Fallback contact page for themes that don't have dedicated ones
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">اتصل بنا</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">صفحة اتصل بنا لثيم {themeId}</p>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400">تواصل مع {currentStore.name}</p>
        </div>
      </div>
    </div>
  );
};

export default StorefrontContact;
