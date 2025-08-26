import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, ShoppingCart, Heart, Share2, Plus, Minus, 
  Gift, Smile, Award, Shield
} from 'lucide-react';

const ToysProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedAge, setSelectedAge] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    name: 'مكعبات البناء الذكية',
    price: 129.99,
    originalPrice: 179.99,
    description: 'مكعبات بناء تعليمية وممتعة تنمي الإبداع والخيال. آمنة 100% ومناسبة للأطفال من عمر 3 سنوات.',
    image: 'https://images.unsplash.com/photo-1558877190-82d9aa4af8d9?w=600&h=600&fit=crop',
    rating: 4.9,
    reviewCount: 189,
    ageGroups: ['3-5 سنوات', '6-8 سنوات', '9+ سنوات'],
    safetyFeatures: [
      'خالية من المواد الضارة',
      'حواف آمنة ومدورة',
      'ألوان طبيعية آمنة',
      'اختبارات السلامة الدولية'
    ]
  };

  const relatedProducts = [
    { id: '2', name: 'ألعاب الذكاء للأطفال', price: 89.99, image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=300&fit=crop' },
    { id: '3', name: 'دمية تعليمية ناطقة', price: 159.99, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop' },
    { id: '4', name: 'ألعاب الرسم والتلوين', price: 79.99, image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=300&fit=crop' }
  ];

  const handleAddToCart = () => {
    if (!selectedAge) {
      alert('🎈 اختاروا الفئة العمرية المناسبة أولاً!');
      return;
    }
    alert('🎉 تم إضافة اللعبة للسلة! الأطفال راح يفرحوا كثير! 🎁');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-600 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-pink-600">🏠 الرئيسية</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/products')} className="hover:text-pink-600">🧸 الألعاب</button>
          <span className="mx-2">/</span>
          <span className="text-pink-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-white rounded-xl shadow-lg border-4 border-pink-300 overflow-hidden relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              🎁 خصم 28%
            </div>
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              ✅ آمن 100%
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <Gift className="w-6 h-6 text-pink-600 ml-2" />
                <span className="text-pink-600 font-semibold">ألعاب تعليمية</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {product.name} ✨
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span>({product.reviewCount} تقييم الأهالي) 👨‍👩‍👧‍👦</span>
              </div>

              <div className="flex items-center space-x-reverse space-x-4 mb-6">
                <span className="text-3xl font-bold text-pink-600">{product.price} ريال</span>
                <span className="text-xl text-gray-500 line-through">{product.originalPrice} ريال</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>

            {/* Safety Features */}
            <div className="bg-green-50 border-4 border-green-200 p-4 rounded-lg">
              <h3 className="font-bold text-green-800 mb-3 flex items-center">
                <Shield className="w-5 h-5 ml-2" />
                🛡️ مميزات الأمان
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
                {product.safetyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Award className="w-4 h-4 text-green-500 ml-1" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Groups */}
            <div>
              <label className="block font-semibold mb-3">🎂 الفئة العمرية المناسبة:</label>
              <div className="grid grid-cols-3 gap-3">
                {product.ageGroups.map((age) => (
                  <button key={age} onClick={() => setSelectedAge(age)} 
                    className={`py-3 px-4 border-4 rounded-lg font-medium transition-all ${selectedAge === age ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-pink-200 hover:border-pink-400'}`}>
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-semibold mb-3">🔢 الكمية:</label>
              <div className="flex items-center">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 border-4 border-pink-200 rounded-lg hover:border-pink-400">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="mx-6 text-xl font-semibold w-16 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 border-4 border-pink-200 rounded-lg hover:border-pink-400">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button onClick={handleAddToCart} 
                className="w-full bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 text-white py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:via-yellow-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 ml-2" />
                🛒 أضيفوها للسلة!
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setIsWishlisted(!isWishlisted)} 
                  className={`py-3 border-4 rounded-lg font-medium flex items-center justify-center ${isWishlisted ? 'border-red-500 bg-red-50 text-red-700' : 'border-pink-300 text-gray-700'}`}>
                  <Heart className={`w-5 h-5 ml-2 ${isWishlisted ? 'fill-current' : ''}`} />
                  💖 المفضلة
                </button>
                <button className="py-3 border-4 border-pink-300 rounded-lg flex items-center justify-center">
                  <Share2 className="w-5 h-5 ml-2" />
                  📤 مشاركة
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="border-t-4 border-pink-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Gift className="w-5 h-5 text-pink-600 ml-2" />
                  <span>تغليف هدايا مجاني</span>
                </div>
                <div className="flex items-center">
                  <Smile className="w-5 h-5 text-yellow-600 ml-2" />
                  <span>ضمان الفرحة</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 ml-2" />
                  <span>آمان مضمون</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-purple-600 ml-2" />
                  <span>جودة عالمية</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8">
            ألعاب أخرى حلوة! 🎈
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg border-4 border-pink-200 overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-pink-600">{product.price} ريال</span>
                    <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:from-pink-600 hover:to-purple-600">
                      شوفوها! 👀
                    </button>
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

export default ToysProductDetailPage;