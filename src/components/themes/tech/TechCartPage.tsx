import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, Zap, Shield } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

interface TechCartPageProps {
  storeName?: string;
}

const TechCartPage: React.FC<TechCartPageProps> = ({ 
  storeName = "TechStore" 
}) => {
  const { cart, products, updateCartQuantity, removeFromCart, appliedCoupon, applyCoupon, removeCoupon } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  // Get cart items with product details
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product: product ? {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      } : null
    };
  }).filter(item => item.product !== null);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage / 100) : 0;
  const shipping = subtotal > 500 ? 0 : 35;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    setCouponError('');
    const success = applyCoupon(couponCode);
    if (!success) {
      setCouponError('كود الخصم غير صحيح أو منتهي الصلاحية');
    } else {
      setCouponCode('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-gray-600 mb-6">
              <ShoppingBag className="h-24 w-24 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">عربة التسوق فارغة</h1>
            <p className="text-gray-400 mb-8">لم تقم بإضافة أي منتجات تقنية إلى عربة التسوق بعد</p>
            <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 gap-2">
              تصفح المنتجات
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">عربة التسوق</h1>
          <p className="text-gray-400">{cartItems.length} منتج في عربة التسوق</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  المنتجات التقنية
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                      <img
                        src={item.product!.image}
                        alt={item.product!.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">{item.product!.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">تقنية</span>
                          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            ضمان عامين
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-blue-400">{item.product!.price} ر.س</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-600 rounded-lg border border-gray-500">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            className="p-2 hover:bg-gray-500 transition-colors text-white"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-center min-w-[3rem] text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className="p-2 hover:bg-gray-500 transition-colors text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg border border-gray-700 sticky top-4">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">ملخص الطلب</h2>
                
                {/* Coupon */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">كود الخصم</label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium text-green-300">{appliedCoupon.code}</span>
                        <span className="text-sm text-green-400">({appliedCoupon.discountPercentage}% خصم)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-green-400 hover:text-green-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="أدخل كود الخصم"
                          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          disabled={!couponCode.trim()}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          تطبيق
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-sm text-red-400">{couponError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">المجموع الفرعي</span>
                    <span className="font-medium text-white">{subtotal.toFixed(2)} ر.س</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">الخصم</span>
                      <span className="font-medium text-green-400">-{discount.toFixed(2)} ر.س</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">الشحن</span>
                    <span className="font-medium text-white">
                      {shipping === 0 ? 'مجاني' : `${shipping} ر.س`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-400">شحن مجاني للطلبات أكثر من 500 ر.س</p>
                  )}
                  <div className="border-t border-gray-600 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-white">الإجمالي</span>
                      <span className="text-lg font-semibold text-blue-400">{total.toFixed(2)} ر.س</span>
                    </div>
                  </div>
                </div>

                {/* Tech Features */}
                <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">مميزات تقنية</span>
                  </div>
                  <ul className="text-xs text-blue-300 space-y-1">
                    <li>• ضمان شامل لمدة عامين</li>
                    <li>• دعم فني مجاني</li>
                    <li>• توصيل وتركيب مجاني</li>
                  </ul>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
                  إتمام الطلب
                </button>

                {/* Continue Shopping */}
                <button className="w-full mt-3 border border-gray-600 text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                  متابعة التسوق
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCartPage;
