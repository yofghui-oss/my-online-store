import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, ShoppingCart, Heart, Share2, Plus, Minus, 
  Code, Shield, Zap, Settings, Award, Download
} from 'lucide-react';

const SoftwareProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedLicense, setSelectedLicense] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    name: 'نظام إدارة المؤسسات المتقدم',
    price: 4999.99,
    originalPrice: 6999.99,
    description: 'نظام شامل لإدارة المؤسسات والشركات مع أحدث التقنيات والميزات المتطورة. يشمل إدارة الموارد البشرية، المحاسبة، والمبيعات.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=600&fit=crop',
    rating: 4.8,
    reviewCount: 127,
    version: 'v3.2.1',
    compatibility: 'Windows, Mac, Linux',
    support: '24/7',
    licenses: ['رخصة شخصية', 'رخصة تجارية', 'رخصة مؤسسية'],
    features: [
      'إدارة شاملة للموارد البشرية',
      'نظام محاسبة متطور',
      'إدارة المبيعات والعملاء',
      'تقارير وتحليلات متقدمة',
      'حماية وأمان عالي',
      'دعم فني متواصل'
    ],
    specifications: {
      'الإصدار': 'v3.2.1',
      'المتطلبات': 'Windows 10+, 8GB RAM',
      'حجم التحميل': '850 MB',
      'اللغات': 'العربية، الإنجليزية',
      'قاعدة البيانات': 'MySQL, PostgreSQL',
      'الدعم': '24/7 متاح'
    }
  };

  const relatedProducts = [
    { id: '2', name: 'نظام إدارة المخزون', price: 2999.99, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop' },
    { id: '3', name: 'تطبيق المحاسبة الذكي', price: 1999.99, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop' },
    { id: '4', name: 'نظام إدارة العملاء', price: 3499.99, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=300&fit=crop' }
  ];

  const handleAddToCart = () => {
    if (!selectedLicense) {
      alert('💻 يرجى اختيار نوع الرخصة أولاً');
      return;
    }
    alert('✅ تم إضافة البرنامج للسلة! سيتم إرسال رابط التحميل بعد الدفع.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-600 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">🏠 الرئيسية</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/products')} className="hover:text-blue-600">💻 البرمجيات</button>
          <span className="mx-2">/</span>
          <span className="text-blue-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-white rounded-xl shadow-lg border-4 border-blue-200 overflow-hidden relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              💡 {product.version}
            </div>
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              🛡️ آمن ومعتمد
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <Code className="w-6 h-6 text-blue-600 ml-2" />
                <span className="text-blue-600 font-semibold">برمجيات مؤسسية</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span>({product.reviewCount} تقييم) | 🔧 {product.support}</span>
              </div>

              <div className="flex items-center space-x-reverse space-x-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">{product.price.toLocaleString()} ريال</span>
                <span className="text-xl text-gray-500 line-through">{product.originalPrice.toLocaleString()} ريال</span>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">خصم 29%</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <Shield className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-sm font-semibold">أمان عالي</div>
                <div className="text-xs text-gray-600">حماية متقدمة</div>
              </div>
              <div className="text-center">
                <Zap className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-sm font-semibold">أداء سريع</div>
                <div className="text-xs text-gray-600">استجابة فورية</div>
              </div>
              <div className="text-center">
                <Settings className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
                <div className="text-sm font-semibold">قابل للتخصيص</div>
                <div className="text-xs text-gray-600">حسب احتياجاتك</div>
              </div>
            </div>

            {/* License Types */}
            <div>
              <label className="block font-semibold mb-3">📄 نوع الرخصة:</label>
              <div className="grid grid-cols-3 gap-3">
                {product.licenses.map((license) => (
                  <button key={license} onClick={() => setSelectedLicense(license)} 
                    className={`py-3 px-4 border-2 rounded-lg text-sm font-medium ${selectedLicense === license ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-blue-200 hover:border-blue-400'}`}>
                    {license}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-semibold mb-3">🔢 عدد التراخيص:</label>
              <div className="flex items-center">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 border-2 border-blue-200 rounded-lg">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="mx-6 text-xl font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 border-2 border-blue-200 rounded-lg">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button onClick={handleAddToCart} 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 ml-2" />
                💻 شراء وتحميل فوري
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setIsWishlisted(!isWishlisted)} 
                  className={`py-3 border-2 rounded-lg flex items-center justify-center ${isWishlisted ? 'border-red-500 bg-red-50 text-red-700' : 'border-blue-300 text-gray-700'}`}>
                  <Heart className={`w-5 h-5 ml-2 ${isWishlisted ? 'fill-current' : ''}`} />
                  المفضلة
                </button>
                <button className="py-3 border-2 border-blue-300 rounded-lg flex items-center justify-center">
                  <Share2 className="w-5 h-5 ml-2" />
                  مشاركة
                </button>
              </div>
              
              <button className="w-full border-2 border-green-500 text-green-700 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-green-50">
                <Download className="w-5 h-5 ml-2" />
                📥 تجربة مجانية 30 يوم
              </button>
            </div>

            {/* Services */}
            <div className="border-t border-blue-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-blue-600 ml-2" />
                  <span>تحميل فوري</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 ml-2" />
                  <span>ضمان 60 يوم</span>
                </div>
                <div className="flex items-center">
                  <Settings className="w-5 h-5 text-indigo-600 ml-2" />
                  <span>دعم فني مجاني</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-orange-600 ml-2" />
                  <span>تحديثات مجانية</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">المواصفات التقنية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">المتطلبات التقنية</h3>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">المميزات الرئيسية</h3>
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Code className="w-5 h-5 text-blue-500 ml-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">برمجيات مشابهة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">{product.price.toLocaleString()} ريال</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">عرض التفاصيل</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareProductDetailPage;