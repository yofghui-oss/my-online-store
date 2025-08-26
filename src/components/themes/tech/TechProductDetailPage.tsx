import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw, 
  CreditCard,
  Check,
  Minus,
  Plus,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface TechProductDetailPageProps {
  productId?: string;
}

const TechProductDetailPage: React.FC<TechProductDetailPageProps> = ({ 
  productId = "1" 
}) => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    اللون: 'أسود',
    التخزين: '256GB'
  });
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sample product data - in real app, this would come from props or API
  const product = {
    id: productId,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 4999,
    originalPrice: 5299,
    rating: 4.8,
    reviewCount: 892,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop"
    ],
    description: "أحدث هاتف iPhone بكاميرا احترافية ومعالج A17 Pro المتطور، مع شاشة Super Retina XDR بحجم 6.7 بوصة.",
    features: [
      "معالج A17 Pro مع تقنية 3 نانومتر",
      "كاميرا ثلاثية 48 ميجابكسل مع تقريب بصري 5x",
      "شاشة Super Retina XDR 6.7 بوصة",
      "هيكل من التيتانيوم الفضائي",
      "مقاوم للماء حتى عمق 6 أمتار",
      "شحن لاسلكي MagSafe حتى 15W"
    ],
    specifications: [
      { name: "الشاشة", value: "6.7 بوصة Super Retina XDR" },
      { name: "المعالج", value: "A17 Pro" },
      { name: "الذاكرة", value: "8GB RAM" },
      { name: "التخزين", value: "256GB / 512GB / 1TB" },
      { name: "الكاميرا الخلفية", value: "48MP + 12MP + 12MP" },
      { name: "الكاميرا الأمامية", value: "12MP TrueDepth" },
      { name: "البطارية", value: "4441 mAh" },
      { name: "نظام التشغيل", value: "iOS 17" }
    ],
    variants: {
      اللون: ["أسود", "أبيض", "أزرق", "بنفسجي"],
      التخزين: ["256GB", "512GB", "1TB"]
    },
    inStock: true,
    stockCount: 15,
    warranty: "ضمان دولي لمدة سنة واحدة"
  };

  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: value
    }));
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const relatedProducts = [
    { id: '2', name: 'MacBook Pro M3', price: 8999, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop', rating: 4.9 },
    { id: '3', name: 'AirPods Pro 2', price: 1299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', rating: 4.7 },
    { id: '4', name: 'Apple Watch Series 9', price: 1899, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop', rating: 4.6 }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 mb-8">
          <a href="#" className="hover:text-blue-600">الرئيسية</a>
          <ArrowLeft className="w-4 h-4" />
          <a href="#" className="hover:text-blue-600">الهواتف الذكية</a>
          <ArrowLeft className="w-4 h-4" />
          <a href="#" className="hover:text-blue-600">{product.brand}</a>
          <ArrowLeft className="w-4 h-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center ${
                  isWishlisted ? 'bg-red-100 text-red-600' : 'bg-white text-gray-600'
                } hover:bg-red-100 hover:text-red-600 transition-colors`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button className="absolute top-4 left-16 w-10 h-10 rounded-full bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-blue-600 font-medium">{product.brand}</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="mr-2 text-sm text-gray-600">
                ({product.rating}) • {product.reviewCount} تقييم
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()} ريال</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">{product.originalPrice.toLocaleString()} ريال</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    وفر {((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </div>

            {/* Variants */}
            <div className="space-y-4 mb-6">
              {Object.entries(product.variants).map(([variantName, options]) => (
                <div key={variantName}>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">{variantName}:</h3>
                  <div className="flex space-x-2 space-x-reverse">
                    {options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleVariantChange(variantName, option)}
                        className={`px-4 py-2 border rounded-lg text-sm ${
                          selectedVariants[variantName] === option
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">الكمية:</h3>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 text-gray-600 hover:text-gray-800"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 text-gray-600 hover:text-gray-800"
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stockCount} قطعة متوفرة
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 ml-2" />
                {product.inStock ? 'أضف للسلة' : 'غير متوفر'}
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                اشتري الآن
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-green-600 ml-2" />
                  <span className="text-sm text-gray-600">توصيل مجاني</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 ml-2" />
                  <span className="text-sm text-gray-600">ضمان سنة</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="w-5 h-5 text-purple-600 ml-2" />
                  <span className="text-sm text-gray-600">إرجاع مجاني</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-orange-600 ml-2" />
                  <span className="text-sm text-gray-600">دفع آمن</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8 space-x-reverse">
              <button className="py-2 px-1 border-b-2 border-blue-600 text-blue-600 font-medium">
                الوصف
              </button>
              <button className="py-2 px-1 text-gray-500 hover:text-gray-700">
                المواصفات
              </button>
              <button className="py-2 px-1 text-gray-500 hover:text-gray-700">
                التقييمات
              </button>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">وصف المنتج</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-4">المميزات الرئيسية:</h4>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 ml-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">المواصفات التقنية</h3>
              <div className="space-y-3">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">{spec.name}</span>
                    <span className="text-gray-900 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">منتجات مشابهة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((related) => (
              <div key={related.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={related.image} alt={related.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{related.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(related.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="mr-1 text-sm text-gray-600">({related.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{related.price.toLocaleString()} ريال</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      عرض
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

export default TechProductDetailPage;