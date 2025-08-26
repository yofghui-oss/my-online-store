import { Product } from '../types';

export const createMockProduct = (overrides: Partial<Product> = {}): Product => ({
  id: '1',
  name: 'منتج تجريبي',
  description: 'وصف المنتج التجريبي',
  price: 299,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
  currency: 'SAR',
  categoryId: '1',
  storeId: '1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  featured: true,
  rating: 4.5,
  reviewCount: 24,
  reviews: [],
  inStock: true,
  discount: 0,
  tags: [],
  variants: [],
  ...overrides,
});

export const ensureProductCompatibility = (product: any): Product => ({
  ...product,
  images: product.images || [product.image],
  currency: product.currency || 'SAR',
  reviews: product.reviews || [],
  rating: product.rating || 0,
  reviewCount: product.reviewCount || 0,
  inStock: product.inStock !== undefined ? product.inStock : true,
  featured: product.featured || false,
  discount: product.discount || 0,
  tags: product.tags || [],
  variants: product.variants || [],
});
