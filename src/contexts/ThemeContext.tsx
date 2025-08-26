import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { StoreTheme } from '../types';
import { availableThemes, getThemeById } from '../themes';

type ColorMode = 'light' | 'dark';
type ThemeId = 'minimal' | 'tech' | 'modern' | 'luxe' | 'vibrant' | 'appliances' | 'toys' | 'software';

interface ThemeContextType {
  // Color mode (light/dark)
  colorMode: ColorMode;
  toggleColorMode: () => void;
  
  // Store theme
  currentTheme: StoreTheme;
  themeId: ThemeId;
  setThemeId: (themeId: ThemeId) => void;
  
  // Available themes
  availableThemes: StoreTheme[];
  
  // Theme customization
  themeCustomizations: Record<string, any>;
  updateThemeCustomization: (key: string, value: any) => void;
  resetThemeCustomizations: () => void;
  
  // Preview mode
  isPreviewMode: boolean;
  setPreviewMode: (enabled: boolean) => void;
  previewThemeId: ThemeId | null;
  setPreviewThemeId: (themeId: ThemeId | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Color mode state
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const savedColorMode = localStorage.getItem('colorMode') as ColorMode;
    return savedColorMode || 'light';
  });

  // Store theme state
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    // Try to get theme from localStorage - prioritize store-specific theme over global
    const savedThemeId = localStorage.getItem('storeThemeId') as ThemeId;
    return savedThemeId || 'modern'; // Default to modern instead of minimal
  });

  // Theme customizations
  const [themeCustomizations, setThemeCustomizations] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem('themeCustomizations');
    return saved ? JSON.parse(saved) : {};
  });

  // Preview mode state
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewThemeId, setPreviewThemeId] = useState<ThemeId | null>(null);

  // Get current theme
  const currentTheme = getThemeById(isPreviewMode && previewThemeId ? previewThemeId : themeId);

  // Effects
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(colorMode);
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);

  useEffect(() => {
    localStorage.setItem('storeThemeId', themeId);
    
    // Apply theme-specific classes to body
    const body = document.body;
    body.className = body.className.replace(/theme-\w+/g, '');
    body.classList.add(`theme-${themeId}`);
  }, [themeId]);

  useEffect(() => {
    localStorage.setItem('themeCustomizations', JSON.stringify(themeCustomizations));
  }, [themeCustomizations]);

  // Methods
  const toggleColorMode = () => {
    setColorMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const setThemeId = (newThemeId: ThemeId) => {
    setThemeIdState(newThemeId);
    setIsPreviewMode(false);
    setPreviewThemeId(null);
  };

  const updateThemeCustomization = (key: string, value: any) => {
    setThemeCustomizations(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetThemeCustomizations = () => {
    setThemeCustomizations({});
  };

  const setPreviewMode = (enabled: boolean) => {
    setIsPreviewMode(enabled);
    if (!enabled) {
      setPreviewThemeId(null);
    }
  };

  return (
    <ThemeContext.Provider value={{
      colorMode,
      toggleColorMode,
      currentTheme,
      themeId: isPreviewMode && previewThemeId ? previewThemeId : themeId,
      setThemeId,
      availableThemes,
      themeCustomizations,
      updateThemeCustomization,
      resetThemeCustomizations,
      isPreviewMode,
      setPreviewMode,
      previewThemeId,
      setPreviewThemeId
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Helper hook for getting theme-specific components
export const useThemeComponents = () => {
  const { themeId } = useTheme();
  
  // This will be populated with actual theme components
  const getThemeComponent = (componentName: string) => {
    // Dynamic import based on theme
    switch (themeId) {
      case 'minimal':
        return import(`../components/themes/minimal`);
      case 'tech':
        return import(`../components/themes/tech`);
      case 'modern':
        return import(`../components/themes/modern`);
      case 'luxe':
        return import(`../components/themes/luxe`);
      case 'vibrant':
        return import(`../components/themes/vibrant`);
      case 'software':
        return import(`../components/themes/software`);
      case 'appliances':
        return import(`../components/themes/appliances`);
      case 'toys':
        return import(`../components/themes/toys`);
      default:
        return import(`../components/themes/minimal`);
    }
  };
  
  return { getThemeComponent, themeId };
};
