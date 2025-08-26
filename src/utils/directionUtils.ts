import { useTranslation } from 'react-i18next';

// Hook to get direction-aware utilities
export const useDirectionUtils = () => {
  const { t } = useTranslation();
  
  return {
    // Basic direction properties
    direction: t('direction', { defaultValue: 'rtl' }),
    isRTL: t('direction', { defaultValue: 'rtl' }) === 'rtl',
    isLTR: t('direction', { defaultValue: 'rtl' }) === 'ltr',
    
    // Layout properties
    textAlign: t('layout.text_align', { defaultValue: 'right' }),
    flexDirection: t('layout.flex_direction', { defaultValue: 'row-reverse' }),
    
    // Margin and padding helpers
    marginStart: (size: string) => `${t('layout.margin_start', { defaultValue: 'mr' })}-${size}`,
    marginEnd: (size: string) => `${t('layout.margin_end', { defaultValue: 'ml' })}-${size}`,
    paddingStart: (size: string) => `${t('layout.padding_start', { defaultValue: 'pr' })}-${size}`,
    paddingEnd: (size: string) => `${t('layout.padding_end', { defaultValue: 'pl' })}-${size}`,
    
    // Positioning helpers
    left: t('layout.left', { defaultValue: 'right' }),
    right: t('layout.right', { defaultValue: 'left' }),
    
    // Class generators for common patterns
    getMarginClass: (start: string, end?: string) => {
      const startClass = `${t('layout.margin_start', { defaultValue: 'mr' })}-${start}`;
      return end ? `${startClass} ${t('layout.margin_end', { defaultValue: 'ml' })}-${end}` : startClass;
    },
    
    getPaddingClass: (start: string, end?: string) => {
      const startClass = `${t('layout.padding_start', { defaultValue: 'pr' })}-${start}`;
      return end ? `${startClass} ${t('layout.padding_end', { defaultValue: 'pl' })}-${end}` : startClass;
    },
    
    // Flexbox helpers
    getFlexClass: (reverse = false) => {
      const baseDirection = t('layout.flex_direction', { defaultValue: 'row-reverse' });
      return reverse 
        ? (baseDirection === 'row-reverse' ? 'flex-row' : 'flex-row-reverse')
        : baseDirection;
    },
    
    // Icon rotation for directional icons
    getIconRotation: (isDirectional = false) => {
      return isDirectional && t('direction', { defaultValue: 'rtl' }) === 'ltr' ? 'rotate-180' : '';
    }
  };
};