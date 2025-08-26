import { Faker, ar, en, base } from '@faker-js/faker';
import { Store, Product, Category, Order, Customer, Activity, Currency, User, PricingPlan, Coupon, Testimonial, BlogPost, Page, SupportTicket, Integration } from '../types';
import { 
  techCategories, techProducts,
  luxeCategories, luxeProducts,
  appliancesCategories, appliancesProducts,
  toysCategories, toysProducts,
  softwareCategories, softwareProducts
} from './themeData';

const faker = new Faker({ locale: [ar, en, base] });

export const generateMockData = () => {
  const users: User[] = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    createdAt: faker.date.past({ years: 2 }),
    totalOrders: faker.number.int({ min: 10, max: 200 }),
    totalSpent: parseFloat(faker.finance.amount({ min: 1000, max: 50000, dec: 2 })),
  }));

  const pricingPlans: PricingPlan[] = [
    { id: 'plan_free', name: 'المجانية', price: 0, currency: 'SAR', features: ['10 منتجات', 'تصميم أساسي', 'دعم محدود'], isPopular: false },
    { id: 'plan_advanced', name: 'المتقدمة', price: 99, currency: 'SAR', features: ['منتجات غير محدودة', '3 ثيمات احترافية', 'دعم أولوية', 'نطاق مخصص'], isPopular: true },
    { id: 'plan_enterprise', name: 'المؤسسية', price: 299, currency: 'SAR', features: ['كل ميزات المتقدمة', 'دعم مخصص', 'تكاملات API'], isPopular: false },
  ];

  const stores: Store[] = [
    { id: '1', name: 'متجر الأناقة العصرية', description: 'أحدث صيحات الموضة والأزياء العصرية', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=120&h=120&fit=crop', domain: 'elegance.sa', themeId: 'modern', currency: 'SAR', ownerId: users[0]?.id || '1', planId: 'plan_advanced', status: 'active', createdAt: faker.date.past({ years: 1 }) },
    { id: '2', name: 'تك زون للإلكترونيات', description: 'أحدث الأجهزة الإلكترونية والتقنية', logo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=120&h=120&fit=crop', domain: 'techzone.sa', themeId: 'tech', currency: 'SAR', ownerId: users[1]?.id || '2', planId: 'plan_enterprise', status: 'active', createdAt: faker.date.past({ years: 2 }) },
    { id: '3', name: 'فاخر للمجوهرات', description: 'مجوهرات فاخرة وإكسسوارات راقية', logo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=120&h=120&fit=crop', domain: 'luxe-jewelry.sa', themeId: 'luxe', currency: 'SAR', ownerId: users[2]?.id || '3', planId: 'plan_advanced', status: 'active', createdAt: faker.date.past({ years: 1 }) },
    { id: '4', name: 'بساطة للملابس', description: 'أزياء بسيطة وأنيقة للحياة اليومية', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=120&h=120&fit=crop', domain: 'minimal-style.sa', themeId: 'minimal', currency: 'SAR', ownerId: users[3]?.id || '4', planId: 'plan_free', status: 'active', createdAt: faker.date.past({ years: 6, refDate: new Date() }) },
    { id: '5', name: 'ألوان الشباب', description: 'موضة شبابية حيوية وملونة', logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop', domain: 'vibrant-youth.sa', themeId: 'vibrant', currency: 'SAR', ownerId: users[4]?.id || '5', planId: 'plan_advanced', status: 'active', createdAt: faker.date.past({ years: 1 }) },
    { id: '6', name: 'الأجهزة المنزلية الذكية', description: 'أجهزة منزلية حديثة وذكية', logo: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=120&h=120&fit=crop', domain: 'smart-home.sa', themeId: 'appliances', currency: 'SAR', ownerId: users[5]?.id || '6', planId: 'plan_enterprise', status: 'active', createdAt: faker.date.past({ years: 2 }) },
    { id: '7', name: 'عالم الألعاب المرح', description: 'ألعاب تعليمية ومسلية للأطفال', logo: 'https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=120&h=120&fit=crop', domain: 'fun-toys.sa', themeId: 'toys', currency: 'SAR', ownerId: users[6]?.id || '7', planId: 'plan_advanced', status: 'active', createdAt: faker.date.past({ years: 1 }) },
    { id: '8', name: 'حلول البرمجيات', description: 'برامج وتطبيقات متطورة للأعمال', logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=120&h=120&fit=crop', domain: 'software-solutions.sa', themeId: 'software', currency: 'USD', ownerId: users[7]?.id || '8', planId: 'plan_enterprise', status: 'active', createdAt: faker.date.past({ years: 3 }) }
  ];

  // Combine all categories from different themes
  const fashionCategories: Category[] = [
    { id: '1', name: 'ملابس نسائية', description: 'أحدث صيحات الموضة النسائية', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop', storeId: '1' },
    { id: '2', name: 'ملابس رجالية', description: 'أناقة رجالية لكل مناسبة', image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=300&fit=crop', storeId: '1' },
    { id: '3', name: 'فساتين', description: 'فساتين أنيقة لجميع المناسبات', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop', storeId: '1' },
    { id: '4', name: 'أحذية', description: 'أحذية عصرية ومريحة', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop', storeId: '1' },
    { id: '5', name: 'حقائب', description: 'حقائب أنيقة وعملية', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', storeId: '1' },
    { id: '6', name: 'إكسسوارات', description: 'إكسسوارات تكمل إطلالتك', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop', storeId: '1' }
  ];
  
  const minimalCategories: Category[] = [
    { id: '31', name: 'قمصان بسيطة', description: 'قمصان بتصميم بسيط وأنيق', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop', storeId: '4' },
    { id: '32', name: 'بناطيل كاجوال', description: 'بناطيل مريحة وعملية', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop', storeId: '4' },
    { id: '33', name: 'أحذية بسيطة', description: 'أحذية مريحة وبسيطة', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop', storeId: '4' },
    { id: '34', name: 'إكسسوارات بسيطة', description: 'إكسسوارات بتصميم مينيمال', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop', storeId: '4' }
  ];
  
  const vibrantCategories: Category[] = [
    { id: '41', name: 'ملابس شبابية', description: 'أزياء شبابية حيوية', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', storeId: '5' },
    { id: '42', name: 'أحذية رياضية', description: 'أحذية رياضية ملونة', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop', storeId: '5' },
    { id: '43', name: 'حقائب ملونة', description: 'حقائب شبابية ملونة', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', storeId: '5' },
    { id: '44', name: 'إكسسوارات عصرية', description: 'إكسسوارات شبابية عصرية', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop', storeId: '5' }
  ];
  
  const categories: Category[] = [
    ...fashionCategories,
    ...techCategories,
    ...luxeCategories,
    ...minimalCategories,
    ...vibrantCategories,
    ...appliancesCategories,
    ...toysCategories,
    ...softwareCategories
  ];

  // Combine all products from different themes
  const allThemeProducts = [
    // Fashion products for store 1 (modern)
    { name: 'فستان صيفي أنيق', description: 'فستان صيفي خفيف ومريح', price: 299, categoryId: '1', images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop'], rating: 4.8, reviewCount: 124, featured: true, tags: ['صيفي'], storeId: '1' },
    { name: 'قميص قطني', description: 'قميص قطني عالي الجودة', price: 280, categoryId: '2', images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop'], rating: 4.7, reviewCount: 203, featured: true, tags: ['قطن'], storeId: '1' },
    // Tech products for store 2
    ...techProducts.map(p => ({ ...p, storeId: '2' })),
    // Luxe products for store 3  
    ...luxeProducts.map(p => ({ ...p, storeId: '3' })),
    // Minimal products for store 4
    { name: 'قميص بسيط', description: 'قميص بسيط أبيض', price: 150, categoryId: '31', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'], rating: 4.5, reviewCount: 156, tags: ['بسيط'], storeId: '4' },
    // Vibrant products for store 5
    { name: 'تي شيرت ملون', description: 'تي شيرت شبابي ملون', price: 89, categoryId: '41', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'], rating: 4.4, reviewCount: 234, tags: ['ملون'], storeId: '5' },
    // Appliances for store 6
    ...appliancesProducts.map(p => ({ ...p, storeId: '6' })),
    // Toys for store 7
    ...toysProducts.map(p => ({ ...p, storeId: '7' })),
    // Software for store 8
    ...softwareProducts.map(p => ({ ...p, storeId: '8' }))
  ];


  const products: Product[] = allThemeProducts.map((product, i) => ({
    id: (i + 1).toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    currency: 'SAR' as Currency,
    image: product.images[0],
    images: product.images,
    categoryId: product.categoryId,
    storeId: product.storeId || '1',
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    rating: product.rating,
    reviewCount: product.reviewCount,
    featured: product.featured || false,
    inStock: true,
    discount: product.discount || 0,
    tags: product.tags || [],
    variants: [
      { name: 'المقاس', options: ['S', 'M', 'L', 'XL'] },
      { name: 'اللون', options: ['أسود', 'أبيض', 'أزرق', 'أحمر'] }
    ]
  }));

  const customers: Customer[] = Array.from({ length: 200 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    totalOrders: faker.number.int({ min: 0, max: 50 }),
    totalSpent: parseFloat(faker.finance.amount({ min: 0, max: 20000, dec: 2 })),
    createdAt: faker.date.past({ years: 3 }),
  }));

  const orders: Order[] = Array.from({ length: 500 }, () => {
    const customer = faker.helpers.arrayElement(customers);
    const store = faker.helpers.arrayElement(stores);
    const storeProducts = products.filter(p => p.storeId === store.id);
    const orderItems = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
      const product = storeProducts.length > 0 ? faker.helpers.arrayElement(storeProducts) : products[0];
      const quantity = faker.number.int({ min: 1, max: 3 });
      return {
        productId: product.id,
        quantity,
        price: product.price,
      };
    });
    
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return {
      id: faker.string.uuid(),
      customerId: customer.id,
      storeId: store.id,
      items: orderItems,
      total,
      currency: store.currency,
      status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
      paymentMethod: faker.helpers.arrayElement(['cod', 'online']),
      shippingAddress: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
      },
      createdAt: faker.date.past(),
    };
  });

  const activities: Activity[] = Array.from({ length: 20 }, () => {
    const type = faker.helpers.arrayElement(['new_order', 'new_customer', 'product_update', 'theme_change']);
    let description = '';
    switch (type) {
      case 'new_order':
        description = `طلب جديد #${faker.string.alphanumeric(8)} بمبلغ ${faker.finance.amount({ min: 100, max: 1000, dec: 2 })} ريال`;
        break;
      case 'new_customer':
        description = `انضمام عميل جديد: ${faker.person.fullName()}`;
        break;
      case 'product_update':
        description = `تم تحديث المنتج: ${faker.commerce.productName()}`;
        break;
      case 'theme_change':
        description = `تم تغيير تصميم المتجر إلى الثيم ${faker.helpers.arrayElement(['العصري', 'البسيط'])}`;
        break;
    }
    return {
      id: faker.string.uuid(),
      type,
      description,
      timestamp: faker.date.recent(),
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const coupons: Coupon[] = [
    { id: 'coupon1', code: 'SAVE10', type: 'percentage', value: 10, isActive: true, expiryDate: faker.date.future() },
    { id: 'coupon2', code: '50OFF', type: 'fixed', value: 50, isActive: true, expiryDate: faker.date.future() },
    { id: 'coupon3', code: 'EXPIRED', type: 'percentage', value: 20, isActive: false, expiryDate: faker.date.past() },
  ];

  const testimonials: Testimonial[] = [
    { id: 'test1', name: 'أحمد السالم', role: 'مالك متجر الأزياء', content: 'منشئ المتاجر ساعدني في إطلاق متجري الإلكتروني في أقل من يوم واحد. الأدوات سهلة والدعم ممتاز.', avatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/60x60/3b82f6/ffffff?text=A', rating: 5 },
    { id: 'test2', name: 'فاطمة المحمد', role: 'صاحبة متجر المجوهرات', content: 'التصاميم رائعة والتخصيص سهل جداً. زادت مبيعاتي بنسبة 200% خلال شهرين.', avatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/60x60/ec4899/ffffff?text=F', rating: 5 },
    { id: 'test3', name: 'محمد العتيبي', role: 'مالك متجر الإلكترونيات', content: 'أفضل منصة جربتها لإنشاء المتاجر الإلكترونية. التحليلات تساعدني في فهم عملائي أكثر.', avatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/60x60/10b981/ffffff?text=M', rating: 4 },
  ];

  const blogPosts: BlogPost[] = Array.from({ length: 15 }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(5),
    author: faker.person.fullName(),
    status: faker.helpers.arrayElement(['published', 'draft']),
    createdAt: faker.date.past({ years: 1 }),
  }));

  const pages: Page[] = [
    { id: '1', title: 'من نحن', slug: '/about-us', status: 'published', lastModified: faker.date.past() },
    { id: '2', title: 'سياسة الخصوصية', slug: '/privacy-policy', status: 'published', lastModified: faker.date.past() },
    { id: '3', title: 'الشروط والأحكام', slug: '/terms', status: 'published', lastModified: faker.date.past() },
  ];

  const supportTickets: SupportTicket[] = Array.from({ length: 20 }, () => ({
    id: faker.string.uuid(),
    subject: faker.lorem.sentence(4),
    user: faker.person.fullName(),
    status: faker.helpers.arrayElement(['open', 'in_progress', 'closed']),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    lastUpdate: faker.date.recent(),
  }));

  const integrations: Integration[] = [
    { id: 'stripe', name: 'Stripe', logo: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/635bff/ffffff?text=Stripe', description: 'بوابة دفع عالمية', category: 'payment', isEnabled: true },
    { id: 'paypal', name: 'PayPal', logo: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/0070ba/ffffff?text=PayPal', description: 'محفظة إلكترونية شهيرة', category: 'payment', isEnabled: false },
    { id: 'aramex', name: 'Aramex', logo: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/e4002b/ffffff?text=Aramex', description: 'شركة شحن إقليمية', category: 'shipping', isEnabled: true },
    { id: 'mailchimp', name: 'Mailchimp', logo: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/ffe01b/000000?text=MC', description: 'أداة تسويق بالبريد الإلكتروني', category: 'marketing', isEnabled: false },
  ];

  return {
    users,
    stores,
    categories,
    products,
    customers,
    orders,
    activities,
    pricingPlans,
    coupons,
    testimonials,
    blogPosts,
    pages,
    supportTickets,
    integrations,
  };
};
