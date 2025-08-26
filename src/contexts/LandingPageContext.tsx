import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LandingPageContent } from '../types';

interface LandingPageContextType {
  content: LandingPageContent;
  setContent: React.Dispatch<React.SetStateAction<LandingPageContent>>;
}

const defaultContent: LandingPageContent = {
  hero: {
    title: 'أنشئ متجرك الإلكتروني',
    highlight: 'في دقائق',
    subtitle: 'منصة شاملة لإنشاء وإدارة المتاجر الإلكترونية بسهولة وسرعة. بدون خبرة تقنية مطلوبة.',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/ffffff/3b82f6?text=E-Store',
  },
  features: [
    { icon: 'ShoppingBag', title: 'إدارة شاملة للمتجر', description: 'إدارة المنتجات والطلبات والعملاء من لوحة تحكم واحدة' },
    { icon: 'Palette', title: 'تخصيص بدون حدود', description: 'أدوات سحب وإفلات لتخصيص تصميم متجرك بالكامل' },
    { icon: 'BarChart3', title: 'تحليلات متقدمة', description: 'تتبع المبيعات والأرباح وأداء المنتجات بتقارير تفصيلية' },
    { icon: 'Shield', title: 'أمان عالي', description: 'حماية متقدمة لبيانات متجرك وعملائك' },
    { icon: 'Zap', title: 'سرعة فائقة', description: 'أداء سريع ومُحسن لتحسين تجربة المستخدم' },
    { icon: 'Heart', title: 'دعم فني 24/7', description: 'فريق دعم متخصص متاح دائماً لمساعدتك' },
  ],
};

const LandingPageContext = createContext<LandingPageContextType | undefined>(undefined);

export const useLandingPage = (): LandingPageContextType => {
  const context = useContext(LandingPageContext);
  if (!context) {
    throw new Error('useLandingPage must be used within a LandingPageProvider');
  }
  return context;
};

export const LandingPageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<LandingPageContent>(defaultContent);

  return (
    <LandingPageContext.Provider value={{ content, setContent }}>
      {children}
    </LandingPageContext.Provider>
  );
};
