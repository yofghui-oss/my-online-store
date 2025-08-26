import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Heart, Zap, Star } from 'lucide-react';

const VibrantLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    alert('🎉 أهلين! دخلت بنجاح - يلا نبدأ المغامرة الملونة! 🌈');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 relative overflow-hidden" dir="rtl">
      {/* Vibrant Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-35 animate-spin"></div>
        <div className="absolute top-20 right-40 w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-25 animate-ping"></div>
        
        {/* Floating Emojis Effect */}
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🌟</div>
        <div className="absolute top-32 right-20 text-3xl animate-pulse delay-300">💖</div>
        <div className="absolute bottom-20 left-32 text-2xl animate-bounce delay-700">🎨</div>
        <div className="absolute bottom-40 right-1/3 text-3xl animate-pulse delay-500">✨</div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            {/* Vibrant Login Box */}
            <div className="bg-white/95 backdrop-blur-lg border-4 border-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 text-xl animate-bounce">🎉</div>
                  </div>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  أهلين وسهلين! 👋
                </h2>
                <p className="text-gray-600 text-lg">
                  دخول سريع للعالم الملون 🌈
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    💌 إيميلك الحلو
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-3 border-pink-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 text-gray-800 placeholder-gray-400 pl-12 text-lg bg-pink-50/50"
                      placeholder="اكتب إيميلك هنا 📧"
                    />
                    <Mail className="w-6 h-6 text-pink-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    🔐 كلمة السر السرية
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-3 border-purple-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 text-gray-800 placeholder-gray-400 pl-12 text-lg bg-purple-50/50"
                      placeholder="كلمة السر الخاصة بك 🤫"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded-lg"
                    />
                    <span className="mr-3 text-sm font-semibold text-gray-700">فاكرني 💭</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-pink-600 font-bold transition-colors"
                  >
                    نسيت كلمة السر؟ 🤔
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-4 px-6 rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 flex items-center justify-center group shadow-xl text-lg font-bold"
                >
                  <span className="ml-3">🚀 يلا ندخل!</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-bold rounded-full">أو 🤷‍♀️</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-3 border-3 border-blue-300 rounded-2xl hover:bg-blue-50 transition-colors bg-blue-50/50"
                  >
                    <span className="text-sm font-bold text-blue-600">📘 Facebook</span>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-3 border-3 border-red-300 rounded-2xl hover:bg-red-50 transition-colors bg-red-50/50"
                  >
                    <span className="text-sm font-bold text-red-600">🔍 Google</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    مالك حساب لسه؟ 🤨{' '}
                    <button
                      type="button"
                      className="text-pink-600 hover:text-purple-600 font-bold transition-colors text-lg"
                    >
                      اعمل حساب جديد! 🎨
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Fun Branding */}
        <div className="hidden lg:block flex-1 relative">
          <div className="h-full flex flex-col items-center justify-center p-12 relative">
            <div className="relative z-10 max-w-md text-center text-white">
              <div className="relative mb-8">
                <div className="w-40 h-40 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-white/30">
                  <div className="text-6xl animate-bounce">🎉</div>
                </div>
                
                {/* Floating Fun Elements */}
                <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🌟</div>
                <div className="absolute -bottom-4 -left-4 text-3xl animate-pulse delay-500">💖</div>
                <div className="absolute top-1/2 -left-8 text-2xl animate-spin">✨</div>
              </div>
              
              <h3 className="text-4xl font-bold mb-6 drop-shadow-lg">
                مرحباً بك في عالمنا الملون! 🌈
              </h3>
              <p className="text-xl leading-relaxed mb-8 drop-shadow text-white/90">
                عندنا كل شي حلو وملون! تعال اكتشف عالم مليان بالألوان والبهجة والحب 💕
              </p>
              
              {/* Fun Features */}
              <div className="space-y-4 text-right">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/30 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-end text-lg">
                    <span className="font-bold">منتجات ملونة ومرحة 🎨</span>
                    <Star className="w-6 h-6 mr-3 animate-pulse text-yellow-300" />
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/30 transform hover:scale-105 transition-transform delay-100">
                  <div className="flex items-center justify-end text-lg">
                    <span className="font-bold">أسعار حلوة ومناسبة 💰</span>
                    <Heart className="w-6 h-6 mr-3 animate-pulse text-pink-300" />
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/30 transform hover:scale-105 transition-transform delay-200">
                  <div className="flex items-center justify-end text-lg">
                    <span className="font-bold">شحن سريع وآمن 🚚</span>
                    <Zap className="w-6 h-6 mr-3 animate-pulse text-green-300" />
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

export default VibrantLoginPage;