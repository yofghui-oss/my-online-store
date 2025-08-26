import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Share2, Plus, Minus } from 'lucide-react';

const VibrantProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const product = {
    name: 'تي شيرت شبابي ملون',
    price: 89.99,
    originalPrice: 129.99,
    description: 'تي شيرت شبابي مليء بالألوان والطاقة الإيجابية!',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    rating: 4.8,
    reviewCount: 156,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'أحمر', value: '#EF4444' },
      { name: 'أزرق', value: '#3B82F6' },
      { name: 'أخضر', value: '#10B981' },
      { name: 'بنفسجي', value: '#8B5CF6' }
    ]
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('🎨 اختاروا المقاس واللون المفضل أولاً!');
      return;
    }
    alert('🛒 تم إضافة المنتج للسلة! 🎉');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-white rounded-xl shadow-lg border-4 border-pink-300 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {product.name} ✨
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span>({product.reviewCount} تقييم) 🌟</span>
              </div>

              <div className="flex items-center space-x-reverse space-x-4 mb-6">
                <span className="text-3xl font-bold text-pink-600">{product.price} ريال</span>
                <span className="text-xl text-gray-500 line-through">{product.originalPrice} ريال</span>
              </div>
            </div>

            <p className="text-gray-700">{product.description}</p>

            {/* Colors */}
            <div>
              <label className="block font-semibold mb-3">🎨 اللون:</label>
              <div className="flex space-x-reverse space-x-3">
                {product.colors.map((color) => (
                  <button key={color.name} onClick={() => setSelectedColor(color.name)} 
                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color.name ? 'border-pink-500' : 'border-gray-300'}`} 
                    style={{ backgroundColor: color.value }} />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block font-semibold mb-3">📏 المقاس:</label>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} 
                    className={`py-2 px-4 border-2 rounded-lg ${selectedSize === size ? 'border-pink-500 bg-pink-50' : 'border-pink-200'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-semibold mb-3">🔢 الكمية:</label>
              <div className="flex items-center">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 border rounded">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="mx-4 text-xl">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 border rounded">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button onClick={handleAddToCart} 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-lg font-bold flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 ml-2" />
                🛒 أضيفوه للسلة!
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="py-3 border-2 border-pink-300 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 ml-2" />
                  💖 المفضلة
                </button>
                <button className="py-3 border-2 border-pink-300 rounded-lg flex items-center justify-center">
                  <Share2 className="w-5 h-5 ml-2" />
                  📤 مشاركة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibrantProductDetailPage;