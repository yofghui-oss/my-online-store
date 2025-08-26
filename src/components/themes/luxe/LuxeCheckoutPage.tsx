import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  Crown, User, MapPin, CreditCard, Shield, 
  Truck, Check, ChevronRight 
} from 'lucide-react';

const LuxeCheckoutPage: React.FC = () => {
  const { storeId } = useParams();
  const [step, setStep] = useState(1);

  // Mock cart items
  const items = [
    {
      id: '1',
      name: 'فستان حرير إيطالي فاخر',
      price: 1899,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '2',
      name: 'جاكيت كشمير أنيق',
      price: 2299,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm">
              <Crown size={32} className="text-black" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-neutral-900 mb-4">
            إتمام الطلب الفاخر
          </h1>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse mt-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-12 h-12 rounded-sm flex items-center justify-center text-sm font-serif font-bold transition-all ${
                  step >= stepNum 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg' 
                    : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-20 h-1 mx-3 transition-all ${
                    step > stepNum ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-neutral-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-8 rtl:space-x-reverse mt-4 text-sm font-serif">
            <span className={`${step === 1 ? 'text-yellow-600 font-semibold' : 'text-neutral-600'}`}>المعلومات الشخصية</span>
            <span className={`${step === 2 ? 'text-yellow-600 font-semibold' : 'text-neutral-600'}`}>عنوان التوصيل</span>
            <span className={`${step === 3 ? 'text-yellow-600 font-semibold' : 'text-neutral-600'}`}>الدفع والتأكيد</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border-2 border-neutral-200 p-8"
              >
                <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8 flex items-center">
                  <User size={24} className="ml-4 text-yellow-600" />
                  المعلومات الشخصية
                </h2>
                
                {/* VIP Member Check */}
                <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Crown size={20} className="text-yellow-600 ml-3" />
                      <span className="font-serif font-semibold text-neutral-900">هل أنت عضو VIP؟</span>
                    </div>
                    <button className="text-yellow-600 font-serif font-medium hover:text-yellow-700 transition-colors">
                      تسجيل الدخول
                    </button>
                  </div>
                  <p className="text-sm text-neutral-600 font-serif mt-2">
                    احصل على خصومات حصرية وخدمات مميزة
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                      placeholder="أدخل اسمك الأول"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                      الاسم الأخير
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                      placeholder="أدخل اسمك الأخير"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                      placeholder="+966 50 123 4567"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="mt-8 w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-serif font-bold py-4 px-8 hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg"
                >
                  التالي: عنوان التوصيل الفاخر
                </button>
              </motion.div>
            )}

            {/* Step 2: Shipping Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border-2 border-neutral-200 p-8"
              >
                <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8 flex items-center">
                  <MapPin size={24} className="ml-4 text-yellow-600" />
                  عنوان التوصيل الفاخر
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                      العنوان الكامل
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                      placeholder="أدخل عنوانك بالتفصيل (الحي، الشارع، رقم المبنى)"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                        المدينة
                      </label>
                      <select className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif">
                        <option>الرياض</option>
                        <option>جدة</option>
                        <option>الدمام</option>
                        <option>مكة المكرمة</option>
                        <option>المدينة المنورة</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                        الرمز البريدي
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  {/* Premium Shipping Options */}
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-6 flex items-center">
                      <Truck size={20} className="ml-3 text-yellow-600" />
                      خيارات التوصيل المميزة
                    </h3>
                    <div className="space-y-4">
                      <label className="flex items-center p-6 border-2 border-yellow-200 bg-yellow-50 cursor-pointer hover:bg-yellow-100 transition-colors">
                        <input type="radio" name="shipping" className="text-yellow-600" defaultChecked />
                        <div className="mr-4">
                          <div className="font-serif font-semibold text-neutral-900 flex items-center">
                            <Crown size={16} className="ml-2 text-yellow-600" />
                            توصيل VIP في نفس اليوم
                          </div>
                          <div className="text-sm text-neutral-600 font-serif">توصيل حصري خلال 3-6 ساعات</div>
                        </div>
                        <div className="mr-auto font-serif font-bold text-yellow-600">مجاني</div>
                      </label>
                      <label className="flex items-center p-6 border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors">
                        <input type="radio" name="shipping" className="text-yellow-600" />
                        <div className="mr-4">
                          <div className="font-serif font-semibold text-neutral-900">توصيل سريع</div>
                          <div className="text-sm text-neutral-600 font-serif">1-2 أيام عمل</div>
                        </div>
                        <div className="mr-auto font-serif font-bold text-neutral-900">50 ر.س</div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-neutral-200 text-neutral-700 font-serif font-medium py-4 px-8 hover:bg-neutral-300 transition-all"
                  >
                    السابق
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-serif font-bold py-4 px-8 hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg"
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
                className="bg-white border-2 border-neutral-200 p-8"
              >
                <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8 flex items-center">
                  <CreditCard size={24} className="ml-4 text-yellow-600" />
                  معلومات الدفع الآمن
                </h2>

                {/* Payment Security Notice */}
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <div className="flex items-center">
                    <Shield size={20} className="text-green-600 ml-3" />
                    <span className="font-serif font-semibold text-neutral-900">دفع آمن ومحمي بنسبة 100%</span>
                  </div>
                  <p className="text-sm text-neutral-600 font-serif mt-2">
                    جميع المعاملات محمية بأحدث تقنيات التشفير العالمية
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                      رقم البطاقة
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                        تاريخ الانتهاء
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                        رمز الأمان (CVV)
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-serif font-medium text-neutral-700 mb-3">
                      اسم حامل البطاقة
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border border-neutral-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-serif"
                      placeholder="كما هو مكتوب على البطاقة"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-neutral-200 text-neutral-700 font-serif font-medium py-4 px-8 hover:bg-neutral-300 transition-all"
                  >
                    السابق
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-serif font-bold py-4 px-8 hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg flex items-center justify-center">
                    <Crown size={20} className="ml-3" />
                    تأكيد الطلب الفاخر
                    <ChevronRight size={20} className="mr-3" />
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
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-yellow-400/30 p-8 sticky top-8"
            >
              <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 flex items-center">
                <Crown size={24} className="text-yellow-600 ml-3" />
                ملخص الطلب
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                    <div className="flex-1">
                      <h3 className="font-serif font-medium text-neutral-900 text-sm">{item.name}</h3>
                      <p className="text-neutral-600 font-serif text-sm">الكمية: {item.quantity}</p>
                    </div>
                    <div className="text-yellow-600 font-serif font-bold">{item.price} ر.س</div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-neutral-700 font-serif">
                  <span>المجموع الفرعي</span>
                  <span className="font-medium">{total} ر.س</span>
                </div>
                <div className="flex justify-between text-neutral-700 font-serif">
                  <span>الشحن المميز</span>
                  <span className="font-medium text-green-600">مجاني</span>
                </div>
                <div className="flex justify-between text-neutral-700 font-serif">
                  <span>الضريبة</span>
                  <span className="font-medium">{Math.round(total * 0.15)} ر.س</span>
                </div>
                <div className="border-t-2 border-neutral-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-neutral-900 font-serif">
                    <span>المجموع الكلي</span>
                    <span className="text-yellow-600">{Math.round(total * 1.15)} ر.س</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="font-serif font-semibold text-neutral-900 mb-4">ضمانات الفخامة</h3>
                <div className="space-y-3 text-sm text-neutral-600 font-serif">
                  <div className="flex items-center">
                    <Shield size={14} className="ml-2 text-green-600" />
                    ضمان الأصالة مدى الحياة
                  </div>
                  <div className="flex items-center">
                    <Truck size={14} className="ml-2 text-yellow-600" />
                    إرجاع مجاني خلال 30 يوم
                  </div>
                  <div className="flex items-center">
                    <Crown size={14} className="ml-2 text-yellow-600" />
                    خدمة عملاء VIP
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

export default LuxeCheckoutPage;