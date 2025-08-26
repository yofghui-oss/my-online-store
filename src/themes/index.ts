import { StoreTheme } from '../types';

const minimalTheme: StoreTheme = {
  id: 'minimal',
  name: 'Minimal',
  description: 'تصميم بسيط وهادئ للملابس والأزياء - مثالي للمتاجر الأنيقة.',
  category: 'fashion',
  previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
};

const techTheme: StoreTheme = {
  id: 'tech',
  name: 'Tech',
  description: 'تصميم تقني متطور بألوان داكنة - مثالي للإلكترونيات والأجهزة.',
  category: 'electronics',
  previewImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
};

const modernTheme: StoreTheme = {
  id: 'modern',
  name: 'Modern',
  description: 'تصميم عصري بتدرجات أنيقة - مثالي للأزياء والموضة.',
  category: 'fashion',
  previewImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
};

const luxeTheme: StoreTheme = {
  id: 'luxe',
  name: 'Luxe',
  description: 'تصميم فاخر بألوان ذهبية - مثالي للمنتجات الراقية والفاخرة.',
  category: 'luxury',
  previewImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
};

const vibrantTheme: StoreTheme = {
  id: 'vibrant',
  name: 'Vibrant',
  description: 'تصميم حيوي وملون بحركات متقدمة - مثالي للشباب والمنتجات العصرية.',
  category: 'youth',
  previewImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
};

const appliancesTheme: StoreTheme = {
  id: 'appliances',
  name: 'Appliances',
  description: 'تصميم مخصص للأجهزة المنزلية والكهربائية - واضح وعملي.',
  category: 'appliances',
  previewImage: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
};

const toysTheme: StoreTheme = {
  id: 'toys',
  name: 'Toys',
  description: 'تصميم مرح وملون للألعاب والأطفال - جذاب ومبهج.',
  category: 'toys',
  previewImage: 'https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
};

const softwareTheme: StoreTheme = {
  id: 'software',
  name: 'Software',
  description: 'تصميم تقني للبرمجيات والتطبيقات - احترافي ونظيف.',
  category: 'software',
  previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
};

export const availableThemes: StoreTheme[] = [
  minimalTheme, 
  techTheme, 
  modernTheme, 
  luxeTheme, 
  vibrantTheme, 
  appliancesTheme, 
  toysTheme, 
  softwareTheme
];

export const getThemeById = (id: string): StoreTheme => {
  return availableThemes.find(t => t.id === id) || minimalTheme;
};

export type ThemeId = 'minimal' | 'tech' | 'modern' | 'luxe' | 'vibrant' | 'appliances' | 'toys' | 'software';
