import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Crown, Diamond, Star, Heart, Share2, ShoppingCart, 
  Shield, Award, Truck, RotateCcw, Plus, Minus,
  ChevronLeft, ChevronRight, Gem, Sparkles
} from 'lucide-react';

const LuxeProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - in real app, this would come from props or API
  const product = {
    id: id || '1',
    name: 'خاتم الماس الملكي',
    price: 15999.99,
    originalPrice: 18999.99,
    description: 'خاتم فاخر من الذهب الأبيض عيار 18 قيراط مرصع بالماس الطبيعي الخالص. تصميم ملكي أنيق يناسب المناسبات الخاصة والاحتفالات المميزة.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    sku: 'LUX-RING-001',
    category: 'خواتم',
    brand: 'فاخر كوليكشن',
    material: 'ذهب أبيض 18 قيراط',
    gemstone: 'ماس طبيعي',
    weight: '8.5 جرام',
    warranty: 'ضمان مدى الحياة',
    variants: [
      { name: 'المقاس', options: ['6', '7', '8', '9', '10'] },
      { name: 'نوع الماس', options: ['كلاسيكي', 'أميرة', 'دائري'] }
    ],
    features: [
      'ذهب أبيض عيار 18 قيراط',
      'ماس طبيعي عالي الجودة',
      'تصميم ملكي حصري',
      'شهادة أصالة معتمدة',
      'ضمان مدى الحياة',
      'صندوق هدايا فاخر'
    ],
    specifications: {
      'المادة': 'ذهب أبيض 18 قيراط',
      'الحجر الكريم': 'ماس طبيعي',
      'الوزن': '8.5 جرام',
      'العيار': '18 قيراط',
      'شهادة الجودة': 'GIA معتمدة',
      'بلد المنشأ': 'بلجيكا'
    }
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'أقراط الماس الفاخرة',
      price: 12999.99,
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=300&fit=crop',
      rating: 4.8
    },
    {
      id: '3',
      name: 'سوار الذهب الملكي',
      price: 8999.99,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop',
      rating: 4.7
    },
    {
      id: '4',
      name: 'عقد اللؤلؤ الطبيعي',
      price: 19999.99,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      rating: 4.9
    }
  ];

  const handleAddToCart = () => {
    console.log('Added to cart:', { product: product.id, quantity, variant: selectedVariant });
    alert('تم إضافة المنتج إلى السلة بنجاح!');
  };

  const handleImageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? product.images.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === product.images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-600 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-amber-600 transition-colors"
          >
            الرئيسية
          </button>
          <span className="mx-2">/</span>
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-amber-600 transition-colors"
          >
            المنتجات
          </button>
          <span className="mx-2">/</span>
          <span className="text-amber-600">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-square bg-white rounded-xl shadow-lg border-4 border-amber-200 overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  خصم 16%
                </div>
                {/* Image Navigation */}
                <button
                  onClick={() => handleImageChange('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleImageChange('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-amber-500 ring-2 ring-amber-200' 
                      : 'border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center mb-2">
                <Crown className="w-6 h-6 text-amber-600 ml-2" />
                <span className="text-amber-600 font-semibold">{product.brand}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} تقييم)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-reverse space-x-4 mb-6">
                <span className="text-3xl font-bold text-amber-600">
                  {product.price.toLocaleString()} ريال
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()} ريال
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="text-gray-700 leading-relaxed">
              {product.description}
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center">
                <Gem className="w-5 h-5 text-purple-600 ml-2" />
                <span className="text-sm text-gray-700">{product.material}</span>
              </div>
              <div className="flex items-center">
                <Diamond className="w-5 h-5 text-blue-600 ml-2" />
                <span className="text-sm text-gray-700">{product.gemstone}</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-emerald-600 ml-2" />
                <span className="text-sm text-gray-700">شهادة معتمدة</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-amber-600 ml-2" />
                <span className="text-sm text-gray-700">{product.warranty}</span>
              </div>
            </div>

            {/* Variants */}
            {product.variants.map((variant, index) => (
              <div key={index}>
                <label className="block text-gray-700 font-semibold mb-2">
                  {variant.name}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedVariant(option)}
                      className={`py-2 px-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedVariant === option
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                الكمية
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border-2 border-amber-200 rounded-lg hover:border-amber-400 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="mx-4 text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border-2 border-amber-200 rounded-lg hover:border-amber-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-amber-700 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <ShoppingCart className="w-6 h-6 ml-2" />
                إضافة إلى السلة
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`py-3 px-4 border-2 rounded-lg font-medium transition-all flex items-center justify-center ${
                    isWishlisted
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : 'border-amber-300 hover:border-amber-500 text-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ml-2 ${isWishlisted ? 'fill-current' : ''}`} />
                  المفضلة
                </button>
                
                <button className="py-3 px-4 border-2 border-amber-300 rounded-lg font-medium hover:border-amber-500 transition-colors text-gray-700 flex items-center justify-center">
                  <Share2 className="w-5 h-5 ml-2" />
                  مشاركة
                </button>
              </div>
            </div>

            {/* Services */}
            <div className="border-t border-amber-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-emerald-600 ml-2" />
                  <span className="text-gray-700">توصيل مجاني</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="w-5 h-5 text-blue-600 ml-2" />
                  <span className="text-gray-700">إرجاع مجاني</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-amber-600 ml-2" />
                  <span className="text-gray-700">ضمان أصلي</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-purple-600 ml-2" />
                  <span className="text-gray-700">شهادة جودة</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-amber-200">
            <nav className="flex space-x-reverse space-x-8">
              <button className="py-4 px-2 border-b-2 border-amber-500 text-amber-600 font-semibold">
                المواصفات
              </button>
              <button className="py-4 px-2 text-gray-500 hover:text-gray-700">
                المميزات
              </button>
              <button className="py-4 px-2 text-gray-500 hover:text-gray-700">
                التقييمات
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">المواصفات التقنية</h3>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-amber-100">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">المميزات الأساسية</h3>
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Sparkles className="w-5 h-5 text-amber-500 ml-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            منتجات مشابهة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-xl shadow-lg border-2 border-amber-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(relatedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({relatedProduct.rating})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-amber-600">
                      {relatedProduct.price.toLocaleString()} ريال
                    </span>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                      عرض التفاصيل
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

export default LuxeProductDetailPage;