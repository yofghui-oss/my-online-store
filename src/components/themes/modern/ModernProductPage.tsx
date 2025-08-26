import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Share2, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react';

interface ModernProductPageProps {
  storeId: string;
  productId?: string;
}

const ModernProductPage: React.FC<ModernProductPageProps> = ({ storeId, productId }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: productId || '1',
    name: 'قميص عصري أنيق للرجال',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviewCount: 124,
    description: 'قميص عصري مصنوع من أجود أنواع القطن الطبيعي، يتميز بالراحة والأناقة. مناسب للمناسبات الرسمية وغير الرسمية.',
    features: [
      'مصنوع من القطن الطبيعي 100%',
      'قابل للغسل في الغسالة',
      'مقاوم للتجعد',
      'تصميم عصري وأنيق'
    ],
    images: [
      'https://via.placeholder.com/600x600?text=Product+Image+1',
      'https://via.placeholder.com/600x600?text=Product+Image+2',
      'https://via.placeholder.com/600x600?text=Product+Image+3',
      'https://via.placeholder.com/600x600?text=Product+Image+4'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'أزرق', value: 'blue', hex: '#3B82F6' },
      { name: 'أسود', value: 'black', hex: '#000000' },
      { name: 'أبيض', value: 'white', hex: '#FFFFFF' },
      { name: 'رمادي', value: 'gray', hex: '#6B7280' }
    ]
  };

  const relatedProducts = [
    { id: '2', name: 'بنطال جينز كلاسيكي', price: 199, image: 'https://via.placeholder.com/300x300?text=Related+1' },
    { id: '3', name: 'حذاء رياضي أنيق', price: 449, image: 'https://via.placeholder.com/300x300?text=Related+2' },
    { id: '4', name: 'ساعة يد فاخرة', price: 899, image: 'https://via.placeholder.com/300x300?text=Related+3' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-3xl shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-purple-500 shadow-lg' 
                      : 'border-gray-200 hover:border-purple-300'
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
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="mr-2 text-gray-600">({product.reviewCount} تقييم)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-purple-600">{product.price} ر.س</span>
              <span className="text-xl text-gray-500 line-through">{product.originalPrice} ر.س</span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                خصم 25%
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">اللون</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor === color.value 
                        ? 'border-purple-500 scale-110' 
                        : 'border-gray-300 hover:border-purple-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">المقاس</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-purple-500 bg-purple-50 text-purple-600'
                        : 'border-gray-300 text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">الكمية</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <span className="text-gray-600">متوفر في المخزون</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center">
                  <ShoppingCart size={18} className="ml-2" />
                  إضافة إلى السلة
                </button>
                <button className="bg-orange-500 text-white font-medium py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors">
                  اشتري الآن
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">مميزات المنتج</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck size={16} className="ml-2 text-purple-600" />
                  شحن مجاني
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield size={16} className="ml-2 text-purple-600" />
                  ضمان الجودة
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RotateCcw size={16} className="ml-2 text-purple-600" />
                  إرجاع مجاني
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full ml-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            منتجات ذات صلة
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <p className="text-lg font-bold text-purple-600">{relatedProduct.price} ر.س</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernProductPage;