import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  CreditCard, Truck, MapPin, User, Mail, Phone, 
  Lock, Star, Heart, Sparkles, Gift, Shield,
  CheckCircle, ArrowLeft, ArrowRight
} from 'lucide-react';

const VibrantCheckoutPage: React.FC = () => {
  const { storeId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false
  });

  const steps = [
    { id: 1, title: 'معلوماتك', icon: User, emoji: '👤' },
    { id: 2, title: 'الشحن', icon: Truck, emoji: '🚚' },
    { id: 3, title: 'الدفع', icon: CreditCard, emoji: '💳' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-cyan-50 py-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
            <Gift className="mr-3 text-pink-500" size={40} />
            إتمام الطلب
            <Sparkles className="ml-3 text-purple-500" size={40} />
          </h1>
          <p className="text-gray-600 font-medium flex items-center justify-center">
            <span className="mr-2">🎉</span>
            خطوات بسيطة للحصول على طلبك الرائع
            <span className="ml-2">✨</span>
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-6 mb-8 border-2 border-pink-200 shadow-xl"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-2xl border-2 transition-all ${
                    currentStep >= step.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-pink-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep > step.id ? (
                    <CheckCircle size={24} />
                  ) : (
                    <span className="text-2xl">{step.emoji}</span>
                  )}
                  {currentStep === step.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl opacity-50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                <div className={`ml-3 ${currentStep >= step.id ? 'text-pink-600' : 'text-gray-400'}`}>
                  <p className="font-bold text-sm">{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-4 h-0.5 w-16 ${currentStep > step.id ? 'bg-gradient-to-r from-pink-400 to-purple-400' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-200 shadow-xl"
            >
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="mr-3 text-2xl">👤</span>
                    معلوماتك الشخصية
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        الاسم الأول ✨
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition-all bg-pink-50/50"
                        placeholder="أدخل اسمك الأول"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        الاسم الأخير 🌟
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all bg-purple-50/50"
                        placeholder="أدخل اسمك الأخير"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        البريد الإلكتروني 📧
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all bg-blue-50/50"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        رقم الهاتف 📱
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-400 transition-all bg-green-50/50"
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="mr-3 text-2xl">🚚</span>
                    عنوان الشحن
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        العنوان الكامل 🏠
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-400 transition-all bg-orange-50/50"
                        placeholder="الشارع والحي والمدينة"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          المدينة 🏙️
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-teal-200 rounded-2xl focus:ring-4 focus:ring-teal-300 focus:border-teal-400 transition-all bg-teal-50/50"
                          placeholder="اسم المدينة"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          الرمز البريدي 📮
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-indigo-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-400 transition-all bg-indigo-50/50"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                    
                    {/* Shipping Options */}
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">⚡</span>
                        خيارات الشحن
                      </h3>
                      <div className="space-y-3">
                        {[
                          { id: 'standard', name: 'شحن عادي', time: '3-5 أيام', price: 'مجاني', emoji: '📦' },
                          { id: 'express', name: 'شحن سريع', time: '1-2 يوم', price: '25 ر.س', emoji: '⚡' },
                          { id: 'same-day', name: 'نفس اليوم', time: 'خلال 6 ساعات', price: '50 ر.س', emoji: '🚀' }
                        ].map((option) => (
                          <motion.label
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center p-4 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-pink-300 transition-all bg-gradient-to-r from-pink-50/50 to-purple-50/50"
                          >
                            <input type="radio" name="shipping" value={option.id} className="mr-3" />
                            <span className="text-2xl mr-3">{option.emoji}</span>
                            <div className="flex-1">
                              <div className="font-bold text-gray-800">{option.name}</div>
                              <div className="text-sm text-gray-600">{option.time}</div>
                            </div>
                            <div className="font-bold text-pink-600">{option.price}</div>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="mr-3 text-2xl">💳</span>
                    معلومات الدفع
                  </h2>
                  <div className="space-y-6">
                    {/* Payment Methods */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">💰</span>
                        طريقة الدفع
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { id: 'card', name: 'بطاقة ائتمان', emoji: '💳' },
                          { id: 'apple-pay', name: 'Apple Pay', emoji: '🍎' },
                          { id: 'paypal', name: 'PayPal', emoji: '💙' }
                        ].map((method) => (
                          <motion.label
                            key={method.id}
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-purple-300 transition-all bg-gradient-to-b from-purple-50/50 to-blue-50/50"
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={formData.paymentMethod === method.id}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <span className="text-3xl mb-2">{method.emoji}</span>
                            <span className="font-bold text-sm text-center">{method.name}</span>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Card Details */}
                    {formData.paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            رقم البطاقة 💳
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all bg-purple-50/50"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              تاريخ الانتهاء 📅
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all bg-blue-50/50"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              رمز الأمان 🔒
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-400 transition-all bg-green-50/50"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-3 rounded-2xl font-bold transition-all ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <ArrowLeft size={20} className="mr-2" />
                  السابق
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={currentStep === 3 ? undefined : nextStep}
                  className={`flex items-center px-6 py-3 rounded-2xl font-bold transition-all ${
                    currentStep === 3
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                  } text-white shadow-lg hover:shadow-xl`}
                >
                  {currentStep === 3 ? (
                    <>
                      تأكيد الطلب
                      <CheckCircle size={20} className="ml-2" />
                    </>
                  ) : (
                    <>
                      التالي
                      <ArrowRight size={20} className="ml-2" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-6 border-2 border-pink-200 shadow-xl sticky top-4"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-2 text-2xl">🛍️</span>
                ملخص الطلب
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: 'فستان صيفي ملون', price: 299, emoji: '👗' },
                  { name: 'حقيبة يد عصرية', price: 149, emoji: '👜' },
                  { name: 'إكسسوار لامع', price: 79, emoji: '✨' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/70 rounded-2xl">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{item.emoji}</span>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <span className="font-bold text-pink-600">{item.price} ر.س</span>
                  </div>
                ))}
              </div>

              <hr className="my-6 border-pink-200" />
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold">527 ر.س</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>الشحن:</span>
                  <span className="font-bold text-green-600">مجاني 🎉</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>الضريبة:</span>
                  <span className="font-bold">79 ر.س</span>
                </div>
                <hr className="border-pink-200" />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>المجموع الكلي:</span>
                  <span className="text-pink-600">606 ر.س</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border border-yellow-200">
                <div className="flex items-center text-yellow-800">
                  <Gift className="mr-2" size={20} />
                  <span className="font-bold">🎁 هدية مجانية!</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  احصل على علبة هدايا أنيقة مع طلبك
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibrantCheckoutPage;