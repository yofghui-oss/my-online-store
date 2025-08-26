import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useDirectionUtils } from '../utils/directionUtils';
import { 
  CheckCircle,
  ArrowLeft,
  ChevronDown,
  Menu,
  X,
  Play,
  Phone,
  MapPin,
  Mail,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Globe,
  Briefcase,
  Palette,
  CreditCard,
  Truck,
  Megaphone,
  Expand,
  Users,
  ShoppingCart,
  TrendingUp,
  Zap,
  Target,
  Link as LinkIcon,
  DollarSign,
  Building,
  Database,
  Smartphone,
  Download,
  Star,
  Heart,
  Shield,
  Gift,
  BarChart3,
  Clock,
  Award,
  Rocket,
  Settings,
  Moon,
  Sun
} from 'lucide-react';
import { GiClothes, GiGamepad, GiDiamondRing } from 'react-icons/gi';
import { MdHealthAndSafety } from 'react-icons/md';

// Image generator with real images based on category
const generateImage = (width: number, height: number, text?: string, category?: string) => {
  // Map of categories to relevant image URLs
  const imageMap: Record<string, string[]> = {
    // Fashion images
    'Fashion': [
      'https://picsum.photos/300/400?random=1',
      'https://picsum.photos/300/400?random=2',
      'https://picsum.photos/300/400?random=3'
    ],
    // Digital products images
    'Digital': [
      'https://picsum.photos/300/400?random=4',
      'https://picsum.photos/300/400?random=5',
      'https://picsum.photos/300/400?random=6'
    ],
    // Health images
    'Health': [
      'https://picsum.photos/300/400?random=7',
      'https://picsum.photos/300/400?random=8',
      'https://picsum.photos/300/400?random=9'
    ],
    // Electronics images
    'Electronics': [
      'https://picsum.photos/300/400?random=10',
      'https://picsum.photos/300/400?random=11',
      'https://picsum.photos/300/400?random=12'
    ],
    // Jewelry images
    'Jewelry': [
      'https://picsum.photos/300/400?random=13',
      'https://picsum.photos/300/400?random=14',
      'https://picsum.photos/300/400?random=15'
    ],
    // Brand logos
    'Brand': [
      'https://picsum.photos/120/80?random=16',
    ],
    // Success stories
    'Story': [
      'https://picsum.photos/400/300?random=17',
      'https://picsum.photos/400/300?random=18',
      'https://picsum.photos/400/300?random=19',
      'https://picsum.photos/400/300?random=20'
    ],
    // Store services
    'Store': [
      'https://picsum.photos/120/160?random=21',
    ],
    // App icons
    'App': [
      'https://picsum.photos/64/64?random=22',
    ],
    // Default placeholder
    'Default': [
      `https://picsum.photos/${width}/${height}?random=23`,
    ]
  };
  
  // Extract category from text if not provided
  if (!category && text) {
    // Check if text contains any of our categories
    for (const key of Object.keys(imageMap)) {
      if (text.includes(key)) {
        category = key;
        break;
      }
    }
  }
  
  // If we have a matching category, return a random image from that category
  if (category && imageMap[category]) {
    const images = imageMap[category];
    // Get index from text if possible to ensure consistency
    let index = 0;
    if (text && text.match(/\d+$/)) {
      const num = parseInt(text.match(/\d+$/)?.[0] || '1');
      index = (num - 1) % images.length;
    }
    return images[index];
  }
  
  // Fallback to default placeholder
  return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 100)}`;
};

// For backward compatibility
const generatePlaceholder = generateImage;

// Sample data for the new design with brand logos
const partnerLogos = [
  'https://picsum.photos/120/80?random=24',
  'https://picsum.photos/120/80?random=25',
  'https://picsum.photos/120/80?random=26',
  'https://picsum.photos/120/80?random=27',
  'https://picsum.photos/120/80?random=28',
  'https://picsum.photos/120/80?random=29',
  'https://picsum.photos/120/80?random=30',
  'https://picsum.photos/120/80?random=31',
  'https://picsum.photos/120/80?random=32',
  'https://picsum.photos/120/80?random=33',
  'https://picsum.photos/120/80?random=34',
];

const sectors = [
  {
    id: 'fashion',
    name: 'عبايات وأزياء',
    icon: 'Palette',
    title: 'حيث تلتقي السهولة بالأناقة',
    subtitle: 'حقِّق نمو علامتك التجارية في سوق الأزياء والعبايات مع حلول نُسجت بعناية لتسهِّل إدارة متجرك وتقدِّم تجربة تسوُّق استثنائية لعملائك.',
    features: [
      'استبق سؤال العميل عبر جدول المقاسات',
      'قدِّم تجربة شراء سهلة ومألوفة لكل عميل',
      'اعرض صور ثلاثية الأبعاد تبرز أناقة التفاصيل'
    ],
    stats: '+76,300 متجر أزياء وعبايات سعودي يثق بسلة',
    images: [
      generateImage(300, 400, 'Fashion1', 'Fashion'),
      generateImage(300, 400, 'Fashion2', 'Fashion'),
      generateImage(300, 400, 'Fashion3', 'Fashion')
    ]
  },
  {
    id: 'digital',
    name: 'المنتجات الرقمية',
    icon: 'Smartphone',
    title: 'حلول ذكية لبيع منتجاتك الرقمية',
    subtitle: 'سواءً كنت تبيع بطاقات شحن أو كتب إلكترونية ودورات تدريبية، سلة توفِّر لك أدوات متقدمة لإدارة متجرك بدون أي تعقيدات تقنية.',
    features: [
      'دعم بيع مختلف أنواع المنتجات الرقمية',
      'تسليم فوري للعميل بدون انتظار',
      'بيع البطاقات عبر تطبيقات دروب شيبينغ'
    ],
    stats: '+63,840 متجر منتجات رقمية سعودي يثق بسلة',
    images: [
      generateImage(300, 400, 'Digital1', 'Digital'),
      generateImage(300, 400, 'Digital2', 'Digital'),
      generateImage(300, 400, 'Digital3', 'Digital')
    ]
  },
  {
    id: 'health',
    name: 'الصحة واللياقة',
    icon: 'Heart',
    title: 'اجذب عميلك الباحث عن اللياقة',
    subtitle: 'كن الخيار الأول للعملاء المهتمين بمنتجات وخدمات الصحة واللياقة مع حلول متكاملة تسهِّل انطلاقتك ونموك في هذا القطاع.',
    features: [
      'إتاحة حجز خدماتك مع نظام الحجوزات',
      'ترويج منتجاتك في مدونة خاصة بمتجرك',
      'ثقة واعتمادية وسهولة مطلقة عند الطلب'
    ],
    stats: '+7,700 متجر صحة ولياقة سعودي يثق بسلة',
    images: [
      generateImage(300, 400, 'Health1', 'Health'),
      generateImage(300, 400, 'Health2', 'Health'),
      generateImage(300, 400, 'Health3', 'Health')
    ]
  },
  {
    id: 'electronics',
    name: 'الإلكترونيات',
    icon: 'Smartphone',
    title: 'تقنية متطورة لبيع الإلكترونيات',
    subtitle: 'اعرض منتجاتك الإلكترونية بأفضل شكل ممكن واجذب العملاء بمواصفات تفصيلية وصور عالية الجودة.',
    features: [
      'عرض مواصفات تقنية مفصلة',
      'مقارنة بين المنتجات المختلفة',
      'ضمان وخدمات ما بعد البيع'
    ],
    stats: '+12,500 متجر إلكترونيات سعودي يثق بسلة',
    images: [
      generateImage(300, 400, 'Electronics1', 'Electronics'),
      generateImage(300, 400, 'Electronics2', 'Electronics'),
      generateImage(300, 400, 'Electronics3', 'Electronics')
    ]
  },
  {
    id: 'jewelry',
    name: 'المجوهرات',
    icon: 'Star',
    title: 'أناقة وبريق لا يُضاهى',
    subtitle: 'اعرض مجوهراتك بصور فائقة الجودة تبرز كل التفاصيل الدقيقة وتجذب العملاء المميزين.',
    features: [
      'عرض 360 درجة للمجوهرات',
      'شهادات أصالة وضمان',
      'خدمة تخصيص وتفصيل'
    ],
    stats: '+8,200 متجر مجوهرات سعودي يثق بسلة',
    images: [
      generateImage(300, 400, 'Jewelry1', 'Jewelry'),
      generateImage(300, 400, 'Jewelry2', 'Jewelry'),
      generateImage(300, 400, 'Jewelry3', 'Jewelry')
    ]
  }
];

// Success stories data with real images
const successStories = [
  {
    id: 1,
    title: "أنا مريت بتجارب وواجهت تحديات يمكن ملخصها بكل أمانة: الصبر .. ثم الصبر .. ثم الصبر",
    owner: "محمد خالد",
    brandName: "متجر أسناس",
    brandLogo: 'https://picsum.photos/80/40?random=35',
    thumbnail: generateImage(400, 300, 'Story1', 'Story'),
    videoId: "9FfiI0i9hvU"
  },
  {
    id: 2,
    title: "سلة تكبر قبل التاجر عشان يكبر التاجر لا بد إنه يبحث ويتعب على نفسه شوي مو كل حاجة حتلقاها معلومة جاهزة تُعطى",
    owner: "راكان الجهني",
    brandName: "متجر عطارة شمول",
    brandLogo: 'https://picsum.photos/80/40?random=36',
    thumbnail: generateImage(400, 300, 'Story2', 'Story'),
    videoId: "fXsLBaDOb84"
  },
  {
    id: 3,
    title: "الأفكار دائماً موجودة بس أنت لازم تكون عندك المقدرة إنك تشوفها والمقدرة إنك تستخدمها صح",
    owner: "لمى عبد الله الخويلدي",
    brandName: "متجر لوجيريا",
    brandLogo: 'https://picsum.photos/80/40?random=37',
    thumbnail: generateImage(400, 300, 'Story3', 'Story'),
    videoId: "qMaUHKwaKkM"
  },
  {
    id: 4,
    title: "يزيد قبل التجارة الإلكترونية غير وبعدها غير حتى في حياته الشخصية",
    owner: "يزيد المطيري",
    brandName: "متجر قلايزر",
    brandLogo: 'https://picsum.photos/80/40?random=38',
    thumbnail: generateImage(400, 300, 'Story4', 'Story'),
    videoId: "xcDxnmO0WHs"
  }
];

// Salla Special features
const sallaSpecialFeatures = [
  {
    icon: DollarSign,
    title: "رسوم دفع مرنة تدعم توسُّع أعمالك"
  },
  {
    icon: Building,
    title: "نظام متكامل لإدارة الفروع والمستودعات"
  },
  {
    icon: Database,
    title: "إدارة الموارد عبر أنظمة (ERP) العالمية"
  }
];

// Mahally platform data
const mahallyFeatures = [
  {
    icon: Megaphone,
    title: 'قناة تسويق جديدة مجانية لمتجرك.'
  },
  {
    icon: LinkIcon,
    title: 'ربط مباشر مع متجرك في سلة.'
  },
  {
    icon: TrendingUp,
    title: 'اجذب شريحة عملاء أكبر ومبيعات أكثر.'
  },
  {
    icon: Target,
    title: 'اعرض منتجاتك لجمهور مستعد للشراء.'
  }
];

// Services and Apps data
const servicesData = {
  services: {
    badge: '1,000+ خدمة',
    title: 'تحتاج أي خدمة لمتجرك؟',
    subtitle: 'اكتشف آلاف الخدمات الاحترافية التي يحتاجها متجرك من مزوِّدي خدمات موثوقين من سلة.',
    typeLabel: 'خدمات التاجر',
    bgColor: 'bg-[#F1F8F9]',
    badgeColor: 'bg-[#95C8D0]',
    textColor: 'text-[#348D9C]',
    icon: Briefcase,
    images: [
      [
        'https://picsum.photos/120/160?random=39', 
        'https://picsum.photos/120/160?random=40', 
        'https://picsum.photos/120/160?random=41'
      ],
      [
        'https://picsum.photos/120/160?random=42', 
        'https://picsum.photos/120/160?random=43', 
        'https://picsum.photos/120/160?random=44'
      ],
      [
        'https://picsum.photos/120/160?random=45', 
        'https://picsum.photos/120/160?random=46', 
        'https://picsum.photos/120/160?random=47'
      ],
      [
        'https://picsum.photos/120/160?random=48', 
        'https://picsum.photos/120/160?random=49', 
        'https://picsum.photos/120/160?random=50'
      ]
    ]
  },
  apps: {
    badge: '550+ تطبيق',
    title: 'ارفع مبيعاتك. وفّر وقتك.',
    subtitle: 'من التسويق إلى الشحن، متجر التطبيقات يقدّم لك أدوات توفّر وقتك وتساعدك تبيع أكثر.',
    typeLabel: 'متجر التطبيقات',
    bgColor: 'bg-[#EEFCF9]',
    badgeColor: 'bg-[#96EDD9]',
    textColor: 'text-[#4A9E8A]',
    icon: Zap,
    images: [
      [
        'https://cdn-icons-png.flaticon.com/128/2111/2111463.png', 
        'https://cdn-icons-png.flaticon.com/128/3670/3670151.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968534.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968764.png'
      ],
      [
        'https://cdn-icons-png.flaticon.com/128/5968/5968762.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968705.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968853.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968756.png'
      ],
      [
        'https://cdn-icons-png.flaticon.com/128/5968/5968292.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968350.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968672.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968242.png'
      ],
      [
        'https://cdn-icons-png.flaticon.com/128/5968/5968520.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968282.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968364.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968866.png'
      ],
      [
        'https://cdn-icons-png.flaticon.com/128/5968/5968342.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968313.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968428.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968525.png'
      ],
      [
        'https://cdn-icons-png.flaticon.com/128/5968/5968267.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968409.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968896.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968322.png'
      ],
      [
        'https://cdn-icons-png.flaticon.com/128/5968/5968472.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968254.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968705.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968853.png'
      ],
      [
        'https://cdn-icons-png.flaticon.com/128/5968/5968244.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968286.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968381.png', 
        'https://cdn-icons-png.flaticon.com/128/5968/5968875.png'
      ]
    ]
  }
};

// Customer experience data
const customerExperience = [
  {
    icon: Users,
    title: '1 من كل 3 في السعودية اشترى من متاجر سلة'
  },
  {
    icon: ShoppingCart,
    title: 'شراء مباشر دون تعقيد أو إنشاء حساب'
  },
  {
    icon: Heart,
    title: '82% من العملاء تزداد ثقتهم بمتاجر سلة'
  }
];

// Features data for the comprehensive section
const sallaFeatures = [
  {
    id: 'store_creation',
    badge: {
      text: 'إنشاء وتدشين المتجر',
      icon: Briefcase
    },
    title: 'انطلاقتك سهلة حتى بانشغالك',
    subtitle: 'لا تحتاج لخبرة سابقة أو تفرغ تام لتبدأ تجارتك مع سلة.',
    bullets: [
      {
        text: '1000+ خدمة من مزوِّدي خدمات التاجر تقدِّم لك كل ما تحتاجه.',
        icon: Settings
      },
      {
        text: 'خطوات سهلة وسريعة لإنشاء متجرك.',
        icon: Rocket
      },
      {
        text: 'تبادل التجارب والخبرات مع آلاف التجار في مجتمع تجار سلة.',
        icon: Users
      }
    ],
    images: [
      generatePlaceholder(400, 300, 'Store Creation 1'),
      generatePlaceholder(400, 300, 'Store Creation 2'),
      generatePlaceholder(500, 400, 'Store Creation BG')
    ]
  },
  {
    id: 'store_design',
    badge: {
      text: 'تصميم المتجر',
      icon: Palette
    },
    title: 'متجر يلفت النظر من أول لمحة',
    subtitle: 'تميّز في السوق وامنح عملاءك تجربة لا تُنسى.',
    bullets: [
      {
        text: 'مكتبة متنوعة من الثيمات الجاهزة القابلة للتخصيص حسب رغبتك.',
        icon: Star
      },
      {
        text: 'تخصيص تفاصيل التصميم عن طريق JS و CSS.',
        icon: Settings
      },
      {
        text: 'كما يمكنك صنع ثيمك الخاص مع Salla Twilight.',
        icon: Award
      }
    ],
    images: [
      generatePlaceholder(400, 300, 'Design 1'),
      generatePlaceholder(400, 300, 'Design 2'),
      generatePlaceholder(500, 400, 'Design BG')
    ]
  },
  {
    id: 'payments',
    badge: {
      text: 'المدفوعات',
      icon: CreditCard
    },
    title: 'مدفوعات آمنة، لتجارة مستدامة، وثقة متينة!',
    subtitle: 'استفد من نظام سلة المتكامل للمدفوعات الإلكترونية لإدارة مدفوعات متجرك وعملائك.',
    bullets: [
      {
        text: 'وسائل دفع متنوعة تلبي كافة احتياجات عملائك.',
        icon: CreditCard
      },
      {
        text: 'تفعيل سريع لنظام المدفوعات خلال يوم واحد.',
        icon: Zap
      },
      {
        text: 'تحصيل المدفوعات بعد 24 ساعة.',
        icon: Clock
      },
      {
        text: 'حماية عالية وأمان لكافة عملياتك.',
        icon: Shield
      }
    ],
    images: [
      generatePlaceholder(500, 400, 'Payments BG'),
      generatePlaceholder(400, 200, 'Payment Top'),
      generatePlaceholder(300, 150, 'Payment Bottom'),
      generatePlaceholder(350, 180, 'Payment Center')
    ]
  },
  {
    id: 'shipping',
    badge: {
      text: 'الشحن والتوصيل',
      icon: Truck
    },
    title: 'أسطول شحن متكامل في خدمة منتجاتك',
    subtitle: 'خيارات شحن متنوعة تربط متجرك بالعالم.',
    bullets: [
      {
        text: 'ربط سهل بدون عقود.',
        icon: LinkIcon
      },
      {
        text: 'اربط متجرك بأكثر من 100 شركة شحن وتوصيل محليَّة ودوليَّة.',
        icon: Globe
      },
      {
        text: 'خدمات شحن ولوجستيات مخصًّصة لجميع أنواع المنتجات.',
        icon: Truck
      },
      {
        text: 'شحن دولي ومحلي يغطي جميع المدن والقرى، والأماكن البعيدة.',
        icon: MapPin
      }
    ],
    images: [
      generatePlaceholder(500, 400, 'Shipping BG'),
      generatePlaceholder(200, 200, 'Shipping 1'),
      generatePlaceholder(200, 200, 'Shipping 2'),
      generatePlaceholder(200, 200, 'Shipping 3')
    ]
  },
  {
    id: 'marketing',
    badge: {
      text: 'أدوات التسويق',
      icon: Megaphone
    },
    title: 'حلول تسويقيَّة في مكان واحد',
    subtitle: 'استهدف المزيد من العملاء بحلول تسويقية مخصصة.',
    bullets: [
      {
        text: 'قدم لعملائك كوبونات خصم مميزة تشجعهم على إتمام الشراء.',
        icon: Gift
      },
      {
        text: 'تحكم بكافة تفاصيل العروض والخصومات.',
        icon: Settings
      },
      {
        text: 'آلاف المسوقين بالعمولة جاهزين للتسويق لمتجرك',
        icon: Users
      },
      {
        text: 'استهداف دقيق للسلات المتروكة.',
        icon: Target
      },
      {
        text: 'إدارة الحملات الإعلانية على مختلف المنصات.',
        icon: BarChart3
      }
    ],
    images: [
      generatePlaceholder(300, 300, 'Marketing 1'),
      generatePlaceholder(300, 300, 'Marketing 2'),
      generatePlaceholder(300, 300, 'Marketing 3'),
      generatePlaceholder(300, 300, 'Marketing 4'),
      generatePlaceholder(500, 400, 'Marketing BG')
    ]
  },
  {
    id: 'expansion',
    badge: {
      text: 'التوسّع',
      icon: Expand
    },
    title: 'تجارة لا تعرف حدوداً',
    subtitle: 'من السعوديَّة لكل العالم بكل سهولة.',
    bullets: [
      {
        text: 'دعم أكثر من 40 لغة.',
        icon: Globe
      },
      {
        text: 'استقبال المدفوعات من أكثر من 79 دولة.',
        icon: DollarSign
      },
      {
        text: 'شحن دولي يغطي معظم دول العالم.',
        icon: Truck
      },
      {
        text: 'إمكانية إضافة فروع ومستودعات متعددة لمتجرك.',
        icon: Building
      }
    ],
    images: [
      generatePlaceholder(300, 200, 'Expansion 1'),
      generatePlaceholder(300, 200, 'Expansion 2'),
      generatePlaceholder(300, 300, 'Expansion 3'),
      generatePlaceholder(400, 300, 'Expansion Tab')
    ]
  }
];

const LandingPage: React.FC = () => {
  const [activeSector, setActiveSector] = useState(0);
  const [currentStory, setCurrentStory] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { colorMode, toggleColorMode } = useTheme();
  const { t } = useTranslation();
  const directionUtils = useDirectionUtils();

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950" dir={directionUtils.direction}>
      {/* Modern Navigation */}
      <header className="bg-[#CFF7EE] dark:bg-secondary-900 transition-all duration-300 fixed top-0 left-0 right-0 z-50 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src={generatePlaceholder(112, 40, 'سلة')} 
                  alt="سلة" 
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center space-x-8 ${directionUtils.isRTL ? 'space-x-reverse' : ''}`}>
              <Link to="/" className="text-[#004956] dark:text-white hover:text-[#004956]/80 dark:hover:text-white/80 font-medium">الرئيسية</Link>
              
              {/* Solutions Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-[#004956] dark:text-white hover:text-[#004956]/80 dark:hover:text-white/80 font-medium">
                  الحلول
                  <ChevronDown className="mr-1 h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-secondary-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 space-y-2">
                    <Link to="#" className="block px-3 py-2 text-[#004956] dark:text-white hover:bg-gray-50 dark:hover:bg-secondary-700 rounded">تصميم المتجر</Link>
                    <Link to="#" className="block px-3 py-2 text-[#004956] dark:text-white hover:bg-gray-50 dark:hover:bg-secondary-700 rounded">المدفوعات</Link>
                    <Link to="#" className="block px-3 py-2 text-[#004956] dark:text-white hover:bg-gray-50 dark:hover:bg-secondary-700 rounded">بوليصات سلة</Link>
                  </div>
                </div>
              </div>
              
              <Link to="#" className="text-[#004956] dark:text-white hover:text-[#004956]/80 dark:hover:text-white/80 font-medium">الموارد</Link>
              <Link to="#" className="text-[#004956] dark:text-white hover:text-[#004956]/80 dark:hover:text-white/80 font-medium">القطاعات</Link>
              <Link to="#" className="text-[#004956] dark:text-white hover:text-[#004956]/80 dark:hover:text-white/80 font-medium">الأسعار</Link>
            </div>

            {/* CTA Buttons */}
            <div className={`hidden lg:flex items-center space-x-4 ${directionUtils.isRTL ? 'space-x-reverse' : ''}`}>
              <button
                onClick={toggleColorMode}
                className="p-2 rounded-lg text-[#004956] dark:text-white hover:text-[#004956]/80 dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
                title={colorMode === 'light' ? 'التبديل للوضع المظلم' : 'التبديل للوضع الفاتح'}
              >
                {colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button className="flex items-center text-[#004956] dark:text-white hover:text-[#004956]/80 dark:hover:text-white/80">
                English
                <Globe className="mr-2 h-4 w-4" />
              </button>
              <Link to="/login" className="text-[#004956] dark:text-white border border-[#004956] dark:border-white px-4 py-2 rounded-lg hover:bg-[#004956] hover:text-white dark:hover:bg-white dark:hover:text-secondary-900 transition-colors">
                تسجيل الدخول
              </Link>
              <Link to="/register" className="bg-[#004D5A] dark:bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-[#004D5A]/90 dark:hover:bg-primary-700 transition-colors">
                أنشئ متجرك مجاناً
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden text-[#004956] dark:text-white relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div className={`w-6 h-0.5 bg-[#004956] dark:bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-[#004956] dark:bg-white transition-all duration-300 my-1 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-[#004956] dark:bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-[#004956]/20 dark:border-white/20 py-4">
              <div className="space-y-4">
                <Link to="/" className="block text-[#004956] dark:text-white font-medium">الرئيسية</Link>
                <Link to="#" className="block text-[#004956] dark:text-white font-medium">الحلول</Link>
                <Link to="#" className="block text-[#004956] dark:text-white font-medium">الموارد</Link>
                <Link to="#" className="block text-[#004956] dark:text-white font-medium">القطاعات</Link>
                <button
                  onClick={toggleColorMode}
                  className="flex items-center gap-2 text-[#004956] dark:text-white font-medium"
                >
                  {colorMode === 'light' ? 'الوضع المظلم' : 'الوضع الفاتح'}
                  {colorMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                </button>
                <div className="pt-4 space-y-2">
                  <Link to="/login" className="block w-full text-center text-[#004956] dark:text-white border border-[#004956] dark:border-white px-4 py-2 rounded-lg hover:bg-[#004956] hover:text-white dark:hover:bg-white dark:hover:text-secondary-900 transition-colors">
                    تسجيل الدخول
                  </Link>
                  <Link to="/register" className="block w-full text-center bg-[#004D5A] dark:bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-[#004D5A]/90 dark:hover:bg-primary-700 transition-colors">
                    أنشئ متجرك مجاناً
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
      
      {/* Salla-inspired Hero Section */}
      <section className="bg-[#CFF7EE] dark:bg-secondary-900 pb-14 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-right py-12">
              {/* Logo Carousel */}
              <div className="flex justify-center lg:justify-start mb-6 overflow-hidden">
                <div className={`flex space-x-4 ${directionUtils.isRTL ? 'space-x-reverse' : ''} animate-pulse`}>
                  {partnerLogos.slice(0, 3).map((logo, index) => (
                    <div key={index} className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <img src={logo} alt={`Brand ${index + 1}`} className="w-12 h-8 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-6">
                <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                <span className="text-[#004956] text-sm font-medium">انضم لأكثر من 68,000 تاجر نشط في سلة</span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-4xl lg:text-6xl font-black text-[#004956] mb-6 leading-tight">
                سلة.. تجارة ذكيَّة وسهلة
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                أنشئ متجرك الإلكتروني في دقائق، واربط منتجاتك بمجموعة متكاملة من الحلول الرقميَّة الذكيَّة للمدفوعات، والشحن، وإدارة المخزون، والتسويق، بكل سهولة؛ لأن نجاحك لا يحتاج إلى تعقيد.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link to="/register" className="bg-[#004D5A] text-white px-8 py-4 rounded-lg hover:bg-[#004D5A]/90 transition-colors font-semibold text-lg">
                  أنشئ متجرك مجاناً
                </Link>
                <Link to="/demo" className="border-2 border-[#004956] text-[#004956] px-8 py-4 rounded-lg hover:bg-[#004956] hover:text-white transition-colors font-semibold text-lg">
                  تجربة المنصة
                </Link>
              </div>
            </div>
            
            {/* Right Content - Banner Video/Image */}
            <div className="lg:w-1/2 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-2xl"
              >
                <img 
                  src={generatePlaceholder(640, 480, 'Hero Video')} 
                  alt="فيديو البطل" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors shadow-lg">
                    <Play className="w-8 h-8 text-[#004956] ml-1" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Ad Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/ads" className="block mt-10">
          <img 
            src={generatePlaceholder(1200, 200, 'Desktop Banner')} 
            alt="Desktop banner"
            className="hidden md:block w-full rounded-lg"
          />
          <img 
            src={generatePlaceholder(800, 300, 'Mobile Banner')} 
            alt="Mobile banner"
            className="block md:hidden w-full rounded-lg"
          />
        </Link>
      </section>

      
      {/* Statistics Section */}
      <section className="py-20 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#004956] mb-4">
            أكبر منصَّة سعودية للتجارة الإلكترونية في الشرق الأوسط
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
            أنشئ متجرك اليوم وانضمَّ لعشرات الآلاف من الأفراد والمؤسسات والشركات الناجحة مع سلة
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-24">
            {/* Active Stores */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 lg:w-24 h-16 lg:h-24 bg-[#CFF7EE] rounded-2xl flex items-center justify-center">
                <img 
                  src={generatePlaceholder(48, 48, '🏪')} 
                  alt="market" 
                  className="w-12 lg:w-16 h-12 lg:h-16" 
                />
              </div>
              <div className="text-right">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                  className="text-3xl lg:text-5xl font-black text-[#004956]"
                >
                  68,000+
                </motion.div>
                <p className="text-lg lg:text-xl text-[#004956] font-medium">
                  متجر إلكتروني نشط
                </p>
              </div>
            </motion.div>
            
            {/* Total Sales */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 lg:w-24 h-16 lg:h-24 bg-[#CFF7EE] rounded-2xl flex items-center justify-center">
                <img 
                  src={generatePlaceholder(48, 48, '💰')} 
                  alt="money" 
                  className="w-12 lg:w-16 h-12 lg:h-16" 
                />
              </div>
              <div className="text-right">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                  className="text-3xl lg:text-5xl font-black text-[#004956] direction-ltr"
                  style={{ direction: 'ltr' }}
                >
                  42,000,000,000
                </motion.div>
                <p className="text-lg lg:text-xl text-[#004956] font-medium">
                  مبيعات المنصة بالريال السعودي
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Success Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#004956] text-center mb-12">
            شركاء النجاح
          </h2>
          
          {/* Partner Logos Grid with Animation */}
          <div className="relative">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center overflow-hidden">
              {partnerLogos.map((logo, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <img 
                    src={logo} 
                    alt={`Partner ${index + 1}`} 
                    className="max-w-full h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex justify-center gap-6 mt-8">
              <button 
                onClick={() => {
                  // Add left scroll logic here
                }}
                className="border-[1.5px] border-gray-300 rounded-full p-4 cursor-pointer hover:border-[#004956] hover:bg-[#004956] hover:text-white transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-white" />
              </button>
              <button 
                onClick={() => {
                  // Add right scroll logic here
                }}
                className="border-[1.5px] border-gray-300 rounded-full p-4 cursor-pointer hover:border-[#004956] hover:bg-[#004956] hover:text-white transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-white rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Success Stories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-secondary-900 dark:to-secondary-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-[#004956] dark:text-white text-center mb-4"
          >
            كن صاحب قصة النجاح القادمة
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto"
          >
            كل قصة نجاح تبدأ من مكان ما. يمكن أن تبدأ قصتك هنا.
          </motion.p>
          
          {/* Enhanced Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.slice(0, 2).map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-secondary-700"
              >
                {/* Enhanced Video Thumbnail */}
                <div className="relative group cursor-pointer">
                  <img 
                    src={story.thumbnail} 
                    alt={`Story ${story.id}`}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
                    >
                      <Play className="w-8 h-8 text-[#004956] ml-1" />
                    </motion.div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      فيديو
                    </span>
                  </div>
                </div>
                
                {/* Enhanced Content */}
                <div className="p-6">
                  <blockquote className="text-[#004956] font-medium mb-4 leading-relaxed text-right relative">
                    <span className="text-4xl text-[#CFF7EE] absolute -top-2 -right-2">“</span>
                    <span className="relative z-10">{story.title}</span>
                    <span className="text-4xl text-[#CFF7EE] absolute -bottom-6 left-0">”</span>
                  </blockquote>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#004956] mb-1">
                        {story.owner}
                      </p>
                      <p className="text-sm text-gray-500">
                        صاحب المتجر
                      </p>
                    </div>
                    
                    {/* Enhanced Brand Info */}
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                      <img 
                        src={story.brandLogo} 
                        alt={story.brandName}
                        className="w-10 h-6 object-contain"
                      />
                      <span className="text-gray-700 font-medium text-sm">{story.brandName}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={() => setCurrentStory(Math.max(0, currentStory - 1))}
              disabled={currentStory === 0}
              className={`p-3 rounded-full border-2 transition-all ${
                currentStory === 0 
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'border-[#004956] text-[#004956] hover:bg-[#004956] hover:text-white'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentStory(Math.min(successStories.length - 1, currentStory + 1))}
              disabled={currentStory === successStories.length - 1}
              className={`p-3 rounded-full border-2 transition-all ${
                currentStory === successStories.length - 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'border-[#004956] text-[#004956] hover:bg-[#004956] hover:text-white'
              }`}
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      </section>

      {/* Salla Special Section */}
      <section className="py-20 bg-gradient-to-br from-[#CFF7EE] to-[#E8F9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#004956] mb-4">
                حلول ترتقي بأعمال كبار التجار
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                توسَّع بتجارتك وقلِّل التكاليف التشغيلية لمتجرك مع باقة سلة سبيشل.
              </p>
              
              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {sallaSpecialFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <feature.icon className="w-6 h-6 mt-1 text-[#004956]" />
                    <span className="text-[#004956]">{feature.title}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <Link 
                to="/specialplan" 
                className="inline-flex items-center bg-[#004D5A] text-white px-8 py-4 rounded-lg hover:bg-[#004D5A]/90 transition-colors font-semibold"
              >
                <ArrowLeft className="w-5 h-5 ml-2" />
                اعرف المزيد عن سلة سبيشل
              </Link>
            </div>
            
            {/* Image */}
            <div className="relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img 
                  src={generatePlaceholder(500, 400, 'Salla Special')} 
                  alt="Salla Special"
                  className="w-full max-w-md rounded-2xl shadow-xl"
                />
                <img 
                  src={generatePlaceholder(300, 300, 'Background')} 
                  alt="Background"
                  className="absolute -z-10 top-10 -right-8 opacity-50"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Sector Tabs Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#004956] text-center mb-12">
            انطلق بتجارتك مهما كان قطاعك
          </h2>
          
          {/* Enhanced Sector Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {sectors.map((sector, index) => {
              const IconComponent = sector.icon === 'Palette' ? Palette : 
                                  sector.icon === 'Smartphone' ? (sector.id === 'digital' ? Database : Smartphone) :
                                  sector.icon === 'Heart' ? Heart :
                                  sector.icon === 'Star' ? Star : Palette;
              return (
                <motion.button
                  key={sector.id}
                  onClick={() => setActiveSector(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-3 border-2 ${
                    activeSector === index
                      ? 'bg-[#004956] text-white border-[#004956] shadow-lg'
                      : 'bg-white text-[#004956] border-gray-200 hover:border-[#004956] hover:shadow-md'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="whitespace-nowrap">{sector.name}</span>
                  {activeSector === index && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#004956] rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          
          {/* Enhanced Active Sector Content */}
          <motion.div 
            key={activeSector}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Content */}
            <div className="text-center lg:text-right space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#004956] dark:text-white">
                {sectors[activeSector].title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {sectors[activeSector].subtitle}
              </p>
              
              {/* Enhanced Features List */}
              <ul className="space-y-4">
                {sectors[activeSector].features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-[#004956] dark:text-gray-200 leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              {/* Enhanced Stats */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-r from-[#CFF7EE] to-[#E8F9F5] p-6 rounded-xl border border-[#96EDD9]"
              >
                <p className="text-[#004956] font-semibold text-lg">{sectors[activeSector].stats}</p>
              </motion.div>
            </div>
            
            {/* Enhanced Images Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {sectors[activeSector].images.slice(0, 2).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="relative overflow-hidden rounded-xl shadow-lg group"
                >
                  <img 
                    src={image} 
                    alt={`${sectors[activeSector].name} ${index + 1}`}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
              {sectors[activeSector].images[2] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="col-span-2 relative overflow-hidden rounded-xl shadow-lg group"
                >
                  <img 
                    src={sectors[activeSector].images[2]} 
                    alt={`${sectors[activeSector].name} 3`}
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comprehensive Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-center text-[#004956] dark:text-white mb-16"
          >
            حلول سلة تدعمك بكل خطوة من مشوارك التجاري
          </motion.h2>
          
          {/* Feature Items */}
          <div className="space-y-24">
            {sallaFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                } ${
                  index % 2 === 1 ? 'bg-[#FCFCFC] py-16 px-8 rounded-2xl' : ''
                }`}
              >
                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  {/* Badge */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center gap-3 bg-[#CFF7EE] px-4 py-2 rounded-full"
                  >
                    <feature.badge.icon className="w-6 h-6 text-[#004956]" />
                    <span className="text-[#004956] font-semibold text-sm">{feature.badge.text}</span>
                  </motion.div>
                  
                  {/* Title and Subtitle */}
                  <div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-2xl lg:text-3xl font-bold text-[#004956] dark:text-white mb-4"
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      {feature.subtitle}
                    </motion.p>
                  </div>
                  
                  {/* Bullet Points */}
                  <motion.ul 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="space-y-4"
                  >
                    {feature.bullets.map((bullet, bulletIndex) => (
                      <motion.li 
                        key={bulletIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + bulletIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <bullet.icon className="w-6 h-6 mt-0.5 flex-shrink-0 text-[#004956] dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{bullet.text}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
                
                {/* Images Side */}
                <div className="flex-1 relative">
                  {feature.id === 'store_creation' && (
                    <div className="relative flex items-center justify-center">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                        style={{ backgroundImage: `url(${feature.images[2]})` }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative z-10 mr-8"
                      >
                        <img src={feature.images[0]} alt="Feature" className="w-full max-w-md" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative z-[5] -mr-24"
                      >
                        <img src={feature.images[1]} alt="Feature" className="w-full max-w-md" />
                      </motion.div>
                    </div>
                  )}
                  
                  {feature.id === 'store_design' && (
                    <div className="relative flex items-center justify-center">
                      <div 
                        className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-30"
                        style={{ backgroundImage: `url(${feature.images[2]})` }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative z-[5] mb-10 mr-8"
                      >
                        <img src={feature.images[1]} alt="Feature" className="w-full max-w-md scale-110" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative z-10 -mr-8"
                      >
                        <img src={feature.images[0]} alt="Feature" className="w-full max-w-md" />
                      </motion.div>
                    </div>
                  )}
                  
                  {feature.id === 'payments' && (
                    <div className="relative flex flex-col items-center justify-center">
                      <div 
                        className="absolute inset-0 bg-cover bg-left-bottom bg-no-repeat opacity-30"
                        style={{ backgroundImage: `url(${feature.images[0]})` }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative z-10 mb-4"
                      >
                        <img src={feature.images[1]} alt="Payment Top" className="w-full max-w-sm" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                        className="relative z-[5] self-start -mt-12"
                      >
                        <img src={feature.images[3]} alt="Payment Center" className="w-full max-w-xs" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative z-[2] self-start -mt-6"
                      >
                        <img src={feature.images[2]} alt="Payment Bottom" className="w-full max-w-xs" />
                      </motion.div>
                    </div>
                  )}
                  
                  {feature.id === 'shipping' && (
                    <div className="relative flex items-center justify-center gap-4">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                        style={{ backgroundImage: `url(${feature.images[0]})` }}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative z-10"
                      >
                        <img src={feature.images[1]} alt="Shipping" className="w-24 h-24" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative z-10"
                      >
                        <img src={feature.images[2]} alt="Shipping" className="w-24 h-24" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="relative z-10"
                      >
                        <img src={feature.images[3]} alt="Shipping" className="w-32 h-32" />
                      </motion.div>
                    </div>
                  )}
                  
                  {feature.id === 'marketing' && (
                    <div className="relative grid grid-cols-1 gap-4 items-center justify-center">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                        style={{ backgroundImage: `url(${feature.images[4]})` }}
                      />
                      {/* First Stack */}
                      <div className="relative z-10 flex justify-between w-full">
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.3 }}
                          className="transform translate-x-8"
                        >
                          <img src={feature.images[1]} alt="Marketing" className="w-32 h-32 scale-75" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.4 }}
                          className="transform -translate-x-6"
                        >
                          <img src={feature.images[0]} alt="Marketing" className="w-32 h-32 scale-75" />
                        </motion.div>
                      </div>
                      {/* Second Stack */}
                      <div className="relative z-20 flex justify-between w-4/5 mx-auto -mt-8">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="transform translate-x-8 -translate-y-4"
                        >
                          <img src={feature.images[3]} alt="Marketing" className="w-20 h-20" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.9 }}
                          className="transform -translate-x-6 -translate-y-12"
                        >
                          <img src={feature.images[2]} alt="Marketing" className="w-20 h-20" />
                        </motion.div>
                      </div>
                    </div>
                  )}
                  
                  {feature.id === 'expansion' && (
                    <div className="relative flex flex-col items-center">
                      <div className="flex justify-between w-full mb-8">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.7, delay: 0.3 }}
                          className="w-32"
                        >
                          <img src={feature.images[0]} alt="Expansion" className="w-full" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          className="w-24"
                        >
                          <img src={feature.images[1]} alt="Expansion" className="w-full" />
                        </motion.div>
                      </div>
                      <div className="flex items-start -mt-10">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.4 }}
                        >
                          <img src={feature.images[3]} alt="Expansion" className="w-full max-w-sm" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.7 }}
                          className="-ml-16"
                        >
                          <img src={feature.images[2]} alt="Expansion" className="w-full max-w-sm" />
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Experience Section */}
      <section className="py-20 bg-gradient-to-br from-[#F8FDFC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-center text-[#004956] mb-16"
          >
            أسعد عملاءك بتجربة شراء سهلة
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerExperience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex justify-center mb-6"
                >
                  <div className="w-16 h-16 bg-[#CFF7EE] rounded-full flex items-center justify-center">
                    <item.icon className="w-10 h-10 text-[#004956]" />
                  </div>
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-xl font-bold text-[#004956] text-center leading-relaxed"
                >
                  {item.title}
                </motion.h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services and Apps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Services Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`${servicesData.services.bgColor} rounded-2xl p-8 relative overflow-hidden`}
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`inline-block ${servicesData.services.badgeColor} px-4 py-2 rounded-full mb-6`}
              >
                <h3 className="text-[#004956] font-bold text-lg">{servicesData.services.badge}</h3>
              </motion.div>
              
              {/* Animated Images Gallery */}
              <div className="relative mb-6 h-64 overflow-hidden rounded-xl">
                <div className="flex gap-2 h-full">
                  {servicesData.services.images.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-2 flex-1">
                      <motion.div
                        initial={{ y: colIndex % 2 === 0 ? -100 : 100 }}
                        animate={{ y: colIndex % 2 === 0 ? [0, -50, 0] : [0, 50, 0] }}
                        transition={{
                          duration: 4 + colIndex,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="flex flex-col gap-2"
                      >
                        {column.concat(column).map((img, imgIndex) => (
                          <img 
                            key={imgIndex}
                            src={img} 
                            alt="Service" 
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ))}
                      </motion.div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F1F8F9] opacity-90" />
              </div>
              
              {/* Type Badge */}
              <div className="flex items-center gap-2 mb-4">
                <servicesData.services.icon className="w-6 h-6 text-[#348D9C]" />
                <span className={`${servicesData.services.textColor} font-semibold`}>
                  {servicesData.services.typeLabel}
                </span>
              </div>
              
              {/* Content */}
              <h2 className="text-2xl font-bold text-[#004956] mb-3">{servicesData.services.title}</h2>
              <p className="text-gray-600 leading-relaxed">{servicesData.services.subtitle}</p>
            </motion.div>
            
            {/* Apps Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`${servicesData.apps.bgColor} rounded-2xl p-8 relative overflow-hidden`}
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`inline-block ${servicesData.apps.badgeColor} px-4 py-2 rounded-full mb-6`}
              >
                <h3 className="text-[#004956] font-bold text-lg">{servicesData.apps.badge}</h3>
              </motion.div>
              
              {/* Animated Apps Gallery */}
              <div className="relative mb-6 h-64 overflow-hidden rounded-xl">
                <div className="flex gap-4 h-full">
                  {servicesData.apps.images.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-3 flex-1">
                      <motion.div
                        initial={{ y: colIndex % 2 === 0 ? -100 : 100 }}
                        animate={{ y: colIndex % 2 === 0 ? [0, -60, 0] : [0, 60, 0] }}
                        transition={{
                          duration: 5 + colIndex * 0.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="flex flex-col gap-3"
                      >
                        {column.concat(column).map((img, imgIndex) => (
                          <img 
                            key={imgIndex}
                            src={img} 
                            alt="App" 
                            className="w-16 h-16 object-cover rounded-xl border border-white/20"
                          />
                        ))}
                      </motion.div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#EEFCF9] opacity-90" />
              </div>
              
              {/* Type Badge */}
              <div className="flex items-center gap-2 mb-4">
                <servicesData.apps.icon className="w-6 h-6 text-[#4A9E8A]" />
                <span className={`${servicesData.apps.textColor} font-semibold`}>
                  {servicesData.apps.typeLabel}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-[#004956] mb-3">{servicesData.apps.title}</h3>
              <p className="text-gray-600 leading-relaxed">{servicesData.apps.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Salla Special Section */}
      <section className="py-20 bg-gradient-to-br from-[#F8FDFC] to-[#EEFCF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content Side */}
            <div className="flex-1 space-y-6">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <img 
                  src={generatePlaceholder(200, 60, 'Salla Special')} 
                  alt="Salla Special" 
                  className="h-12 w-auto"
                />
              </motion.div>
              
              {/* Title and Subtitle */}
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl lg:text-4xl font-bold text-[#004956] mb-4"
                >
                  حلول ترتقي بأعمال كبار التجار
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  توسَّع بتجارتك وقلِّل التكاليف التشغيلية لمتجرك مع باقة سلة سبيشل.
                </motion.p>
              </div>
              
              {/* Features List */}
              <motion.ul 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                {sallaSpecialFeatures.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <feature.icon className="w-6 h-6 mt-0.5 flex-shrink-0 text-[#004956]" />
                    <span className="text-gray-700 leading-relaxed">{feature.title}</span>
                  </motion.li>
                ))}
              </motion.ul>
              
              {/* CTA Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-4"
              >
                <Link 
                  to="/specialplan" 
                  className="inline-flex items-center gap-3 text-[#004956] hover:text-[#004956]/80 transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  <span className="font-semibold">اعرف المزيد عن سلة سبيشل</span>
                </Link>
              </motion.div>
            </div>
            
            {/* Image Side */}
            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10"
              >
                <img 
                  src={generatePlaceholder(600, 400, 'Enterprise Dashboard')} 
                  alt="Salla Special Dashboard" 
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute top-8 right-8 w-4/5 h-4/5 opacity-20"
              >
                <img 
                  src={generatePlaceholder(500, 350, 'Background Pattern')} 
                  alt="Background" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mahally Platform Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content Side */}
            <div className="flex-1 space-y-6">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <img 
                  src={generatePlaceholder(180, 50, 'محلي')} 
                  alt="محلي" 
                  className="h-10 w-auto"
                />
              </motion.div>
              
              {/* Title and Subtitle */}
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl lg:text-4xl font-bold text-[#004956] mb-4"
                >
                  ركز على البيع وخل التسويق علينا
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  منصة محلي تجمع التاجر المحلي، بالمستهلك المحلي .. لدعم الاقتصاد المحلي.
                </motion.p>
              </div>
              
              {/* Features List */}
              <motion.ul 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                {mahallyFeatures.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <feature.icon className="w-6 h-6 mt-0.5 flex-shrink-0 text-[#004956]" />
                    <span className="text-gray-700 leading-relaxed">{feature.title}</span>
                  </motion.li>
                ))}
              </motion.ul>
              
              {/* App Download Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex gap-4 pt-6"
              >
                <Link to="#" className="hover:opacity-80 transition-opacity">
                  <img 
                    src={generatePlaceholder(140, 50, 'App Store')} 
                    alt="Download from App Store"
                    className="h-12"
                  />
                </Link>
                <Link to="#" className="hover:opacity-80 transition-opacity">
                  <img 
                    src={generatePlaceholder(140, 50, 'Google Play')} 
                    alt="Download from Google Play"
                    className="h-12"
                  />
                </Link>
              </motion.div>
            </div>
            
            {/* Image Side */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <img 
                  src={generatePlaceholder(500, 400, 'Mahally App')} 
                  alt="Mahally Platform" 
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#CFF7EE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#004956] mb-4">
            امتلك متجراً احترافياً في سلة
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-8">
            أنشئ متجرك الآن بأدوات مرنة وحلول متكاملة تساعدك في كل خطوة نحو نمو مبيعاتك وتسويق منتجاتك
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-[#004D5A] text-white px-12 py-4 rounded-lg hover:bg-[#004D5A]/90 transition-colors font-semibold text-xl"
          >
            أنشئ متجرك مجاناً
          </Link>
        </div>
      </section>
      
      {/* Comprehensive Footer */}
      <footer className="bg-white border-t-2 border-[#96EDD9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
            {/* Logo and Language */}
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <Link to="/">
                <img 
                  src={generatePlaceholder(112, 40, 'سلة')} 
                  alt="سلة" 
                  className="h-10 w-auto"
                />
              </Link>
              <Link 
                to="/en" 
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#004D5A] font-bold text-lg">English</span>
                <Globe className="w-6 h-6" />
              </Link>
            </div>
            
            {/* Apps and Social */}
            <div className="flex flex-col gap-8 items-center">
              {/* App Download Links */}
              <div className="flex gap-4">
                <Link to="#" className="hover:opacity-80 transition-opacity">
                  <img 
                    src={generatePlaceholder(112, 40, 'Google Play')} 
                    alt="Google Play"
                    className="h-10"
                  />
                </Link>
                <Link to="#" className="hover:opacity-80 transition-opacity">
                  <img 
                    src={generatePlaceholder(112, 40, 'App Store')} 
                    alt="App Store"
                    className="h-10"
                  />
                </Link>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                <Link to="#" className="p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <Instagram className="w-6 h-6 text-gray-600 hover:text-[#004956]" />
                </Link>
                <Link to="#" className="p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <Youtube className="w-6 h-6 text-gray-600 hover:text-[#004956]" />
                </Link>
                <Link to="#" className="p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <Twitter className="w-6 h-6 text-gray-600 hover:text-[#004956]" />
                </Link>
                <Link to="#" className="p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <Linkedin className="w-6 h-6 text-gray-600 hover:text-[#004956]" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-full h-px bg-gray-200 my-8"></div>
          
          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
            {/* About Salla */}
            <div>
              <h4 className="text-[#004956] font-semibold text-lg mb-4">عن سلة</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">انضم لفريق سلة</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">اتفاقية الاستخدام</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">منصة الشكاوي</Link></li>
              </ul>
            </div>
            
            {/* Partners */}
            <div>
              <h4 className="text-[#004956] font-semibold text-lg mb-4">شركاء سلة</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">انضم كشريك</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">برامج الشركاء</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">مجتمع الشركاء</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">موارد الشركاء</Link></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h4 className="text-[#004956] font-semibold text-lg mb-4">الموارد</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">مركز المساعدة</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">أكاديمية سلة</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">مجتمع سلة</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">مدونة سلة</Link></li>
              </ul>
            </div>
            
            {/* Solutions */}
            <div>
              <h4 className="text-[#004956] font-semibold text-lg mb-4">الحلول</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">متجر التطبيقات</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">صانع التطبيقات</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">أدوات التسويق</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">سلة سبيشل</Link></li>
              </ul>
            </div>
            
            {/* Sectors */}
            <div>
              <h4 className="text-[#004956] font-semibold text-lg mb-4">القطاعات</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">عبايات وأزياء</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">المنتجات الرقمية</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">الصحة والرياضة</Link></li>
                <li><Link to="#" className="text-[#004956] hover:text-[#004956]/80 transition-colors">الإلكترونيات</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="bg-[#F8F8F8] py-5 px-4 rounded-lg">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
              <p className="text-[#444444] text-sm">
                جميع الحقوق محفوظة لشركة سلة القابضة © 2025
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <div className="flex items-center gap-2 text-[#444444] text-sm">
                  <Phone className="w-4 h-4" />
                  <span>920031659</span>
                </div>
                <div className="flex items-center gap-2 text-[#444444] text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>مكة، المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center gap-2 text-[#444444] text-sm">
                  <Mail className="w-4 h-4" />
                  <span>info@salla.sa</span>
                </div>
                <div className="cursor-pointer">
                  <img 
                    src={generatePlaceholder(30, 30, 'VAT')} 
                    alt="الرقم الضريبي"
                    className="w-8 h-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
