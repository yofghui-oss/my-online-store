import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, ShoppingCart, Heart, Share2, Plus, Minus, 
  Zap, Shield, Wrench, Home, Settings, Award
} from 'lucide-react';

const AppliancesProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedWarranty, setSelectedWarranty] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    name: 'ثلاجة LG الذكية 600 لتر',
    price: 3999.99,
    originalPrice: 4999.99,
    description: 'ثلاجة ذكية بتقنية الذكاء الاصطناعي وموفرة للطاقة من الفئة A++. تأتي مع شاشة تحكم ذكية وإنترنت الأشياء.',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop',
    rating: 4.7,
    reviewCount: 234,
    model: 'LG-RF600-SM',
    energyRating: 'A++',
    capacity: '600 لتر',
    warranty: ['سنة واحدة', 'سنتان', '3 سنوات'],
    features: [
      'تقنية الذكاء الاصطناعي',
      'موفرة للطاقة A++',
      'شاشة تحكم ذكية',
      'اتصال Wi-Fi',
      'تحكم صوتي',
      'نظام تبريد متقدم'
    ],
    specifications: {
      'السعة': '600 لتر',
      'كفاءة الطاقة': 'A++',
      'الأبعاد': '180 × 70 × 65 سم',
      'الوزن': '85 كيلو',
      'اللون': 'فضي',
      'الضمان': 'سنتان شاملة'
    }
  };

  const relatedProducts = [
    { id: '2', name: 'غسالة Samsung الذكية', price: 2299.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop' },
    { id: '3', name: 'مكيف هواء Daikin', price: 1899.99, image: 'https://images.unsplash.com/photo-1631545806609-dcd0ba5b9239?w=300&h=300&fit=crop' },
    { id: '4', name: 'فرن Bosch الكهربائي', price: 1599.99, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop' }
  ];

  const handleAddToCart = () => {
    if (!selectedWarranty) {
      alert('⚡ يرجى اختيار نوع الضمان أولاً');
      return;
    }
    alert('✅ تم إضافة المنتج للسلة! سيتم التواصل معكم لتحديد موعد التركيب.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-600 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">🏠 الرئيسية</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/products')} className="hover:text-blue-600">🏠 الأجهزة المنزلية</button>
          <span className="mx-2">/</span>
          <span className="text-blue-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-white rounded-xl shadow-lg border-4 border-blue-200 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              ⚡ موفر للطاقة A++
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <Home className="w-6 h-6 text-blue-600 ml-2" />
                <span className="text-blue-600 font-semibold">أجهزة منزلية ذكية</span>
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
                <span>({product.reviewCount} تقييم) | ⚡ {product.energyRating}</span>
              </div>

              <div className="flex items-center space-x-reverse space-x-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">{product.price.toLocaleString()} ريال</span>
                <span className="text-xl text-gray-500 line-through">{product.originalPrice.toLocaleString()} ريال</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Key Specs */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <Zap className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-sm font-semibold">{product.energyRating}</div>
                <div className="text-xs text-gray-600">كفاءة الطاقة</div>
              </div>
              <div className="text-center">
                <Settings className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-sm font-semibold">{product.capacity}</div>
                <div className="text-xs text-gray-600">السعة</div>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
                <div className="text-sm font-semibold">سنتان</div>
                <div className="text-xs text-gray-600">ضمان شامل</div>
              </div>
            </div>

            {/* Warranty Options */}
            <div>
              <label className="block font-semibold mb-3">🛡️ نوع الضمان:</label>
              <div className="grid grid-cols-3 gap-3">
                {product.warranty.map((warranty) => (
                  <button key={warranty} onClick={() => setSelectedWarranty(warranty)} 
                    className={`py-3 px-4 border-2 rounded-lg text-sm font-medium ${selectedWarranty === warranty ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-blue-200 hover:border-blue-400'}`}>
                    {warranty}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-semibold mb-3">🔢 الكمية:</label>
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
                🛒 أضف للسلة + تركيب مجاني
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
            </div>

            {/* Services */}
            <div className="border-t border-blue-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Wrench className="w-5 h-5 text-blue-600 ml-2" />
                  <span>تركيب مجاني</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 ml-2" />
                  <span>ضمان شامل</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-indigo-600 ml-2" />
                  <span>صيانة دورية</span>
                </div>
                <div className="flex items-center">
                  <Settings className="w-5 h-5 text-orange-600 ml-2" />
                  <span>دعم فني 24/7</span>
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
              <h3 className="text-lg font-semibold mb-4">المواصفات الأساسية</h3>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">المميزات الذكية</h3>
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Zap className="w-5 h-5 text-blue-500 ml-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">أجهزة مشابهة</h2>
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

export default AppliancesProductDetailPage;