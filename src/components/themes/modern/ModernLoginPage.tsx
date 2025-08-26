import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, User } from 'lucide-react';

const ModernLoginPage: React.FC = () => {
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
    alert('✨ مرحباً بك! تم تسجيل الدخول بنجاح');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden" dir="rtl">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-10">
          <Sparkles className="w-6 h-6 text-purple-400 animate-spin slow-spin" />
        </div>
        <div className="absolute bottom-20 left-20">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
        </div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            {/* Modern Login Box */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  أهلاً بك
                </h2>
                <p className="text-white/70">
                  ادخل إلى حسابك واستمتع بالتسوق
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 pl-12 backdrop-blur-sm"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                    <Mail className="w-5 h-5 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 pl-12 backdrop-blur-sm"
                      placeholder="أدخل كلمة المرور"
                    />
                    <Lock className="w-5 h-5 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-purple-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-white/30 bg-white/10 rounded"
                    />
                    <span className="mr-2 text-sm text-white/70">تذكرني</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-purple-400 hover:text-pink-400 transition-colors"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center group shadow-xl"
                >
                  <span className="ml-2">تسجيل الدخول</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/10 text-white/70 rounded-lg backdrop-blur-sm">أو</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    <span className="text-sm text-white/80">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    <span className="text-sm text-white/80">Facebook</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-sm text-white/70">
                    ليس لديك حساب؟{' '}
                    <button
                      type="button"
                      className="text-purple-400 hover:text-pink-400 font-medium transition-colors"
                    >
                      إنشاء حساب جديد
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Modern Branding */}
        <div className="hidden lg:block flex-1 relative">
          <div className="h-full flex flex-col items-center justify-center p-12 relative">
            {/* Modern Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-l-3xl backdrop-blur-sm"></div>
            
            <div className="relative z-10 max-w-md text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                  <Sparkles className="w-16 h-16 text-white animate-pulse" />
                </div>
                
                {/* Floating Modern Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full animate-pulse delay-500"></div>
              </div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                تسوق بأسلوب عصري
              </h3>
              <p className="text-white/70 leading-relaxed mb-8">
                اكتشف أحدث صيحات الموضة والأناقة مع مجموعتنا المميزة من المنتجات العصرية والمتطورة.
              </p>
              
              {/* Modern Features */}
              <div className="space-y-3 text-right">
                <div className="flex items-center justify-end text-sm text-white/60">
                  <span>تصاميم عصرية ومتطورة</span>
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                </div>
                <div className="flex items-center justify-end text-sm text-white/60">
                  <span>أحدث صيحات الموضة</span>
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse delay-200"></div>
                </div>
                <div className="flex items-center justify-end text-sm text-white/60">
                  <span>جودة عالية وأسعار منافسة</span>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 animate-pulse delay-400"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLoginPage;