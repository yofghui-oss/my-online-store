import React, { useState } from 'react';
import { CreditCard, MapPin, Phone, User, Lock, CheckCircle, Zap, Shield, Cpu } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

interface TechCheckoutPageProps {
  storeName?: string;
}

const TechCheckoutPage: React.FC<TechCheckoutPageProps> = ({ 
  storeName = "TechStore" 
}) => {
  const { cart, products, appliedCoupon } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Shipping Address
    address: '',
    city: '',
    postalCode: '',
    // Payment
    paymentMethod: 'cod',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitOrder = () => {
    console.log('Tech order submitted:', { formData, cartItems, total });
    alert('تم إرسال طلبك التقني بنجاح! سيتم التواصل معك قريباً.');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Zap className="h-8 w-8 text-blue-400" />
            إتمام الطلب التقني
          </h1>
          <p className="text-gray-400">أكمل بياناتك لإتمام عملية شراء المنتجات التقنية</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-500 text-white' 
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step}</span>
                  )}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex gap-16 text-sm text-gray-400">
              <span className={currentStep >= 1 ? 'text-blue-400 font-medium' : ''}>البيانات الشخصية</span>
              <span className={currentStep >= 2 ? 'text-blue-400 font-medium' : ''}>عنوان التوصيل</span>
              <span className={currentStep >= 3 ? 'text-blue-400 font-medium' : ''}>الدفع</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              {/* Step 1: Customer Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    البيانات الشخصية
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">الاسم الأول</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل اسمك الأول"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">اسم العائلة</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل اسم العائلة"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    عنوان التوصيل والتركيب
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <Cpu className="h-4 w-4" />
                        <span className="text-sm font-medium">خدمة التركيب المجانية</span>
                      </div>
                      <p className="text-xs text-blue-300">
                        نوفر خدمة التوصيل والتركيب المجانية لجميع الأجهزة التقنية
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">العنوان الكامل</label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل عنوانك الكامل مع تفاصيل الوصول"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">المدينة</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="الرياض"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">الرمز البريدي</label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                    طريقة الدفع الآمنة
                  </h2>
                  
                  {/* Payment Methods */}
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                      <div className="mr-3">
                        <div className="font-medium text-white">الدفع عند الاستلام</div>
                        <div className="text-sm text-gray-400">ادفع نقداً عند وصول الطلب والتركيب</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                      <div className="mr-3">
                        <div className="font-medium text-white">بطاقة ائتمانية</div>
                        <div className="text-sm text-gray-400">Visa, MasterCard, مدى - دفع آمن ومشفر</div>
                      </div>
                    </label>
                  </div>

                  {/* Card Details */}
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">رقم البطاقة</label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">تاريخ الانتهاء</label>
                          <input
                            type="text"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">اسم حامل البطاقة</label>
                        <input
                          type="text"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="الاسم كما يظهر على البطاقة"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  السابق
                </button>
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                  >
                    التالي
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitOrder}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                  >
                    تأكيد الطلب
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg border border-gray-700 sticky top-4">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">ملخص الطلب التقني</h2>
                
                {/* Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <img
                        src={item.product!.image}
                        alt={item.product!.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">{item.product!.name}</h4>
                        <p className="text-sm text-gray-400">الكمية: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-blue-400">{(item.product!.price * item.quantity).toFixed(2)} ر.س</span>
                    </div>
                  ))}
                </div>

                {/* Tech Services */}
                <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">الخدمات المضمنة</span>
                  </div>
                  <ul className="text-xs text-blue-300 space-y-1">
                    <li>• توصيل وتركيب مجاني</li>
                    <li>• ضمان شامل لمدة عامين</li>
                    <li>• دعم فني مدى الحياة</li>
                  </ul>
                </div>

                {/* Totals */}
                <div className="border-t border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">المجموع الفرعي</span>
                    <span className="text-white">{subtotal.toFixed(2)} ر.س</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">الخصم</span>
                      <span className="text-green-400">-{discount.toFixed(2)} ر.س</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">التوصيل والتركيب</span>
                    <span className="text-white">{shipping === 0 ? 'مجاني' : `${shipping} ر.س`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-600">
                    <span className="text-white">الإجمالي</span>
                    <span className="text-blue-400">{total.toFixed(2)} ر.س</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Lock className="h-4 w-4 text-green-400" />
                    <span>معاملتك محمية بتشفير SSL 256-bit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCheckoutPage;
