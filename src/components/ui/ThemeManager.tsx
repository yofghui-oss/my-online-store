import React, { useState } from 'react';
import { Monitor, Palette, Eye, Settings, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useStore } from '../../contexts/StoreContext';

const ThemeManager: React.FC = () => {
  const { 
    currentTheme, 
    themeId, 
    setThemeId, 
    availableThemes, 
    isPreviewMode, 
    setPreviewMode, 
    setPreviewThemeId,
    colorMode,
    toggleColorMode 
  } = useTheme();
  
  const { currentStore, updateStoreSettings } = useStore();
  const [selectedTheme, setSelectedTheme] = useState(themeId);

  const handleThemeSelect = (newThemeId: typeof themeId) => {
    setSelectedTheme(newThemeId);
    if (isPreviewMode) {
      setPreviewThemeId(newThemeId);
    }
  };

  const handleApplyTheme = () => {
    setThemeId(selectedTheme);
    updateStoreSettings({ themeId: selectedTheme });
    setPreviewMode(false);
  };

  const handlePreviewToggle = () => {
    if (isPreviewMode) {
      setPreviewMode(false);
    } else {
      setPreviewMode(true);
      setPreviewThemeId(selectedTheme);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Palette className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Theme Manager</h2>
            <p className="text-sm text-gray-600">Customize your store's appearance</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Color Mode Toggle */}
          <button
            onClick={toggleColorMode}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Monitor className="w-4 h-4" />
            <span className="text-sm font-medium">{colorMode === 'light' ? 'Dark' : 'Light'}</span>
          </button>
          
          {/* Preview Toggle */}
          <button
            onClick={handlePreviewToggle}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isPreviewMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isPreviewMode ? 'Exit Preview' : 'Preview Mode'}
            </span>
          </button>
        </div>
      </div>

      {/* Current Theme Info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900">
              Current Theme: {currentTheme.name}
            </h3>
            <p className="text-sm text-blue-700">{currentTheme.description}</p>
            <p className="text-xs text-blue-600 mt-1">Category: {currentTheme.category}</p>
          </div>
          {isPreviewMode && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              PREVIEW MODE
            </div>
          )}
        </div>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {availableThemes.map((theme) => (
          <div
            key={theme.id}
            className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
              selectedTheme === theme.id
                ? 'border-purple-500 ring-2 ring-purple-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleThemeSelect(theme.id)}
          >
            {/* Theme Preview Image */}
            <div className="aspect-video relative">
              <img
                src={theme.previewImage}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
              {selectedTheme === theme.id && (
                <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                  <div className="bg-purple-500 text-white p-2 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Theme Info */}
            <div className="p-3">
              <h4 className="font-medium text-gray-900">{theme.name}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{theme.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {theme.category}
                </span>
                {theme.id === themeId && !isPreviewMode && (
                  <span className="text-xs text-green-600 font-medium">Active</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {isPreviewMode ? (
            <span>Preview mode is active. Changes are temporary.</span>
          ) : (
            <span>Select a theme and apply to your store.</span>
          )}
        </div>
        
        <div className="flex space-x-3">
          {isPreviewMode && (
            <button
              onClick={() => setPreviewMode(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel Preview
            </button>
          )}
          
          <button
            onClick={handleApplyTheme}
            disabled={selectedTheme === themeId && !isPreviewMode}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>{isPreviewMode ? 'Apply Theme' : 'Update Theme'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeManager;