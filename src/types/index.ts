export type Currency = 'SAR' | 'USD' | 'EUR';

export interface Store {
  id: string;
  name: string;
  description: string;
  logo: string;
  domain: string;
  themeId: 'modern' | 'luxe' | 'vibrant' | 'minimal' | 'tech' | 'appliances' | 'toys' | 'software';
  currency: Currency;
  ownerId: string;
  planId: string;
  status: 'active' | 'suspended';
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  currency: Currency;
  categoryId: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  reviews?: any[];
  inStock?: boolean;
  discount?: number;
  tags?: string[];
  variants?: ProductVariant[];
}

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface ProductVariantOption {
  id: string;
  name: string;
  price: number;
  image?: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  storeId: string;
  parentId?: string;
}

export interface Order {
  id: string;
  customerId: string;
  storeId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  currency: Currency;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'online' | 'pos_cash' | 'pos_card';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  totalOrders: number;
  totalSpent: number;
}

export interface StoreTheme {
  id: 'modern' | 'luxe' | 'vibrant' | 'minimal' | 'tech' | 'appliances' | 'toys' | 'software';
  name: string;
  description: string;
  category: string; // 'fashion', 'electronics', 'appliances', 'toys', 'software', 'luxury'
  previewImage: string;
}

export interface Activity {
  id: string;
  type: 'new_order' | 'new_customer' | 'product_update' | 'theme_change';
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface LandingPageContent {
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
    image: string;
  };
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  features: string[];
  isPopular: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  isActive: boolean;
  expiryDate: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  status: 'published' | 'draft';
  createdAt: Date;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  lastModified: Date;
}

export interface SupportTicket {
  id: string;
  subject: string;
  user: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  lastUpdate: Date;
}

export interface Integration {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: 'payment' | 'shipping' | 'marketing';
  isEnabled: boolean;
}
