import { Product, Category } from '../types';

// Tech store categories and products
export const techCategories: Category[] = [
  { id: '11', name: 'هواتف ذكية', description: 'أحدث الهواتف الذكية', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', storeId: '2' },
  { id: '12', name: 'أجهزة كمبيوتر', description: 'أجهزة كمبيوتر وملحقاتها', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop', storeId: '2' },
  { id: '13', name: 'سماعات وصوتيات', description: 'سماعات عالية الجودة', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', storeId: '2' },
  { id: '14', name: 'كاميرات', description: 'كاميرات احترافية ومتقدمة', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop', storeId: '2' },
  { id: '15', name: 'إكسسوارات تقنية', description: 'ملحقات وإكسسوارات تقنية', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop', storeId: '2' }
];

export const techProducts = [
  { name: 'iPhone 15 Pro Max', description: 'أحدث هاتف iPhone بكاميرا احترافية ومعالج A17 Pro', price: 4999, categoryId: '11', images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop'], rating: 4.9, reviewCount: 892, featured: true, tags: ['آيفون', 'احترافي', 'كاميرا'], discount: 5 },
  { name: 'Samsung Galaxy S24 Ultra', description: 'هاتف Samsung المتطور بقلم S Pen وكاميرا 200 ميجابكسل', price: 4599, categoryId: '11', images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop'], rating: 4.8, reviewCount: 734, featured: true, tags: ['سامسونج', 'S Pen', 'كاميرا'] },
  { name: 'MacBook Pro M3', description: 'لابتوب MacBook Pro بمعالج M3 للمحترفين', price: 8999, categoryId: '12', images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop'], rating: 4.8, reviewCount: 456, featured: true, tags: ['ماك', 'احترافي', 'M3'] },
  { name: 'Dell XPS 13', description: 'لابتوب Dell XPS 13 بتصميم أنيق وأداء قوي', price: 6999, categoryId: '12', images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop'], rating: 4.6, reviewCount: 328, tags: ['ديل', 'أنيق', 'قوي'] },
  { name: 'AirPods Pro 2', description: 'سماعات لاسلكية بإلغاء الضوضاء النشط', price: 1299, categoryId: '13', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'], rating: 4.7, reviewCount: 789, featured: true, tags: ['لاسلكي', 'إلغاء ضوضاء'] },
  { name: 'Sony WH-1000XM5', description: 'سماعات Sony الرائدة بإلغاء الضوضاء', price: 1899, categoryId: '13', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'], rating: 4.8, reviewCount: 567, tags: ['سوني', 'جودة عالية', 'مريح'] },
  { name: 'Canon EOS R5', description: 'كاميرا كانون احترافية بدقة 45 ميجابكسل', price: 12999, categoryId: '14', images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop'], rating: 4.9, reviewCount: 234, featured: true, tags: ['كانون', 'احترافي', '45MP'] },
  { name: 'Apple Magic Keyboard', description: 'لوحة مفاتيح Apple اللاسلكية الأنيقة', price: 599, categoryId: '15', images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400&h=400&fit=crop'], rating: 4.5, reviewCount: 456, tags: ['لوحة مفاتيح', 'لاسلكي', 'أنيق'] }
];

// Luxury jewelry categories and products
export const luxeCategories: Category[] = [
  { id: '21', name: 'خواتم ذهبية', description: 'خواتم ذهبية فاخرة', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop', storeId: '3' },
  { id: '22', name: 'عقود وقلادات', description: 'عقود وقلادات أنيقة', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop', storeId: '3' },
  { id: '23', name: 'أساور', description: 'أساور ذهبية وفضية', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop', storeId: '3' },
  { id: '24', name: 'أقراط', description: 'أقراط أنيقة ومميزة', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=300&fit=crop', storeId: '3' },
  { id: '25', name: 'ساعات فاخرة', description: 'ساعات يد فاخرة', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop', storeId: '3' }
];

export const luxeProducts = [
  { name: 'خاتم ذهب عيار 18', description: 'خاتم ذهب عيار 18 بتصميم كلاسيكي أنيق', price: 2499, categoryId: '21', images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop'], rating: 4.9, reviewCount: 156, featured: true, tags: ['ذهب', 'عيار 18', 'كلاسيكي'] },
  { name: 'عقد لؤلؤ طبيعي', description: 'عقد من اللؤلؤ الطبيعي بتصميم راقي', price: 3999, categoryId: '22', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop'], rating: 5.0, reviewCount: 89, featured: true, tags: ['لؤلؤ', 'طبيعي', 'راقي'] },
  { name: 'سوار ذهب بالألماس', description: 'سوار ذهب مرصع بالألماس الطبيعي', price: 8999, categoryId: '23', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop'], rating: 4.8, reviewCount: 67, featured: true, tags: ['ذهب', 'ألماس', 'مرصع'], discount: 10 },
  { name: 'ساعة رولكس كلاسيكية', description: 'ساعة رولكس أصلية بحركة سويسرية', price: 45999, categoryId: '25', images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1509048191080-d2e2ccd7926e?w=400&h=400&fit=crop'], rating: 5.0, reviewCount: 234, featured: true, tags: ['رولكس', 'سويسري', 'أصلي'] }
];

// Appliances categories and products
export const appliancesCategories: Category[] = [
  { id: '51', name: 'أجهزة المطبخ', description: 'أجهزة المطبخ الحديثة', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', storeId: '6' },
  { id: '52', name: 'أجهزة التنظيف', description: 'مكانس وأجهزة تنظيف', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', storeId: '6' },
  { id: '53', name: 'أجهزة التكييف', description: 'مكيفات ومراوح', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', storeId: '6' },
  { id: '54', name: 'أجهزة كهربائية', description: 'أجهزة كهربائية متنوعة', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop', storeId: '6' }
];

export const appliancesProducts = [
  { name: 'ثلاجة سامسونج 4 أبواب', description: 'ثلاجة سامسونج ذكية بسعة كبيرة وموفرة للطاقة', price: 8999, categoryId: '51', images: ['https://images.unsplash.com/photo-1571175351665-98e7c5be9bb5?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'], rating: 4.7, reviewCount: 342, featured: true, tags: ['ثلاجة', 'ذكية', 'موفرة'] },
  { name: 'غسالة LG بالبخار', description: 'غسالة LG أوتوماتيك بتقنية البخار', price: 3999, categoryId: '52', images: ['https://images.unsplash.com/photo-1571175351665-98e7c5be9bb5?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'], rating: 4.6, reviewCount: 278, featured: true, tags: ['غسالة', 'بخار', 'أوتوماتيك'] },
  { name: 'مكيف سبليت انفرتر', description: 'مكيف هواء سبليت بتقنية الانفرتر الموفرة', price: 2999, categoryId: '53', images: ['https://images.unsplash.com/photo-1571175351665-98e7c5be9bb5?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'], rating: 4.5, reviewCount: 456, tags: ['مكيف', 'انفرتر', 'موفر'] },
  { name: 'مكنسة روبوت ذكية', description: 'مكنسة روبوت ذكية بتحكم عبر التطبيق', price: 1999, categoryId: '52', images: ['https://images.unsplash.com/photo-1571175351665-98e7c5be9bb5?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'], rating: 4.4, reviewCount: 189, featured: true, tags: ['روبوت', 'ذكية', 'تطبيق'] }
];

// Toys categories and products
export const toysCategories: Category[] = [
  { id: '61', name: 'ألعاب تعليمية', description: 'ألعاب تنمي المهارات', image: 'https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=400&h=300&fit=crop', storeId: '7' },
  { id: '62', name: 'ألعاب إلكترونية', description: 'ألعاب إلكترونية مسلية', image: 'https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=400&h=300&fit=crop', storeId: '7' },
  { id: '63', name: 'دمى وعرائس', description: 'دمى وعرائس جميلة', image: 'https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=400&h=300&fit=crop', storeId: '7' },
  { id: '64', name: 'ألعاب رياضية', description: 'ألعاب رياضية للأطفال', image: 'https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=400&h=300&fit=crop', storeId: '7' }
];

export const toysProducts = [
  { name: 'مكعبات ليجو التعليمية', description: 'مجموعة مكعبات ليجو تعليمية لتنمية الإبداع', price: 299, categoryId: '61', images: ['https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1606107557580-7e218c39750c?w=400&h=400&fit=crop'], rating: 4.8, reviewCount: 567, featured: true, tags: ['ليجو', 'تعليمي', 'إبداع'] },
  { name: 'سيارة تحكم عن بعد', description: 'سيارة سباق بالتحكم عن بعد سرعة عالية', price: 599, categoryId: '62', images: ['https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1606107557580-7e218c39750c?w=400&h=400&fit=crop'], rating: 4.6, reviewCount: 234, featured: true, tags: ['سيارة', 'تحكم', 'سرعة'] },
  { name: 'دمية باربي الأصلية', description: 'دمية باربي الأصلية مع ملابس متنوعة', price: 199, categoryId: '63', images: ['https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1606107557580-7e218c39750c?w=400&h=400&fit=crop'], rating: 4.7, reviewCount: 345, tags: ['باربي', 'أصلية', 'ملابس'] },
  { name: 'كرة قدم للأطفال', description: 'كرة قدم مصممة خصيصاً للأطفال', price: 89, categoryId: '64', images: ['https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1606107557580-7e218c39750c?w=400&h=400&fit=crop'], rating: 4.3, reviewCount: 189, tags: ['كرة', 'قدم', 'أطفال'] }
];

// Software categories and products
export const softwareCategories: Category[] = [
  { id: '71', name: 'برامج المحاسبة', description: 'حلول برمجية للمحاسبة', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop', storeId: '8' },
  { id: '72', name: 'برامج التصميم', description: 'أدوات التصميم الاحترافية', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop', storeId: '8' },
  { id: '73', name: 'حلول الأمان', description: 'برامج الحماية والأمان', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop', storeId: '8' },
  { id: '74', name: 'أدوات التطوير', description: 'بيئات التطوير البرمجي', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop', storeId: '8' }
];

export const softwareProducts = [
  { name: 'Microsoft Office 365', description: 'حزمة Microsoft Office الشاملة مع التحديثات', price: 399, categoryId: '71', images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop'], rating: 4.7, reviewCount: 1234, featured: true, tags: ['مايكروسوفت', 'أوفيس', 'شامل'] },
  { name: 'Adobe Creative Suite', description: 'حزمة Adobe الكاملة للتصميم والإبداع', price: 1299, categoryId: '72', images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop'], rating: 4.9, reviewCount: 892, featured: true, tags: ['أدوبي', 'تصميم', 'إبداع'] },
  { name: 'Norton Antivirus Pro', description: 'برنامج حماية شامل من Norton لجميع الأجهزة', price: 299, categoryId: '73', images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop'], rating: 4.5, reviewCount: 567, featured: true, tags: ['نورتون', 'حماية', 'شامل'] },
  { name: 'Visual Studio Professional', description: 'بيئة التطوير المتكاملة من Microsoft للمطورين', price: 899, categoryId: '74', images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop'], rating: 4.8, reviewCount: 445, tags: ['مايكروسوفت', 'تطوير', 'احترافي'] }
];