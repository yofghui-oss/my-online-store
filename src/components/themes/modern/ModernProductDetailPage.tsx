import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, Star, Heart, Share2, ShoppingCart, 
  Shield, Truck, RotateCcw, Plus, Minus, 
  ChevronLeft, ChevronRight, Zap, Award, Info
} from 'lucide-react';

const ModernProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data - in real app, this would come from props or API
  const product = {
    id: id || '1',
    name: 'قميص عصري أنيق',
    price: 199.99,
    originalPrice: 299.99,
    description: 'قميص عصري مصمم بأحدث الاتجاهات العالمية. مصنوع من قماش عالي الجودة يوفر الراحة والأناقة في آن واحد. مناسب للمناسبات الرسمية والكاجوال.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop'
    ],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 15,
    sku: 'MOD-SHIRT-001',
    category: 'قمصان',
    brand: 'عصري كوليكشن',
    material: 'قطن 100%',
    careInstructions: 'غسيل بالماء البارد، لا يستخدم المبيض',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'أبيض', value: '#FFFFFF', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop' },
      { name: 'أسود', value: '#000000', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop' },
      { name: 'أزرق', value: '#3B82F6', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop' },
      { name: 'رمادي', value: '#6B7280', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop' }
    ],
    features: [
      'قماش قطني عالي الجودة',
      'تصميم عصري وأنيق',
      'مريح للاستخدام اليومي',
      'سهل العناية والغسيل',
      'متوفر بألوان متعددة',
      'مقاسات من S إلى XXL'
    ],
    specifications: {
      'المادة': 'قطن 100%',
      'المقاسات المتاحة': 'S, M, L, XL, XXL',
      'طريقة الغسيل': 'غسيل بالماء البارد',
      'بلد المنشأ': 'تركيا',
      'العلامة التجارية': 'عصري كوليكشن',
      'الموسم': 'جميع المواسم'
    }
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'بنطلون جينز عصري',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop',
      rating: 4.4
    },
    {
      id: '3',
      name: 'جاكيت شتوي أنيق',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
      rating: 4.7
    },
    {
      id: '4',
      name: 'حذاء رياضي عصري',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      rating: 4.5
    },
    {
      id: '5',
      name: 'تي شيرت كاجوال',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      rating: 4.3
    }
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('يرجى اختيار المقاس');
      return;
    }
    console.log('Added to cart:', { 
      product: product.id, 
      quantity, 
      size: selectedSize, 
      color: selectedColor 
    });
    alert('تم إضافة المنتج إلى السلة بنجاح!');
  };

  const handleImageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? product.images.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === product.images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleColorSelect = (color: typeof product.colors[0], index: number) => {
    setSelectedColor(color.name);
    setSelectedImage(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-600 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-purple-600 transition-colors"
          >
            الرئيسية
          </button>
          <span className="mx-2">/</span>
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-purple-600 transition-colors"
          >
            المنتجات
          </button>
          <span className="mx-2">/</span>
          <span className="text-purple-600">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-square bg-white rounded-xl shadow-lg border-4 border-purple-200 overflow-hidden">
                <img
                  src={selectedColor ? product.colors.find(c => c.name === selectedColor)?.image : product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    خصم 33%
                  </div>
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
                      ? 'border-purple-500 ring-2 ring-purple-200' 
                      : 'border-purple-200 hover:border-purple-400'
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
                <Sparkles className="w-6 h-6 text-purple-600 ml-2" />
                <span className="text-purple-600 font-semibold">{product.brand}</span>
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
                <span className="text-gray-600 mx-2">|</span>
                <span className="text-purple-600">{product.rating}</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-reverse space-x-4 mb-6">
                <span className="text-3xl font-bold text-purple-600">
                  {product.price.toLocaleString()} ريال
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()} ريال
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full ml-2"></div>
                  <span className="text-green-600 font-semibold">متوفر في المخزون</span>
                  <span className="text-gray-600 mr-2">({product.stockCount} قطعة متبقية)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-gray-700 leading-relaxed">
              {product.description}
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                اللون: {selectedColor && <span className="text-purple-600">{selectedColor}</span>}
              </label>
              <div className="flex space-x-reverse space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color, index)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor === color.name
                        ? 'border-purple-500 scale-110'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                المقاس: {selectedSize && <span className="text-purple-600">{selectedSize}</span>}
              </label>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-purple-200 hover:border-purple-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                الكمية
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="mx-6 text-xl font-semibold w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center"
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
                      : 'border-purple-300 hover:border-purple-500 text-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ml-2 ${isWishlisted ? 'fill-current' : ''}`} />
                  المفضلة
                </button>
                
                <button className="py-3 px-4 border-2 border-purple-300 rounded-lg font-medium hover:border-purple-500 transition-colors text-gray-700 flex items-center justify-center">
                  <Share2 className="w-5 h-5 ml-2" />
                  مشاركة
                </button>
              </div>
            </div>

            {/* Services */}
            <div className="border-t border-purple-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-emerald-600 ml-2" />
                  <span className="text-gray-700">توصيل مجاني +200 ريال</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="w-5 h-5 text-blue-600 ml-2" />
                  <span className="text-gray-700">إرجاع خلال 14 يوم</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-purple-600 ml-2" />
                  <span className="text-gray-700">ضمان الجودة</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-indigo-600 ml-2" />
                  <span className="text-gray-700">خدمة عملاء 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-purple-200">
            <nav className="flex space-x-reverse space-x-8">
              {[
                { id: 'description', label: 'الوصف' },
                { id: 'specifications', label: 'المواصفات' },
                { id: 'features', label: 'المميزات' },
                { id: 'reviews', label: 'التقييمات' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-lg leading-relaxed">{product.description}</p>
                <p className="mt-4">
                  هذا المنتج مصمم خصيصاً لمحبي الأناقة والموضة العصرية. يتميز بجودة عالية في الخامات والتصنيع، 
                  مما يضمن لك الراحة والأناقة في نفس الوقت. مناسب لجميع المناسبات والأوقات.
                </p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">المواصفات التقنية</h3>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-purple-100">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-semibold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">معلومات إضافية</h3>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Info className="w-5 h-5 text-purple-600 ml-2" />
                      <span className="font-semibold text-gray-900">تعليمات العناية</span>
                    </div>
                    <p className="text-gray-700">{product.careInstructions}</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow border border-purple-200">
                    <Zap className="w-6 h-6 text-purple-500 ml-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">قريباً!</h3>
                <p className="text-gray-600">سيتم إضافة قسم التقييمات والمراجعات قريباً</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            منتجات مشابهة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-xl shadow-lg border-2 border-purple-200 overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
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
                    <span className="text-lg font-bold text-purple-600">
                      {relatedProduct.price.toLocaleString()} ريال
                    </span>
                    <button 
                      onClick={() => navigate(`/product/${relatedProduct.id}`)}
                      className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
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

export default ModernProductDetailPage;