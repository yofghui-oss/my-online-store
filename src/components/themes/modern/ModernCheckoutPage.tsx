import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, MapPin, User, Mail, Phone, Lock } from 'lucide-react';

interface ModernCheckoutPageProps {
  storeId: string;
}

const ModernCheckoutPage: React.FC<ModernCheckoutPageProps> = ({ storeId }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const orderItems = [
    { name: 'قميص عصري أنيق', price: 299, quantity: 2 },
    { name: 'بنطال جينز كلاسيكي', price: 199, quantity: 1 }
  ];

  const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            إتمام الطلب
          </h1>
          <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 rtl:space-x-reverse mt-2 text-sm text-gray-600">
            <span className={step === 1 ? 'text-purple-600 font-medium' : ''}>المعلومات</span>
            <span className={step === 2 ? 'text-purple-600 font-medium' : ''}>الشحن</span>
            <span className={step === 3 ? 'text-purple-600 font-medium' : ''}>الدفع</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-purple-100 p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <User size={20} className="ml-3 text-purple-600" />
                  المعلومات الشخصية
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="أدخل اسمك الأول"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الأخير
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="أدخل اسمك الأخير"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+966 50 123 4567"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="mt-8 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  التالي: معلومات الشحن
                </button>
              </motion.div>
            )}

            {/* Step 2: Shipping Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-purple-100 p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <MapPin size={20} className="ml-3 text-purple-600" />
                  عنوان الشحن
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العنوان الكامل
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="أدخل عنوانك بالتفصيل"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المدينة
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>الرياض</option>
                        <option>جدة</option>
                        <option>الدمام</option>
                        <option>مكة المكرمة</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الرمز البريدي
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  {/* Shipping Options */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Truck size={18} className="ml-2 text-purple-600" />
                      خيارات الشحن
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                        <input type="radio" name="shipping" className="text-purple-600" defaultChecked />
                        <div className="mr-3">
                          <div className="font-medium text-gray-900">شحن عادي</div>
                          <div className="text-sm text-gray-500">3-5 أيام عمل - مجاني</div>
                        </div>
                        <div className="mr-auto font-medium text-purple-600">مجاني</div>
                      </label>
                      <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                        <input type="radio" name="shipping" className="text-purple-600" />
                        <div className="mr-3">
                          <div className="font-medium text-gray-900">شحن سريع</div>
                          <div className="text-sm text-gray-500">1-2 أيام عمل</div>
                        </div>
                        <div className="mr-auto font-medium text-purple-600">25 ر.س</div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    السابق
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all"
                  >
                    التالي: الدفع
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-purple-100 p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <CreditCard size={20} className="ml-3 text-purple-600" />
                  طريقة الدفع
                </h2>
                
                {/* Payment Methods */}
                <div className="space-y-4 mb-6">
                  <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card" 
                      className="text-purple-600"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <CreditCard size={18} className="mx-3 text-purple-600" />
                    <span className="font-medium text-gray-900">بطاقة ائتمان/خصم</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      className="text-purple-600"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Truck size={18} className="mx-3 text-purple-600" />
                    <span className="font-medium text-gray-900">الدفع عند الاستلام</span>
                  </label>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم البطاقة
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          تاريخ الانتهاء
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          رمز الأمان
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    السابق
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center">
                    <Lock size={18} className="ml-2" />
                    تأكيد الطلب
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6 sticky top-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">ملخص الطلب</h2>
              
              <div className="space-y-4 mb-6">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">الكمية: {item.quantity}</div>
                    </div>
                    <div className="font-medium text-gray-900">
                      {item.price * item.quantity} ر.س
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>المجموع الفرعي</span>
                  <span>{total} ر.س</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>الشحن</span>
                  <span>مجاني</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>الضريبة</span>
                  <span>{Math.round(total * 0.15)} ر.س</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>المجموع الكلي</span>
                    <span>{Math.round(total * 1.15)} ر.س</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCheckoutPage;