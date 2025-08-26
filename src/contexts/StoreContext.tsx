import React, { createContext, useContext, useState, ReactNode } from 'react';
import { faker } from '@faker-js/faker';
import { Product, Category, Order, Customer, Store, Activity, Currency, User, PricingPlan, Coupon, Testimonial, BlogPost, Page, SupportTicket, Integration } from '../types';
import { generateMockData } from '../utils/mockData';
import { availableThemes, getThemeById } from '../themes';

interface StoreContextType {
  stores: Store[];
  users: User[];
  pricingPlans: PricingPlan[];
  coupons: Coupon[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  pages: Page[];
  supportTickets: SupportTicket[];
  integrations: Integration[];
  currentStore: Store | null;
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  activities: Activity[];
  cart: { productId: string; quantity: number }[];
  appliedCoupon: Coupon | null;
  
  // Theme management
  availableThemes: typeof availableThemes;
  getThemeById: typeof getThemeById;
  
  setCurrentStore: (store: Store) => void;
  updateStoreSettings: (settings: Partial<Pick<Store, 'themeId' | 'currency' | 'name' | 'description'>>) => void;
  createStore: (storeData: Omit<Store, 'id' | 'createdAt'>) => Store;
  updateStore: (id: string, updates: Partial<Store>) => void;
  deleteStore: (id: string) => void;
  
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  updatePricingPlan: (id: string, plan: Partial<PricingPlan>) => void;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  toggleIntegration: (id: string) => void;
  
  // Analytics and Dashboard
  getStoreAnalytics: (storeId: string) => {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    recentOrders: Order[];
    topProducts: Product[];
  };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const mockData = generateMockData();
  
  const [stores, setStores] = useState<Store[]>(mockData.stores);
  const [users] = useState<User[]>(mockData.users);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(mockData.pricingPlans);
  const [coupons, setCoupons] = useState<Coupon[]>(mockData.coupons);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockData.testimonials);
  const [blogPosts] = useState<BlogPost[]>(mockData.blogPosts);
  const [pages] = useState<Page[]>(mockData.pages);
  const [supportTickets] = useState<SupportTicket[]>(mockData.supportTickets);
  const [integrations, setIntegrations] = useState<Integration[]>(mockData.integrations);
  const [currentStore, setCurrentStore] = useState<Store | null>(mockData.stores[0]);
  const [products, setProducts] = useState<Product[]>(mockData.products);
  const [categories] = useState<Category[]>(mockData.categories);
  const [orders] = useState<Order[]>(mockData.orders);
  const [customers] = useState<Customer[]>(mockData.customers);
  const [activities] = useState<Activity[]>(mockData.activities);
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const updateStoreSettings = (settings: Partial<Pick<Store, 'themeId' | 'currency' | 'name' | 'description'>>) => {
    if (currentStore) {
      const updatedStore = { ...currentStore, ...settings };
      setCurrentStore(updatedStore);
      setStores(prevStores => prevStores.map(s => s.id === updatedStore.id ? updatedStore : s));
      
      if (settings.currency) {
        setProducts(prevProducts => prevProducts.map(p => 
          p.storeId === currentStore.id ? { ...p, currency: settings.currency as Currency } : p
        ));
      }
    }
  };

  const createStore = (storeData: Omit<Store, 'id' | 'createdAt'>): Store => {
    const newStore: Store = {
      ...storeData,
      id: faker.string.uuid(),
      createdAt: new Date()
    };
    setStores(prev => [...prev, newStore]);
    return newStore;
  };

  const updateStore = (id: string, updates: Partial<Store>) => {
    setStores(prev => prev.map(store => 
      store.id === id ? { ...store, ...updates } : store
    ));
    if (currentStore?.id === id) {
      setCurrentStore(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteStore = (id: string) => {
    setStores(prev => prev.filter(store => store.id !== id));
    if (currentStore?.id === id) {
      setCurrentStore(null);
    }
  };

  const getStoreAnalytics = (storeId: string) => {
    const storeOrders = orders.filter(order => order.storeId === storeId);
    const storeProducts = products.filter(product => product.storeId === storeId);
    const storeCustomers = customers; // In a real app, filter by store
    
    const totalRevenue = storeOrders.reduce((sum, order) => sum + order.total, 0);
    const recentOrders = storeOrders.slice(0, 10);
    const topProducts = storeProducts.slice(0, 5);
    
    return {
      totalRevenue,
      totalOrders: storeOrders.length,
      totalCustomers: storeCustomers.length,
      totalProducts: storeProducts.length,
      recentOrders,
      topProducts
    };
  };

  const addToCart = (productId: string, quantity: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === productId);
      if (existingItem) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: faker.string.uuid(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const applyCoupon = (code: string): boolean => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (coupon) {
      setAppliedCoupon(coupon);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const updatePricingPlan = (id: string, updatedPlan: Partial<PricingPlan>) => {
    setPricingPlans(prev => prev.map(p => p.id === id ? { ...p, ...updatedPlan } : p));
  };

  const updateCoupon = (id: string, updatedCoupon: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...updatedCoupon } : c));
  };

  const updateTestimonial = (id: string, updatedTestimonial: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updatedTestimonial } : t));
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id ? { ...integration, isEnabled: !integration.isEnabled } : integration
      )
    );
  };

  return (
    <StoreContext.Provider value={{
      stores,
      users,
      pricingPlans,
      coupons,
      testimonials,
      blogPosts,
      pages,
      supportTickets,
      integrations,
      currentStore,
      products,
      categories,
      orders,
      customers,
      activities,
      cart,
      appliedCoupon,
      
      // Theme management
      availableThemes,
      getThemeById,
      
      setCurrentStore,
      updateStoreSettings,
      createStore,
      updateStore,
      deleteStore,
      
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      addProduct,
      updateProduct,
      deleteProduct,
      applyCoupon,
      removeCoupon,
      updatePricingPlan,
      updateCoupon,
      updateTestimonial,
      toggleIntegration,
      getStoreAnalytics,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
