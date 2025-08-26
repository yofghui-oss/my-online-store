// RTL (Right-to-Left) utilities for Arabic language support

export const RTL_CONFIG = {
  direction: 'rtl' as const,
  lang: 'ar' as const,
  textAlign: 'right' as const,
  fontFamily: 'Cairo, Tajawal, system-ui, -apple-system, sans-serif'
};

// RTL-aware class utilities
export const rtlClasses = {
  // Margin and Padding
  mr: (size: string) => `ml-${size}`, // margin-right becomes margin-left
  ml: (size: string) => `mr-${size}`, // margin-left becomes margin-right
  pr: (size: string) => `pl-${size}`, // padding-right becomes padding-left
  pl: (size: string) => `pr-${size}`, // padding-left becomes padding-right
  
  // Positioning
  left: (size: string) => `right-${size}`,
  right: (size: string) => `left-${size}`,
  
  // Flexbox
  flexRow: 'flex-row-reverse',
  flexRowNormal: 'flex-row',
  
  // Text alignment
  textLeft: 'text-right',
  textRight: 'text-left',
  
  // Borders
  borderL: (size: string) => `border-r-${size}`,
  borderR: (size: string) => `border-l-${size}`,
  
  // Rounded corners
  roundedL: (size: string) => `rounded-r-${size}`,
  roundedR: (size: string) => `rounded-l-${size}`,
  
  // Transform
  rotateLeft: 'rotate-180',
  
  // Space between (for flex containers)
  spaceX: (size: string) => `space-x-reverse space-x-${size}`,
  spaceXReverse: 'space-x-reverse'
};

// RTL-aware icon utilities
export const getIconDirection = (iconName: string) => {
  const rtlIcons = [
    'ArrowLeft', 'ArrowRight', 'ChevronLeft', 'ChevronRight',
    'SkipBack', 'SkipForward', 'FastForward', 'Rewind'
  ];
  
  return rtlIcons.includes(iconName) ? 'transform rotate-180' : '';
};

// Number formatting for Arabic
export const formatArabicNumber = (number: number | string): string => {
  const arabicNumbers = '٠١٢٣٤٥٦٧٨٩';
  const englishNumbers = '0123456789';
  
  return number.toString().replace(/[0-9]/g, (digit) => {
    return arabicNumbers[englishNumbers.indexOf(digit)];
  });
};

// Currency formatting for Arabic
export const formatArabicCurrency = (amount: number, currency: string = 'ريال'): string => {
  const formattedAmount = new Intl.NumberFormat('ar-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
  
  return `${formattedAmount} ${currency}`;
};

// Date formatting for Arabic
export const formatArabicDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Generate RTL-aware CSS variables
export const generateRTLVars = (theme: string) => ({
  '--text-direction': 'rtl',
  '--text-align': 'right',
  '--flex-direction': 'row-reverse',
  '--border-radius-start': 'border-top-right-radius border-bottom-right-radius',
  '--border-radius-end': 'border-top-left-radius border-bottom-left-radius',
  '--margin-start': 'margin-right',
  '--margin-end': 'margin-left',
  '--padding-start': 'padding-right',
  '--padding-end': 'padding-left',
  '--transform-x': 'scaleX(-1)'
});

// RTL-aware component wrapper
export const withRTL = <T extends {}>(Component: React.ComponentType<T>) => {
  return React.forwardRef<any, T>((props, ref) => {
    return (
      <div dir="rtl" className="font-arabic">
        <Component {...props} ref={ref} />
      </div>
    );
  });
};

// Common Arabic phrases for themes
export const ARABIC_PHRASES = {
  common: {
    home: 'الرئيسية',
    about: 'من نحن',
    contact: 'تواصل معنا',
    products: 'المنتجات',
    services: 'الخدمات',
    blog: 'المدونة',
    cart: 'السلة',
    checkout: 'إتمام الشراء',
    account: 'حسابي',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    search: 'بحث',
    menu: 'القائمة',
    close: 'إغلاق',
    open: 'فتح',
    next: 'التالي',
    previous: 'السابق',
    more: 'المزيد',
    less: 'أقل',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'تم بنجاح',
    save: 'حفظ',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    download: 'تحميل',
    upload: 'رفع',
    share: 'مشاركة',
    like: 'إعجاب',
    comment: 'تعليق',
    subscribe: 'اشتراك',
    unsubscribe: 'إلغاء الاشتراك'
  },
  ecommerce: {
    addToCart: 'أضف للسلة',
    buyNow: 'اشتري الآن',
    quickView: 'عرض سريع',
    compare: 'مقارنة',
    wishlist: 'قائمة الأمنيات',
    outOfStock: 'غير متوفر',
    inStock: 'متوفر',
    onSale: 'خصم',
    newArrival: 'وصل حديثاً',
    featured: 'مميز',
    bestSeller: 'الأكثر مبيعاً',
    price: 'السعر',
    originalPrice: 'السعر الأصلي',
    discount: 'خصم',
    freeShipping: 'شحن مجاني',
    fastDelivery: 'توصيل سريع',
    warranty: 'ضمان',
    returnPolicy: 'سياسة الإرجاع',
    paymentMethods: 'طرق الدفع',
    securePayment: 'دفع آمن',
    customerReviews: 'آراء العملاء',
    rating: 'التقييم',
    writeReview: 'اكتب مراجعة',
    readReviews: 'اقرأ المراجعات',
    productDetails: 'تفاصيل المنتج',
    specifications: 'المواصفات',
    description: 'الوصف',
    features: 'المميزات',
    size: 'المقاس',
    color: 'اللون',
    quantity: 'الكمية',
    category: 'الفئة',
    brand: 'العلامة التجارية',
    model: 'الموديل',
    sku: 'رقم المنتج'
  },
  forms: {
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    address: 'العنوان',
    city: 'المدينة',
    state: 'المنطقة',
    country: 'الدولة',
    zipCode: 'الرمز البريدي',
    dateOfBirth: 'تاريخ الميلاد',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    submit: 'إرسال',
    reset: 'إعادة تعيين',
    required: 'مطلوب',
    optional: 'اختياري',
    pleaseSelect: 'يرجى الاختيار',
    invalidEmail: 'بريد إلكتروني غير صحيح',
    passwordTooShort: 'كلمة المرور قصيرة جداً',
    passwordsDoNotMatch: 'كلمات المرور غير متطابقة'
  },
  navigation: {
    breadcrumb: 'مسار التنقل',
    pagination: 'ترقيم الصفحات',
    page: 'صفحة',
    of: 'من',
    results: 'نتائج',
    showing: 'عرض',
    to: 'إلى',
    first: 'الأولى',
    last: 'الأخيرة',
    noResults: 'لا توجد نتائج',
    tryAgain: 'حاول مرة أخرى'
  },
  time: {
    now: 'الآن',
    today: 'اليوم',
    yesterday: 'أمس',
    tomorrow: 'غداً',
    thisWeek: 'هذا الأسبوع',
    lastWeek: 'الأسبوع الماضي',
    thisMonth: 'هذا الشهر',
    lastMonth: 'الشهر الماضي',
    thisYear: 'هذا العام',
    lastYear: 'العام الماضي',
    minute: 'دقيقة',
    minutes: 'دقائق',
    hour: 'ساعة',
    hours: 'ساعات',
    day: 'يوم',
    days: 'أيام',
    week: 'أسبوع',
    weeks: 'أسابيع',
    month: 'شهر',
    months: 'أشهر',
    year: 'سنة',
    years: 'سنوات',
    ago: 'منذ'
  }
};

// Theme-specific Arabic content
export const THEME_ARABIC_CONTENT = {
  tech: {
    title: 'تك زون للإلكترونيات',
    subtitle: 'أحدث التقنيات والأجهزة الإلكترونية',
    categories: {
      smartphones: 'الهواتف الذكية',
      laptops: 'أجهزة الكمبيوتر المحمولة',
      tablets: 'الأجهزة اللوحية',
      accessories: 'الإكسسوارات',
      gaming: 'الألعاب',
      audio: 'الصوتيات',
      cameras: 'الكاميرات',
      smart_home: 'المنزل الذكي'
    }
  },
  minimal: {
    title: 'بساطة للملابس',
    subtitle: 'حيث تلتقي البساطة بالأناقة',
    categories: {
      shirts: 'القمصان',
      pants: 'البناطيل',
      dresses: 'الفساتين',
      shoes: 'الأحذية',
      accessories: 'الإكسسوارات',
      bags: 'الحقائب'
    }
  },
  luxe: {
    title: 'فاخر للمجوهرات',
    subtitle: 'مجوهرات فاخرة وإكسسوارات راقية',
    categories: {
      rings: 'الخواتم',
      necklaces: 'العقود',
      bracelets: 'الأساور',
      earrings: 'الأقراط',
      watches: 'الساعات',
      precious_stones: 'الأحجار الكريمة'
    }
  },
  vibrant: {
    title: 'ألوان الشباب',
    subtitle: 'موضة شبابية حيوية وملونة',
    categories: {
      trendy_clothes: 'الملابس العصرية',
      sportswear: 'الملابس الرياضية',
      casual: 'الملابس الكاجوال',
      accessories: 'الإكسسوارات العصرية'
    }
  },
  appliances: {
    title: 'الأجهزة المنزلية الذكية',
    subtitle: 'أجهزة منزلية حديثة وذكية',
    categories: {
      kitchen: 'أجهزة المطبخ',
      cleaning: 'أجهزة التنظيف',
      air_conditioning: 'أجهزة التكييف',
      electrical: 'الأجهزة الكهربائية'
    }
  },
  toys: {
    title: 'عالم الألعاب المرح',
    subtitle: 'ألعاب تعليمية ومسلية للأطفال',
    categories: {
      educational: 'الألعاب التعليمية',
      electronic: 'الألعاب الإلكترونية',
      dolls: 'الدمى والعرائس',
      sports: 'الألعاب الرياضية',
      puzzles: 'الألغاز والأحاجي',
      outdoor: 'ألعاب خارجية'
    }
  },
  software: {
    title: 'حلول البرمجيات',
    subtitle: 'برامج وتطبيقات متطورة للأعمال',
    categories: {
      accounting: 'برامج المحاسبة',
      design: 'برامج التصميم',
      security: 'حلول الأمان',
      development: 'أدوات التطوير',
      productivity: 'برامج الإنتاجية',
      enterprise: 'حلول الشركات'
    }
  }
};

export default {
  RTL_CONFIG,
  rtlClasses,
  getIconDirection,
  formatArabicNumber,
  formatArabicCurrency,
  formatArabicDate,
  generateRTLVars,
  withRTL,
  ARABIC_PHRASES,
  THEME_ARABIC_CONTENT
};