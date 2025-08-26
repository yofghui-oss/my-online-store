import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Heart, Star, Zap } from 'lucide-react';

const VibrantSignupPage: React.FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: false,
    favoriteColor: 'pink'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('🙈 كلمات السر مش متطابقة يا قمر!');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert('🤗 لازم توافق على الشروط عشان نكمل معاك!');
      return;
    }

    console.log('Vibrant Signup submitted:', formData);
    alert('🎉🌈 ألف مبروك! حسابك جاهز والعالم الملون ينتظرك! مرحباً بك في عائلتنا الحلوة! 💖✨');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const colorOptions = [
    { value: 'pink', label: '🩷 وردي', color: 'bg-pink-400' },
    { value: 'purple', label: '💜 بنفسجي', color: 'bg-purple-400' },
    { value: 'blue', label: '💙 أزرق', color: 'bg-blue-400' },
    { value: 'green', label: '💚 أخضر', color: 'bg-green-400' },
    { value: 'yellow', label: '💛 أصفر', color: 'bg-yellow-400' },
    { value: 'orange', label: '🧡 برتقالي', color: 'bg-orange-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 relative overflow-hidden" dir="rtl">
      {/* Super Vibrant Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-35 animate-spin"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-25 animate-ping"></div>
        
        {/* More Floating Emojis */}
        <div className="absolute top-16 right-16 text-3xl animate-bounce">🎨</div>
        <div className="absolute top-40 left-20 text-4xl animate-pulse delay-300">🌟</div>
        <div className="absolute bottom-32 right-1/3 text-2xl animate-bounce delay-700">💖</div>
        <div className="absolute bottom-16 left-16 text-3xl animate-pulse delay-500">✨</div>
        <div className="absolute top-1/2 right-10 text-2xl animate-spin">🌈</div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md w-full">
            {/* Super Vibrant Signup Box */}
            <div className="bg-white/95 backdrop-blur-lg border-4 border-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Star className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 text-xl animate-bounce">🎉</div>
                    <div className="absolute -bottom-2 -left-2 text-lg animate-pulse">✨</div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  يلا انضم لعيلتنا! 🎨
                </h2>
                <p className="text-gray-600">
                  اعمل حسابك واستمتع بالألوان 🌈
                </p>
              </div>

              {/* Signup Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Favorite Color Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    🎨 إيش لونك المفضل؟
                  </label>
                  <select
                    name="favoriteColor"
                    value={formData.favoriteColor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-3 border-pink-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 text-gray-800 bg-pink-50/50"
                  >
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name Inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      👤 اسمك الأول
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 border-3 border-blue-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-gray-800 placeholder-gray-400 bg-blue-50/50"
                      placeholder="أحمد 😊"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      👨‍👩‍👧‍👦 اسم العيلة
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 border-3 border-purple-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 text-gray-800 placeholder-gray-400 bg-purple-50/50"
                      placeholder="السالم 👍"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    📧 إيميلك الحلو
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-3 border-pink-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 text-gray-800 placeholder-gray-400 pl-12 bg-pink-50/50"
                      placeholder="ahmed@example.com ✉️"
                    />
                    <Mail className="w-6 h-6 text-pink-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    📱 رقم جوالك
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-3 border-green-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 text-gray-800 placeholder-gray-400 pl-12 bg-green-50/50"
                      placeholder="+966 50 123 4567 📞"
                    />
                    <Phone className="w-6 h-6 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Password Inputs */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    🔐 كلمة سر قوية
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-3 border-purple-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 text-gray-800 placeholder-gray-400 pl-12 bg-purple-50/50"
                      placeholder="اختار كلمة سر صعبة 💪"
                    />
                    <Lock className="w-6 h-6 text-purple-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    🔄 أعيد كلمة السر
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-3 border-indigo-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 text-gray-800 placeholder-gray-400 pl-12 bg-indigo-50/50"
                      placeholder="نفس كلمة السر تاني 🔁"
                    />
                    <Lock className="w-6 h-6 text-indigo-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                {/* Fun Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-2xl border-2 border-pink-200">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded-lg mt-1"
                    />
                    <span className="mr-3 text-sm font-semibold text-gray-700 leading-relaxed">
                      💯 أوافق على{' '}
                      <button type="button" className="text-pink-600 hover:text-purple-600">
                        الشروط الحلوة
                      </button>
                      {' '}و{' '}
                      <button type="button" className="text-pink-600 hover:text-purple-600">
                        الخصوصية
                      </button>
                    </span>
                  </label>
                  
                  <label className="flex items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-2xl border-2 border-purple-200">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded-lg"
                    />
                    <span className="mr-3 text-sm font-semibold text-gray-700">
                      📬 بدي أستقبل العروض والمفاجآت الملونة!
                    </span>
                  </label>
                </div>

                {/* Super Fun Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-4 px-6 rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all transform hover:scale-110 hover:rotate-1 flex items-center justify-center group shadow-xl text-lg font-bold"
                >
                  <span className="ml-3">🚀✨ يلا نبدأ المغامرة الملونة! 🌈🎉</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-3 group-hover:scale-125 transition-transform" />
                </button>

                {/* Colorful Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-3 border-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-bold rounded-full border-2 border-pink-200">أو 🤷‍♀️</span>
                  </div>
                </div>

                {/* Social Signup */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-3 border-3 border-blue-300 rounded-2xl hover:bg-blue-50 transition-all transform hover:scale-105 bg-blue-50/50"
                  >
                    <span className="text-sm font-bold text-blue-600">📘 Facebook</span>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-3 border-3 border-red-300 rounded-2xl hover:bg-red-50 transition-all transform hover:scale-105 bg-red-50/50"
                  >
                    <span className="text-sm font-bold text-red-600">🔍 Google</span>
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    عندك حساب خلاص؟ 😊{' '}
                    <button
                      type="button"
                      className="text-pink-600 hover:text-purple-600 font-bold transition-colors text-lg"
                    >
                      ادخل من هنا! 🏠
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Super Fun Benefits */}
        <div className="hidden lg:block flex-1 relative">
          <div className="h-full flex flex-col items-center justify-center p-12 relative">
            <div className="relative z-10 max-w-md text-center text-white">
              <div className="relative mb-8">
                <div className="w-40 h-40 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-white/30">
                  <div className="text-6xl animate-bounce">🌈</div>
                </div>
                
                {/* More Floating Fun */}
                <div className="absolute -top-6 -right-6 text-4xl animate-bounce">🎨</div>
                <div className="absolute -bottom-6 -left-6 text-3xl animate-pulse delay-500">💖</div>
                <div className="absolute top-1/2 -left-10 text-2xl animate-spin">✨</div>
                <div className="absolute top-1/2 -right-10 text-2xl animate-pulse delay-300">🌟</div>
              </div>
              
              <h3 className="text-4xl font-bold mb-6 drop-shadow-lg">
                عالم من الألوان والمرح! 🎊
              </h3>
              
              {/* Super Fun Benefits */}
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/30 transform hover:scale-110 hover:rotate-2 transition-all">
                  <div className="text-2xl mb-2">🎁</div>
                  <div className="font-bold text-lg">هدايا ومفاجآت كل يوم!</div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/30 transform hover:scale-110 hover:rotate-2 transition-all delay-100">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="font-bold text-lg">توصيل سريع زي البرق!</div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/30 transform hover:scale-110 hover:rotate-2 transition-all delay-200">
                  <div className="text-2xl mb-2">💝</div>
                  <div className="font-bold text-lg">خصومات حصرية للأعضاء!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibrantSignupPage;