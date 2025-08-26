import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, User, Gift, Check, Heart } from 'lucide-react';

const ToysCheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const steps = [
    { id: 1, title: 'معلومات الاتصال', icon: User },
    { id: 2, title: 'معلومات الدفع', icon: CreditCard },
    { id: 3, title: 'تأكيد الطلب', icon: Check }
  ];

  const orderItems = [
    { id: 1, name: 'دمية الأميرة الساحرة', price: 179.98, quantity: 2 },
    { id: 2, name: 'سيارة التحكم عن بُعد', price: 149.99, quantity: 1 },
    { id: 3, name: 'مكعبات البناء الملونة', price: 179.97, quantity: 3 }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 15.00;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                إتمام الشراء
              </h1>
            </motion.div>
            <p className="text-purple-600">خطوة واحدة تفصلك عن ألعابك المفضلة!</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-8 space-x-reverse">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: currentStep >= step.id ? 1.1 : 1 }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-purple-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    <step.icon className="h-6 w-6" />
                  </motion.div>
                  <div className="mr-3 text-right">
                    <div className={`font-semibold ${currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'}`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 rounded ${
                      currentStep > step.id ? 'bg-purple-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-100"
              >
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <User className="h-6 w-6 text-pink-500" />
                      معلومات الاتصال
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">الاسم الأول</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="أدخل اسمك الأول"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">الاسم الأخير</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="أدخل اسمك الأخير"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="+966 50 123 4567"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-2">العنوان</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="أدخل عنوانك الكامل"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">المدينة</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="الرياض"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">الرمز البريدي</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-pink-500" />
                      معلومات الدفع
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">رقم البطاقة</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">تاريخ الانتهاء</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">رمز الأمان</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">اسم حامل البطاقة</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="الاسم كما يظهر على البطاقة"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="h-12 w-12 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">تم تأكيد طلبك!</h2>
                    <p className="text-gray-600 mb-6">شكراً لك! سيتم شحن ألعابك قريباً</p>
                    <div className="bg-pink-50 rounded-xl p-6 mb-6">
                      <h3 className="font-bold text-gray-800 mb-2">رقم الطلب: #TOY2024001</h3>
                      <p className="text-gray-600">سيتم إرسال تفاصيل الشحن إلى بريدك الإلكتروني</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold"
                    >
                      تتبع الطلب
                    </motion.button>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 3 && (
                  <div className="flex justify-between mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`px-6 py-3 rounded-xl font-semibold ${
                        currentStep === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      }`}
                    >
                      السابق
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                      {currentStep === 2 ? 'تأكيد الطلب' : 'التالي'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 sticky top-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                  <Heart className="h-6 w-6 text-pink-500" />
                  ملخص الطلب
                </h2>

                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} (×{item.quantity})</span>
                      <span className="font-semibold">{item.price.toFixed(2)} ر.س</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>الشحن</span>
                    <span>{shipping.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>الضريبة</span>
                    <span>{tax.toFixed(2)} ر.س</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between text-xl font-bold text-purple-600">
                      <span>المجموع الكلي</span>
                      <span>{total.toFixed(2)} ر.س</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-purple-600 font-semibold">
                    🎁 شحن مجاني للطلبات أكثر من 200 ر.س
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ToysCheckoutPage;
